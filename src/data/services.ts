import type { LucideIcon } from "lucide-react";
import {
  Cpu,
  MessageSquare,
  Phone,
  Shield,
  Map,
  GraduationCap,
} from "lucide-react";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceUseCase {
  title: string;
  description: string;
  metrics: string[];
}

export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  shortDescription: string;
  longDescription: string;
  features: ServiceFeature[];
  process: ServiceProcessStep[];
  useCase: ServiceUseCase;
  faq: ServiceFAQ[];
}

export const services: Service[] = [
  {
    slug: "bb-one",
    title: "BB One",
    subtitle: "Bot Box Hardware",
    icon: Cpu,
    shortDescription:
      "Hardware dedicado que ejecuta automatizaciones de IA de forma local y segura con latencia cero. Tu infraestructura privada de inteligencia artificial.",
    longDescription:
      "BB One es un dispositivo de hardware dedicado que ejecuta modelos de IA y automatizaciones directamente en tus instalaciones. Sin dependencia de la nube, sin latencia, sin riesgo de que tus datos salgan de tu red. Piensa en él como tu servidor privado de inteligencia artificial.",
    features: [
      {
        title: "Latencia cero",
        description:
          "Procesamiento 100% local. Sin dependencia de internet para inferencia. Respuestas en milisegundos, no segundos.",
      },
      {
        title: "Seguridad por diseño",
        description:
          "Tus datos nunca salen de tu red. Cumplimiento automático con regulaciones de protección de datos mexicanas e internacionales.",
      },
      {
        title: "Plug-and-play",
        description:
          "Conecta, configura y opera. Sin instalaciones complejas, sin dependencia de equipo técnico interno.",
      },
      {
        title: "Actualizaciones remotas",
        description:
          "Modelos y automatizaciones se actualizan de forma remota sin interrumpir la operación.",
      },
      {
        title: "Monitoreo 24/7",
        description:
          "Dashboard en tiempo real con métricas de rendimiento, uso y salud del sistema.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Diagnóstico de infraestructura",
        description:
          "Evaluamos tu red, sistemas existentes y necesidades de procesamiento para dimensionar el hardware adecuado.",
      },
      {
        step: 2,
        title: "Configuración y despliegue",
        description:
          "Instalamos BB One en tus instalaciones, configuramos los modelos de IA y conectamos con tus sistemas.",
      },
      {
        step: 3,
        title: "Capacitación y handoff",
        description:
          "Tu equipo aprende a operar el sistema. Entregamos documentación y acceso al dashboard de monitoreo.",
      },
      {
        step: 4,
        title: "Soporte continuo",
        description:
          "Monitoreo remoto, actualizaciones de modelos y soporte técnico incluido.",
      },
    ],
    useCase: {
      title: "Despacho de ajustes de siniestros",
      description:
        "GMB Ajustes necesitaba procesar 500+ documentos diarios sin enviar datos sensibles a la nube. BB One procesa OCR, clasificación y extracción de datos localmente.",
      metrics: [
        "500+ documentos/día procesados localmente",
        "0 datos enviados a servicios externos",
        "3x más rápido que el proceso manual",
      ],
    },
    faq: [
      {
        q: "¿Qué modelos de IA puede ejecutar BB One?",
        a: "BB One soporta modelos LLM locales (Llama, Mistral, Phi), modelos de visión para OCR y clasificación, y modelos de voz para transcripción. La selección depende del hardware dimensionado para tu caso.",
      },
      {
        q: "¿Necesito conexión a internet?",
        a: "Solo para actualizaciones remotas y monitoreo. La inferencia y procesamiento funcionan 100% offline. Si se cae tu internet, BB One sigue operando.",
      },
      {
        q: "¿Cuánto espacio físico ocupa?",
        a: "El dispositivo base tiene el tamaño de un mini-PC. Se instala en tu rack de servidores o en cualquier superficie plana con conexión eléctrica y de red.",
      },
      {
        q: "¿Qué pasa si el hardware falla?",
        a: "Incluimos respaldo automático de configuración y modelos. Si el hardware necesita reemplazo, desplegamos uno nuevo con tu configuración restaurada en menos de 24 horas.",
      },
    ],
  },
  {
    slug: "coworkers-digitales",
    title: "Coworkers Digitales",
    subtitle: "Agentes Edge & Internos",
    icon: MessageSquare,
    shortDescription:
      "Agentes inteligentes en WhatsApp y Telegram. Atención al cliente, operaciones internas y flujos de trabajo complejos con comprensión de contexto natural.",
    longDescription:
      "Coworkers Digitales son agentes de IA que viven en los canales donde tu equipo y clientes ya están: WhatsApp, Telegram y tu plataforma interna. No son chatbots genéricos — comprenden el contexto de tu negocio, acceden a tus bases de datos y ejecutan acciones reales.",
    features: [
      {
        title: "WhatsApp Business nativo",
        description:
          "Integración directa con WhatsApp Business API. Tus clientes interactúan sin instalar nada nuevo.",
      },
      {
        title: "Comprensión de contexto",
        description:
          "El agente recuerda historial de conversaciones, conoce tus productos y entiende el jerga de tu industria.",
      },
      {
        title: "Acciones reales",
        description:
          "No solo responde preguntas: consulta inventarios, genera cotizaciones, agenda citas, crea tickets en tu CRM.",
      },
      {
        title: "Escalamiento a humanos",
        description:
          "Cuando el agente detecta que no puede resolver algo, escala automáticamente a un operador humano con todo el contexto.",
      },
      {
        title: "Multi-canal",
        description:
          "Mismo agente, múltiples canales. WhatsApp, Telegram, web chat y APIs internas con una sola configuración.",
      },
      {
        title: "Analytics integrado",
        description:
          "Dashboard con métricas de conversaciones, satisfacción, resoluciones y tiempos de respuesta.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Mapeo de conversaciones",
        description:
          "Identificamos los flujos de conversación más frecuentes en tu operación actual para diseñar el agente.",
      },
      {
        step: 2,
        title: "Diseño y entrenamiento",
        description:
          "Configuramos la personalidad, el conocimiento base y las integraciones con tus sistemas.",
      },
      {
        step: 3,
        title: "Piloto controlado",
        description:
          "Desplegamos con un grupo piloto de usuarios. Monitoreamos y ajustamos antes del lanzamiento completo.",
      },
    ],
    useCase: {
      title: "Coordinación de inspectores de siniestros",
      description:
        "GMB Ajustes manejaba la asignación de citas de inspectores por llamadas y WhatsApp manual. Un Coworker Digital ahora gestiona automáticamente la asignación, confirmación y seguimiento.",
      metrics: [
        "60% reducción en tiempo de coordinación",
        "29,000+ registros procesados",
        "Disponible 24/7 sin intervención humana",
      ],
    },
    faq: [
      {
        q: "¿Pueden los Coworkers manejar conversaciones complejas?",
        a: "Sí. No son chatbots de menú. Comprenden lenguaje natural, manejan contexto de conversaciones largas y pueden ejecutar flujos de múltiples pasos (cotizar, confirmar, agendar, notificar).",
      },
      {
        q: "¿Cuánto toma implementar un Coworker Digital?",
        a: "El piloto funcional se despliega en 2-3 semanas. La fase de producción completa con todas las integraciones toma 4-6 semanas.",
      },
      {
        q: "¿Puedo tener más de un Coworker?",
        a: "Sí. Puedes tener agentes especializados: uno para atención al cliente, otro para operaciones internas, otro para soporte técnico. Cada uno con su propia personalidad y conocimiento.",
      },
    ],
  },
  {
    slug: "voice-coworkers",
    title: "Voice Coworkers",
    subtitle: "Agentes Telefónicos",
    icon: Phone,
    shortDescription:
      "Atención telefónica automatizada indistinguible de un operador humano, con integración directa a tu CRM y bases de datos.",
    longDescription:
      "Voice Coworkers son agentes de IA que atienden llamadas telefónicas con voz natural y comprensión completa del contexto. Se integran con tu telefonía IP existente, CRM y bases de datos para resolver, transferir o escalar cada llamada de forma inteligente.",
    features: [
      {
        title: "Voz natural ultra-realista",
        description:
          "Voces en español neutro y latino que no suenan robóticas. Latencia de respuesta menor a 1 segundo.",
      },
      {
        title: "Telefonía IP integrada",
        description:
          "Compatible con FreeSWITCH, Twilio, Vonage y cualquier sistema SIP estándar.",
      },
      {
        title: "CRM bidireccional",
        description:
          "Consulta y actualiza información en Salesforce, HubSpot y cualquier CRM durante la llamada en tiempo real.",
      },
      {
        title: "Transcripción en vivo",
        description:
          "Cada llamada se transcribe automáticamente para análisis, calidad y cumplimiento.",
      },
      {
        title: "Flujos conversacionales",
        description:
          "Maneja llamadas de ventas, soporte, encuestas y seguimiento con flujos personalizados por tipo.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Auditoría de telefonía",
        description:
          "Evaluamos tu infraestructura telefónica actual (PBX, SIP trunking, volúmenes de llamadas) para diseñar la integración.",
      },
      {
        step: 2,
        title: "Diseño de flujos de voz",
        description:
          "Definimos los flujos conversacionales, tono de voz, scripts y reglas de escalamiento.",
      },
      {
        step: 3,
        title: "Integración y pruebas",
        description:
          "Conectamos con tu telefonía y CRM. Probamos con llamadas reales controladas antes de salir en vivo.",
      },
      {
        step: 4,
        title: "Despliegue gradual",
        description:
          "Iniciamos con un porcentaje de llamadas y escalamos conforme validamos rendimiento y satisfacción.",
      },
    ],
    useCase: {
      title: "Centro de atención de seguros",
      description:
        "Una aseguradora recibía 200+ llamadas diarias de reporte de siniestros. Voice Coworker captura datos del reporte, verifica póliza y asigna ajustador automáticamente.",
      metrics: [
        "200+ llamadas/día atendidas automáticamente",
        "70% de llamadas resueltas sin intervención humana",
        "45 segundos promedio de ahorro por llamada",
      ],
    },
    faq: [
      {
        q: "¿La voz suena robótica?",
        a: "No. Usamos modelos de síntesis de voz de última generación con voces en español neutro. La mayoría de los callers no distinguen que están hablando con una IA.",
      },
      {
        q: "¿Funciona con mi central telefónica actual?",
        a: "Probablemente sí. Voice Coworkers es compatible con cualquier sistema que soporte SIP (FreeSWITCH, Asterisk, 3CX, Twilio, Vonage, etc.). Hacemos la auditoría antes de empezar.",
      },
      {
        q: "¿Qué pasa si la llamada es muy compleja?",
        a: "El agente detecta cuando una llamada supera su capacidad y transfiere a un agente humano con todo el contexto de la conversación. Sin que el caller tenga que repetir información.",
      },
    ],
  },
  {
    slug: "agent-pentesting",
    title: "Agent Pentesting",
    subtitle: "Validación de Seguridad",
    icon: Shield,
    shortDescription:
      "Auditorías rigurosas para asegurar que tus agentes de IA no sean vulnerables a inyecciones de prompts o filtración de datos sensibles.",
    longDescription:
      "Agent Pentesting es nuestro servicio especializado de auditoría de seguridad para sistemas de IA. Evaluamos tus agentes con más de 60 patrones de ataque documentados para identificar vulnerabilidades antes de que sean explotadas. Porque un agente de IA sin pruebas de seguridad es un riesgo.",
    features: [
      {
        title: "60+ patrones de ataque",
        description:
          "Suite completa de pruebas que cubre inyección de prompts, jailbreaking, extracción de datos y manipulación de contexto.",
      },
      {
        title: "7 categorías de vulnerabilidad",
        description:
          "Inyección directa, indirecta, role-playing, encoding, multi-turno, lateral y de infraestructura.",
      },
      {
        title: "Reportes ejecutivos y técnicos",
        description:
          "Dos niveles de reporte: uno ejecutivo con riesgo y recomendaciones, otro técnico con payloads y reproducción exacta.",
      },
      {
        title: "Re-tests incluidos",
        description:
          "Después de cada remediación, verificamos que las vulnerabilidades estén efectivamente cerradas.",
      },
      {
        title: "Compliance-ready",
        description:
          "Alineado con OWASP Top 10 para LLMs y mejores prácticas de seguridad de la industria.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Scope y contexto",
        description:
          "Definimos el alcance de la auditoría: agentes a probar, canales de entrada, datos sensibles en scope.",
      },
      {
        step: 2,
        title: "Ejecución de pruebas",
        description:
          "Aplicamos nuestra suite de 60+ patrones de ataque adaptados al contexto específico de tu agente.",
      },
      {
        step: 3,
        title: "Reporte y recomendaciones",
        description:
          "Entregamos reporte ejecutivo y técnico con vulnerabilidades encontradas, severidad y pasos de remediación.",
      },
    ],
    useCase: {
      title: "Agente de atención al cliente en producción",
      description:
        "Una empresa de fintech tenía un agente de IA atendiendo consultas de saldo y movimientos. Nuestra auditoría encontró que podía ser manipulado para revelar datos de otros usuarios.",
      metrics: [
        "12 vulnerabilidades encontradas",
        "3 críticas de filtración de datos",
        "0 incidentes post-remediación",
      ],
    },
    faq: [
      {
        q: "¿Necesito tener un agente de IA para contratar este servicio?",
        a: "Sí. El pentesting evalúa agentes existentes. Si estás planeando construir uno, te recomendamos hacerlo como parte del proceso de despliegue.",
      },
      {
        q: "¿Cuánto toma una auditoría completa?",
        a: "Depende de la complejidad del agente. Un agente simple (chatbot) toma 3-5 días. Un sistema multi-agente con integraciones puede tomar 2-3 semanas.",
      },
      {
        q: "¿El pentesting puede afectar mi operación?",
        a: "No. Ejecutamos en ambiente de staging o con controles que no afectan usuarios reales. Nunca probamos con datos de producción reales.",
      },
    ],
  },
  {
    slug: "mapyourflow",
    title: "MapYourFlow",
    subtitle: "Mapeo de Procesos con IA",
    icon: Map,
    shortDescription:
      "Plataforma para visualizar, simular y optimizar las interacciones y decisiones de tus agentes automatizados con scoring de automatización.",
    longDescription:
      "MapYourFlow es nuestra plataforma SaaS que te permite diagnosticar qué tan automatizable es cada proceso de tu empresa. Con un scoring de 0-100 y entrevistas guiadas por IA, identificas exactamente dónde invertir en automatización y cuáles procesos son mejor dejarlos humanos.",
    features: [
      {
        title: "Scoring de automatización (SAI)",
        description:
          "Cada proceso recibe un score de 0-100 que indica su potencial de automatización. Datos, no opiniones.",
      },
      {
        title: "Entrevistas guiadas por IA",
        description:
          "Motor de entrevistas que extrae información operativa de tu equipo de forma estructurada y eficiente.",
      },
      {
        title: "Visualización de procesos",
        description:
          "Diagramas generados automáticamente que muestran el flujo actual, cuellos de botella y oportunidades.",
      },
      {
        title: "Roadmap priorizado",
        description:
          "Listado de procesos ordenados por impacto y factibilidad de automatización con estimaciones de ROI.",
      },
      {
        title: "Multi-equipo",
        description:
          "Cada departamento mapea sus procesos independientemente con vista consolidada para dirección.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Crear organización",
        description:
          "Configuras tu empresa, departamentos y equipo. La plataforma se adapta a tu estructura.",
      },
      {
        step: 2,
        title: "Entrevistas de diagnóstico",
        description:
          "Tu equipo responde entrevistas guiadas por IA sobre sus procesos. Sin necesidad de consultores presenciales.",
      },
      {
        step: 3,
        title: "Análisis y scoring",
        description:
          "MapYourFlow calcula el SAI de cada proceso y genera el roadmap priorizado.",
      },
    ],
    useCase: {
      title: "Diagnóstico de automatización empresarial",
      description:
        "SONARA (compañía de logística) usó MapYourFlow para diagnosticar sus procesos. Obtuvo un score global de 76/100 con 8 procesos críticos identificados para automatización inmediata.",
      metrics: [
        "76/100 score global de automatización",
        "8 procesos críticos identificados",
        "ROI estimado de 3.2x en primer año",
      ],
    },
    faq: [
      {
        q: "¿Es MapYourFlow solo para empresas grandes?",
        a: "No. Funciona para cualquier empresa que quiera entender qué automatizar. Desde 5 hasta 500+ empleados. El diagnóstico escala con tu tamaño.",
      },
      {
        q: "¿Cuánto toma un diagnóstico completo?",
        a: "Un departamento típico completa sus entrevistas en 1-2 semanas. El diagnóstico completo de una empresa mediana toma 3-4 semanas.",
      },
      {
        q: "¿Necesito equipo técnico para usarlo?",
        a: "Cero. La plataforma está diseñada para perfiles operativos. Las entrevistas son conversacionales y los resultados se presentan de forma visual e intuitiva.",
      },
    ],
  },
  {
    slug: "ai-training",
    title: "AI Training",
    subtitle: "Capacitación Empresarial",
    icon: GraduationCap,
    shortDescription:
      "Capacitación especializada para equipos. Enseñamos a integrar y colaborar eficientemente con herramientas de IA para elevar la productividad.",
    longDescription:
      "AI Training es nuestro programa de capacitación empresarial en herramientas de IA. No es un curso genérico: diseñamos programas personalizados con casos prácticos de tu industria, tu equipo y tus herramientas. Desde principiantes hasta power users.",
    features: [
      {
        title: "3 niveles de profundidad",
        description:
          "Principiante (fundamentos), Intermedio (herramientas y flujos) y Avanzado (automatización y agentes). Tu equipo avanza a su ritmo.",
      },
      {
        title: "Casos prácticos de tu industria",
        description:
          "No ejercicios genéricos. Usamos escenarios reales de tu negocio para que el aprendizaje sea inmediatamente aplicable.",
      },
      {
        title: "Herramientas que usarás",
        description:
          "Capacitamos en ChatGPT, Claude, Copilot, n8n, Make y las herramientas específicas que tu equipo necesita.",
      },
      {
        title: "Talleres hands-on",
        description:
          "Sesiones prácticas donde tu equipo construye automatizaciones reales durante la capacitación.",
      },
      {
        title: "Seguimiento post-training",
        description:
          "Evaluación de adopción y soporte durante las primeras semanas para asegurar que el aprendizaje se convierta en hábito.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Diagnóstico de necesidades",
        description:
          "Evaluamos el nivel actual del equipo, herramientas en uso y objetivos de productividad.",
      },
      {
        step: 2,
        title: "Programa personalizado",
        description:
          "Diseñamos el temario, casos prácticos y ejercicios específicos para tu equipo y tu industria.",
      },
      {
        step: 3,
        title: "Sesiones de capacitación",
        description:
          "Impartimos las sesiones (presencial u online) con contenido práctico y ejercicios hands-on.",
      },
      {
        step: 4,
        title: "Seguimiento y medición",
        description:
          "Evaluamos adopción, resolvemos dudas y medimos el impacto en productividad real.",
      },
    ],
    useCase: {
      title: "Capacitación de equipo de operaciones",
      description:
        "GMB capacitó a su equipo de operaciones en herramientas de IA para procesamiento de documentos y reportes automatizados. El equipo pasó de procesos manuales a flujos semi-automatizados en 3 semanas.",
      metrics: [
        "15 personas capacitadas en 3 niveles",
        "40% reducción en tareas repetitivas",
        "100% de adopción de herramientas en 30 días",
      ],
    },
    faq: [
      {
        q: "¿Las capacitaciones son presenciales u online?",
        a: "Ambas. Ofrecemos sesiones presenciales en tu oficina (CDMX y área metropolitana) y sesiones online para equipos distribuidos. También tenemos formato híbrido.",
      },
      {
        q: "¿Cuánto dura el programa completo?",
        a: "El programa básico (nivel principiante) son 4 sesiones de 2 horas. El programa completo (3 niveles) son 12 sesiones distribuidas en 4-6 semanas.",
      },
      {
        q: "¿Necesito experiencia previa en IA?",
        a: "No. El nivel principiante arranca desde cero: qué es la IA, cómo funciona, cómo interactuar con ella. Solo necesitas saber usar una computadora.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
