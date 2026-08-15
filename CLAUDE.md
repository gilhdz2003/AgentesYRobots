# Agentes&Robots - Portal B2B

> **Creado**: Abril 24, 2026
> **Estado**: En desarrollo local
> **Objetivo**: Portal B2B de productos y soluciones de IA empresarial

---

## Descripcion

Portal de servicios B2B para **Agentes&Robots** — marca de infraestructura de IA y automatización empresarial. Companion de **Cronicas de Robots** (portal de contenido).

**Propuesta de valor**: Diseñamos y desplegamos infraestructuras de IA que transforman la operatividad de empresas.

## Stack Tecnico

- **Vite 6** + **React 19** + **TypeScript 5.8**
- **Tailwind CSS 4** (con `@theme` tokens)
- **Motion** (framer-motion rebranded) para animaciones
- **Lucide React** para iconos
- **Deploy**: Hostinger (plan Business) como sitio estático

## Productos/Soluciones

Catalogo de **6 familias** (2 con sub-tipos). Fuente de verdad: `src/data/services.ts`.

| Familia | Sub-tipos | Descripcion |
|---------|-----------|-------------|
| BB One | — | Hardware dedicado para automatizaciones IA locales |
| Coworkers Digitales | Chat Agents / Voice Agents / Agent Workflows | Agentes de IA conversacionales y operativos: chat, voz e integraciones |
| Security Testing | Agent Security / Web Security | Pentesting de agentes IA (60+ patrones) y web tradicional (OWASP Top 10) |
| MapYourFlow | — | Plataforma de mapeo de procesos con scoring de automatizacion |
| Agent Visibility | — | Presencia agentica y AEO ante ChatGPT, Perplexity y Gemini |
| AI Training | — | Capacitacion empresarial en herramientas IA |

### Arquitectura del catalogo (Enfoque A)

- `Service` tiene `variants?` **opcional** (`src/types/catalog.ts`): si una familia define `variants`, el detalle (features, useCase, faq, pricing) vive en cada sub-tipo y los campos a nivel Service se ignoran; si no, el servicio es "plano" y usa sus campos directos.
- El **pricing vive por sub-tipo**, con 3 modelos (`ServicePricing.model`): `tiered` (planes), `modular` (hub + tiers, BB One) y `quote` ("desde $X", Workflows y Agent Security).
- Una familia = **1 pagina** (`/servicios/{slug}`) con **sticky sub-nav** de anclas por variante (`#{variant-slug}`); los servicios planos renderizan el layout directo.

## Estructura del Proyecto

```
Agentes&Robots/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx      # Navegacion fija con glassmorphism (6 familias)
│   │   ├── Hero.tsx        # Hero editorial con serif + imagen grayscale
│   │   ├── Solutions.tsx   # Grid de cards del catalogo (6 familias)
│   │   ├── CTA.tsx         # Call to action con gradiente
│   │   ├── Footer.tsx      # Footer con links a las 6 familias
│   │   ├── service/        # VariantNav (sticky), VariantBlock, Features/UseCase/FAQSection
│   │   └── pricing/        # TieredPlans, ModularPricing, QuotePricing, PlanCard
│   ├── data/
│   │   └── services.ts     # Catalogo: 6 familias (fuente de verdad)
│   ├── types/
│   │   └── catalog.ts      # Service, ServiceVariant, ServicePricing
│   ├── pages/
│   │   ├── ServicePage.tsx # Detalle: familia (variants + sub-nav) o servicio plano
│   │   └── About/Contact/CaseStudies
│   ├── App.tsx             # Router: /, /servicios/:slug, /nosotros, /contacto, /casos
│   ├── main.tsx
│   └── index.css           # Design tokens (@theme)
├── public/
│   ├── robots.txt
│   └── sitemap.xml         # Incluye las 6 URLs /servicios
├── CLAUDE.md
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Design Tokens

| Token | Valor | Uso |
|-------|-------|-----|
| brand-accent | `#38bdf8` (sky blue) | CTAs, hovers, iconos |
| brand-bg | `#020617` (slate-950) | Fondo principal |
| brand-card | `#0f172a` (slate-900) | Cards, surfaces |
| brand-border | `#1e293b` (slate-800) | Bordes |

**Tipografias**: Playfair Display (hero serif), Space Grotesk (display), Inter (body)

## Comandos

```bash
npm run dev      # Dev server en puerto 3000
npm run build    # Build a dist/
npm run preview  # Preview del build
```

## Deploy en Hostinger

Este es un sitio estatico (SPA). El deploy consiste en:
1. `npm run build` genera `dist/`
2. Subir contenido de `dist/` via File Manager o Git
3. No necesita Node.js en servidor — solo HTML/CSS/JS estatico

## Proyecto Relacionado

- **Cronicas de Robots**: Portal de contenido/blog (por crear)
- **agentesyrobots.com** (viejo): Respaldo en `.agentesyrobots_backup_20260424/`
- **MapYourFlow.app**: Producto hermano con su propio deploy

---

*Este documento se actualiza conforme avanza el desarrollo.*
