"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GOOGLE_SCRIPT_URL } from "@/lib/config"

interface FeaturedComment { question: string; comment: string }
interface Results {
  totalResponses: number
  averages: Record<string, number>
  distribution: Record<string, number[]>
  featuredComments: FeaturedComment[]
}

const MOCK: Results = {
  totalResponses: 42,
  averages: { q1: 4.5, q2: 4.2, q3: 3.8, q4: 4.7, q5: 4.1, q6: 4.3, q7: 4.0, q8: 3.9 },
  distribution: {
    q1: [1, 2, 5, 12, 22], q2: [2, 3, 8, 15, 14], q3: [3, 5, 10, 18, 6],
    q4: [0, 1, 3, 10, 28], q5: [1, 4, 7, 20, 10], q6: [1, 2, 6, 18, 15],
    q7: [2, 3, 9, 16, 12], q8: [2, 4, 11, 17, 8],
  },
  featuredComments: [
    { question: "Lo que más gustó", comment: "El ambiente colaborativo y la energía de todos los participantes. Sentí que estaba en un lugar donde todos jugaban a construir." },
    { question: "Lo que cambiarían", comment: "Más tiempo para desarrollar el proyecto — querría que la próxima edición sea de un día entero o un fin de semana." },
    { question: "Lo que agregarían", comment: "Un espacio físico para mostrar los proyectos al cierre, tipo feria, con luces y sin pitch formal." },
    { question: "Lo que más gustó", comment: "Los mentores. Fueron honestos, no condescendientes, y empujaron al equipo a defender ideas." },
  ],
}

const Q_LABELS = [
  { head: "Volverías a ", em: "anotarte" },
  { head: "El ", em: "lugar" },
  { head: "La ", em: "comida" },
  { head: "", em: "Mentores" },
  { head: "", em: "Mini games" },
  { head: "Consigna y ", em: "output" },
  { head: "", em: "Pitch", tail: " y preguntas" },
  { head: "Decisión de ", em: "jueces" },
]

function Topbar() {
  const pathname = usePathname()
  return (
    <header className="topbar">
      <Link href="/" className="brand">
        <img src="/chili.png" alt="" aria-hidden className="brand-mark-png" draggable={false} />
        <span className="brand-name">Picanthon<sup>03</sup></span>
      </Link>
      <nav className="nav">
        <Link href="/" className={pathname === "/" ? "active" : ""}>Inicio</Link>
        <Link href="/formulario" className={pathname === "/formulario" ? "active" : ""}>Encuesta</Link>
        <Link href="/resultados" className={pathname === "/resultados" ? "active" : ""}>Resultados</Link>
      </nav>
    </header>
  )
}

export default function ResultadosPage() {
  const [results, setResults] = useState<Results | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    const submitted = !!localStorage.getItem("picanthon_submitted")
    setHasSubmitted(submitted)
    if (!submitted) { setLoading(false); return }

    const fetchResults = async () => {
      try {
        if (GOOGLE_SCRIPT_URL) {
          const res = await fetch(GOOGLE_SCRIPT_URL)
          const data = await res.json()
          if (data.success) { setResults(data); return }
        }
      } catch {}
      setTimeout(() => setResults(MOCK), 280)
    }
    fetchResults().finally(() => setLoading(false))
  }, [])

  if (!hasSubmitted) {
    return (
      <>
        <Topbar />
        <div className="form-page">
          <div className="done-state gate-state">
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span style={{ color: "var(--hot)" }}>●</span>&nbsp; Acceso restringido
            </div>
            <h1 className="big">
              Primero<br />
              <em>contanos vos.</em>
            </h1>
            <p className="copy">
              Los resultados se desbloquean cuando terminás la encuesta. Es rápido — dos minutos.
            </p>
            <div className="done-actions">
              <Link href="/formulario" className="cta-stamp">
                Completar encuesta
                <span className="arrow">→</span>
              </Link>
              <Link href="/" className="btn-ghost">Volver al inicio</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (loading || !results) {
    return (
      <>
        <Topbar />
        <div className="results-page" style={{ paddingTop: 120, textAlign: "center" }}>
          <div className="eyebrow">Cargando resultados</div>
          <div className="results-title" style={{ marginTop: 14, opacity: 0.6 }}>
            <em>...</em>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const total = results.totalResponses
  const dq1 = results.distribution.q1
  const detractors = dq1[0] + dq1[1]
  const passives = dq1[2]
  const promoters = dq1[3] + dq1[4]
  const npsScore = Math.round(((promoters - detractors) / total) * 100)
  const promotersPct = Math.round((promoters / total) * 100)
  const passivesPct = Math.round((passives / total) * 100)
  const detractorsPct = Math.round((detractors / total) * 100)
  const verdict = npsScore >= 50 ? "Excelente" : npsScore >= 30 ? "Muy bueno" : npsScore >= 0 ? "Bueno" : "A mejorar"

  return (
    <>
      <Topbar />
      <div className="results-page">
        <section className="results-hero">
          <div>
            <h1 className="results-title">
              Lo que<br />
              <em>vivimos.</em>
            </h1>
            <p className="results-sub">
              <b>{total}</b> respuestas · Edición 03
            </p>
          </div>

          <div className="nps-card">
            <div className="k">NPS · ¿volverías a anotarte?</div>
            <div className="big-num">{npsScore > 0 ? `+${npsScore}` : npsScore}</div>
            <div className="verdict">{verdict}</div>
            <div className="nps-breakdown">
              <div className="cell promo">
                <span className="v">{promotersPct}%</span>
                <span className="lbl">Promotores</span>
              </div>
              <div className="cell pasiv">
                <span className="v">{passivesPct}%</span>
                <span className="lbl">Pasivos</span>
              </div>
              <div className="cell detr">
                <span className="v">{detractorsPct}%</span>
                <span className="lbl">Detractores</span>
              </div>
            </div>
          </div>
        </section>

        <div className="section-head">
          <h2><em>Por pregunta.</em></h2>
          <span className="num">8 escalas</span>
        </div>

        <div className="dist-grid">
          {Object.entries(results.distribution).map(([key, dist], idx) => {
            const avg = results.averages[key]
            const meta = Q_LABELS[idx]
            return (
              <div className="dist" key={key}>
                <div className="dist-head">
                  <p className="dist-q">
                    <span className="label-num">{String(idx + 1).padStart(2, "0")}</span>
                    {"  "}
                    {meta.head}
                    <em>{meta.em}</em>
                    {meta.tail || ""}
                  </p>
                  <div className="dist-avg">
                    {avg.toFixed(1)}<small>/ 5</small>
                  </div>
                </div>
                <div className="dist-bars">
                  {dist.map((count, rating) => {
                    const widthPct = (count / total) * 100
                    return (
                      <div className="dist-row" key={rating}>
                        <span className="star">{rating + 1}</span>
                        <div className="track">
                          <div
                            className="bar"
                            style={{
                              width: `${widthPct}%`,
                              background: rating >= 3 ? "var(--hot)" : rating === 2 ? "var(--ember)" : "var(--hot-deep)",
                            }}
                          >
                            {count > 0 && widthPct > 10 ? count : ""}
                          </div>
                        </div>
                        <span className="pct">{widthPct.toFixed(0)}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="section-head">
          <h2><em>En sus palabras.</em></h2>
          <span className="num">Destacados</span>
        </div>

        <div className="quotes">
          {results.featuredComments.map((c, i) => (
            <div className="quote" key={i}>
              <span className="mark">"</span>
              <div className="q-cat">{c.question}</div>
              <p className="q-text">{c.comment}</p>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px, 4vw, 56px) 28px" }}>
      <footer className="footer">
        <span>Picanthon · 03 · 2026</span>
        <span className="powered">Hecho con picante por <b>Alertly</b></span>
      </footer>
    </div>
  )
}
