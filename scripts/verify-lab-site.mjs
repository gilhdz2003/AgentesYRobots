/**
 * Verificación Lab del sitio real (adaptado de redesigns/kimi-directions/scripts/verify-browser.mjs).
 * Uso:
 *   1) npm run build && npx vite preview --port=4173
 *   2) google-chrome-stable --headless --remote-debugging-port=9222 --disable-gpu --no-sandbox about:blank
 *   3) node scripts/verify-lab-site.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'

const OUT_DIR = 'screenshots-lab'
await mkdir(OUT_DIR, { recursive: true })

const targets = await fetch('http://localhost:9222/json/list').then((response) => response.json())
const target = targets.find((item) => item.type === 'page')
if (!target) throw new Error('No hay una página disponible en Chrome CDP')

const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

let nextId = 0
const pending = new Map()
const runtimeErrors = []
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id) {
    const item = pending.get(message.id)
    if (!item) return
    pending.delete(message.id)
    if (message.error) item.reject(new Error(JSON.stringify(message.error)))
    else item.resolve(message.result)
  }
  if (message.method === 'Runtime.exceptionThrown') {
    runtimeErrors.push(message.params.exceptionDetails.text)
  }
})

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
  return result.result.value
}

await send('Page.enable')
await send('Runtime.enable')
const failures = []
const results = []

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'servicio-familia', path: '/servicios/coworkers-digitales' },
  { name: 'servicio-hoja', path: '/servicios/bb-one' },
  { name: 'nosotros', path: '/nosotros' },
  { name: 'casos', path: '/casos' },
  { name: 'contacto', path: '/contacto' },
]

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.name === 'mobile',
  })

  for (const route of ROUTES) {
    await send('Page.navigate', { url: `http://localhost:4173${route.path}` })
    await sleep(1100)
    await evaluate('document.fonts.ready.then(() => true)')
    const layout = await evaluate(`(() => {
      const h1 = document.querySelector('h1')
      return {
        path: location.pathname,
        heading: h1?.innerText.replace(/\\n/g, ' '),
        viewport: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images].filter((image) => !image.complete || !image.naturalWidth).length,
        emptyLinks: [...document.querySelectorAll('a')].filter((link) => !link.getAttribute('href') || link.getAttribute('href') === '#').length,
        sections: [...document.querySelectorAll('main section')].map((section) => section.id || section.getAttribute('aria-label') || 'sin-id'),
      }
    })()`)
    const record = { viewport: viewport.name, route: route.name, ...layout, sections: layout.sections.length }
    results.push(record)
    if (layout.documentWidth > layout.viewport) failures.push(`${viewport.name}/${route.name}: overflow documental ${layout.documentWidth} > ${layout.viewport}`)
    if (layout.brokenImages) failures.push(`${viewport.name}/${route.name}: ${layout.brokenImages} imágenes rotas`)
    if (layout.emptyLinks) failures.push(`${viewport.name}/${route.name}: ${layout.emptyLinks} enlaces vacíos`)

    // Screenshot full-page (captureBeyondViewport respeta 100vh del viewport emulado)
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: true,
    })
    await writeFile(`${OUT_DIR}/${route.name}-${viewport.name}.png`, Buffer.from(screenshot.data, 'base64'))
  }
}

// ===== Interacciones del home (desktop) =====
await send('Page.navigate', { url: 'http://localhost:4173/' })
await sleep(1100)

const sim = await evaluate(`(async () => {
  [...document.querySelectorAll('.lab-machine__controls button')].find((button) => button.textContent === 'PROTEGER').click()
  await new Promise((resolve) => setTimeout(resolve, 50))
  const flow = document.querySelector('.lab-machine__flow').textContent
  document.querySelectorAll('.lab-catalog__rows button')[2].click()
  await new Promise((resolve) => setTimeout(resolve, 50))
  const detail = document.querySelector('.lab-catalog__detail h3').textContent
  const pageLink = document.querySelector('.lab-catalog__page')?.getAttribute('href')
  const waCta = document.querySelector('.lab-catalog__detail > a')?.href
  document.querySelector('main section .border-b button, main section button[aria-expanded]')?.click()
  await new Promise((resolve) => setTimeout(resolve, 350))
  const faqOpen = document.querySelector('main section button[aria-expanded="true"]')?.getAttribute('aria-expanded')
  return { flow, detail, pageLink, waCta, faqOpen }
})()`)
if (!sim.flow.includes('PRUEBA DE ADVERSARIO')) failures.push(`simulador: flujo PROTEGER no cambió (${JSON.stringify(sim.flow)})`)
if (sim.detail !== 'Security Testing') failures.push(`catálogo: tab 3 no activó Security Testing (${sim.detail})`)
if (sim.pageLink !== '/servicios/security-testing') failures.push(`catálogo: link página completa incorrecto (${sim.pageLink})`)
if (!sim.waCta?.startsWith('https://wa.me/5218117991300')) failures.push(`catálogo: CTA WhatsApp incorrecto (${sim.waCta})`)
if (sim.faqOpen !== 'true') failures.push('FAQ: acordeón no abre')

// Dock: ancla desde el home
const anchor = await evaluate(`(async () => {
  document.querySelector('nav[aria-label="Navegación principal"] a[href="/#capacidades"]').click()
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { hash: location.hash, y: Math.round(scrollY) }
})()`)
if (anchor.hash !== '#capacidades' || anchor.y < 100) failures.push(`dock: ancla capacidades falló ${JSON.stringify(anchor)}`)

console.table(results)
if (runtimeErrors.length) failures.push(...runtimeErrors.map((error) => `Runtime: ${error}`))
socket.close()
if (failures.length) {
  console.error('\nFALLOS:\n' + failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}
console.log('\nOK: 12 layouts (6 rutas × 2 viewports), imágenes, enlaces, interacciones y anclas verificados.')
