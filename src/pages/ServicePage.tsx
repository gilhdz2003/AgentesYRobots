import { useParams, Link } from "react-router-dom";
import SEO, { serviceSchema, breadcrumbSchema } from "../components/SEO";
import { PricingSection } from "../components/pricing/PricingSection";
import { FeaturesSection } from "../components/service/FeaturesSection";
import { UseCaseSection } from "../components/service/UseCaseSection";
import { FAQSection } from "../components/service/FAQSection";
import { VariantNav } from "../components/service/VariantNav";
import { VariantBlock } from "../components/service/VariantBlock";
import { getServiceBySlug, services } from "../data/services";
import { waLink } from "../data/contact";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  if (!service) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6">
        <span className="label-telemetry text-muted">[ ERROR 404 ]</span>
        <h1 className="font-serif text-5xl font-extrabold uppercase tracking-tight text-paper md:text-6xl">
          CAPACIDAD<br />
          <em className="text-yellow not-italic">NO ENCONTRADA.</em>
        </h1>
        <Link
          to="/"
          className="border-b border-current pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-yellow"
        >
          ← VOLVER AL INICIO
        </Link>
      </div>
    );
  }

  const isFamily = !!service.variants;
  const number = String(services.findIndex((s) => s.slug === service.slug) + 1).padStart(2, "0");

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
            { name: "Servicios", url: "/#capacidades" },
            { name: service.title, url: `/servicios/${service.slug}` },
          ]),
          ...(faqJsonLd ? [faqJsonLd] : []),
        ]}
      />

      {/* Hero */}
      <section className="px-4 pb-20 pt-16 min-[760px]:px-7 min-[760px]:pb-28 min-[760px]:pt-20">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            className="mb-10 inline-block border-b border-current pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-muted transition-colors hover:text-yellow"
          >
            ← TODAS LAS CAPACIDADES
          </Link>

          <span className="label-telemetry mb-8 block text-muted">
            [ CAPACIDAD / {number} — {service.subtitle.toUpperCase()} ]
          </span>

          <h1 className="mb-8 font-serif text-6xl font-extrabold uppercase leading-[0.8] tracking-tight text-paper md:text-8xl">
            {service.title}
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            {service.longDescription}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a
              href={waLink(service.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-6 bg-yellow px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.05em] text-ink"
            >
              SOLICITAR DIAGNÓSTICO <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#proceso"
              className="border-b border-current pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-yellow"
            >
              VER PROCESO ↓
            </a>
          </div>
        </div>
      </section>

      {isFamily && (
        <VariantNav variants={service.variants!} familySlug={service.slug} />
      )}

      {!isFamily && <FeaturesSection features={service.features!} />}

      {/* Process */}
      <section id="proceso" className="hairline-t px-4 py-20 min-[760px]:px-7 min-[760px]:py-28">
        <div className="mx-auto max-w-7xl">
          <span className="label-telemetry mb-6 block text-muted">
            [ IMPLEMENTACIÓN ]
          </span>
          <h2 className="mb-14 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight text-paper md:text-6xl">
            CÓMO <em className="text-yellow not-italic">FUNCIONA.</em>
          </h2>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step) => (
              <div key={step.step} className="border-t-2 border-line pt-6">
                <div className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-yellow">
                  [ {String(step.step).padStart(2, "0")} ]
                </div>
                <h3 className="mb-3 font-serif text-2xl font-bold uppercase tracking-tight text-paper">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
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
      <section className="bg-paper px-4 py-20 text-ink min-[760px]:px-7 min-[760px]:py-28">
        <div className="mx-auto max-w-4xl">
          <span className="label-telemetry mb-6 block text-ink/85">
            [ DIAGNÓSTICO SIN COSTO / 2 SEMANAS ]
          </span>
          <h2 className="mb-6 font-serif text-5xl font-extrabold uppercase leading-[0.8] tracking-tight md:text-7xl">
            ¿LISTO PARA<br />
            <em className="text-orange-deep not-italic">COMENZAR?</em>
          </h2>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-ink/85">
            El diagnóstico inicial es sin costo. En 2 semanas sabrás exactamente
            cómo {service.title} puede transformar tu operación.
          </p>
          <a
            href={waLink(service.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-6 border-2 border-ink bg-yellow px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.05em] hard-shadow"
          >
            COMENZAR CON {service.title.toUpperCase()} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
