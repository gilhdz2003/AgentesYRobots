import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import SEO, { serviceSchema, breadcrumbSchema } from "../components/SEO";
import { getServiceBySlug } from "../data/services";

function FAQAccordion({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-white/5">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
          >
            <span className="text-white font-medium text-sm pr-8 group-hover:text-brand-accent transition-colors">
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={`text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180 text-brand-accent" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-gray-400 text-sm leading-relaxed pb-6 pr-12">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h1 className="font-display text-4xl font-black text-white">
          Servicio no encontrado
        </h1>
        <Link
          to="/"
          className="text-brand-accent text-sm font-bold tracking-wider hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <SEO
        title={`${service.title} — ${service.subtitle}`}
        description={service.longDescription.slice(0, 160)}
        canonical={`/servicios/${service.slug}`}
        jsonLd={[
          serviceSchema({
            name: service.title,
            description: service.longDescription.slice(0, 200),
            url: `/servicios/${service.slug}`,
          }),
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Servicios", url: "/#services" },
            { name: service.title, url: `/servicios/${service.slug}` },
          ]),
          faqJsonLd,
        ]}
      />

      {/* Hero */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-[12px] font-bold tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            TODOS LOS SERVICIOS
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                <Icon className="text-brand-accent" size={28} />
              </div>
              <div>
                <p className="text-[11px] font-black tracking-[0.2em] text-brand-accent uppercase opacity-60">
                  {service.subtitle}
                </p>
              </div>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-white uppercase mb-8">
              {service.title}
            </h1>

            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-2xl">
              {service.longDescription}
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-bg font-bold text-[12px] rounded-md tracking-wider shadow-lg shadow-brand-accent/20"
              >
                SOLICITAR DIAGNÓSTICO
                <ArrowRight size={16} />
              </Link>
              <a
                href="#proceso"
                className="inline-flex items-center gap-3 px-8 py-4 enterprise-border rounded-md text-white font-bold text-[12px] tracking-wider hover:border-brand-accent/50 transition-colors"
              >
                VER PROCESO
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
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
            {service.features.map((feature, i) => (
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

      {/* Process */}
      <section id="proceso" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="label-tech text-brand-accent">
              IMPLEMENTACIÓN
            </span>
          </div>
          <h2 className="font-display text-4xl font-black tracking-tight text-white uppercase mb-16">
            Cómo funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-[11px] font-black tracking-[0.2em] text-brand-accent mb-4">
                  PASO {String(step.step).padStart(2, "0")}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case */}
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
                {service.useCase.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {service.useCase.description}
              </p>
            </div>

            <div className="space-y-4">
              {service.useCase.metrics.map((metric, i) => (
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

      {/* FAQ */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="label-tech text-brand-accent">FAQ</span>
          </div>
          <h2 className="font-display text-4xl font-black tracking-tight text-white uppercase mb-12">
            Preguntas sobre<br />{service.title}
          </h2>
          <FAQAccordion faqs={service.faq} />
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
              ¿Listo para<br />comenzar?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              El diagnóstico inicial es sin costo. En 2 semanas sabrás exactamente cómo {service.title} puede transformar tu operación.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-accent text-brand-bg font-bold text-[13px] rounded-md tracking-wider shadow-lg shadow-brand-accent/20"
            >
              COMENZAR CON {service.title.toUpperCase()}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
