import { motion } from "motion/react";
import type { VirtualRole } from "../../types/catalog";

export type { VirtualRole };

export function RoleCard({ role, index }: { role: VirtualRole; index: number }) {
  const Icon = role.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group p-8 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 hover:border-brand-accent/30 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-5">
        <Icon className="text-brand-accent" size={22} />
      </div>
      <h4 className="text-white font-bold text-lg mb-2">{role.name}</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {role.description}
      </p>
      <ul className="space-y-2">
        {role.exampleTasks.map((task, i) => (
          <li
            key={i}
            className="text-gray-500 text-xs flex items-start gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-brand-accent/60 mt-1.5 flex-shrink-0" />
            {task}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
