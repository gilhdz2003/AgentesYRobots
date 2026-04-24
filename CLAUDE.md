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

| Producto | Descripcion |
|----------|-------------|
| BB One | Hardware dedicado para automatizaciones IA locales |
| Coworkers Digitales | Agentes de texto en WhatsApp/Telegram |
| Voice Coworkers | Agentes telefonicos con IA |
| Agent Pentesting | Auditorias de seguridad para agentes IA |
| MapYourFlow.app | Plataforma mapeo de procesos con scoring |
| AI Training | Capacitacion empresarial en herramientas IA |

## Estructura del Proyecto

```
Agentes&Robots/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx      # Navegacion fija con glassmorphism
│   │   ├── Hero.tsx        # Hero editorial con serif + imagen grayscale
│   │   ├── Solutions.tsx   # Grid de cards de productos (3 col)
│   │   ├── CTA.tsx         # Call to action con gradiente
│   │   └── Footer.tsx      # Footer con links reales y social
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Design tokens (@theme)
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
