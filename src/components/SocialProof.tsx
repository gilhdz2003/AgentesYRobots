import { motion } from "motion/react";
import { Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    quote:
      "Implementaron un sistema de citas para inspectores que redujo 60% el tiempo de coordinación. Ahora los ajustadores agendan desde su celular sin llamadas.",
    name: "GMB Ajustes",
    role: "Gestión de Siniestros",
    metric: "60% menos tiempo en coordinación",
  },
  {
    quote:
      "Extrajeron 29,000 registros de asistencia de 2 años en un dispositivo ZKTeco. Generaron 3 herramientas portables que cualquier cliente puede usar sin instalar nada.",
    name: "Konectify",
    role: "Servicio de Asistencia",
    metric: "29,062 registros procesados",
  },
  {
    quote:
      "Dashboard con monitoreo en tiempo real para 7 bots RPA de producción. De reportes manuales en Excel a visibilidad total con 0 intervención humana.",
    name: "GMB Operaciones",
    role: "Automatización de Procesos",
    metric: "7 bots monitoreados 24/7",
  },
];

export default function SocialProof() {
  return (
    <section className="py-32 px-6 bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="label-tech text-brand-accent">
              Resultados // 03
            </span>
          </div>
          <h2 className="font-display text-5xl font-black tracking-tight text-white uppercase mb-6">
            Proyectos<br />en producción
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-8 rounded-2xl enterprise-border bg-slate-900/40 flex flex-col"
            >
              <Quote className="text-brand-accent/30 mb-6" size={32} />

              <blockquote className="text-gray-300 text-sm leading-relaxed font-medium mb-8 flex-grow">
                "{t.quote}"
              </blockquote>

              <div className="pt-6 border-t border-white/5">
                <div className="font-bold text-white text-sm mb-1">
                  {t.name}
                </div>
                <div className="text-gray-500 text-xs mb-3">{t.role}</div>
                <div className="text-brand-accent text-xs font-bold tracking-wider">
                  {t.metric}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/casos"
            className="inline-flex items-center gap-3 text-[12px] font-bold text-white hover:text-brand-accent transition-colors"
          >
            VER CASOS DE ESTUDIO COMPLETOS
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
