import type { ServiceVariant } from "../../types/catalog";

export function VariantNav({
  variants,
  familySlug,
}: {
  variants: ServiceVariant[];
  familySlug: string;
}) {
  return (
    <div className="sticky top-20 z-30 border-b border-line bg-ink/95">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-3 px-4 py-4 min-[760px]:px-7">
        {variants.map((v, i) => (
          <a
            key={v.slug}
            href={`#${v.slug}`}
            className="border-b border-transparent pb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.05em] text-muted transition-colors hover:border-yellow hover:text-yellow"
          >
            <span className="text-yellow">{String(i + 1).padStart(2, "0")}</span>{" "}
            {v.name.toUpperCase()}
            <span className="sr-only"> — {familySlug}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
