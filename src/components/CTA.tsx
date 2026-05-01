import { motion } from "motion/react";

export default function CTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-brand-amber to-amber-600 p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-brand-amber/20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,black_40%)] opacity-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="font-serif text-5xl md:text-7xl italic tracking-tighter mb-10 leading-[0.9] text-brand-bg">
            Transforma tu<br />
            empresa hoy
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-brand-bg/80 font-bold mb-12 leading-relaxed">
            La adopción temprana de IA define a los líderes del mañana. Agenda un diagnóstico técnico de tus sistemas actuales.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-10 py-5 bg-brand-bg text-white font-black text-[14px] rounded-xl shadow-2xl"
            >
              INICIAR DIAGNÓSTICO
            </motion.button>
            <motion.button
              className="px-10 py-5 bg-transparent border-2 border-brand-bg/20 text-brand-bg font-black text-[14px] rounded-xl hover:bg-brand-bg/10 transition-colors"
            >
              CONTACTAR VENTAS
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
