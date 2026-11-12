import SEO, { breadcrumbSchema } from "../components/SEO";
import ProjectGrid from "../components/ProjectGrid";
import { gridProjects } from "../data/projects";
import { waLink } from "../data/contact";

const cases = [
  {
    id: "ar-inspecciones",
    title: "AR Inspecciones",
    client: "GMB Ajustes",
    category: "Coworkers Digitales + BB One",
    challenge:
      "GMB gestionaba la asignación de inspectores de siniestros manualmente por llamadas y WhatsApp. 500+ documentos diarios sin procesamiento automatizado. Datos sensibles de asegurados que no podían salir a la nube.",
    solution:
      "Implementación de un Coworker Digital en WhatsApp para asignación automática de citas + BB One para procesamiento local de documentos con OCR. Sistema web Next.js con dashboard de seguimiento.",
    metrics: [
      "29,000+ registros procesados",
      "60% reducción en tiempo de coordinación",
      "0 datos enviados a servicios externos",
      "7 bots RPA en producción",
    ],
    stack: "Next.js 15, Drizzle ORM, Neon PostgreSQL, WhatsApp Business API",
    link: "https://ar-inspecciones.vercel.app",
  },
  {
    id: "estadisticas-bots",
    title: "Dashboard de Bots RPA",
    client: "GMB Operaciones",
    category: "Automatización + Analytics",
    challenge:
      "7 bots RPA operando sin visibilidad. No había forma de saber si estaban funcionando, cuántos documentos procesaban, o dónde fallaban. La supervisión era manual y reactiva.",
    solution:
      "Dashboard web en Python con SQLite que monitorea los 7 bots en tiempo real: AIG, BBVA, AUTOS, DANOS, SINIESTROS, FACTURACION y RECEPCION_FACTURAS. Métricas de rendimiento, errores y throughput.",
    metrics: [
      "7 bots monitoreados en un dashboard",
      "Detección de fallos en tiempo real",
      "Puerto 3040 accesible desde cualquier punto de la red",
    ],
    stack: "Python, SQLite, Dashboard web",
    link: undefined,
  },
  {
    id: "zkteco",
    title: "Sistema de Asistencia ZKTeco",
    client: "GMB RRHH",
    category: "Automatización + Reportes",
    challenge:
      "Control de asistencia manual con dispositivo F22/ID. 2 años de datos (29,062 registros) sin explotar. Reportes semanales tomaban horas de trabajo manual.",
    solution:
      "Sistema automatizado que extrae datos del dispositivo ZKTeco, procesa 29,062 registros históricos y genera reportes ejecutivos. 3 ejecutables portables sin dependencia de Python.",
    metrics: [
      "29,062 registros extraídos (2 años)",
      "3 ejecutables portables entregados",
      "Documentación profesional PDF con branding",
    ],
    stack: "Python, ZKTeco SDK, PyInstaller",
    link: undefined,
  },
  {
    id: "sonara-mapyourflow",
    title: "SONARA — Diagnóstico Operativo",
    client: "SONARA",
    category: "MapYourFlow",
    challenge:
      "SONARA necesitaba documentar y optimizar sus procesos operativos pero no tenía un método estructurado para identificar cuellos de botella ni medir la eficiencia de cada área de la empresa.",
    solution:
      "Implementación de MapYourFlow para mapeo de 8 procesos críticos con scoring IA. Diagnóstico completo que identificó áreas de mejora prioritarias y generó un plan de optimización con ROI estimado.",
    metrics: [
      "Score 76/100 en diagnóstico operativo",
      "8 procesos críticos mapeados",
      "ROI estimado 3.2x en el primer año",
    ],
    stack: "Next.js 15, Supabase, Zai AI, Drizzle ORM",
    link: "https://mapyourflowapp.vercel.app",
  },
  {
    id: "voice-agent-konectify",
    title: "Voice Agent Wendy",
    client: "Konectify",
    category: "Voice Agents",
    challenge:
      "Konectify recibía prospectos por múltiples canales sin un sistema unificado de captura. Los leads entrantes por teléfono no se registraban automáticamente y se perdían oportunidades de negocio.",
    solution:
      "Pipeline de agente de voz con FreeSWITCH + Deepgram STT + Gemini LLM + Cartesia TTS. La agente Wendy contesta llamadas, diagnostica necesidades del prospecto y captura datos en 12 turnos de conversación.",
    metrics: [
      "Latencia reducida de ~5s a ~2.5-3.5s",
      "12 turnos de conversación automatizados",
      "Captura de datos sin intervención humana",
    ],
    stack: "FreeSWITCH, Deepgram, Gemini 2.5 Flash, Cartesia TTS",
    link: undefined,
  },
  {
    id: "pentesting-konectify",
    title: "Red Team a un Agente en Producción",
    client: "Konectify",
    category: "Agent Security",
    challenge:
      "Konectify opera su propio chatbot de IA atendiendo clientes reales en konectify.cloud. La pregunta incómoda: ¿qué pasa si un atacante lo manipula? La respuesta de la casa fue atacarlo primero nosotros: 4 campañas de ataque contra el agente EN PRODUCCIÓN, con reglas de engagement formales y cada respuesta documentada.",
    solution:
      "324 pruebas con arsenal creciente: prompt injection directa e indirecta, jailbreaks, exfiltración de datos y técnicas stateful multi-turno. El hallazgo crítico: el system prompt —el cerebro operativo del agente— era extraíble completo combinando crescendo conversacional con encoding ROT13. Remediación aplicada en producción y re-certificación ejecutando el mismo arsenal para demostrar el cierre.",
    metrics: [
      "324 ataques documentados en 4 campañas",
      "System prompt extraído → blindado y re-certificado",
      "De 18 fallos a 5 con el mismo arsenal (residuales BAJA)",
      "0 datos de clientes reales expuestos",
    ],
    stack: "promptfoo, OWASP Top 10 para LLMs, 60+ patrones en 7 categorías",
    link: undefined,
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <SEO
        title="Casos de Estudio"
        description="Proyectos reales de automatización con IA: desde gestión de siniestros hasta control de asistencia. Métricas y resultados comprobables."
        canonical="/casos"
        jsonLd={[
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Casos de Estudio", url: "/casos" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="px-4 pb-20 pt-16 min-[760px]:px-7 min-[760px]:pb-28 min-[760px]:pt-20">
        <div className="mx-auto max-w-7xl">
          <span className="label-telemetry mb-8 block text-muted">
            [ EXPEDIENTES DE CAMPO ]
          </span>
          <h1 className="mb-8 max-w-5xl font-serif text-5xl font-extrabold uppercase leading-[0.8] tracking-tight text-paper md:text-8xl">
            RESULTADOS REALES,
            <br />
            <em className="text-yellow not-italic">NO PRESENTACIONES.</em>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Cada proyecto abajo está en producción, con usuarios reales y
            métricas comprobables. No son demos ni pilotos.
          </p>
        </div>
      </section>

      {/* Expedientes */}
      <section className="px-4 pb-24 min-[760px]:px-7 min-[760px]:pb-32">
        <div className="mx-auto max-w-7xl">
          {cases.map((c, index) => (
            <article key={c.id} className="border-t border-line py-16 first:border-t-0">
              <div className="mb-10 font-mono text-[9px] uppercase leading-[1.7] tracking-[0.05em] text-muted">
                EXPERIMENTO: {c.title.toUpperCase()}
                <br />
                CLIENTE: {c.client.toUpperCase()} / TIPO: {c.category.toUpperCase()}
                <br />
                RESULTADO: VERIFICADO ✓
              </div>

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {/* Encabezado */}
                <div className="lg:col-span-1">
                  <div className="lg:sticky lg:top-28">
                    <div className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-yellow">
                      [ {String(index + 1).padStart(2, "0")} ]
                    </div>
                    <h2 className="mb-3 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight text-paper">
                      {c.title}
                    </h2>
                    <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.05em] text-muted">
                      {c.category}
                    </p>
                    <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.05em] text-muted">
                      STACK: {c.stack}
                    </p>
                    {c.link && (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block border-b border-current pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-yellow"
                      >
                        VER EN PRODUCCIÓN ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Contenido */}
                <div className="space-y-10 lg:col-span-2">
                  <div>
                    <h3 className="label-telemetry mb-4 text-muted">[ EL PROBLEMA ]</h3>
                    <p className="max-w-3xl leading-relaxed text-paper/80">
                      {c.challenge}
                    </p>
                  </div>

                  <div>
                    <h3 className="label-telemetry mb-4 text-muted">[ LA SOLUCIÓN ]</h3>
                    <p className="max-w-3xl leading-relaxed text-paper/80">
                      {c.solution}
                    </p>
                  </div>

                  <div>
                    {c.metrics.map((metric) => (
                      <div key={metric} className="border-t border-line py-4 first:border-t-2 first:border-yellow">
                        <p className="font-serif text-2xl font-extrabold uppercase leading-tight tracking-tight text-yellow md:text-3xl">
                          {metric}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Catálogo completo */}
      <section className="bg-paper px-4 py-20 text-ink min-[760px]:px-7 min-[760px]:py-28">
        <div className="mx-auto max-w-7xl">
          <span className="label-telemetry mb-6 block text-ink/85">
            [ CATÁLOGO COMPLETO / {gridProjects.length} ]
          </span>
          <h2 className="mb-12 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight md:text-6xl">
            MÁS <em className="text-orange-deep not-italic">SOLUCIONES.</em>
          </h2>
          <ProjectGrid projects={gridProjects} />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 min-[760px]:px-7 min-[760px]:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 font-serif text-5xl font-extrabold uppercase leading-[0.8] tracking-tight text-paper md:text-6xl">
            ¿TU EMPRESA PODRÍA SER<br />
            <em className="text-yellow not-italic">EL PRÓXIMO CASO?</em>
          </h2>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted">
            El diagnóstico inicial es sin costo. En 2 semanas te decimos
            exactamente dónde podemos generar impacto.
          </p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-6 bg-yellow px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors duration-[180ms] hover:bg-paper"
          >
            COMENZAR DIAGNÓSTICO <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
