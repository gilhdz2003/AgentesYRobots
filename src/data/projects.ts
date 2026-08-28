export type ProjectStatus = "en_vivo" | "en_desarrollo" | "completado" | "laboratorio";
export type ProjectCategory = "web-app" | "automatizacion" | "laboratorio";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  deployUrl?: string;
  deployLabel?: string;
  description: string;
}

export const projects: Project[] = [
  // ── TOP 6 DESTACADOS ──
  {
    id: "mapyourflow",
    name: "MapYourFlow",
    category: "web-app",
    status: "en_vivo",
    featured: true,
    deployUrl: "https://mapyourflowapp.vercel.app",
    description:
      "Plataforma SaaS de mapeo de procesos con scoring IA. Clientes como SONARA la usan para diagnosticar operaciones y optimizar flujos de trabajo.",
  },
  {
    id: "konectify-portal",
    name: "Konectify Portal",
    category: "web-app",
    status: "en_vivo",
    featured: true,
    deployUrl: "https://konectify.cloud",
    description:
      "Portal de servicios de automatización e IA. 5 landing pages con terminal de diagnóstico interactivo que muestra 4 escenarios de negocio reales.",
  },
  {
    id: "imperam",
    name: "Imperam",
    category: "web-app",
    status: "en_desarrollo",
    featured: true,
    deployUrl: "https://imperam.mx",
    description:
      "Ecommerce B2C de impermeabilizantes ecológicos. Calculadora de cobertura, blog educativo, códigos promocionales y programa de distribuidores.",
  },
  {
    id: "ar-trading-capital",
    name: "AR Trading Capital",
    category: "web-app",
    status: "en_desarrollo",
    featured: true,
    description:
      "Plataforma de inversión en activos digitales con KYC obligatorio, 3 planes de rendimiento y programa de referidos. Cumple LFPIORPI México.",
  },
  {
    id: "altafolio",
    name: "AltaFolio",
    category: "automatizacion",
    status: "en_vivo",
    featured: true,
    deployLabel: "Demo disponible",
    description:
      "Sistema de alta de folios de ajustadores con autenticación JWT 406. Gestiona el registro y seguimiento de siniestros del sistema ROL con 53K+ registros.",
  },
  {
    id: "desserts-n-coffee",
    name: "DessertsNCoffee",
    category: "web-app",
    status: "completado",
    featured: true,
    description:
      "Sitio estático de 18 recetas con catálogo con filtros, conversor de medidas y blog. Ejemplo de entrega rápida de contenido web.",
  },

  // ── WEB APPS ──
  {
    id: "ar-inspecciones",
    name: "AR Inspecciones",
    category: "web-app",
    status: "en_vivo",
    featured: false,
    deployUrl: "https://ar-inspecciones.vercel.app",
    description:
      "Sistema de gestión de citas para inspectores de siniestros de GMB. 5 roles, calendario, checklists y reportes. Reduce tiempos de coordinación y elimina errores manuales.",
  },
  {
    id: "agentes-robots",
    name: "Agentes & Robots",
    category: "web-app",
    status: "en_vivo",
    featured: false,
    description:
      "Portal B2B de 6 servicios de IA empresarial: chatbots, voice agents, pentesting, automatización, mapeo de procesos y capacitación.",
  },
  {
    id: "orderfoodonline",
    name: "OrderFoodOnline",
    category: "web-app",
    status: "en_desarrollo",
    featured: false,
    description:
      "SaaS B2B para automatizar pedidos diarios entre restaurantes y clientes corporativos. Menú del día, comanda de cocina en tiempo real, reportes.",
  },
  {
    id: "nefastos",
    name: "Nefastos.com",
    category: "web-app",
    status: "en_desarrollo",
    featured: false,
    deployUrl: "https://nefastos.com",
    description:
      "Portal ciudadano con Score Nefasto 0-100. Los usuarios publican quejas con evidencia; las empresas reciben calificación automática. Principio inviolable: jamás se vende la eliminación de quejas.",
  },
  {
    id: "cursosia",
    name: "CursosIA",
    category: "web-app",
    status: "en_desarrollo",
    featured: false,
    description:
      "Plataforma de formación en IA con 3 niveles, 39 lecciones y 37 casos prácticos. Enfocada en aplicaciones con herramientas freemium.",
  },
  {
    id: "mundial2026",
    name: "Mundial 2026 Tracker",
    category: "web-app",
    status: "en_desarrollo",
    featured: false,
    description:
      "Tracker interactivo de la Copa del Mundo FIFA 2026 con 48 equipos, standings, calendario y sistema de live scoring con ESPN + API-Football.",
  },

  // ── AUTOMATIZACIÓN ──
  {
    id: "control-horario",
    name: "Control de Horario",
    category: "automatizacion",
    status: "en_vivo",
    featured: false,
    description:
      "Servicio de control horario con compliance LFT (reforma 40 horas). Extracción desde checadores biométricos, dashboard con semáforo por empleado, reportes STPS listos para auditoría.",
  },
  {
    id: "voice-agent-wendy",
    name: "Voice Agent (Wendy)",
    category: "automatizacion",
    status: "en_desarrollo",
    featured: false,
    description:
      "Pipeline de agentes de voz IA para llamadas entrantes. FreeSWITCH + Deepgram STT + Gemini LLM + Cartesia TTS. Captura datos de prospectos en 12 turnos automáticos.",
  },
  {
    id: "printbot",
    name: "PrintBot",
    category: "automatizacion",
    status: "en_vivo",
    featured: false,
    description:
      "Bot que descarga fotos de siniestros, genera PDFs y los envía a imprimir automáticamente. Automatiza un proceso manual que consumía horas por día.",
  },
  {
    id: "agentic-os-kit",
    name: "Agentic OS Starter Kit",
    category: "automatizacion",
    status: "en_desarrollo",
    featured: false,
    description:
      "CLI installer que genera un Sistema Operativo Agéntico personalizado. El cliente recibe Obsidian + Claude Code + Dashboard con botones sin tocar terminal.",
  },

  // ── LABORATORIO ──
  {
    id: "ktm-dashboard",
    name: "KTM Dashboard",
    category: "laboratorio",
    status: "completado",
    featured: false,
    description:
      "Dashboard visual del sistema Kimi Task Management. Muestra todos los proyectos con métricas, estados y prioridades. Herramienta interna que demuestra capacidad de diseño UI.",
  },
  {
    id: "ai-pentest-toolkit",
    name: "AI Pentest Toolkit",
    category: "laboratorio",
    status: "laboratorio",
    featured: false,
    description:
      "Investigación de seguridad en IA con 60 patrones de prompt injection en 7 categorías. Base del servicio Agent Pentesting de Agentes&Robots.",
  },
  {
    id: "inworld-ai",
    name: "Inworld AI SDK",
    category: "laboratorio",
    status: "laboratorio",
    featured: false,
    description:
      "Evaluación de SDK de agentes conversacionales. 55+ templates explorados (voz, RAG, seguridad). Aplicable a clientes empresariales de 51-500 empleados.",
  },
  {
    id: "agent-designed-cli",
    name: "Agent-Designed CLI",
    category: "laboratorio",
    status: "laboratorio",
    featured: false,
    description:
      "Investigación de ecosistema Go para CLIs token-eficientes + skills de Claude Code + servidores MCP. Concepto: SQLite-first con FTS5.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const gridProjects = projects.filter((p) => !p.featured);

export const categoryLabels: Record<ProjectCategory, string> = {
  "web-app": "Web App",
  automatizacion: "Automatización",
  laboratorio: "Laboratorio",
};

export const statusConfig: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  en_vivo: { label: "● EN VIVO", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  en_desarrollo: { label: "⚡ EN DESARROLLO", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  completado: { label: "✅ COMPLETADO", className: "bg-brand-accent/15 text-brand-accent border-brand-accent/30" },
  laboratorio: { label: "🔬 LABORATORIO", className: "bg-violet-500/15 text-violet-400 border-violet-500/30" },
};
