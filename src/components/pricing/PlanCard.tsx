import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPriceRange } from "../../utils/formatPrice";
import type { PricingPlan, PlanFeature } from "../../types/catalog";

export type { PricingPlan, PlanFeature };

export function PlanCard({
  plan,
  index,
  serviceSlug,
}: {
  plan: PricingPlan;
  index: number;
  serviceSlug: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className={`relative p-8 rounded-2xl border bg-slate-900/40 transition-all duration-300 flex flex-col ${
        plan.highlight
          ? "border-brand-accent/60 shadow-lg shadow-brand-accent/10"
          : "border-white/5 hover:border-brand-accent/30"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-8">
          <span className="text-[10px] font-black tracking-[0.15em] bg-brand-accent text-brand-bg px-3 py-1 rounded-sm">
            RECOMENDADO
          </span>
        </div>
      )}

      <div className="mb-6">
        <h4 className="text-white font-bold text-xl mb-1">{plan.tierName}</h4>
        <p className="text-gray-500 text-sm">{plan.description}</p>
      </div>

      {(plan.monthlyPrice || plan.setupPrice) && (
        <div className="mb-6 pb-6 border-b border-white/5">
          {plan.monthlyPrice && (
            <div className="mb-2">
              <span className="font-display text-3xl font-black text-white">
                {formatPriceRange(plan.monthlyPrice)}
              </span>
            </div>
          )}
          {plan.setupPrice && (
            <p className="text-gray-500 text-sm">
              Setup:{" "}
              <span className="text-gray-400">
                {formatPriceRange(plan.setupPrice)}
              </span>
            </p>
          )}
        </div>
      )}

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2
              size={16}
              className={`flex-shrink-0 mt-0.5 ${
                feature.included ? "text-brand-accent" : "text-gray-600"
              }`}
            />
            <span
              className={`text-sm ${
                feature.included ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {plan.addOns && plan.addOns.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-brand-accent/5 border border-brand-accent/10">
          <p className="text-[10px] font-bold tracking-[0.15em] text-brand-accent mb-2">
            ADD-ONS BACKOFFICE
          </p>
          {plan.addOns.map((addon, i) => (
            <p key={i} className="text-gray-400 text-xs">
              {addon}
            </p>
          ))}
        </div>
      )}

      <Link
        to={`/contacto?servicio=${serviceSlug}&plan=${plan.tierSlug}`}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-[11px] font-bold tracking-wider transition-colors ${
          plan.highlight
            ? "bg-brand-accent text-brand-bg shadow-lg shadow-brand-accent/20"
            : "border border-white/10 text-white hover:border-brand-accent/50 hover:text-brand-accent"
        }`}
      >
        COTIZAR
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}
