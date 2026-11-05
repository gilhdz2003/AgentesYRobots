export default function Brand({ className = '', compact = false }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <img src="/logo-ar.png" alt="Logotipo Agentes&Robots" width="750" height="744" />
      {!compact && (
        <span className="brand-lockup__name">
          <strong>AGENTES</strong><span>&</span><strong>ROBOTS</strong>
        </span>
      )}
    </span>
  )
}
