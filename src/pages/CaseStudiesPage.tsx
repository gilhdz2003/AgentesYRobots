import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import SEO, { breadcrumbSchema } from "../components/SEO";

const cases = [
  {
    id: "ar-inspecciones",
    title: "AR Inspecciones",
    client: "GMB Ajustes",
    category: "Coworkers Digitales + BB One",
    challenge:
      "GMB gestionaba la asignación de inspectores de siniestros manualmente por llamadas y WhatsApp. 500+ documentos diarios sin procesamiento automatizado. Datos sensibles de asegurados que no podían salir a la nube.",
    solution:
      "Implementación de un Coworker Digital en WhatsApp para asignación automática de citas + BB One para procesamiento local de documentos con OCR. Sistema web Next.js con dashboard de seguimiento.",
    metrics: [
      "29,000+ registros procesados",
      "60% reducción en tiempo de coordinación",
      "0 datos enviados a servicios externos",
      "7 bots RPA en producción",
    ],
    stack: "Next.js 15, Drizzle ORM, Neon PostgreSQL, WhatsApp Business API",
    link: "https://ar-inspecciones.vercel.app",
  },
  {
    id: "estadisticas-bots",
    title: "Dashboard de Bots RPA",
    client: "GMB Operaciones",
    category: "Automatización + Analytics",
    challenge:
      "7 bots RPA operando sin visibilidad. No había forma de saber si estaban funcionando, cuántos documentos procesaban, o dónde fallaban. La supervisión era manual y reactiva.",
    solution:
      "Dashboard web en Python con SQLite que monitorea los 7 bots en tiempo real: AIG, BBVA, AUTOS, DANOS, SINIESTROS, FACTURACION y RECEPCION_FACTURAS. Métricas de rendimiento, errores y throughput.",
    metrics: [
      "7 bots monitoreados en un dashboard",
      "Detección de fallos en tiempo real",
      "Puerto 3040 accesible desde cualquier punto de la red",
    ],
    stack: "Python, SQLite, Dashboard web",
    link: undefined,
  },
  {
    id: "zkteco",
    title: "Sistema de Asistencia ZKTeco",
    client: "GMB RRHH",
    category: "Automatización + Reportes",
    challenge:
      "Control de asistencia manual con dispositivo F22/ID. 2 años de datos (29,062 registros) sin explotar. Reportes semanales tomaban horas de trabajo manual.",
    solution:
      "Sistema automatizado que extrae datos del dispositivo ZKTeco, procesa 29,062 registros históricos y genera reportes ejecutivos. 3 ejecutables portables sin dependencia de Python.",
    metrics: [
      "29,062 registros extraídos (2 años)",
      "3 ejecutables portables entregados",
      "Documentación profesional PDF con branding",
    ],
    stack: "Python, ZKTeco SDK, PyInstaller",
    link: undefined,
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <SEO
        title="Casos de Estudio"
        description="Proyectos reales de automatización con IA: desde gestión de siniestros hasta control de asistencia. Métricas y resultados comprobables."
        canonical="/casos"
        jsonLd={[
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Casos de Estudio", url: "/casos" },
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
              <span className="label-tech text-brand-accent">
                CASOS DE ESTUDIO
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-white uppercase mb-8 max-w-4xl">
              Resultados reales,<br />
              <span className="text-brand-accent">no presentaciones</span>
            </h1>

            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-2xl">
              Cada proyecto abajo está en producción, con usuarios reales y
              métricas comprobables. No son demos ni pilots.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {cases.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              {/* Header */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <p className="text-[11px] font-black tracking-[0.2em] text-brand-accent uppercase mb-2">
                    {c.client}
                  </p>
                  <h2 className="font-display text-3xl font-black tracking-tight text-white uppercase mb-4">
                    {c.title}
                  </h2>
                  <p className="text-gray-500 text-[11px] font-bold tracking-wider mb-6">
                    {c.category}
                  </p>
                  <p className="text-gray-600 text-[11px] tracking-wider">
                    STACK: {c.stack}
                  </p>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand-accent text-[12px] font-bold mt-4 hover:underline"
                    >
                      VER EN PRODUCCIÓN
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="p-8 rounded-2xl enterprise-border bg-slate-900/40">
                  <h3 className="text-[11px] font-black tracking-[0.2em] text-gray-500 uppercase mb-4">
                    El problema
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {c.challenge}
                  </p>
                </div>

                <div className="p-8 rounded-2xl enterprise-border bg-slate-900/40">
                  <h3 className="text-[11px] font-black tracking-[0.2em] text-gray-500 uppercase mb-4">
                    La solución
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {c.solution}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {c.metrics.map((metric, j) => (
                    <div
                      key={j}
                      className="p-6 rounded-xl enterprise-border bg-slate-900/40"
                    >
                      <p className="text-white font-bold">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-slate-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-6">
              ¿Tu empresa podría<br />ser el próximo caso?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              El diagnóstico inicial es sin costo. En 2 semanas te decimos exactamente dónde podemos generar impacto.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-accent text-brand-bg font-bold text-[13px] rounded-md tracking-wider shadow-lg shadow-brand-accent/20"
            >
              COMENZAR DIAGNÓSTICO
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
