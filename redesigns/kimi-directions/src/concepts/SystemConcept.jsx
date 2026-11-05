import { useState } from 'react'
import Brand from '../components/Brand.jsx'
import { services, whatsappUrl } from '../data.js'

const nodes = [
  { id: 'people', label: 'Personas', x: '14%', y: '18%', detail: 'Tu equipo define reglas, excepciones y criterio. La IA ejecuta dentro de ese marco.' },
  { id: 'agents', label: 'Agentes', x: '61%', y: '10%', detail: 'Chat, voz y workflows conectados para atender y completar tareas de principio a fin.' },
  { id: 'core', label: 'BB One', x: '38%', y: '46%', detail: 'Una capa de infraestructura dedicada para orquestar operación, datos y automatizaciones.' },
  { id: 'data', label: 'Datos', x: '8%', y: '74%', detail: 'Información útil, gobernada y disponible para cada decisión del sistema.' },
  { id: 'security', label: 'Seguridad', x: '66%', y: '76%', detail: 'Pruebas, límites y monitoreo para que cada agente opere con confianza verificable.' },
]

const navItems = [
  ['inicio', 'Inicio'], ['soluciones', 'Soluciones'], ['metodo', 'Método'], ['contacto', 'Contacto'],
]

export default function SystemConcept() {
  const [activeNode, setActiveNode] = useState('core')
  const [openService, setOpenService] = useState('coworkers')
  const [menuOpen, setMenuOpen] = useState(false)
  const selectedNode = nodes.find((node) => node.id === activeNode)

  return (
    <div className="system-concept">
      <a className="skip-link" href="#system-content">Saltar al contenido</a>
      {menuOpen && <button className="system-backdrop" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" />}
      <aside className={`system-rail ${menuOpen ? 'is-open' : ''}`}>
        <a href="#inicio" className="system-rail__brand" onClick={() => setMenuOpen(false)}><Brand /></a>
        <div className="system-rail__status"><i /> SISTEMAS EN LÍNEA</div>
        <nav aria-label="Navegación principal">
          {navItems.map(([id, label], index) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}<b>↗</b></a>
          ))}
        </nav>
        <div className="system-rail__foot">
          <p>IA empresarial<br />hecha para operar.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">INICIAR PROYECTO <span>→</span></a>
          <small>MTY / MÉXICO / LATAM</small>
        </div>
      </aside>

      <header className="system-mobile-header">
        <a href="#inicio"><Brand /></a>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir navegación">{menuOpen ? 'CERRAR' : 'MENÚ +'}</button>
      </header>

      <main id="system-content" className="system-main">
        <section className="system-hero" id="inicio">
          <div className="system-hero__copy">
            <div className="system-kicker"><span>INFRAESTRUCTURA DE IA</span><span>EDICIÓN 2026</span></div>
            <h1>Tu empresa,<br /><em>en modo autónomo.</em></h1>
            <p>Diseñamos agentes, infraestructura y seguridad para que tu operación avance incluso cuando nadie está mirando la pantalla.</p>
            <div className="system-hero__actions">
              <a className="system-button system-button--dark" href="#soluciones">EXPLORAR EL SISTEMA <span>↓</span></a>
              <a className="system-text-link" href={whatsappUrl} target="_blank" rel="noreferrer">Hablemos de tu operación ↗</a>
            </div>
            <div className="system-hero__micro"><span>01 / DIAGNOSTICAR</span><span>02 / CONSTRUIR</span><span>03 / OPERAR</span></div>
          </div>

          <div className="system-network" aria-label="Mapa interactivo del ecosistema">
            <div className="system-network__top"><span>MAPA DEL ECOSISTEMA</span><span>SELECCIONA UN NODO</span></div>
            <div className="system-network__canvas">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M22 24 L46 52 L68 18 M22 24 L17 79 L46 52 L74 81 M17 79 L74 81" />
                <path className="system-network__pulse" d="M22 24 L46 52 L68 18" />
              </svg>
              {nodes.map((node) => (
                <button
                  key={node.id}
                  className={`system-node ${activeNode === node.id ? 'is-active' : ''}`}
                  style={{ left: node.x, top: node.y }}
                  onClick={() => setActiveNode(node.id)}
                  aria-pressed={activeNode === node.id}
                >
                  <i /><span>{node.label}</span>
                </button>
              ))}
              <div className="system-network__coordinates">25.6866° N<br />100.3161° W</div>
            </div>
            <div className="system-network__detail" aria-live="polite">
              <span>NODO / {selectedNode.label.toUpperCase()}</span>
              <p>{selectedNode.detail}</p>
            </div>
          </div>
        </section>

        <div className="system-tape" aria-hidden="true"><div>AGENTES QUE EJECUTAN <b>✳</b> INFRAESTRUCTURA QUE RESPONDE <b>✳</b> SEGURIDAD QUE RESISTE <b>✳</b> AGENTES QUE EJECUTAN <b>✳</b></div></div>

        <section className="system-solutions" id="soluciones">
          <header className="system-section-head">
            <div><span>02 / CAPACIDADES</span><span>SEIS MÓDULOS, UN ECOSISTEMA</span></div>
            <h2>No compras herramientas.<br /><em>Construyes capacidad.</em></h2>
            <p>Cada pieza resuelve un problema concreto. Juntas, forman una operación más inteligente.</p>
          </header>
          <div className="system-service-list">
            {services.map((service) => {
              const isOpen = openService === service.id
              return (
                <article className={`system-service ${isOpen ? 'is-open' : ''}`} key={service.id}>
                  <button onClick={() => setOpenService(isOpen ? '' : service.id)} aria-expanded={isOpen}>
                    <span>{service.number}</span><h3>{service.name}</h3><p>{service.short}</p><b>{isOpen ? '−' : '+'}</b>
                  </button>
                  <div className="system-service__drawer">
                    <div><p>{service.description}</p><ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="system-method" id="metodo">
          <div className="system-method__intro">
            <span>03 / MÉTODO</span>
            <h2>Primero entendemos.<br />Después conectamos.</h2>
            <p>Sin teatro de innovación. Un proceso visible, entregables claros y tecnología que tu equipo puede gobernar.</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">QUIERO UN DIAGNÓSTICO ↗</a>
          </div>
          <ol className="system-method__steps">
            <li><span>01</span><div><h3>Mapear</h3><p>Encontramos cuellos de botella, datos disponibles y oportunidades con retorno real.</p></div></li>
            <li><span>02</span><div><h3>Probar</h3><p>Un piloto acotado demuestra valor antes de invertir en una transformación mayor.</p></div></li>
            <li><span>03</span><div><h3>Integrar</h3><p>Conectamos agentes con tus sistemas, canales y reglas de operación.</p></div></li>
            <li><span>04</span><div><h3>Fortalecer</h3><p>Medimos, atacamos y mejoramos. La seguridad forma parte del diseño.</p></div></li>
          </ol>
        </section>

        <section className="system-proof">
          <span>PRUEBA DE ESTRÉS / KONECTIFY</span>
          <p>324 ataques controlados. Cero datos reales expuestos.</p>
          <div><strong>18</strong><span>hallazgos iniciales</span><b>→</b><strong>5</strong><span>residuales de bajo riesgo</span></div>
        </section>

        <section className="system-contact" id="contacto">
          <div className="system-contact__label"><i /> NUEVO PROYECTO</div>
          <h2>¿Qué debería<br /><em>trabajar solo?</em></h2>
          <p>Cuéntanos qué consume más horas de tu equipo. Te ayudamos a encontrar el primer sistema que vale la pena construir.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer"><span>AGENDAR DIAGNÓSTICO</span><b>↗</b></a>
          <footer><Brand /><span>INFRAESTRUCTURA / AGENTES / SEGURIDAD</span><span>© 2026 A&R</span></footer>
        </section>
      </main>
    </div>
  )
}
