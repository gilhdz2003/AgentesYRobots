import { useState } from "react";

/**
 * Simulador de misión — banda amarilla con estados ATENDER/OPERAR/PROTEGER.
 * Portado del prototipo Lab (LabConcept.jsx); flujo reactivo con aria-live.
 */
const MODES = {
  ATENDER: ["CONSULTA ENTRANTE", "AGENTE DE VOZ + CHAT", "CLIENTE RESUELTO"],
  OPERAR: ["PROCESO REPETITIVO", "AGENT WORKFLOW", "TAREA COMPLETADA"],
  PROTEGER: ["AGENTE EN PRODUCCIÓN", "PRUEBA DE ADVERSARIO", "RIESGO REDUCIDO"],
} as const;

type Mode = keyof typeof MODES;

export default function MissionSimulator() {
  const [mode, setMode] = useState<Mode>("ATENDER");

  return (
    <section className="lab-machine" aria-label="Simulador de agente">
      <div className="lab-machine__controls">
        <span>SELECCIONA UNA MISIÓN:</span>
        <div>
          {(Object.keys(MODES) as Mode[]).map((item) => (
            <button
              key={item}
              type="button"
              className={mode === item ? "is-active" : ""}
              onClick={() => setMode(item)}
              aria-pressed={mode === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="lab-machine__flow" aria-live="polite">
        {MODES[mode].map((step, index) => (
          <div key={step}>
            <span>0{index + 1}</span>
            <strong>{step}</strong>
            {index < 2 && <b aria-hidden="true">→</b>}
          </div>
        ))}
      </div>
      <div className="lab-machine__status">
        <span>
          <i aria-hidden="true" /> SISTEMA LISTO
        </span>
        <span>LATENCIA: LA JUSTA</span>
        <span>MISIÓN: {mode}</span>
      </div>
    </section>
  );
}
