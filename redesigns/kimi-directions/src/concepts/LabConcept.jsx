import { useState } from 'react'
import Brand from '../components/Brand.jsx'
import { services, whatsappUrl } from '../data.js'

export default function LabConcept() {
  const [activeService, setActiveService] = useState(services[1])
  const [mode, setMode] = useState('ATENDER')

  const modes = {
    ATENDER: ['CONSULTA ENTRANTE', 'AGENTE DE VOZ + CHAT', 'CLIENTE RESUELTO'],
    OPERAR: ['PROCESO REPETITIVO', 'AGENT WORKFLOW', 'TAREA COMPLETADA'],
    PROTEGER: ['AGENTE EN PRODUCCIÓN', 'PRUEBA DE ADVERSARIO', 'RIESGO REDUCIDO'],
  }

  return (
    <div className="lab-concept">
      <a className="skip-link" href="#lab-content">Saltar al contenido</a>
      <header className="lab-topbar">
        <a href="#inicio"><Brand /></a>
        <div><span className="lab-live-dot" /> LABORATORIO DE IA APLICADA <b>/</b> MTY, MX</div>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">HABLAR CON UN INGENIERO ↗</a>
      </header>

      <main id="lab-content">
        <section className="lab-hero" id="inicio">
          <div className="lab-hero__registration" aria-hidden="true">+<br />+<br />+</div>
          <div className="lab-hero__heading">
            <span className="lab-code">A&R / SISTEMAS AUTÓNOMOS / 2026</span>
            <h1>MENOS<br />PROMESAS.<br /><em>MÁS AGENTES</em><br />TRABAJANDO.</h1>
          </div>
          <div className="lab-hero__side">
            <div className="lab-crosshair" aria-hidden="true"><span>IA</span><i /><i /></div>
            <p>Diseñamos infraestructura, agentes y seguridad para empresas que quieren ver trabajo terminado.</p>
            <a href="#capacidades">VER CAPACIDADES <span>↓</span></a>
          </div>
          <div className="lab-hero__foot"><span>NO VENDEMOS HUMO</span><span>CONSTRUIMOS / PROBAMOS / DESPLEGAMOS</span><span>SCROLL PARA EXPLORAR ↓</span></div>
        </section>

        <section className="lab-machine" aria-label="Simulador de agente">
          <div className="lab-machine__controls">
            <span>SELECCIONA UNA MISIÓN:</span>
            <div>{Object.keys(modes).map((item) => <button key={item} className={mode === item ? 'is-active' : ''} onClick={() => setMode(item)}>{item}</button>)}</div>
          </div>
          <div className="lab-machine__flow" aria-live="polite">
            {modes[mode].map((step, index) => (
              <div key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < 2 && <b>→</b>}</div>
            ))}
          </div>
          <div className="lab-machine__status"><span><i /> SISTEMA LISTO</span><span>LATENCIA: LA JUSTA</span><span>MISIÓN: {mode}</span></div>
        </section>

        <section className="lab-capabilities" id="capacidades">
          <header><span>[ CATÁLOGO DE CAPACIDADES ]</span><h2>ELIGE TU<br />SIGUIENTE<br /><em>VENTAJA.</em></h2><p>Seis formas de convertir IA en infraestructura de negocio.</p></header>
          <div className="lab-catalog">
            <div className="lab-catalog__rows" role="tablist" aria-label="Capacidades">
              {services.map((service) => (
                <button key={service.id} role="tab" aria-selected={activeService.id === service.id} onClick={() => setActiveService(service)}>
                  <span>{service.number}</span><strong>{service.name}</strong><small>{service.short}</small><b>↗</b>
                </button>
              ))}
            </div>
            <div className="lab-catalog__detail" role="tabpanel">
              <span>CAPACIDAD / {activeService.number}</span>
              <h3>{activeService.name}</h3>
              <p>{activeService.description}</p>
              <ul>{activeService.tags.map((tag) => <li key={tag}>[{tag}]</li>)}</ul>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">COTIZAR ESTA CAPACIDAD ↗</a>
              <div className="lab-catalog__barcode" aria-hidden="true">|||| || | |||| | | ||| || ||||</div>
            </div>
          </div>
        </section>

        <section className="lab-proof" id="pruebas">
          <div className="lab-proof__label">EXPERIMENTO: KONECTIFY<br />TIPO: AGENT SECURITY<br />RESULTADO: VERIFICADO ✓</div>
          <h2>NO DIGAS QUE<br />ES SEGURO.<br /><em>PRUÉBALO.</em></h2>
          <div className="lab-proof__copy"><p>324 ataques en cuatro campañas. 18 hallazgos reducidos a 5 residuales de bajo riesgo. Cero datos reales expuestos.</p><a href={whatsappUrl} target="_blank" rel="noreferrer">QUIERO ATACAR MI AGENTE ↗</a></div>
          <div className="lab-proof__tally" aria-hidden="true"><span>324</span><small>INTENTOS<br />CONTROLADOS</small></div>
        </section>

        <section className="lab-principles" id="principios">
          <article><span>01</span><h3>EMPEZAR<br />POR EL PROCESO.</h3><p>La tecnología se elige después de entender el trabajo.</p></article>
          <article><span>02</span><h3>PILOTO ANTES<br />QUE DISCURSO.</h3><p>Una prueba pequeña vale más que cincuenta slides.</p></article>
          <article><span>03</span><h3>SEGURIDAD<br />DESDE EL DÍA 0.</h3><p>Los límites y ataques forman parte del diseño.</p></article>
          <article><span>04</span><h3>TU EQUIPO<br />CONSERVA CONTROL.</h3><p>Construimos capacidad, no dependencia innecesaria.</p></article>
        </section>

        <section className="lab-contact" id="contacto">
          <span className="lab-code">ABIERTO PARA NUEVOS PROYECTOS / 2026</span>
          <h2>PONLE UN<br />TRABAJO A <em>LA IA.</em></h2>
          <div><p>Trae un proceso pesado, una atención saturada o un agente que necesita pruebas. Nosotros llevamos el laboratorio.</p><a href={whatsappUrl} target="_blank" rel="noreferrer">INICIAR UN PROYECTO <b>↗</b></a></div>
        </section>
      </main>

      <footer className="lab-footer"><Brand /><span>AGENTES&ROBOTS © 2026</span><span>HECHO PARA OPERAR, NO PARA IMPRESIONAR.</span></footer>

      <nav className="lab-dock" aria-label="Navegación principal">
        <a href="#inicio"><span>00</span>INICIO</a>
        <a href="#capacidades"><span>01</span>CAPACIDADES</a>
        <a href="#pruebas"><span>02</span>PRUEBAS</a>
        <a href="#principios"><span>03</span>PRINCIPIOS</a>
        <a href="#contacto" className="lab-dock__cta">CONTACTO ↗</a>
      </nav>
    </div>
  )
}
