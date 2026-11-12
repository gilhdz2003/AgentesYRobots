import { Link } from "react-router-dom";

/**
 * Footer Lab: hairline superior, microcopy de telemetría y mapa de sitio
 * completo (internal linking / SEO). El dock inferior es la navegación
 * principal; el footer es el índice exhaustivo.
 */
const capabilities = [
  { label: "BB One Hardware", to: "/servicios/bb-one" },
  { label: "Coworkers Digitales", to: "/servicios/coworkers-digitales" },
  { label: "Security Testing", to: "/servicios/security-testing" },
  { label: "MapYourFlow.app", to: "/servicios/mapyourflow" },
  { label: "Agent Visibility", to: "/servicios/agent-visibility" },
  { label: "AI Training", to: "/servicios/ai-training" },
];

const company = [
  { label: "Nosotros", to: "/nosotros" },
  { label: "Casos de estudio", to: "/casos" },
  { label: "Contacto", to: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="hairline-t bg-ink px-4 py-14 min-[760px]:px-7 min-[760px]:py-16">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3" aria-label="Agentes&Robots — inicio">
            <img
              src="/logo-ar.png"
              alt="Logotipo de Agentes&Robots"
              width={42}
              height={42}
              className="h-[42px] w-[42px] object-contain"
            />
            <span className="font-serif text-lg text-paper">
              AGENTES<span className="text-muted font-normal">&</span>ROBOTS
            </span>
          </Link>
          <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-muted">
            Ingeniería de IA para la automatización empresarial.
            Infraestructura inteligente para la era de los agentes autónomos.
          </p>
          <div className="mt-8 flex gap-6 font-mono text-[9px] font-medium uppercase tracking-[0.05em]">
            <a
              href="https://linkedin.com/company/agentesyrobots"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-yellow"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/agentesyrobots"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-yellow"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <nav aria-label="Capacidades">
          <h4 className="label-telemetry mb-7 text-muted">[ Capacidades ]</h4>
          <ul className="space-y-3.5">
            {capabilities.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm font-medium text-paper/70 transition-colors hover:text-yellow"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Empresa">
          <h4 className="label-telemetry mb-7 text-muted">[ Empresa ]</h4>
          <ul className="space-y-3.5">
            {company.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm font-medium text-paper/70 transition-colors hover:text-yellow"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-line pt-7 font-mono text-[8px] uppercase tracking-[0.05em] text-muted flex flex-wrap items-center justify-between gap-4">
        <span>Agentes&Robots © 2026</span>
        <span>HECHO PARA OPERAR, NO PARA IMPRESIONAR.</span>
      </div>
    </footer>
  );
}
