import { mkdir, writeFile } from 'node:fs/promises'

await mkdir('redesigns/kimi-directions/screenshots', { recursive: true })

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
  if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails.text)
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

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.name === 'mobile',
  })

  for (const route of ['sistema', 'firma', 'lab']) {
    await send('Page.navigate', { url: `http://localhost:4173/?v=${route}` })
    await sleep(1100)
    await evaluate('document.fonts.ready.then(() => true)')
    const layout = await evaluate(`(() => {
      const h1 = document.querySelector('h1')
      return {
        heading: h1?.innerText.replace(/\\n/g, ' '),
        viewport: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        h1ClientWidth: h1?.clientWidth,
        h1ScrollWidth: h1?.scrollWidth,
        brokenImages: [...document.images].filter((image) => !image.complete || !image.naturalWidth).length,
        emptyLinks: [...document.querySelectorAll('a')].filter((link) => !link.getAttribute('href') || link.getAttribute('href') === '#').length,
      }
    })()`)
    const record = { viewport: viewport.name, route, ...layout }
    results.push(record)
    if (layout.documentWidth > layout.viewport) failures.push(`${viewport.name}/${route}: overflow documental ${layout.documentWidth} > ${layout.viewport}`)
    if (layout.h1ScrollWidth > layout.h1ClientWidth + 2) failures.push(`${viewport.name}/${route}: titular recortado ${layout.h1ScrollWidth} > ${layout.h1ClientWidth}`)
    if (layout.brokenImages) failures.push(`${viewport.name}/${route}: ${layout.brokenImages} imágenes rotas`)
    if (layout.emptyLinks) failures.push(`${viewport.name}/${route}: ${layout.emptyLinks} enlaces vacíos`)

    if (viewport.name === 'desktop') {
      if (route === 'sistema') {
        const interaction = await evaluate(`(async () => {
          document.querySelectorAll('.system-node')[1].click()
          await new Promise((resolve) => setTimeout(resolve, 50))
          const node = document.querySelector('.system-network__detail span').textContent
          document.querySelectorAll('.system-service > button')[0].click()
          await new Promise((resolve) => setTimeout(resolve, 50))
          const expanded = document.querySelectorAll('.system-service > button')[0].getAttribute('aria-expanded')
          return { node, expanded }
        })()`)
        if (!interaction.node.includes('AGENTES') || interaction.expanded !== 'true') failures.push(`sistema: interacción falló ${JSON.stringify(interaction)}`)
      }
      if (route === 'firma') {
        const heading = await evaluate(`(async () => {
          document.querySelectorAll('.firm-method__tabs button')[2].click()
          await new Promise((resolve) => setTimeout(resolve, 50))
          return document.querySelector('.firm-method__panel h3').textContent
        })()`)
        if (heading !== 'Activar') failures.push(`firma: tabs fallaron, panel=${heading}`)
      }
      if (route === 'lab') {
        const interaction = await evaluate(`(async () => {
          [...document.querySelectorAll('.lab-machine__controls button')].find((button) => button.textContent === 'PROTEGER').click()
          await new Promise((resolve) => setTimeout(resolve, 50))
          const flow = document.querySelector('.lab-machine__flow').textContent
          document.querySelectorAll('.lab-catalog__rows button')[2].click()
          await new Promise((resolve) => setTimeout(resolve, 50))
          const detail = document.querySelector('.lab-catalog__detail h3').textContent
          return { flow, detail }
        })()`)
        if (!interaction.flow.includes('PRUEBA DE ADVERSARIO') || interaction.detail !== 'Security Testing') failures.push(`lab: interacción falló ${JSON.stringify(interaction)}`)
      }

      const anchorSelector = {
        sistema: '.system-rail nav a[href="#soluciones"]',
        firma: '.firm-header nav a[href="#soluciones"]',
        lab: '.lab-dock a[href="#capacidades"]',
      }[route]
      const expectedHash = route === 'lab' ? '#capacidades' : '#soluciones'
      const navigation = await evaluate(`(async () => {
        document.querySelector('${anchorSelector}').click()
        await new Promise((resolve) => setTimeout(resolve, 60))
        return { search: location.search, hash: location.hash, concept: !!document.querySelector('.${{ sistema: 'system', firma: 'firm', lab: 'lab' }[route]}-concept') }
      })()`)
      if (navigation.search !== `?v=${route}` || navigation.hash !== expectedHash || !navigation.concept) {
        failures.push(`${route}: navegación interna falló ${JSON.stringify(navigation)}`)
      }
    }

    if (viewport.name === 'mobile' && route === 'lab') {
      const screenshot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true })
      await writeFile('redesigns/kimi-directions/screenshots/lab-mobile.png', Buffer.from(screenshot.data, 'base64'))
    }
  }
}

console.table(results)
if (runtimeErrors.length) failures.push(...runtimeErrors.map((error) => `Runtime: ${error}`))
socket.close()
if (failures.length) {
  console.error('\nFALLOS:\n' + failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}
console.log('\nOK: 6 layouts, imágenes, enlaces e interacciones principales verificados.')
