import SEO, { breadcrumbSchema } from "../components/SEO";
import { waLink } from "../data/contact";

const values = [
  {
    title: "VELOCIDAD SOBRE PERFECCIÓN.",
    description:
      "Preferimos desplegar rápido e iterar. Un sistema funcionando vale más que una presentación perfecta.",
  },
  {
    title: "SEGURIDAD POR DEFECTO.",
    description:
      "Cada agente que desplegamos pasa por pruebas de seguridad. No lanzamos nada que no hayamos auditado nosotros mismos.",
  },
  {
    title: "RESULTADOS MEDIBLES.",
    description:
      "Si no se puede medir, no se puede mejorar. Cada proyecto incluye métricas claras de impacto desde el día uno.",
  },
  {
    title: "OPERACIÓN, NO CONSULTORÍA.",
    description:
      "No entregamos PDFs. Desplegamos sistemas que funcionan 24/7 sin intervención humana y los monitoreamos continuamente.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Primera automatización en producción",
    description:
      "7 bots RPA operando en GMB para despacho de ajustes de siniestros. Desde entonces: 29,000+ registros procesados.",
  },
  {
    year: "2025",
    title: "Expansión a productos propios",
    description:
      "Lanzamiento de MapYourFlow.app (SaaS de mapeo de procesos) y BB One (hardware de IA local). Primeros clientes B2B.",
  },
  {
    year: "2026",
    title: "Agentes&Robots como marca",
    description:
      "Portal B2B, servicios de Voice Coworkers, Agent Pentesting y AI Training. Infraestructura completa de IA empresarial.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="Nosotros"
        description="Agentes&Robots: infraestructura de IA empresarial. Diseñamos, desplegamos y operamos soluciones de automatización con inteligencia artificial."
        canonical="/nosotros"
        jsonLd={[
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Nosotros", url: "/nosotros" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="px-4 pb-20 pt-16 min-[760px]:px-7 min-[760px]:pb-28 min-[760px]:pt-20">
        <div className="mx-auto max-w-7xl">
          <span className="label-telemetry mb-8 block text-muted">
            [ EL LABORATORIO / QUIÉNES SOMOS ]
          </span>
          <h1 className="mb-8 max-w-5xl font-serif text-5xl font-extrabold uppercase leading-[0.8] tracking-tight text-paper md:text-8xl">
            NO SOMOS UNA CONSULTORÍA.
            <br />
            <em className="text-yellow not-italic">SOMOS INFRAESTRUCTURA.</em>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Agentes&Robots nació de una frustración real: empresas que pagan
            por presentaciones de IA bonitas pero nunca ven un sistema
            funcionando en producción. Nosotros diseñamos, desplegamos y
            operamos. Y lo hacemos rápido.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="hairline-t px-4 py-20 min-[760px]:px-7 min-[760px]:py-28">
        <div className="mx-auto max-w-7xl">
          <span className="label-telemetry mb-6 block text-muted">
            [ CÓMO TRABAJAMOS ]
          </span>
          <h2 className="mb-14 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight text-paper md:text-6xl">
            REGLAS DEL <em className="text-yellow not-italic">LABORATORIO.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="border-t-2 border-line py-7 pr-6 transition-colors duration-[180ms] hover:border-yellow md:border-r md:border-line md:px-6 lg:[&:nth-child(4)]:border-r-0"
              >
                <div className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-yellow">
                  [ {String(i + 1).padStart(2, "0")} ]
                </div>
                <h3 className="mb-3 font-serif text-2xl font-bold uppercase leading-tight tracking-tight text-paper">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trayectoria */}
      <section className="bg-paper px-4 py-20 text-ink min-[760px]:px-7 min-[760px]:py-28">
        <div className="mx-auto max-w-7xl">
          <span className="label-telemetry mb-6 block text-ink/85">
            [ TRAYECTORIA ]
          </span>
          <h2 className="mb-14 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight md:text-6xl">
            DE LA PRÁCTICA
            <br />
            A <em className="text-orange-deep not-italic">PRODUCCIÓN.</em>
          </h2>

          <div>
            {timeline.map((item) => (
              <div
                key={item.year}
                className="grid grid-cols-1 gap-4 border-t-2 border-ink py-8 md:grid-cols-[120px_1fr] md:gap-10"
              >
                <div className="font-serif text-5xl font-extrabold uppercase leading-none tracking-tight text-orange-deep">
                  {item.year}
                </div>
                <div>
                  <h3 className="mb-2 font-serif text-2xl font-bold uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-ink/85">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundador */}
      <section className="px-4 py-20 min-[760px]:px-7 min-[760px]:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="label-telemetry mb-6 block text-muted">
              [ FUNDADOR ]
            </span>
            <h2 className="mb-6 font-serif text-5xl font-extrabold uppercase leading-[0.8] tracking-tight text-paper md:text-6xl">
              GIL<br />
              <em className="text-yellow not-italic">HERNANDEZ.</em>
            </h2>
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                Empresario y consultor de IA. Gerente de TI en GMB (despacho
                de ajustes de siniestros) donde implementó las primeras
                automatizaciones con IA que dieron origen a Agentes&Robots.
              </p>
              <p>
                Su enfoque es pragmático: no vende IA por la novedad, sino
                por los resultados medibles que genera. Cada producto de
                Agentes&Robots nació de un problema real que resolvió primero
                para sus propios clientes.
              </p>
              <p>
                A través de Konectify, su consultoría, ayuda a empresas
                mexicanas a adoptar IA sin complicaciones técnicas ni
                promesas vacías.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {[
              { value: "29K+", label: "REGISTROS PROCESADOS" },
              { value: "7", label: "BOTS EN PRODUCCIÓN" },
              { value: "60%", label: "REDUCCIÓN EN TIEMPO" },
              { value: "3", label: "PRODUCTOS PROPIOS" },
            ].map((stat) => (
              <div key={stat.label} className="border border-line p-6">
                <div className="mb-2 font-serif text-4xl font-extrabold uppercase leading-none tracking-tight text-yellow md:text-5xl">
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.05em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper px-4 py-20 text-ink min-[760px]:px-7 min-[760px]:py-28">
        <div className="mx-auto max-w-4xl">
          <span className="label-telemetry mb-6 block text-ink/85">
            [ DIAGNÓSTICO SIN COSTO / 2 SEMANAS ]
          </span>
          <h2 className="mb-6 font-serif text-5xl font-extrabold uppercase leading-[0.8] tracking-tight md:text-7xl">
            ¿TRABAJAMOS<br />
            <em className="text-orange-deep not-italic">JUNTOS?</em>
          </h2>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-ink/85">
            El diagnóstico inicial es sin costo. En 2 semanas sabrás exactamente
            dónde la IA puede transformar tu operación.
          </p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-6 border-2 border-ink bg-yellow px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.05em] hard-shadow"
          >
            COMENZAR <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
