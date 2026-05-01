import { motion } from "motion/react";
import { Search, Zap, Wrench, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Auditoría completa de tus procesos actuales. Mapeamos flujos, identificamos cuellos de botella y cuantificamos el ROI potencial de la automatización.",
    icon: <Search className="text-brand-accent" size={20} />,
  },
  {
    number: "02",
    title: "Estrategia",
    description:
      "Diseñamos la arquitectura de la solución. Seleccionamos modelos de IA, herramientas y definimos hitos con métricas claras de éxito.",
    icon: <Zap className="text-brand-accent" size={20} />,
  },
  {
    number: "03",
    title: "Implementación",
    description:
      "Desplegamos la infraestructura en tu entorno. Configuración, integración con sistemas existentes, pruebas rigurosas y puesta en producción.",
    icon: <Wrench className="text-brand-accent" size={20} />,
  },
  {
    number: "04",
    title: "Monitoreo",
    description:
      "Seguimiento de performance, ajustes de modelo y optimización continua. Tu infraestructura de IA mejora con el tiempo, no se degrada.",
    icon: <BarChart3 className="text-brand-accent" size={20} />,
  },
];

export default function Process() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="label-tech text-brand-accent">
              Proceso // 02
            </span>
          </div>
          <h2 className="font-display text-5xl font-black tracking-tight text-white uppercase mb-6">
            De diagnóstico<br />a producción
          </h2>
          <p className="text-gray-400 text-lg font-medium leading-relaxed">
            Metodología probada para transformar operaciones manuales en
            sistemas inteligentes. Resultados medibles desde la primera semana.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative p-8 rounded-2xl enterprise-border bg-slate-900/40 group hover:border-brand-accent/50 transition-all duration-300"
            >
              <div className="mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
              </div>

              <span className="text-[64px] font-black leading-none text-brand-accent/10 absolute top-4 right-6">
                {step.number}
              </span>

              <h3 className="text-xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
