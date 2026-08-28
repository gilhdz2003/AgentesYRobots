import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeInLeft, fadeInRight } from "../utils/animations";
import { prefersReducedMotion, isMobileWidth } from "../utils/accessibility";
import ParticleField from "./ui/ParticleField";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || isMobileWidth() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax: blobs drift slower than content (0.5x)
      gsap.to(".hero-blob", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax: image moves at 0.7x speed
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6"
    >
      {/* Layer 0: Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="hero-blob absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-brand-accent/15 blur-[120px] md:w-[600px] md:h-[600px]"
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.div
          className="hero-blob absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] rounded-full bg-brand-amber/10 blur-[100px] md:w-[500px] md:h-[500px]"
          animate={{ x: [0, -30, 30, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.div
          className="hero-blob absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-purple-500/8 blur-[80px] md:w-[400px] md:h-[400px]"
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </div>

      {/* Layer 1: Particle constellation */}
      <ParticleField />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          ref={contentRef}
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-[2px] bg-brand-accent" />
            <span className="label-tech text-brand-accent">
              Agentes de IA en producción // 01
            </span>
          </motion.div>

          <h1 className="font-serif italic tracking-tighter leading-[1.05] mb-8">
            <span className="block text-6xl lg:text-8xl text-brand-text">
              Automatiza la operación.
            </span>
            <span className="block text-4xl lg:text-6xl mt-3 text-brand-amber">
              Escala sin contratar.
            </span>
          </h1>

          <p className="max-w-lg text-lg text-gray-400 font-medium leading-relaxed mb-12">
            Agentes de IA para empresas que ya no caben en sus procesos: WhatsApp, telefonía, facturación y reportes operando solos.
          </p>

          <div className="flex flex-wrap gap-5">
            <motion.a
              href="#services"
              whileHover={{ scale: 1.02 }}
              className="px-8 py-4 bg-brand-amber text-brand-bg font-bold tracking-wide rounded-md"
            >
              EXPLORAR SOLUCIONES
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/contacto"
                className="inline-block px-8 py-4 bg-white/5 border border-white/10 text-white font-bold tracking-wide rounded-md hover:bg-white/10 transition-colors"
              >
                SOLICITAR DEMO
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          ref={imageRef}
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="enterprise-border p-4 bg-slate-900/40 backdrop-blur-2xl rounded-2xl">
            <div className="aspect-square relative overflow-hidden rounded-xl">
              <img
                src="/hero-bb-node.webp"
                alt="Nodo de cómputo local con agentes de IA en operación: LEDs ámbar activos y cable de red conectado"
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 px-6 py-4 glass-premium rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[12px] font-bold tracking-wider uppercase text-gray-300">Operación activa</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
