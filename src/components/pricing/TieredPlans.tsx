import { PlanCard, type PricingPlan } from "./PlanCard";

export function TieredPlans({
  plans,
  serviceSlug,
}: {
  plans: PricingPlan[];
  serviceSlug: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, i) => (
        <PlanCard
          key={plan.tierSlug}
          plan={plan}
          index={i}
          serviceSlug={serviceSlug}
        />
      ))}
    </div>
  );
}
