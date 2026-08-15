import type { ServiceVariant } from "../../types/catalog";

export function VariantNav({
  variants,
  familySlug,
}: {
  variants: ServiceVariant[];
  familySlug: string;
}) {
  return (
    <div className="sticky top-20 z-30 bg-brand-bg/85 backdrop-blur-md border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-2 justify-center">
        {variants.map((v) => {
          const Icon = v.icon;
          return (
            <a
              key={v.slug}
              href={`#${v.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[12px] font-bold tracking-wider text-gray-400 hover:text-white hover:border-brand-accent/50 enterprise-border transition-colors"
            >
              <Icon size={14} className="text-brand-accent" />
              {v.name.toUpperCase()}
            </a>
          );
        })}
      </div>
    </div>
  );
}
