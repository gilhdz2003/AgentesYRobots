import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Deep-link con hash (p.ej. /servicios/coworkers-digitales#voice-agents):
    // scroll al sub-tipo en vez de competir con el fragment llevando la vista al top.
    const hash = window.location.hash;

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
  }, [pathname]);

  return null;
}
