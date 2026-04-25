import { Link } from "react-router-dom";

const services = [
  { label: "BB One Hardware", to: "/servicios/bb-one" },
  { label: "Coworkers Digitales", to: "/servicios/coworkers-digitales" },
  { label: "Voice Coworkers", to: "/servicios/voice-coworkers" },
  { label: "Agent Pentesting", to: "/servicios/agent-pentesting" },
  { label: "MapYourFlow.app", to: "/servicios/mapyourflow" },
  { label: "AI Training", to: "/servicios/ai-training" },
];

const support = [
  { label: "Nosotros", to: "/nosotros" },
  { label: "Casos de Estudio", to: "/casos" },
  { label: "Contacto", to: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-brand-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="inline-block mb-8">
            <div className="font-display text-2xl font-black text-white tracking-tighter">
              AGENTES<span className="text-brand-accent">&</span>ROBOTS
            </div>
          </Link>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm mb-10">
            Ingeniería de IA para la automatización empresarial. Infraestructura inteligente para la era de los agentes autónomos.
          </p>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/company/agentesyrobots"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-brand-accent transition-colors cursor-pointer"
            >
              in
            </a>
            <a
              href="https://github.com/agentesyrobots"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-brand-accent transition-colors cursor-pointer"
            >
              gh
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em] mb-8">Servicios</h4>
          <ul className="space-y-4">
            {services.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm font-medium text-gray-500 hover:text-brand-accent transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em] mb-8">Empresa</h4>
          <ul className="space-y-4">
            {support.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm font-medium text-gray-500 hover:text-brand-accent transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 text-[11px] font-bold tracking-widest text-gray-600 uppercase">
        © 2026 Agentes&Robots. Todos los derechos reservados.
      </div>
    </footer>
  );
}
