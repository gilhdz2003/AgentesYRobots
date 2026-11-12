import SEO, { breadcrumbSchema } from "../components/SEO";
import { waLink } from "../data/contact";
import { services } from "../data/services";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contacto"
        description="Contacta a Agentes&Robots. Diagnóstico inicial sin costo. Respuesta en menos de 24 horas."
        canonical="/contacto"
        jsonLd={[
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Contacto", url: "/contacto" },
          ]),
        ]}
      />

      {/* Hero gigante estilo Lab */}
      <section className="bg-paper px-4 pb-16 pt-16 text-ink min-[760px]:px-7 min-[760px]:pb-20 min-[760px]:pt-20">
        <div className="mx-auto max-w-7xl">
          <span className="lab-code mb-8 block border-b-2 border-ink pb-5">
            ABIERTO PARA NUEVOS PROYECTOS / 2026
          </span>
          <h1 className="mb-10 font-serif text-[clamp(70px,14vw,200px)] font-extrabold uppercase leading-[0.75] tracking-[-0.05em]">
            HABLEMOS DE<br />
            TU <em className="text-orange-deep not-italic">OPERACIÓN.</em>
          </h1>
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-2">
            <p className="max-w-[43ch] text-xl leading-relaxed text-ink/85">
              El diagnóstico inicial es sin costo. Cuéntanos qué procesos te
              gustaría automatizar y en 2 semanas te presentamos un plan
              concreto con ROI estimado.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-6 border-2 border-ink bg-yellow px-6 py-5 font-mono text-[12px] font-semibold uppercase tracking-[0.05em] hard-shadow"
            >
              INICIAR UN PROYECTO <span aria-hidden="true" className="text-2xl">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Selector por capacidad */}
      <section className="px-4 py-20 min-[760px]:px-7 min-[760px]:py-24">
        <div className="mx-auto max-w-7xl">
          <span className="label-telemetry mb-8 block text-muted">
            [ ELIGE CÓMO EMPEZAR / WHATSAPP ]
          </span>

          <div className="grid grid-cols-1 gap-0 border border-line md:grid-cols-2">
            {services.map((service, i) => (
              <a
                key={service.slug}
                href={waLink(service.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border-b border-line p-6 transition-colors duration-[180ms] hover:bg-yellow hover:text-ink md:[&:nth-child(odd)]:border-r"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[10px] font-medium text-yellow group-hover:text-ink">
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <span className="font-medium text-paper group-hover:text-ink">
                    {service.title}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="font-mono text-lg text-muted group-hover:text-ink"
                >
                  ↗
                </span>
              </a>
            ))}

            {/* Consulta general */}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-line p-6 transition-colors duration-[180ms] hover:bg-yellow hover:text-ink md:[&:nth-child(odd)]:border-r"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-[10px] font-medium text-yellow group-hover:text-ink">
                  [ {String(services.length + 1).padStart(2, "0")} ]
                </span>
                <span className="font-semibold text-paper group-hover:text-ink">
                  Consulta general
                </span>
              </div>
              <span aria-hidden="true" className="font-mono text-lg text-muted group-hover:text-ink">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Qué esperar + otros canales */}
      <section className="hairline-t px-4 py-20 min-[760px]:px-7 min-[760px]:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <span className="label-telemetry mb-8 block text-muted">
              [ QUÉ ESPERAR ]
            </span>
            <ol className="space-y-0">
              {[
                "Escribes por WhatsApp. Respondemos en menos de 24 horas.",
                "Agendamos una llamada de 30 minutos para entender tu operación.",
                "En 2 semanas recibes el diagnóstico con oportunidades priorizadas y ROI estimado.",
              ].map((step, i) => (
                <li key={i} className="flex gap-6 border-t border-line py-6 first:border-t-2 first:border-yellow">
                  <span className="flex-shrink-0 font-mono text-[10px] font-semibold text-yellow">
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <span className="leading-relaxed text-paper/80">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <span className="label-telemetry mb-8 block text-muted">
              [ OTROS CANALES ]
            </span>
            <div className="space-y-0 border-t border-line">
              <a
                href="mailto:hola@agentesyrobots.com"
                className="flex items-center justify-between border-b border-line py-6 font-mono text-[12px] uppercase tracking-[0.05em] text-muted transition-colors hover:text-yellow"
              >
                HOLA@AGENTESYROBOTS.COM <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://linkedin.com/company/agentesyrobots"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-line py-6 font-mono text-[12px] uppercase tracking-[0.05em] text-muted transition-colors hover:text-yellow"
              >
                LINKEDIN <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
