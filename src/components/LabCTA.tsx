import { waLink } from "../data/contact";

/**
 * CTA final del home — "PONLE UN TRABAJO A LA IA." con hard shadow interactivo.
 * El CTA de acción real vive en /contacto (dock); este cierra el funnel del home.
 */
export default function LabCTA() {
  return (
    <section className="lab-contact" id="contacto">
      <span className="label-telemetry">ABIERTO PARA NUEVOS PROYECTOS / 2026</span>
      <h2>
        PONLE UN
        <br />
        TRABAJO A <em>LA IA.</em>
      </h2>
      <div>
        <p>
          Trae un proceso pesado, una atención saturada o un agente que
          necesita pruebas. Nosotros llevamos el laboratorio.
        </p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer">
          INICIAR UN PROYECTO <b aria-hidden="true">↗</b>
        </a>
      </div>
    </section>
  );
}
