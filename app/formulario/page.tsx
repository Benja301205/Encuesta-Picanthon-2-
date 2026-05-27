"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GOOGLE_SCRIPT_URL } from "@/lib/config"

interface FormData {
  q1: string; q2: string; q3: string; q4: string
  q6: string; q7: string; q8: string; q9: string; q10: string; q11: string
}

const SCALE_QUESTIONS = [
  { n: 1, key: "q1", q: "¿Qué tan probable es que te anotés en la 4ta Edición de la Picanthon?" },
  { n: 2, key: "q2", q: "¿Qué te pareció el lugar?" },
  { n: 3, key: "q3", q: "¿Qué te pareció la comida?" },
  { n: 4, key: "q4", q: "¿Cómo fue la experiencia de tu grupo con los mentores?" },
  { n: 5, key: "q6", q: "¿Qué te pareció la consigna y el output esperado?" },
  { n: 6, key: "q7", q: "¿Qué te pareció la dinámica de la Presentación? ¿Pudieron transmitir lo que habían creado?" },
  { n: 7, key: "q8", q: "¿Qué te pareció la decisión final de los jueces?" },
]

const OPEN_QUESTIONS = [
  { n: 8, key: "q9", q: "¿Qué mantendrías de la hackathon? ¿Qué fue lo que más te gustó?", placeholder: "Eso que no podía faltar..." },
  { n: 9, key: "q10", q: "¿Qué cambiarías de la hackathon? ¿Qué fue lo que menos te gustó?", placeholder: "Sin filtro — bienvenido el feedback duro..." },
  { n: 10, key: "q11", q: "¿Qué agregarías a la Picanthon?", placeholder: "Una idea, un detalle, un experimento..." },
]

const LABELS = ["nada", "poco", "medio", "alto", "picante"]

function HeatMeter({ value, onChange, name }: { value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="heat-meter" role="radiogroup" aria-label={name}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          className={`heat-cell${value === String(n) ? " selected" : ""}`}
          data-level={n}
          onClick={() => onChange(String(n))}
          role="radio"
          aria-checked={value === String(n)}
        >
          <span className="heat-fill" />
          <span className="heat-num">{n}</span>
          <span className="heat-label">{LABELS[n - 1]}</span>
        </button>
      ))}
    </div>
  )
}

function Topbar() {
  const pathname = usePathname()
  const [locked, setLocked] = useState(true)
  useEffect(() => {
    const check = () => setLocked(!localStorage.getItem("picanthon3_submitted"))
    check()
    window.addEventListener("storage", check)
    const interval = setInterval(check, 600)
    return () => { window.removeEventListener("storage", check); clearInterval(interval) }
  }, [])
  return (
    <header className="topbar">
      <Link href="/" className="brand">
        <img src="/chili.png" alt="" aria-hidden className="brand-mark-png" draggable={false} />
        <span className="brand-name">Picanthon<sup>03</sup></span>
      </Link>
      <nav className="nav">
        <Link href="/" className={pathname === "/" ? "active" : ""}>Inicio</Link>
        <Link href="/formulario" className={pathname === "/formulario" ? "active" : ""}>Encuesta</Link>
        <Link href="/resultados" className={`${pathname === "/resultados" ? "active" : ""} ${locked ? "locked" : ""}`}>
          {locked && <span className="lock-glyph" aria-hidden>◆</span>}
          Resultados
        </Link>
      </nav>
    </header>
  )
}

function Toast({ msg, kind }: { msg: string | null; kind?: string }) {
  if (!msg) return null
  return <div className={`toast-pill${kind === "err" ? " err" : ""}`}>{msg}</div>
}

export default function FormularioPage() {
  const router = useRouter()
  const [isOnline, setIsOnline] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ msg: string; kind: string } | null>(null)
  const emptyData = (): FormData => ({ q1:"",q2:"",q3:"",q4:"",q6:"",q7:"",q8:"",q9:"",q10:"",q11:"" })
  const [data, setData] = useState<FormData>(emptyData)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const on = () => setIsOnline(true)
    const off = () => setIsOnline(false)
    window.addEventListener("online", on)
    window.addEventListener("offline", off)
    if (localStorage.getItem("picanthon3_submitted")) setHasSubmitted(true)
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off) }
  }, [])

  const filled = Object.values(data).filter((v) => v.trim() !== "").length
  const total = SCALE_QUESTIONS.length + OPEN_QUESTIONS.length

  const showToast = (msg: string, kind: string) => {
    setToast({ msg, kind })
    setTimeout(() => setToast(null), 2600)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (filled < total) {
      showToast(`Faltan ${total - filled} respuestas`, "err")
      return
    }
    setIsSubmitting(true)
    try {
      const submissionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const submission = { id: submissionId, timestamp: new Date().toISOString(), ...data, userAgent: navigator.userAgent }
      localStorage.setItem("picanthon3_submission", JSON.stringify(submission))
      localStorage.setItem("picanthon3_submitted", "true")
      if (GOOGLE_SCRIPT_URL) {
        const body = JSON.stringify(submission)
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body })
            break
          } catch {
            if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 1000))
          }
        }
      }
      router.push("/resultados")
    } catch {
      showToast("Error al enviar — intentá de nuevo", "err")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewResponse = () => {
    localStorage.removeItem("picanthon3_submitted")
    localStorage.removeItem("picanthon3_submission")
    setHasSubmitted(false)
    setData(emptyData())
  }

  if (hasSubmitted) {
    return (
      <>
        <Topbar />
        <div className="form-page">
          <div className="done-state">
            <div className="eyebrow" style={{ marginBottom: 28 }}>
              <span style={{ color: "var(--hot)" }}>●</span>&nbsp; Estado: enviado
            </div>
            <h1 className="big">
              Ya nos<br />
              <em>contaste</em>.
            </h1>
            <p className="copy">Gracias. Si te acordaste de algo, podés empezar de nuevo.</p>
            <div className="done-actions">
              <Link href="/resultados" className="cta-stamp">
                Ver resultados
                <span className="arrow">→</span>
              </Link>
              <button className="btn-ghost" onClick={handleNewResponse}>
                Empezar de nuevo
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Topbar />
      <div className="form-page">
        <header className="form-header">
          <h1 className="form-title">
            <em>Contanos.</em>
          </h1>
          <div className="status-strip">
            <span className={`pill ${isOnline ? "online" : "offline"}`}>
              <span className="dot" />
              {isOnline ? "En línea" : "Sin conexión"}
            </span>
          </div>
        </header>

        <div className="progress-strip">
          <div className="progress-row">
            <span className="label">11 preguntas · ≈ 2 min</span>
            <span className="count">
              <b>{filled}</b> / {total}
            </span>
          </div>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${(filled / total) * 100}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {SCALE_QUESTIONS.map((q) => (
            <div className="question" key={q.key}>
              <div className="q-num">
                {String(q.n).padStart(2, "0")}
                <small>Escala · 1–5</small>
              </div>
              <div className="q-body">
                <p className="q-text">{q.q}</p>
                <HeatMeter
                  name={q.key}
                  value={(data as Record<string, string>)[q.key]}
                  onChange={(v) => setData({ ...data, [q.key]: v })}
                />
              </div>
            </div>
          ))}

          {OPEN_QUESTIONS.map((q) => (
            <div className="question" key={q.key}>
              <div className="q-num">
                {String(q.n).padStart(2, "0")}
                <small>Abierta</small>
              </div>
              <div className="q-body">
                <p className="q-text">{q.q}</p>
                <textarea
                  className="q-textarea"
                  placeholder={q.placeholder}
                  value={(data as Record<string, string>)[q.key]}
                  onChange={(e) => setData({ ...data, [q.key]: e.target.value })}
                  rows={3}
                />
                <div className="q-textarea-meta">
                  <span>{(data as Record<string, string>)[q.key].length > 0 ? `${(data as Record<string, string>)[q.key].length} caracteres` : ""}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="submit-row">
            <span className="note">
              {filled === total ? "Listo — enviá" : `Faltan ${total - filled}`}
            </span>
            <button type="submit" className="submit-btn" disabled={isSubmitting || filled < total}>
              {isSubmitting ? "Enviando..." : "Enviar"}
              <span className="arrow">→</span>
            </button>
          </div>
        </form>

        <Toast msg={toast?.msg ?? null} kind={toast?.kind} />
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
        <span className="powered">Hecho con picante por <a href="https://www.linkedin.com/in/benjamin-bertone-20213a201" target="_blank" rel="noopener noreferrer" style={{ color: "#ff4500", fontWeight: 700, fontSize: "1.05em", textDecoration: "underline", textUnderlineOffset: "3px" }}>Benja Bertone</a></span>
      </footer>
    </div>
  )
}
