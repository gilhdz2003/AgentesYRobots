import { Link, NavLink } from "react-router-dom";

/**
 * Dock inferior — navegación principal del sitio (rasgo firma del concepto Lab).
 * Desktop: flotante centrado abajo. Móvil: full-width anclado, muestra solo
 * INICIO / CAPACIDADES / CTA.
 *
 * Las entradas con hash (anclas del home) usan Link plano: NavLink marcaría
 * "activo" todo lo que resuelva a "/" y tendríamos tres items encendidos.
 */
const routeEntries = [
  { num: "00", label: "INICIO", to: "/", end: true, mobile: true },
  { num: "03", label: "NOSOTROS", to: "/nosotros", mobile: false },
  { num: "04", label: "CASOS", to: "/casos", mobile: false },
];

const anchorEntries = [
  { num: "01", label: "CAPACIDADES", to: "/#capacidades", mobile: true },
  { num: "02", label: "PRUEBAS", to: "/#pruebas", mobile: false },
];

function itemClasses(isActive: boolean, mobile: boolean): string {
  return [
    "group flex flex-col justify-center gap-1 flex-1 min-[760px]:min-w-[115px] px-2 py-3 min-[760px]:px-4",
    "font-mono text-[10px] font-semibold uppercase tracking-[0.05em] text-center",
    "border-r border-line transition-colors duration-[180ms] hover:bg-paper hover:text-ink",
    mobile ? "" : "hidden min-[760px]:flex",
    isActive ? "text-yellow" : "text-paper",
  ].join(" ");
}

export default function Dock() {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed z-[1000] bottom-2.5 left-2.5 right-2.5 flex items-stretch bg-ink border border-line hard-shadow-yellow min-[760px]:left-1/2 min-[760px]:right-auto min-[760px]:bottom-3.5 min-[760px]:-translate-x-1/2"
    >
      {/* 00 INICIO */}
      <NavLink to="/" end className={({ isActive }) => itemClasses(isActive, true)}>
        {({ isActive }) => (
          <>
            <span className={`text-[8px] group-hover:text-ink ${isActive ? "text-yellow" : "text-muted"}`}>00</span>
            INICIO
          </>
        )}
      </NavLink>

      {/* 01 CAPACIDADES · 02 PRUEBAS (anclas del home, en orden) */}
      {anchorEntries.map(({ num, label, to, mobile }) => (
        <Link key={num} to={to} className={itemClasses(false, mobile)}>
          <span className="text-[8px] text-muted group-hover:text-ink">{num}</span>
          {label}
        </Link>
      ))}

      {/* 03 NOSOTROS · 04 CASOS */}
      {routeEntries.slice(1).map(({ num, label, to, mobile }) => (
        <NavLink
          key={num}
          to={to}
          className={({ isActive }) => itemClasses(isActive, mobile)}
        >
          {({ isActive }) => (
            <>
              <span className={`text-[8px] group-hover:text-ink ${isActive ? "text-yellow" : "text-muted"}`}>{num}</span>
              {label}
            </>
          )}
        </NavLink>
      ))}

      <NavLink
        to="/contacto"
        className={({ isActive }) =>
          `flex items-center justify-center flex-1 min-[760px]:min-w-[140px] px-2 py-3 min-[760px]:px-4 bg-yellow font-mono text-[10px] font-semibold uppercase tracking-[0.05em] transition-colors duration-[180ms] ${
            isActive ? "text-ink outline outline-2 outline-offset-[-2px] outline-ink" : "text-ink"
          }`
        }
      >
        CONTACTO ↗
      </NavLink>
    </nav>
  );
}
