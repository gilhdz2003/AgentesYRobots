import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Deep-link con hash (p.ej. /servicios/coworkers-digitales#voice-agents):
    // scroll al sub-tipo en vez de competir con el fragment llevando la vista al top.
    // Usa el hash de useLocation (misma fuente que las deps del efecto).
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = hash.slice(1);
    let raf = 0;
    let attempts = 0;

    const scrollToTarget = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView();
        return;
      }
      // El elemento puede renderizarse un frame después del mount del efecto.
      if (attempts < 2) {
        attempts += 1;
        raf = requestAnimationFrame(scrollToTarget);
      } else {
        window.scrollTo(0, 0);
      }
    };

    scrollToTarget();

    return () => cancelAnimationFrame(raf);
    // hash en deps: clickear un ancla del dock estando ya en el home
    // (p.ej. / → /#capacidades) no cambia pathname y el efecto debe reaccionar.
  }, [pathname, hash]);

  return null;
}
