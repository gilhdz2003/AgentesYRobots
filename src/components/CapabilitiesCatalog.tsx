import { useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { waLink } from "../data/contact";

/**
 * Catálogo de capacidades — tablist con las 6 familias reales del catálogo
 * (src/data/services.ts). Layout del prototipo Lab; adición multi-página:
 * enlace "VER PÁGINA COMPLETA" al detalle /servicios/:slug.
 */
const catalog = services.map((service, index) => ({
  slug: service.slug,
  number: String(index + 1).padStart(2, "0"),
  name: service.title,
  short: service.subtitle,
  description: service.shortDescription,
  tags: service.variants
    ? service.variants.map((variant) => variant.name)
    : (service.features ?? []).slice(0, 3).map((feature) => feature.title),
}));

export default function CapabilitiesCatalog() {
  const [activeSlug, setActiveSlug] = useState(catalog[0].slug);
  const active = catalog.find((item) => item.slug === activeSlug) ?? catalog[0];

  /** Navegación por flechas del tablist (APG): ↑↓/←→ mueven, Home/Extreme. */
  function onKeyDown(event: KeyboardEvent) {
    const currentIndex = catalog.findIndex((item) => item.slug === active.slug);
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % catalog.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + catalog.length) % catalog.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = catalog.length - 1;
    }
    if (nextIndex === null) return;
    event.preventDefault();
    const next = catalog[nextIndex];
    setActiveSlug(next.slug);
    document.getElementById(`catalog-tab-${next.slug}`)?.focus();
  }

  return (
    <section className="lab-capabilities" id="capacidades">
      <header>
        <span>[ CATÁLOGO DE CAPACIDADES ]</span>
        <h2>
          ELIGE TU
          <br />
          SIGUIENTE
          <br />
          <em>VENTAJA.</em>
        </h2>
        <p>Seis formas de convertir IA en infraestructura de negocio.</p>
      </header>
      <div className="lab-catalog">
        <div
          className="lab-catalog__rows"
          role="tablist"
          aria-label="Capacidades"
          onKeyDown={onKeyDown}
        >
          {catalog.map((item) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`catalog-tab-${item.slug}`}
              aria-selected={item.slug === active.slug}
              aria-controls="catalog-panel"
              tabIndex={item.slug === active.slug ? 0 : -1}
              onClick={() => setActiveSlug(item.slug)}
            >
              <span>{item.number}</span>
              <strong>{item.name}</strong>
              <small>{item.short}</small>
              <b aria-hidden="true">↗</b>
            </button>
          ))}
        </div>
        <div
          className="lab-catalog__detail"
          role="tabpanel"
          id="catalog-panel"
          aria-labelledby={`catalog-tab-${active.slug}`}
        >
          <span>CAPACIDAD / {active.number}</span>
          <h3>{active.name}</h3>
          <p>{active.description}</p>
          <ul>
            {active.tags.map((tag) => (
              <li key={tag}>[{tag}]</li>
            ))}
          </ul>
          <a href={waLink(active.slug)} target="_blank" rel="noopener noreferrer">
            COTIZAR ESTA CAPACIDAD ↗
          </a>
          <Link className="lab-catalog__page" to={`/servicios/${active.slug}`}>
            VER PÁGINA COMPLETA →
          </Link>
          <div className="lab-catalog__barcode" aria-hidden="true">
            |||| || | |||| | | ||| || ||||
          </div>
        </div>
      </div>
    </section>
  );
}
