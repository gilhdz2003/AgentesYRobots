import type { VirtualRole } from "../../types/catalog";

export type { VirtualRole };

export function RoleCard({ role, index }: { role: VirtualRole; index: number; key?: string }) {
  const Icon = role.icon;

  return (
    <div className="flex flex-col border border-line p-6 transition-colors duration-[180ms] hover:border-yellow">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.05em] text-muted">
          [ {String(index + 1).padStart(2, "0")} ]
        </span>
        <Icon aria-hidden="true" className="text-yellow" size={18} />
      </div>
      <h4 className="mb-2 font-serif text-2xl font-bold uppercase leading-none tracking-tight text-paper">
        {role.name}
      </h4>
      <p className="mb-4 text-sm leading-relaxed text-muted">
        {role.description}
      </p>
      <ul className="mt-auto space-y-1.5">
        {role.exampleTasks.map((task) => (
          <li
            key={task}
            className="font-mono text-[11px] leading-snug text-muted"
          >
            <span aria-hidden="true" className="text-orange">+</span> {task}
          </li>
        ))}
      </ul>
    </div>
  );
}
