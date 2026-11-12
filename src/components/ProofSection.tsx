import { Link } from "react-router-dom";
import { waLink } from "../data/contact";

/**
 * Prueba social — expediente del pentest Konectify (caso real del portafolio,
 * commit 64048d1). Copy del prototipo Lab; tally gigante "324".
 */
export default function ProofSection() {
  return (
    <section className="lab-proof" id="pruebas">
      <div className="lab-proof__label">
        EXPERIMENTO: KONECTIFY
        <br />
        TIPO: AGENT SECURITY
        <br />
        RESULTADO: VERIFICADO ✓
      </div>
      <h2>
        NO DIGAS QUE
        <br />
        ES SEGURO.
        <br />
        <em>PRUÉBALO.</em>
      </h2>
      <div className="lab-proof__copy">
        <p>
          324 ataques en cuatro campañas. 18 hallazgos reducidos a 5 residuales
          de bajo riesgo. Cero datos reales expuestos.
        </p>
        <div className="lab-proof__links">
          <a
            href={waLink("security-testing")}
            target="_blank"
            rel="noopener noreferrer"
          >
            QUIERO ATACAR MI AGENTE ↗
          </a>
          <Link to="/casos">VER TODOS LOS CASOS ↗</Link>
        </div>
      </div>
      <div className="lab-proof__tally" aria-hidden="true">
        <span>324</span>
        <small>
          INTENTOS
          <br />
          CONTROLADOS
        </small>
      </div>
    </section>
  );
}
