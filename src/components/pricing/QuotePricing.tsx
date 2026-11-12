import { waLink } from "../../data/contact";
import type { QuoteConfig } from "../../types/catalog";

export function QuotePricing({
  quote,
  serviceSlug,
}: {
  quote: QuoteConfig;
  /** Puede traer sufijo ?variant= (familias): se limpia para el texto de WhatsApp. */
  serviceSlug: string;
}) {
  const cleanSlug = serviceSlug.split("?")[0];
  return (
    <div className="max-w-3xl border-2 border-ink bg-paper p-8 text-ink">
      <span className="label-telemetry mb-5 block text-ink/85">
        [ POR COTIZACIÓN ]
      </span>
      <p className="mb-7 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight">
        {quote.priceLine}
      </p>
      <ul className="mb-8 space-y-3.5">
        {quote.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-ink/85">
            <span aria-hidden="true" className="font-mono text-[10px] font-semibold">
              [✓]
            </span>
            {b}
          </li>
        ))}
      </ul>
      {quote.note && (
        <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.05em] text-ink/85">
          {quote.note}
        </p>
      )}
      <a
        href={waLink(cleanSlug)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-between gap-6 border-2 border-ink bg-yellow px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.05em] hard-shadow"
      >
        SOLICITAR COTIZACIÓN <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
