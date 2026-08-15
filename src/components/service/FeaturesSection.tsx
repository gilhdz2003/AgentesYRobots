import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import type { ServiceFeature } from "../../types/catalog";

export function FeaturesSection({ features }: { features: ServiceFeature[] }) {
  return (
    <section className="py-32 px-6 bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-[2px] bg-brand-accent" />
          <span className="label-tech text-brand-accent">
            CAPACIDADES
          </span>
        </div>
        <h2 className="font-display text-4xl font-black tracking-tight text-white uppercase mb-16">
          Qué incluye
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl enterprise-border bg-slate-900/40 hover:bg-slate-900/60 hover:border-brand-accent/50 transition-all duration-300"
            >
              <CheckCircle2
                size={20}
                className="text-brand-accent mb-6"
              />
              <h3 className="text-white font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
