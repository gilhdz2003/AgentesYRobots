import { motion } from "motion/react";
import { Server } from "lucide-react";
import { formatPriceRange, type PriceRange } from "../../utils/formatPrice";
import { PlanCard, type PricingPlan } from "./PlanCard";
import { RoleCard, type VirtualRole } from "./RoleCard";

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
      {/* Hub Banner */}
      {hubPrice && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl border border-brand-accent/30 bg-brand-accent/5 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <div className="w-14 h-14 rounded-xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
            <Server className="text-brand-accent" size={28} />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-xl mb-1">
              Hub de Empleados Virtuales
            </h4>
            <p className="text-gray-400 text-sm">
              {hubDescription ??
                "El cerebro local donde viven y trabajan tus empleados virtuales."}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="font-display text-3xl font-black text-white">
              {formatPriceRange(hubPrice)}
            </span>
            <p className="text-gray-500 text-xs mt-1">Por dispositivo</p>
          </div>
        </motion.div>
      )}

      {/* Implementation Tiers */}
      {implementationTiers && implementationTiers.length > 0 && (
        <div>
          <div className="mb-8">
            <h4 className="text-white font-bold text-lg mb-2">
              Costo de Implementación
            </h4>
            <p className="text-gray-500 text-sm">
              Pago único según complejidad de la automatización.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <h4 className="text-white font-bold text-lg mb-2">
              Renta Mensual por Empleado Virtual
            </h4>
            <p className="text-gray-500 text-sm">
              Monitoreo, soporte y mantenimiento incluidos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="text-[11px] font-black tracking-[0.2em] text-brand-accent uppercase">
              Catálogo
            </span>
          </div>
          <h4 className="text-white font-bold text-lg mb-2">
            Empleados Virtuales Disponibles
          </h4>
          <p className="text-gray-500 text-sm mb-8">
            Cada empleado virtual se configura para tus sistemas y procesos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, i) => (
              <RoleCard key={role.name} role={role} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
