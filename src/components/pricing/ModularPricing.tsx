import { formatPriceRange, type PriceRange } from "../../utils/formatPrice";
import { PlanCard } from "./PlanCard";
import { RoleCard } from "./RoleCard";
import type { PricingPlan, VirtualRole } from "../../types/catalog";

export function ModularPricing({
  hubPrice,
  hubDescription,
  implementationTiers,
  rentTiers,
  roles,
  serviceSlug,
}: {
  hubPrice?: PriceRange;
  hubDescription?: string;
  implementationTiers?: PricingPlan[];
  rentTiers?: PricingPlan[];
  roles?: VirtualRole[];
  serviceSlug: string;
}) {
  return (
    <div className="space-y-16">
      {/* Hub Banner — ficha papel con borde tinta */}
      {hubPrice && (
        <div className="flex flex-col items-start gap-6 border-2 border-ink bg-paper p-7 text-ink md:flex-row md:items-center">
          <div className="flex-1">
            <span className="label-telemetry mb-3 block text-ink/85">
              [ HUB LOCAL ]
            </span>
            <h4 className="mb-1 font-serif text-3xl font-extrabold uppercase leading-none tracking-tight">
              Hub de Empleados Virtuales
            </h4>
            <p className="mt-2 text-sm text-ink/85">
              {hubDescription ??
                "El cerebro local donde viven y trabajan tus empleados virtuales."}
            </p>
          </div>
          <div className="flex-shrink-0 border-l-2 border-ink pl-6">
            <span className="font-serif text-4xl font-extrabold uppercase leading-none tracking-tight">
              {formatPriceRange(hubPrice)}
            </span>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/85">
              POR DISPOSITIVO
            </p>
          </div>
        </div>
      )}

      {/* Implementation Tiers */}
      {implementationTiers && implementationTiers.length > 0 && (
        <div>
          <div className="mb-8">
            <span className="label-telemetry mb-3 block text-muted">
              [ PAGO ÚNICO ]
            </span>
            <h4 className="font-serif text-3xl font-extrabold uppercase leading-none tracking-tight text-paper">
              Costo de Implementación
            </h4>
            <p className="mt-2 text-sm text-muted">
              Pago único según complejidad de la automatización.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {implementationTiers.map((plan, i) => (
              <PlanCard
                key={plan.tierSlug}
                plan={plan}
                index={i}
                serviceSlug={serviceSlug}
              />
            ))}
          </div>
        </div>
      )}

      {/* Rent Tiers */}
      {rentTiers && rentTiers.length > 0 && (
        <div>
          <div className="mb-8">
            <span className="label-telemetry mb-3 block text-muted">
              [ RENTA MENSUAL ]
            </span>
            <h4 className="font-serif text-3xl font-extrabold uppercase leading-none tracking-tight text-paper">
              Renta Mensual por Empleado Virtual
            </h4>
            <p className="mt-2 text-sm text-muted">
              Monitoreo, soporte y mantenimiento incluidos.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {rentTiers.map((plan, i) => (
              <PlanCard
                key={plan.tierSlug}
                plan={plan}
                index={i}
                serviceSlug={serviceSlug}
              />
            ))}
          </div>
        </div>
      )}

      {/* Roles Catalog */}
      {roles && roles.length > 0 && (
        <div>
          <span className="label-telemetry mb-3 block text-muted">
            [ CATÁLOGO ]
          </span>
          <h4 className="mb-2 font-serif text-3xl font-extrabold uppercase leading-none tracking-tight text-paper">
            Empleados Virtuales Disponibles
          </h4>
          <p className="mb-8 text-sm text-muted">
            Cada empleado virtual se configura para tus sistemas y procesos.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role, i) => (
              <RoleCard key={role.name} role={role} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
