import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import SEO, { serviceSchema, breadcrumbSchema } from "../components/SEO";
import { PricingSection } from "../components/pricing/PricingSection";
import { FeaturesSection } from "../components/service/FeaturesSection";
import { UseCaseSection } from "../components/service/UseCaseSection";
import { FAQSection } from "../components/service/FAQSection";
import { VariantNav } from "../components/service/VariantNav";
import { VariantBlock } from "../components/service/VariantBlock";
import { getServiceBySlug } from "../data/services";

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

  const isFamily = !!service.variants;

  const Icon = service.icon;

  const allFaqs = isFamily
    ? [
        ...service.variants!.flatMap((v) => v.faq),
        ...service.variants!.flatMap((v) => v.pricing?.pricingFaq ?? []),
      ]
    : [...(service.faq ?? [])];

  const faqJsonLd = allFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : undefined;

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
          ...(faqJsonLd ? [faqJsonLd] : []),
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

      {isFamily && (
        <VariantNav variants={service.variants!} familySlug={service.slug} />
      )}

      {!isFamily && <FeaturesSection features={service.features!} />}

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

      {isFamily ? (
        service.variants!.map((v) => (
          <VariantBlock key={v.slug} variant={v} familySlug={service.slug} />
        ))
      ) : (
        <>
          <UseCaseSection useCase={service.useCase!} />
          {service.pricing && (
            <PricingSection pricing={service.pricing} serviceSlug={service.slug} />
          )}
          <FAQSection
            faqs={service.faq!}
            title={"Preguntas sobre " + service.title}
            alternate={!!service.pricing}
          />
        </>
      )}

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
