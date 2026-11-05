const options = [
  { id: 'sistema', number: '01', name: 'Sistema vivo' },
  { id: 'firma', number: '02', name: 'Firma consultiva' },
  { id: 'lab', number: '03', name: 'Laboratorio' },
]

export default function PrototypeSwitcher({ current }) {
  return (
    <nav className="prototype-switcher" aria-label="Cambiar prototipo">
      <a href="/" className="prototype-switcher__home" aria-label="Volver al índice">A&R / LAB</a>
      <span className="prototype-switcher__divider" />
      {options.map((option) => (
        <a
          key={option.id}
          href={`?v=${option.id}`}
          className={current === option.id ? 'is-active' : ''}
          aria-current={current === option.id ? 'page' : undefined}
          title={option.name}
        >
          {option.number}
        </a>
      ))}
    </nav>
  )
}
