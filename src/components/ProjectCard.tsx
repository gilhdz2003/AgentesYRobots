import type { Project } from "../data/projects";
import { statusConfig, categoryLabels } from "../data/projects";

/** Etiqueta de estado sin emoji: el microcopy Lab es texto plano. */
const STATUS_LABEL: Record<string, string> = {
  en_vivo: "EN VIVO",
  en_desarrollo: "EN DESARROLLO",
  completado: "COMPLETADO",
  laboratorio: "LABORATORIO",
};

export default function ProjectCard({ project }: { project: Project; key?: string }) {
  const status = statusConfig[project.status];
  const category = categoryLabels[project.category];

  return (
    <article className="flex flex-col border-2 border-ink bg-paper text-ink transition-colors duration-[180ms] hover:bg-yellow">
      <div className="flex items-center justify-between border-b-2 border-ink px-5 py-3">
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.05em] text-ink/85">
          [ {category.toUpperCase()} ]
        </span>
        <span
          className={`font-mono text-[9px] font-semibold uppercase tracking-[0.05em] ${
            project.status === "en_vivo" ? "text-orange-deep" : "text-ink/85"
          }`}
        >
          {STATUS_LABEL[project.status] ?? status.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-serif text-2xl font-bold uppercase leading-none tracking-tight">
          {project.name}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-ink/85">
          {project.description}
        </p>

        <div className="mt-auto">
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-current pb-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-ink"
            >
              VER PROYECTO ↗
            </a>
          )}
          {project.deployLabel && !project.deployUrl && (
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/85">
              {project.deployLabel}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
