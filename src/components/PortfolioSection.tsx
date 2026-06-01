import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "../data/projects";

export default function PortfolioSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="label-tech text-brand-accent">
              Portafolio // {featuredProjects.length}
            </span>
          </div>
          <h2 className="font-display text-5xl font-black tracking-tight text-white uppercase mb-6">
            Lo que hemos<br />construido
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/casos"
            className="inline-flex items-center gap-3 text-[12px] font-bold text-white hover:text-brand-accent transition-colors"
          >
            VER CATÁLOGO COMPLETO
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
