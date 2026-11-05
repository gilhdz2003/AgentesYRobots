import Brand from './components/Brand.jsx'

const directions = [
  {
    id: 'sistema', number: '01', title: 'Sistema vivo',
    subtitle: 'Operación conectada',
    description: 'Navegación lateral, una red operativa interactiva y un catálogo que se despliega como arquitectura, no como escaparate.',
    tags: ['Unbounded + Chivo', 'Verde señal', 'Sidebar'],
  },
  {
    id: 'firma', number: '02', title: 'Firma consultiva',
    subtitle: 'Criterio antes que ruido',
    description: 'Una composición cálida y precisa. Menos promesas tecnológicas, más confianza, método y evidencia de resultados.',
    tags: ['Zilla Slab + Atkinson', 'Vino + durazno', 'Menú superior'],
  },
  {
    id: 'lab', number: '03', title: 'Laboratorio',
    subtitle: 'IA con trabajo que hacer',
    description: 'Tipografía condensada, retícula visible y navegación tipo dock. Una dirección enérgica para una marca que construye y prueba.',
    tags: ['Barlow Condensed + Karla', 'Amarillo + tinta', 'Dock inferior'],
  },
]

export default function DirectionsIndex() {
  return (
    <main className="directions-index">
      <header className="directions-index__header">
        <a href="/" aria-label="Agentes y Robots, inicio"><Brand /></a>
        <span>EXPERIMENTO / KIMI K3.1 PRO</span>
      </header>
      <section className="directions-index__intro">
        <p className="directions-index__eyebrow">Tres direcciones. Una sola marca.</p>
        <h1>¿Cómo debería<br />sentirse <em>A&R?</em></h1>
        <p>El mismo portafolio, tres personalidades visuales. Explora cada prototipo, prueba sus menús y compara qué historia cuenta mejor.</p>
      </section>
      <section className="directions-list" aria-label="Direcciones de diseño">
        {directions.map((item) => (
          <a className={`direction-card direction-card--${item.id}`} href={`?v=${item.id}`} key={item.id}>
            <div className="direction-card__number">{item.number}</div>
            <div className="direction-card__preview" aria-hidden="true">
              <span className="preview-line" /><span className="preview-block" /><span className="preview-dot" />
            </div>
            <div className="direction-card__copy">
              <span>{item.subtitle}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
            <span className="direction-card__action">ABRIR PROTOTIPO <b>↗</b></span>
          </a>
        ))}
      </section>
      <footer className="directions-index__footer">
        <span>PROTOTIPOS NAVEGABLES / NO CONECTADOS AL PORTAL ACTUAL</span>
        <span>LOGOTIPO ORIGINAL PRESERVADO</span>
      </footer>
    </main>
  )
}
