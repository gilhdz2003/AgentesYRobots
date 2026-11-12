import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TieredPlans } from "./TieredPlans";
import { ModularPricing } from "./ModularPricing";
import { QuotePricing } from "./QuotePricing";
import type {
  ServicePricing,
  ServiceFAQ,
  PricingPlan,
  PlanFeature,
  VirtualRole,
} from "../../types/catalog";

function PricingFAQ({ faqs }: { faqs: ServiceFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-16 max-w-3xl border-t border-line pt-12">
      <h4 className="mb-8 font-serif text-2xl font-bold uppercase tracking-tight text-paper">
        Preguntas sobre precios
      </h4>
      <div>
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-line">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
            >
              <span className="pr-4 text-[15px] font-medium text-paper/90 transition-colors group-hover:text-yellow">
                {faq.q}
              </span>
              <span
                aria-hidden="true"
                className={`flex-shrink-0 inline-block font-mono text-lg leading-none transition-transform duration-200 ${
                  openIndex === i ? "rotate-45 text-yellow" : "text-muted"
                }`}
              >
                +
              </span>
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
                  <p className="pb-5 pr-12 text-sm leading-relaxed text-muted">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingSection({
  pricing,
  serviceSlug,
}: {
  pricing: ServicePricing;
  serviceSlug: string;
}) {
  const title = pricing.sectionTitle ?? "Planes y Precios";
  const subtitle =
    pricing.sectionSubtitle ?? "Elige el plan que se adapte a tu operación.";

  return (
    <section className="hairline-t px-4 py-20 min-[760px]:px-7 min-[760px]:py-28">
      <div className="mx-auto max-w-7xl">
        <span className="label-telemetry mb-6 block text-muted">[ PRECIOS ]</span>
        <h2 className="mb-4 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight text-paper md:text-6xl">
          {title}
        </h2>
        <p className="mb-14 max-w-2xl text-lg text-muted">{subtitle}</p>

        {pricing.model === "tiered" && pricing.plans && (
          <TieredPlans plans={pricing.plans} serviceSlug={serviceSlug} />
        )}

        {pricing.model === "modular" && (
          <ModularPricing
            hubPrice={pricing.hubPrice}
            hubDescription={pricing.hubDescription}
            implementationTiers={pricing.implementationTiers}
            rentTiers={pricing.rentTiers}
            roles={pricing.roles}
            serviceSlug={serviceSlug}
          />
        )}

        {pricing.model === "quote" && pricing.quote && (
          <QuotePricing quote={pricing.quote} serviceSlug={serviceSlug} />
        )}

        {pricing.pricingFaq && pricing.pricingFaq.length > 0 && (
          <PricingFAQ faqs={pricing.pricingFaq} />
        )}
      </div>
    </section>
  );
}

export type { ServicePricing, PricingPlan, PlanFeature, VirtualRole };
