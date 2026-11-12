/**
 * Principios del laboratorio — 4 columnas sobre amarillo.
 * Versión corta del manifiesto; la versión larga vive en /nosotros.
 */
const PRINCIPLES = [
  {
    num: "01",
    title: (
      <>
        EMPEZAR
        <br />
        POR EL PROCESO.
      </>
    ),
    copy: "La tecnología se elige después de entender el trabajo.",
  },
  {
    num: "02",
    title: (
      <>
        PILOTO ANTES
        <br />
        QUE DISCURSO.
      </>
    ),
    copy: "Una prueba pequeña vale más que cincuenta slides.",
  },
  {
    num: "03",
    title: (
      <>
        SEGURIDAD
        <br />
        DESDE EL DÍA 0.
      </>
    ),
    copy: "Los límites y ataques forman parte del diseño.",
  },
  {
    num: "04",
    title: (
      <>
        TU EQUIPO
        <br />
        CONSERVA CONTROL.
      </>
    ),
    copy: "Construimos capacidad, no dependencia innecesaria.",
  },
];

export default function PrinciplesSection() {
  return (
    <section className="lab-principles" id="principios">
      {PRINCIPLES.map((item) => (
        <article key={item.num}>
          <span>{item.num}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      ))}
    </section>
  );
}
