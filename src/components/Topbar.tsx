import { Link } from "react-router-dom";
import { waLink } from "../data/contact";

/**
 * Topbar Lab: barra superior delgada, sin menú.
 * La navegación vive en el Dock inferior (rasgo firma del concepto Lab).
 */
export default function Topbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-ink hairline-b">
      <div className="flex items-center justify-between gap-7 min-h-20 px-4 min-[760px]:px-7">
        <Link
          to="/"
          className="flex items-center gap-3 py-3"
          aria-label="Agentes&Robots — inicio"
        >
          <img
            src="/logo-ar.png"
            alt="Logotipo de Agentes&Robots"
            width={46}
            height={46}
            className="h-[46px] w-[46px] object-contain"
          />
          <span className="font-serif text-xl tracking-[0.01em] text-paper">
            AGENTES<span className="text-muted font-normal">&</span>ROBOTS
          </span>
        </Link>

        <div className="hidden min-[1120px]:flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.05em] text-muted">
          <span
            aria-hidden="true"
            className="h-2 w-2 bg-yellow animate-lab-blink"
          />
          LABORATORIO DE IA APLICADA <b className="text-line font-normal">/</b>{" "}
          MTY, MX
        </div>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-[760px]:inline-block pb-1 font-mono text-[9px] font-medium uppercase tracking-[0.05em] text-yellow border-b border-current"
        >
          HABLAR CON UN INGENIERO ↗
        </a>
      </div>
    </header>
  );
}
