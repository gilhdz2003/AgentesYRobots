import type { ServiceFeature } from "../../types/catalog";

export function FeaturesSection({ features }: { features: ServiceFeature[] }) {
  return (
    <section className="bg-paper px-4 py-20 text-ink min-[760px]:px-7 min-[760px]:py-28">
      <div className="mx-auto max-w-7xl">
        <span className="label-telemetry mb-6 block text-ink/85">
          [ CAPACIDADES ]
        </span>
        <h2 className="mb-14 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight md:text-6xl">
          QUÉ <em className="text-orange-deep not-italic">INCLUDE.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="border-t-2 border-ink py-7 pr-6 md:border-r md:border-ink/15 md:px-6 md:last:border-r-0 lg:[&:nth-child(3n)]:border-r-0"
            >
              <div className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-orange-deep">
                [ {String(i + 1).padStart(2, "0")} ]
              </div>
              <h3 className="mb-2 font-serif text-2xl font-bold uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink/85">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
