import { motion } from "motion/react";
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
  const Icon = variant.icon;
  return (
    <section id={variant.slug} className="scroll-mt-40 border-t border-white/5 first:border-t-0">
      {/* Encabezado del sub-tipo */}
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                <Icon className="text-brand-accent" size={24} />
              </div>
              <p className="text-[11px] font-black tracking-[0.2em] text-brand-accent uppercase opacity-60">
                {variant.tagline}
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-6">
              {variant.name}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              {variant.description}
            </p>
          </motion.div>
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
