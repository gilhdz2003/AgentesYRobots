import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "../data/projects";
import { fadeInUp, staggerContainer, sectionTransition } from "../utils/animations";

export default function PortfolioSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={sectionTransition}
          className="max-w-xl mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="label-tech text-brand-accent">
              Portafolio // {featuredProjects.length}
            </span>
          </div>
          <h2 className="font-display text-5xl font-black tracking-tight gradient-text-subtle uppercase mb-6">
            Lo que hemos<br />construido
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={sectionTransition}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={fadeInUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

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
