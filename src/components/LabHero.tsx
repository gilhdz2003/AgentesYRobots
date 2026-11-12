/**
 * Hero Lab — portado del prototipo ganador (LabConcept.jsx).
 * Copy exacto aprobado en el ejercicio de dirección.
 */
export default function LabHero() {
  return (
    <section className="lab-hero" id="inicio" aria-label="Presentación">
      <div className="lab-hero__registration" aria-hidden="true">
        +<br />+<br />+
      </div>
      <div className="lab-hero__heading">
        <span className="label-telemetry">A&R / SISTEMAS AUTÓNOMOS / 2026</span>
        <h1>
          MENOS<br />
          PROMESAS.
          <br />
          <em>MÁS AGENTES</em>
          <br />
          TRABAJANDO.
        </h1>
      </div>
      <div className="lab-hero__side">
        <div className="lab-crosshair" aria-hidden="true">
          <span>IA</span>
          <i />
          <i />
        </div>
        <p>
          Diseñamos infraestructura, agentes y seguridad para empresas que
          quieren ver trabajo terminado.
        </p>
        <a href="#capacidades">
          VER CAPACIDADES <span>↓</span>
        </a>
      </div>
      <div className="lab-hero__foot">
        <span>NO VENDEMOS HUMO</span>
        <span>CONSTRUIMOS / PROBAMOS / DESPLEGAMOS</span>
        <span>SCROLL PARA EXPLORAR ↓</span>
      </div>
    </section>
  );
}
