import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TieredPlans } from "./TieredPlans";
import { ModularPricing } from "./ModularPricing";
import type { PricingPlan, PlanFeature } from "./PlanCard";
import type { VirtualRole } from "./RoleCard";
import type { PriceRange } from "../../utils/formatPrice";
import type { ServiceFAQ } from "../../data/services";

export interface ServicePricing {
  sectionTitle?: string;
  sectionSubtitle?: string;
  model: "tiered" | "modular";
  plans?: PricingPlan[];
  hubPrice?: PriceRange;
  hubDescription?: string;
  implementationTiers?: PricingPlan[];
  rentTiers?: PricingPlan[];
  roles?: VirtualRole[];
  pricingFaq?: ServiceFAQ[];
}

function PricingFAQ({ faqs }: { faqs: ServiceFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-16 pt-12 border-t border-white/5">
      <h4 className="text-white font-bold text-lg mb-8">
        Preguntas sobre precios
      </h4>
      <div>
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-white/5">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
            >
              <span className="text-white font-medium text-sm pr-8 group-hover:text-brand-accent transition-colors">
                {faq.q}
              </span>
              <ChevronDown
                size={16}
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
                  <p className="text-gray-400 text-sm leading-relaxed pb-5 pr-12">
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
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-[2px] bg-brand-accent" />
          <span className="text-[11px] font-black tracking-[0.2em] text-brand-accent uppercase">
            PRECIOS
          </span>
        </div>
        <h2 className="font-display text-4xl font-black tracking-tight text-white uppercase mb-4">
          {title}
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mb-16">{subtitle}</p>

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

        {pricing.pricingFaq && pricing.pricingFaq.length > 0 && (
          <div className="max-w-3xl">
            <PricingFAQ faqs={pricing.pricingFaq} />
          </div>
        )}
      </div>
    </section>
  );
}

export type { PricingPlan, PlanFeature, VirtualRole };
