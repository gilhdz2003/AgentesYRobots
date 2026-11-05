import { useState } from 'react'
import Brand from '../components/Brand.jsx'
import { services, whatsappUrl } from '../data.js'

const stages = [
  ['01', 'Entender', 'El proceso antes que la herramienta.'],
  ['02', 'Diseñar', 'Una solución que cabe en tu operación.'],
  ['03', 'Activar', 'Un piloto útil, medible y gobernado.'],
  ['04', 'Acompañar', 'Adopción, seguridad y mejora continua.'],
]

export default function FirmConcept() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeStage, setActiveStage] = useState(0)

  return (
    <div className="firm-concept">
      <a className="skip-link" href="#firm-content">Saltar al contenido</a>
      <header className="firm-header">
        <a href="#inicio" className="firm-header__brand"><Brand /></a>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="Navegación principal">
          <a href="#soluciones" onClick={() => setMenuOpen(false)}>Soluciones</a>
          <a href="#caso" onClick={() => setMenuOpen(false)}>Caso real</a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>Cómo trabajamos</a>
          <a href="#nosotros" onClick={() => setMenuOpen(false)}>La firma</a>
        </nav>
        <a className="firm-header__cta" href={whatsappUrl} target="_blank" rel="noreferrer">Conversemos <span>↗</span></a>
        <button className="firm-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>{menuOpen ? 'Cerrar' : 'Menú'}</button>
      </header>

      <main id="firm-content">
        <section className="firm-hero" id="inicio">
          <div className="firm-hero__title">
            <p className="firm-eyebrow"><span /> Inteligencia aplicada. Criterio humano.</p>
            <h1>La IA no necesita<br />más ruido.<br /><em>Necesita un oficio.</em></h1>
          </div>
          <div className="firm-hero__aside">
            <p>Convertimos procesos complicados en sistemas de IA útiles, seguros y medibles. Para empresas que quieren resultados, no otra promesa.</p>
            <a href="#soluciones">Descubrir qué podemos construir <span>↓</span></a>
          </div>
          <div className="firm-hero__signature" aria-hidden="true">A&R</div>
          <div className="firm-hero__note">DISEÑAMOS LO QUE<br />TU EMPRESA NECESITA.<br />NADA MÁS. NADA MENOS.</div>
        </section>

        <section className="firm-belief">
          <p>Una buena implementación no empieza con “¿qué modelo usamos?”</p>
          <h2>Empieza con una pregunta<br />mucho más útil: <em>¿qué trabajo<br />quieres transformar?</em></h2>
          <span className="firm-belief__stamp">TECNOLOGÍA<br />CON PROPÓSITO</span>
        </section>

        <section className="firm-services" id="soluciones">
          <header>
            <p className="firm-eyebrow"><span /> Nuestras capacidades</p>
            <h2>De la primera idea<br />a la operación diaria.</h2>
            <p>Seis prácticas que trabajan mejor juntas. Entra por donde esté tu necesidad hoy.</p>
          </header>
          <div className="firm-services__list">
            {services.map((service) => (
              <article key={service.id}>
                <span className="firm-service__number">{service.number}</span>
                <div><h3>{service.name}</h3><p>{service.description}</p></div>
                <span className="firm-service__short">{service.short}</span>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`Consultar sobre ${service.name}`}>↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="firm-case" id="caso">
          <div className="firm-case__top"><span>UN CASO REAL</span><span>KONECTIFY / AGENT SECURITY</span></div>
          <div className="firm-case__story">
            <h2>Atacamos a nuestro<br />propio agente.<br /><em>324 veces.</em></h2>
            <div>
              <p>Porque la confianza no se declara, se prueba. Sometimos un agente en producción a campañas reales de prompt injection, extracción y evasión.</p>
              <p>El resultado: de 18 hallazgos iniciales a 5 residuales de bajo riesgo, sin exposición de datos reales.</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">Quiero poner mi agente a prueba ↗</a>
            </div>
          </div>
          <div className="firm-case__result"><span>ANTES</span><strong>18</strong><i>→</i><strong>5</strong><span>DESPUÉS</span><p>Hallazgos de seguridad tras el ciclo de remediación.</p></div>
        </section>

        <section className="firm-method" id="metodo">
          <header><p className="firm-eyebrow"><span /> Cómo trabajamos</p><h2>Claridad en<br />cada etapa.</h2></header>
          <div className="firm-method__workspace">
            <div className="firm-method__tabs" role="tablist" aria-label="Etapas del proyecto">
              {stages.map(([number, title], index) => (
                <button key={number} role="tab" aria-selected={activeStage === index} onClick={() => setActiveStage(index)}><span>{number}</span>{title}</button>
              ))}
            </div>
            <div className="firm-method__panel" role="tabpanel">
              <span>{stages[activeStage][0]} / 04</span>
              <h3>{stages[activeStage][1]}</h3>
              <p>{stages[activeStage][2]}</p>
              <div className="firm-method__sketch" aria-hidden="true"><i /><i /><i /><b>✓</b></div>
            </div>
          </div>
        </section>

        <section className="firm-about" id="nosotros">
          <p className="firm-eyebrow"><span /> Agentes&Robots</p>
          <blockquote>“El ingeniero senior que te dice la verdad: esto es lo que necesitas, esto es lo que no.”</blockquote>
          <div><p>Somos una firma de infraestructura de IA y automatización empresarial. Combinamos criterio de negocio, ingeniería y seguridad para construir sistemas que sí entran a producción.</p><span>MONTERREY, MÉXICO<br />PROYECTOS EN LATAM</span></div>
        </section>

        <section className="firm-contact" id="contacto">
          <span>EL PRIMER PASO ES UNA BUENA CONVERSACIÓN.</span>
          <h2>Empecemos por<br />tu cuello de botella.</h2>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Agendar una conversación <b>↗</b></a>
        </section>
      </main>
      <footer className="firm-footer"><Brand /><div><a href="#soluciones">Soluciones</a><a href="#caso">Casos</a><a href="#nosotros">Nosotros</a></div><span>© 2026 AGENTES&ROBOTS</span></footer>
    </div>
  )
}
