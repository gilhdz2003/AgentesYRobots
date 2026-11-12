import { formatPriceRange } from "../../utils/formatPrice";
import { waLink } from "../../data/contact";
import type { PricingPlan, PlanFeature } from "../../types/catalog";

export type { PricingPlan, PlanFeature };

export function PlanCard({
  plan,
  index,
  serviceSlug,
}: {
  plan: PricingPlan;
  index: number;
  /** Puede traer sufijo ?variant= (familias): se limpia para el texto de WhatsApp. */
  serviceSlug: string;
  key?: string;
}) {
  const cleanSlug = serviceSlug.split("?")[0];
  return (
    <div
      className={`flex flex-col border-2 border-ink p-7 ${
        plan.highlight ? "bg-yellow text-ink" : "bg-paper text-ink"
      }`}
    >
      {plan.highlight && (
        <div className="mb-4">
          <span className="bg-ink px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.05em] text-yellow">
            RECOMENDADO
          </span>
        </div>
      )}

      <div className="mb-6">
        <span className="mb-2 block font-mono text-[9px] font-medium uppercase tracking-[0.05em] text-ink/85">
          [ {String(index + 1).padStart(2, "0")} ]
        </span>
        <h4 className="mb-1 font-serif text-3xl font-extrabold uppercase leading-none tracking-tight">
          {plan.tierName}
        </h4>
        <p className="mt-2 text-sm text-ink/85">{plan.description}</p>
      </div>

      {(plan.monthlyPrice || plan.setupPrice) && (
        <div className="mb-6 border-b-2 border-ink pb-6">
          {plan.monthlyPrice && (
            <div className="mb-2">
              <span className="font-serif text-4xl font-extrabold uppercase leading-none tracking-tight">
                {formatPriceRange(plan.monthlyPrice)}
              </span>
            </div>
          )}
          {plan.setupPrice && (
            <p className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/85">
              SETUP: {formatPriceRange(plan.setupPrice)}
            </p>
          )}
        </div>
      )}

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature, i) => (
          <li key={`${i}-${feature.text}`} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`font-mono text-[10px] font-semibold ${
                feature.included ? "text-ink" : "text-ink/30"
              }`}
            >
              {feature.included ? "[✓]" : "[—]"}
            </span>
            <span
              className={`text-sm leading-snug ${
                feature.included ? "text-ink/85" : "text-ink/35"
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {plan.addOns && plan.addOns.length > 0 && (
        <div className="mb-6 border-t-2 border-ink pt-4">
          <p className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.05em] text-ink/85">
            ADD-ONS BACKOFFICE
          </p>
          {plan.addOns.map((addon) => (
            <p key={addon} className="font-mono text-[11px] text-ink/85">
              + {addon}
            </p>
          ))}
        </div>
      )}

      <a
        href={waLink(cleanSlug)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center px-6 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.05em] transition-colors ${
          plan.highlight
            ? "bg-ink text-yellow"
            : "border-2 border-ink text-ink hover:bg-ink hover:text-yellow"
        }`}
      >
        COTIZAR {plan.tierSlug.toUpperCase()} ↗
      </a>
    </div>
  );
}
