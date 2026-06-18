import { motion } from "motion/react";
import AnimatedCounter from "./ui/AnimatedCounter";
import { scaleIn, staggerContainer, sectionTransition } from "../utils/animations";

const stats = [
  { value: 6, label: "Productos desplegados", suffix: "" },
  { value: 29, label: "Registros procesados", suffix: "", formatValue: (v: number) => `${Math.round(v)}K+` },
  { value: 7, label: "Bots RPA monitoreados", suffix: "" },
  { value: 60, label: "Reducción en tiempo operativo", suffix: "%" },
];

export default function Stats() {
  return (
    <section className="py-24 px-6">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={sectionTransition}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="text-center"
            >
              <div className="font-display text-5xl md:text-6xl font-black text-white mb-3">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  formatValue={stat.formatValue}
                  duration={2}
                  delay={0.2}
                />
              </div>
              <div className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
