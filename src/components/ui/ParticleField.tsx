import { useEffect, useState, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import type { ISourceOptions } from "@tsparticles/engine";
import { prefersReducedMotion, isMobileWidth } from "../../utils/accessibility";

/**
 * Subtle particle constellation background for the Hero section.
 * Communicates "connected AI systems" — nodes + links drifting gently.
 *
 * Design decisions:
 * - Sparse particles (50 desktop, 20 mobile) for subtlety
 * - Brand accent color at low opacity — atmosphere, not distraction
 * - Mouse "grab" interaction on desktop only
 * - FPS capped at 30 for performance
 * - Skipped entirely on low-end devices or when reduced-motion is preferred
 */
export default function ParticleField() {
  const [initialized, setInitialized] = useState(false);
  const [canRender, setCanRender] = useState(true);

  useEffect(() => {
    // Skip on low-end devices or if user prefers reduced motion
    const isLowEnd =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency < 4;

    if (prefersReducedMotion || isLowEnd) {
      setCanRender(false);
      return;
    }

    // Initialize the slim engine (registers all particle plugins)
    loadSlim(tsParticles).then(() => setInitialized(true));
  }, []);

  const config = useMemo<ISourceOptions>(() => {
    const mobile = isMobileWidth();

    return {
      fullScreen: false,
      background: { color: "transparent" },
      fpsLimit: 30,
      detectRetina: true,
      particles: {
        color: { value: "#38bdf8" },
        links: {
          color: "#38bdf8",
          distance: mobile ? 80 : 120,
          enable: true,
          opacity: 0.1,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        number: {
          density: { enable: true },
          value: mobile ? 20 : 50,
        },
        opacity: {
          value: { min: 0.05, max: 0.2 },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: !mobile, mode: "grab" },
        },
        modes: {
          grab: {
            distance: 140,
            links: { opacity: 0.15 },
          },
        },
      },
    };
  }, []);

  if (!canRender || !initialized) return null;

  return (
    <div className="absolute inset-0 -z-[5] pointer-events-none">
      <Particles
        id="hero-particles"
        options={config}
        className="!absolute !inset-0"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
