import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Target, Users } from "lucide-react";
import SEO, { breadcrumbSchema } from "../components/SEO";

const values = [
  {
    icon: Zap,
    title: "Velocidad sobre perfección",
    description:
      "Preferimos desplegar rápido e iterar. Un sistema funcionando vale más que una presentación perfecta.",
  },
  {
    icon: Shield,
    title: "Seguridad por defecto",
    description:
      "Cada agente que desplegamos pasa por pruebas de seguridad. No lanzamos nada que no hayamos auditado nosotros mismos.",
  },
  {
    icon: Target,
    title: "Resultados medibles",
    description:
      "Si no se puede medir, no se puede mejorar. Cada proyecto incluye métricas claras de impacto desde el día uno.",
  },
  {
    icon: Users,
    title: "Operación, no consultoría",
    description:
      "No entregamos PDFs. Desplegamos sistemas que funcionan 24/7 sin intervención humana y los monitoreamos continuamente.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Primera automatización en producción",
    description:
      "7 bots RPA operando en GMB para despacho de ajustes de siniestros. Desde entonces: 29,000+ registros procesados.",
  },
  {
    year: "2025",
    title: "Expansión a productos propios",
    description:
      "Lanzamiento de MapYourFlow.app (SaaS de mapeo de procesos) y BB One (hardware de IA local). Primeros clientes B2B.",
  },
  {
    year: "2026",
    title: "Agentes&Robots como marca",
    description:
      "Portal B2B, servicios de Voice Coworkers, Agent Pentesting y AI Training. Infraestructura completa de IA empresarial.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="Nosotros"
        description="Agentes&Robots: infraestructura de IA empresarial. Diseñamos, desplegamos y operamos soluciones de automatización con inteligencia artificial."
        canonical="/nosotros"
        jsonLd={[
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Nosotros", url: "/nosotros" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-brand-accent" />
              <span className="label-tech text-brand-accent">NOSOTROS</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-white uppercase mb-8 max-w-4xl">
              No somos una consultoría. Somos infraestructura.
            </h1>

            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-2xl">
              Agentes&Robots nació de una frustración real: empresas que pagan
              por presentaciones de IA bonitas pero nunca ven un sistema
              funcionando en producción. Nosotros diseñamos, desplegamos y
              operamos. Y lo hacemos rápido.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl font-black tracking-tight text-white uppercase mb-16">
            Cómo trabajamos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl enterprise-border bg-slate-900/40"
                >
                  <Icon className="text-brand-accent mb-6" size={24} />
                  <h3 className="text-white font-bold text-lg mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="label-tech text-brand-accent">TRAYECTORIA</span>
          </div>
          <h2 className="font-display text-4xl font-black tracking-tight text-white uppercase mb-16">
            De la práctica a producción
          </h2>

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0 w-20">
                  <span className="text-brand-accent font-display font-bold text-lg">
                    {item.year}
                  </span>
                </div>
                <div className="border-l-2 border-brand-accent/20 pl-8 pb-8">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="py-32 px-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-brand-accent" />
                <span className="label-tech text-brand-accent">FUNDADOR</span>
              </div>
              <h2 className="font-display text-4xl font-black tracking-tight text-white uppercase mb-6">
                Gil Hernandez
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Empresario y consultor de IA. Gerente de TI en GMB (despacho
                  de ajustes de siniestros) donde implementó las primeras
                  automatizaciones con IA que dieron origen a Agentes&Robots.
                </p>
                <p>
                  Su enfoque es pragmático: no vende IA por la novedad, sino
                  por los resultados medibles que genera. Cada producto de
                  Agentes&Robots nació de un problema real que resolvió primero
                  para sus propios clientes.
                </p>
                <p>
                  A través de Konectify, su consultoría, ayuda a empresas
                  mexicanas a adoptar IA sin complicaciones técnicas ni
                  promesas vacías.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "29K+", label: "Registros procesados" },
                { value: "7", label: "Bots en producción" },
                { value: "60%", label: "Reducción en tiempo" },
                { value: "3", label: "Productos propios" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl enterprise-border bg-slate-900/40 text-center"
                >
                  <div className="font-display text-3xl font-black text-brand-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-[11px] font-bold tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-6">
              ¿Trabajamos juntos?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              El diagnóstico inicial es sin costo. En 2 semanas sabrás exactamente dónde la IA puede transformar tu operación.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-accent text-brand-bg font-bold text-[13px] rounded-md tracking-wider shadow-lg shadow-brand-accent/20"
            >
              COMENZAR
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
