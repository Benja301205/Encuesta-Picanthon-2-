"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

function ArchedLabel({ text, size = 560 }: { text: string; size?: number }) {
  const r = size / 2 - 28
  const circumference = 2 * Math.PI * r
  return (
    <svg
      className="arched-label"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        <path
          id="arch-circle"
          d={`M ${size / 2}, ${size / 2} m -${r}, 0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
        />
      </defs>
      <text className="arched-text">
        <textPath href="#arch-circle" startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
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
    return () => {
      window.removeEventListener("storage", check)
      clearInterval(interval)
    }
  }, [])

  return (
    <header className="topbar">
      <Link href="/" className="brand">
        <img src="/chili.png" alt="" aria-hidden className="brand-mark-png" draggable={false} />
        <span className="brand-name">
          Picanthon<sup>03</sup>
        </span>
      </Link>
      <nav className="nav">
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Inicio
        </Link>
        <Link href="/formulario" className={pathname === "/formulario" ? "active" : ""}>
          Encuesta
        </Link>
        <Link
          href="/resultados"
          className={`${pathname === "/resultados" ? "active" : ""} ${locked ? "locked" : ""}`}
          title={locked ? "Completá la encuesta para desbloquear" : ""}
        >
          {locked && <span className="lock-glyph" aria-hidden>◆</span>}
          Resultados
        </Link>
      </nav>
    </header>
  )
}

export default function HomePage() {
  return (
    <>
      <Topbar />
      <div className="landing">
        <div className="rail rail-left">Buenos Aires · Argentina · 2026</div>
        <div className="rail rail-right">Edición 03 · Post-evento · Feedback</div>

        <section className="poster">
          <div className="poster-no">
            <span className="poster-no-lbl">Edición</span>
            <span className="poster-no-num">03</span>
            <span className="poster-no-lbl">Buenos Aires</span>
          </div>

          <div className="poster-stage">
            <ArchedLabel
              text="·  PICANTHON  ·  TU OPINIÓN ENCIENDE LA PRÓXIMA EDICIÓN  ·  PICANTHON  ·  CONTANOS CÓMO LA VIVISTE  "
              size={620}
            />
            <img
              src="/chili.png"
              alt=""
              aria-hidden
              className="chili-png"
              style={{ width: 380, height: "auto", display: "block" }}
              draggable={false}
            />
          </div>

          <h1 className="poster-head">
            <span className="line">Cómo fue</span>
            <em className="line">tu Picanthon.</em>
          </h1>

          <Link href="/formulario" className="cta-stamp">
            Empezar encuesta
            <span className="arrow">→</span>
          </Link>
        </section>
      </div>

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px, 4vw, 56px) 28px" }}>
        <footer className="footer">
          <span>Picanthon · 03 · 2026</span>
          <span className="powered">
            Hecho con picante por <a href="https://www.linkedin.com/in/benjamin-bertone-20213a201" target="_blank" rel="noopener noreferrer" style={{ color: "#ff4500", fontWeight: 700, fontSize: "1.05em", textDecoration: "none" }}>Benja Bertone</a>
          </span>
        </footer>
      </div>
    </>
  )
}
