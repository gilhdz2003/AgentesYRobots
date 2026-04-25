import { motion } from "motion/react";

const stats = [
  { value: "6", label: "Productos desplegados", unit: "" },
  { value: "29K", label: "Registros procesados", unit: "+" },
  { value: "7", label: "Bots RPA monitoreados", unit: "" },
  { value: "60", label: "Reducción en tiempo operativo", unit: "%" },
];

export default function Stats() {
  return (
    <section className="py-24 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-5xl md:text-6xl font-black text-white mb-3">
                {stat.value}
                <span className="text-brand-accent">{stat.unit}</span>
              </div>
              <div className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
