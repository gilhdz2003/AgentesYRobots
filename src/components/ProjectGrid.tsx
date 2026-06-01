import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-[12px] font-bold tracking-wider border transition-all ${
              active === cat
                ? "bg-brand-accent border-brand-accent text-brand-bg"
                : "border-white/10 text-gray-500 hover:border-brand-accent/40 hover:text-gray-300"
            }`}
          >
            {categoryFilterLabels[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
