import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project, ProjectCategory } from "../data/projects";
import { categoryLabels } from "../data/projects";

const allCategories: ("all" | ProjectCategory)[] = [
  "all",
  "web-app",
  "automatizacion",
  "laboratorio",
];

const categoryFilterLabels: Record<string, string> = {
  all: "Todos",
  ...categoryLabels,
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filtros */}
      <div className="mb-10 flex flex-wrap gap-3">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`border-2 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.05em] transition-colors duration-[180ms] ${
              active === cat
                ? "border-ink bg-ink text-yellow"
                : "border-ink text-ink hover:bg-ink hover:text-yellow"
            }`}
          >
            {categoryFilterLabels[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
