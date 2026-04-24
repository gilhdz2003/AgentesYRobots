import { motion } from "motion/react";
import { Cpu, MessageSquare, Phone, Shield, Map, GraduationCap, ArrowRight } from "lucide-react";

const solutions = [
  {
    id: 1,
    title: "BB One",
    subtitle: "Bot Box Hardware",
    description: "Hardware dedicado que ejecuta automatizaciones de IA de forma local y segura con latencia cero. Tu infraestructura privada de inteligencia artificial.",
    icon: <Cpu className="text-brand-accent" size={20} />,
    link: "Ver especificaciones"
  },
  {
    id: 2,
    title: "Coworkers Digitales",
    subtitle: "Agentes Edge & Internos",
    description: "Agentes inteligentes en WhatsApp y Telegram. Atención al cliente, operaciones internas y flujos de trabajo complejos con comprensión de contexto natural.",
    icon: <MessageSquare className="text-brand-accent" size={20} />,
    link: "Ver capacidades"
  },
  {
    id: 3,
    title: "Voice Coworkers",
    subtitle: "Agentes Telefónicos",
    description: "Atención telefónica automatizada indistinguible de un operador humano, con integración directa a tu CRM y bases de datos.",
    icon: <Phone className="text-brand-accent" size={20} />,
    link: "Escuchar demo"
  },
  {
    id: 4,
    title: "Agent Pentesting",
    subtitle: "Validación de Seguridad",
    description: "Auditorías rigurosas para asegurar que tus agentes de IA no sean vulnerables a inyecciones de prompts o filtración de datos sensibles.",
    icon: <Shield className="text-brand-accent" size={20} />,
    link: "Metodología"
  },
  {
    id: 5,
    title: "MapYourFlow",
    subtitle: "Mapeo de Procesos",
    description: "Plataforma para visualizar, simular y optimizar las interacciones y decisiones de tus agentes automatizados con scoring de automatización.",
    icon: <Map className="text-brand-accent" size={20} />,
    link: "Probar plataforma"
  },
  {
    id: 6,
    title: "AI Training",
    subtitle: "Capacitación Empresarial",
    description: "Capacitación especializada para equipos. Enseñamos a integrar y colaborar eficientemente con herramientas de IA para elevar la productividad.",
    icon: <GraduationCap className="text-brand-accent" size={20} />,
    link: "Ver programas"
  }
];

export default function Solutions() {
  return (
    <section className="py-32 px-6 bg-slate-900/20" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-5xl font-black tracking-tight text-white uppercase mb-6">
              Arquitectura<br />de Soluciones
            </h2>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Ecosistema completo de herramientas impulsadas por IA para optimizar cada faceta de tu negocio.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 enterprise-border rounded-md text-[12px] font-bold tracking-wider text-gray-500">
              6 MÓDULOS
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl enterprise-border bg-slate-900/40 hover:bg-slate-900/60 hover:border-brand-accent/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] font-black tracking-[0.2em] text-brand-accent uppercase mb-6 opacity-60">
                {item.subtitle}
              </p>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                {item.description}
              </p>

              {item.link && (
                <a href="#" className="inline-flex items-center gap-3 text-[12px] font-bold text-white hover:text-brand-accent transition-colors">
                  {item.link.toUpperCase()}
                  <ArrowRight size={16} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
