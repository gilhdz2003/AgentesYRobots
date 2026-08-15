import { motion } from "motion/react";
import type { ServiceUseCase } from "../../types/catalog";

export function UseCaseSection({ useCase }: { useCase: ServiceUseCase }) {
  return (
    <section className="py-32 px-6 bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-[2px] bg-brand-accent" />
          <span className="label-tech text-brand-accent">
            CASO DE USO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-4xl font-black tracking-tight text-white uppercase mb-6">
              {useCase.title}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {useCase.description}
            </p>
          </div>

          <div className="space-y-4">
            {useCase.metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-6 rounded-xl enterprise-border bg-slate-900/40"
              >
                <p className="text-white font-bold text-lg">
                  {metric}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
