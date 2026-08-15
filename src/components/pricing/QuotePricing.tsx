import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { QuoteConfig } from "../../types/catalog";

export function QuotePricing({
  quote,
  serviceSlug,
}: {
  quote: QuoteConfig;
  serviceSlug: string;
}) {
  return (
    <div className="max-w-3xl p-8 rounded-2xl enterprise-border bg-slate-900/40">
      <p className="text-white font-display text-2xl font-black mb-6">
        {quote.priceLine}
      </p>
      <ul className="space-y-4 mb-8">
        {quote.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-gray-400 text-sm">
            <CheckCircle2 size={18} className="text-brand-accent flex-shrink-0 mt-0.5" />
            {b}
          </li>
        ))}
      </ul>
      {quote.note && <p className="text-gray-500 text-sm mb-6">{quote.note}</p>}
      <Link
        to={`/contacto?servicio=${serviceSlug}`}
        className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-bg font-bold text-[12px] rounded-md tracking-wider"
      >
        SOLICITAR COTIZACIÓN
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
