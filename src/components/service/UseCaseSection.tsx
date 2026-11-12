import type { ServiceUseCase } from "../../types/catalog";

export function UseCaseSection({ useCase }: { useCase: ServiceUseCase }) {
  return (
    <section className="hairline-t px-4 py-20 min-[760px]:px-7 min-[760px]:py-28">
      <div className="mx-auto max-w-7xl">
        <span className="label-telemetry mb-6 block text-muted">
          [ CASO DE USO ]
        </span>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight text-paper md:text-5xl">
              {useCase.title}
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              {useCase.description}
            </p>
          </div>

          <div>
            {useCase.metrics.map((metric) => (
              <div key={metric} className="border-t border-line py-5 first:border-t-2 first:border-yellow">
                <p className="font-serif text-3xl font-extrabold uppercase leading-none tracking-tight text-yellow md:text-4xl">
                  {metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
