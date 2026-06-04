import styles from './trama.module.css'

const DATA = {
  edicion: 13,
  total_respuestas: 102,
  periodo: '2–4 jun 2026',
  metricas: [
    { cat: 'Recomendaría',                    promedio: 9.98 },
    { cat: 'Calificación general',             promedio: 9.76 },
    { cat: 'Acreditación',                     promedio: 9.65 },
    { cat: 'Organización',                     promedio: 9.53 },
    { cat: 'Comunicación previa',              promedio: 9.52 },
    { cat: 'Conformidad con oradores',         promedio: 9.34 },
    { cat: 'Formulario de inscripción',        promedio: 9.19 },
    { cat: 'Hilo conductor de las charlas',    promedio: 9.13 },
    { cat: 'Conformidad con la comida',        promedio: 9.07 },
    { cat: 'Conformidad con mentores',         promedio: 8.60 },
  ],
  equipo: [
    {
      cat: 'Predisposición · "siempre a disposición"',
      menciones: 60,
      quote: '"son unos genios, estuvieron atentos a todo y poniendo mucha energia. se nota que se super esforzaron para que el evento saliera increible y lo lograron."',
    },
    {
      cat: 'Calidez humana · buena onda',
      menciones: 40,
      quote: '"La pasión de las personas que hacen las cosas desde el corazon es algo que se siente, sin lugar a dudas este equipo contaba con pasión. Excelente todo el trabajo realizado."',
    },
  ],
  oradores: [
    { nombre: 'Alejandro Vázquez', org: 'TiendaNube',          menciones: 31 },
    { nombre: 'Mike Medus',         org: '',                    menciones: 20 },
    { nombre: 'Humand',             org: 'Gero · Iván · Lucila', menciones: 18 },
  ],
  pain_points: [
    {
      cat: 'Más tiempo de trabajo · menos charlas',
      menciones: 30,
      quote: '"muchas menos charlas, llega un punto que ya dejas de escuchar porque son demasiadas por dia. le daria mucho mas tiempo al ultimo dia."',
    },
    {
      cat: 'Cronograma / itinerario del día',
      menciones: 21,
      quote: '"Estaría bueno tener un itinerario al inicio de cada día, para poder organizar mejor el momento de trabajo."',
    },
    {
      cat: 'Confirmación tardía · participantes del interior',
      menciones: 15,
      quote: '"Me hubiera gustado que avisaran un poco antes los seleccionados, así los del interior teníamos más margen para sacar pasajes."',
    },
    {
      cat: 'Más oradoras mujeres',
      menciones: 14,
      quote: '"FALTARON MUJERES! entiendo que la industria es cruel con el género femenino, pero abundaron los hombres y faltaron testimonios de mujeres."',
    },
    {
      cat: 'Feedback del jurado poco claro',
      menciones: 10,
      quote: '"Uno de los jurados nos dijo que no sabía bien cuál era la consigna en base a la que estábamos trabajando."',
    },
    {
      cat: 'Mentores: cobertura despareja',
      menciones: 8,
      quote: '"Los mentores casi no llegaron a nuestro equipo, tuvimos que ir a buscarlos."',
    },
  ],
  comida: [
    { cat: 'Rica / buena variedad',                 menciones: 19 },
    { cat: 'Porciones cortas / hambre',             menciones: 11 },
    { cat: 'Hamburguesa / Chicken Chill sin papas', menciones: 6  },
    { cat: 'Poke / ensalada no gustó',              menciones: 6  },
    { cat: 'Pedido de opciones saludables',         menciones: 5  },
  ],
  quotes: [
    {
      cat: 'Organización',
      texto: 'La pasión de las personas que hacen las cosas desde el corazon es algo que se siente, sin lugar a dudas este equipo contaba con pasión. Excelente todo el trabajo realizado, el nivel de profesionalismo y calidad humana me sorprendió ampliamente.',
    },
    {
      cat: 'Alejandro Vázquez',
      texto: 'Ale Vázquez, muy buena oratoria además de ser un crack. Me dejó pensando toda la semana en cosas q dijo y tmb pude bajar mas a tierra las cosas q dijo porque empezó como estudiante',
    },
    {
      cat: 'Mentores',
      texto: 'Lautaro ídolo, nos dió una re mano y nos escuchó un montón. Mucha paciencia y calidez, súper correcto y presente.',
    },
    {
      cat: 'Humand',
      texto: 'Su mensaje es fuertísimo, a partir de ahí empecé a creer realmente en nuestra idea y en que acá afuera puedo también.',
    },
  ],
}

export default function TramaPage() {
  const maxComida = Math.max(...DATA.comida.map((c) => c.menciones))

  return (
    <div
      style={{
        '--hot': '#F04E23',
        '--hot-2': '#F07545',
        '--hot-deep': '#C43315',
        '--ember': '#FFA870',
      } as React.CSSProperties}
    >
      <main className="results-page">

        {/* ── HERO ──────────────────────────────── */}
        <div className="results-hero">
          <div>
            <div className={styles.heroLogo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-bc.png" alt="BootCamp Emprendedores" />
            </div>
            <p className="eyebrow">Trama ITBA · Ed {DATA.edicion} · {DATA.periodo}</p>
            <h1 className="results-title">
              Boot<br /><em>Camp</em>
            </h1>
            <p className="results-sub">
              <b>{DATA.total_respuestas}</b>{DATA.periodo}
            </p>
          </div>
          <div className="nps-card">
            <p className="k">Lo recomendarían</p>
            <p className="big-num">9.98</p>
            <p className="verdict">100 de 102 pusieron 10</p>
            <div className="nps-breakdown">
              <div className="cell promo">
                <span className="v">9.76</span>
                <span className="lbl">Calif. general</span>
              </div>
              <div className="cell pasiv">
                <span className="v">9.53</span>
                <span className="lbl">Organización</span>
              </div>
              <div className="cell detr">
                <span className="v">8.60</span>
                <span className="lbl">Mentores (mín)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MÉTRICAS ──────────────────────────── */}
        <section>
          <div className="section-head">
            <h2>Métricas <em>generales</em></h2>
            <span className="num">{DATA.total_respuestas} respuestas · escala 1–10</span>
          </div>
          <div className={styles.metricList}>
            {DATA.metricas.map((m, i) => (
              <div
                key={m.cat}
                className={`${styles.metricRow} ${
                  i === DATA.metricas.length - 1 ? styles.metricLow : ''
                }`}
              >
                <span className={styles.metricLabel}>{m.cat}</span>
                <div className={styles.metricTrack}>
                  <div
                    className={styles.metricBar}
                    style={{ width: `${m.promedio * 10}%` }}
                  />
                </div>
                <span className={styles.metricVal}>{m.promedio.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── EQUIPO ORGANIZADOR ────────────────── */}
        <section>
          <div className="section-head">
            <h2>Equipo <em>organizador</em></h2>
            <span className="num">Q3 · 102 comentarios</span>
          </div>
          <div className={styles.teamGrid}>
            {DATA.equipo.map((e) => (
              <div key={e.cat} className={styles.teamCard}>
                <div className={styles.teamCount}>
                  ~{e.menciones}<small> menciones</small>
                </div>
                <p className={styles.teamLabel}>{e.cat}</p>
                <p className={styles.teamQuote}>{e.quote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ORADORES ──────────────────────────── */}
        <section>
          <div className="section-head">
            <h2>Oradores <em>favoritos</em></h2>
            <span className="num">Q12 · varias menciones por respuesta</span>
          </div>
          <div className={styles.oradorList}>
            {DATA.oradores.map((o, i) => (
              <div key={o.nombre} className={styles.oradorRow}>
                <span className={styles.oradorRank}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={styles.oradorInfo}>
                  <span className={styles.oradorName}>{o.nombre}</span>
                  {o.org && <span className={styles.oradorOrg}>{o.org}</span>}
                </div>
                <span className={styles.oradorCount}>~{o.menciones} menciones</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── ÁREAS DE MEJORA ───────────────────── */}
        <section>
          <div className="section-head">
            <h2>Áreas de <em>mejora</em></h2>
            <span className="num">Q19 · 102 comentarios</span>
          </div>
          <div className={styles.painGrid}>
            {DATA.pain_points.map((p) => (
              <div key={p.cat} className={styles.painCard}>
                <div className={styles.painCount}>
                  {p.menciones}<small> menciones</small>
                </div>
                <p className={styles.painCat}>{p.cat}</p>
                <p className={styles.painQuote}>{p.quote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMIDA ────────────────────────────── */}
        <section>
          <div className="section-head">
            <h2>Notas sobre <em>la comida</em></h2>
            <span className="num">Q17 · 40 comentarios · promedio 9.07</span>
          </div>
          <div className={styles.comidaList}>
            {DATA.comida.map((c) => (
              <div key={c.cat} className={styles.comidaRow}>
                <span className={styles.comidaLabel}>{c.cat}</span>
                <div className={styles.comidaTrack}>
                  <div
                    className={styles.comidaBar}
                    style={{ width: `${(c.menciones / maxComida) * 100}%` }}
                  />
                </div>
                <span className={styles.comidaCount}>{c.menciones}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CITAS DESTACADAS ──────────────────── */}
        <section>
          <div className="section-head">
            <h2>Citas <em>destacadas</em></h2>
            <span className="num">Verbatim · sin corrección</span>
          </div>
          <div className="quotes">
            {DATA.quotes.map((q) => (
              <div key={q.cat} className="quote">
                <span className="mark">&#8220;</span>
                <p className="q-cat">{q.cat}</p>
                <p className="q-text">{q.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────── */}
        <footer className={styles.pageFooter}>
          <div className={styles.footerLeft}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-bc.png" alt="BootCamp" className={styles.footerLogo} />
            <span>BootCamp Emprendedores · Ed {DATA.edicion} · Trama ITBA · {DATA.periodo}</span>
          </div>
          <span className={styles.footerCredit}>
            Análisis por{' '}
            <a
              href="https://www.linkedin.com/in/benja-bertone/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Benja Bertone
            </a>
          </span>
        </footer>

      </main>
    </div>
  )
}
