import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/services";

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
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl enterprise-border bg-slate-900/40 hover:bg-slate-900/60 hover:border-brand-accent/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Icon className="text-brand-accent" size={20} />
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] font-black tracking-[0.2em] text-brand-accent uppercase mb-6 opacity-60">
                  {item.subtitle}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                  {item.shortDescription}
                </p>

                <Link
                  to={`/servicios/${item.slug}`}
                  className="inline-flex items-center gap-3 text-[12px] font-bold text-white hover:text-brand-accent transition-colors"
                >
                  VER MÁS
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
