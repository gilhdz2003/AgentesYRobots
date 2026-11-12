import { FeaturesSection } from "./FeaturesSection";
import { UseCaseSection } from "./UseCaseSection";
import { FAQSection } from "./FAQSection";
import { PricingSection } from "../pricing/PricingSection";
import type { ServiceVariant } from "../../types/catalog";

export function VariantBlock({
  variant,
  familySlug,
}: {
  variant: ServiceVariant;
  familySlug: string;
  key?: string;
}) {
  return (
    <section id={variant.slug} className="scroll-mt-40 border-t border-line first:border-t-0">
      {/* Encabezado del sub-tipo */}
      <div className="px-4 py-20 min-[760px]:px-7 min-[760px]:py-24">
        <div className="mx-auto max-w-7xl">
          <span className="label-telemetry mb-8 block text-muted">
            [ {familySlug.replace(/-/g, " ").toUpperCase()} / {variant.tagline.toUpperCase()} ]
          </span>
          <h2 className="mb-6 font-serif text-5xl font-extrabold uppercase leading-[0.8] tracking-tight text-paper md:text-7xl">
            {variant.name}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            {variant.description}
          </p>
        </div>
      </div>
      <FeaturesSection features={variant.features} />
      <UseCaseSection useCase={variant.useCase} />
      {variant.pricing && (
        <PricingSection
          pricing={variant.pricing}
          serviceSlug={`${familySlug}?variant=${variant.slug}`}
        />
      )}
      <FAQSection
        faqs={variant.faq}
        title={"Preguntas sobre " + variant.name}
        alternate={!!variant.pricing}
      />
    </section>
  );
}
