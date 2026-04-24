import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/10 blur-[150px] -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="label-tech text-brand-accent">
              Infraestructura de IA // 01
            </span>
          </motion.div>

          <h1 className="font-serif text-7xl lg:text-9xl italic tracking-tighter leading-none mb-10 text-white">
            Inteligencia<br />
            Operativa
          </h1>

          <p className="max-w-lg text-lg text-gray-400 font-medium leading-relaxed mb-12">
            Desplegamos infraestructuras de IA que actúan como la columna vertebral de empresas modernas. Automatización real para problemas complejos.
          </p>

          <div className="flex flex-wrap gap-5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="px-8 py-4 bg-brand-accent text-brand-bg font-bold tracking-wide rounded-md"
            >
              EXPLORAR SOLUCIONES
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold tracking-wide rounded-md hover:bg-white/10 transition-colors"
            >
              SOLICITAR DEMO
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="enterprise-border p-4 bg-slate-900/40 backdrop-blur-2xl rounded-2xl">
            <div className="aspect-square relative overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="AI Team Meeting"
                className="w-full h-full object-cover brightness-75 contrast-110 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 px-6 py-4 glass-premium rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[12px] font-bold tracking-wider uppercase">Live Ops Terminal</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
