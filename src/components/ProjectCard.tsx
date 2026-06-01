import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";
import { statusConfig, categoryLabels } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status];
  const category = categoryLabels[project.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="rounded-2xl enterprise-border bg-slate-900/40 overflow-hidden transition-colors hover:border-brand-accent/30"
    >
      {/* Screenshot placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="w-[85%] h-[75%] rounded-lg border border-white/6 flex flex-col items-center justify-center gap-2 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <div className="w-[60%] h-2 rounded bg-brand-accent/20" />
          <div className="w-[40%] h-2 rounded bg-brand-accent/20" />
        </div>

        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Card body */}
      <div className="p-6">
        <p className="label-tech text-brand-accent mb-2">{category}</p>
        <h3 className="font-display text-lg font-bold text-white tracking-tight mb-2">
          {project.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {project.deployUrl && (
          <a
            href={project.deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-accent text-[12px] font-bold hover:gap-3 transition-all"
          >
            Ver proyecto
            <ExternalLink size={14} />
          </a>
        )}
        {project.deployLabel && !project.deployUrl && (
          <span className="text-gray-600 text-[12px] font-bold">
            {project.deployLabel}
          </span>
        )}
      </div>
    </motion.article>
  );
}
