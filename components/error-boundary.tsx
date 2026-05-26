"use client"

import React from "react"
import Link from "next/link"

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false, message: "" }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[Picanthon] Error capturado:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          gap: "1.5rem",
          background: "#0a0a0a",
          color: "#fff",
        }}>
          <div style={{ fontSize: "3rem" }}>🌶️</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Algo se rompió
          </h1>
          <p style={{ color: "#888", maxWidth: 360, lineHeight: 1.6 }}>
            Hubo un error inesperado. Intentá recargar la página — si el problema persiste, avisale al equipo.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#ff4500",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.75rem 1.5rem",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Recargar
            </button>
            <Link
              href="/"
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid #333",
                borderRadius: 8,
                padding: "0.75rem 1.5rem",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Ir al inicio
            </Link>
          </div>
          {process.env.NODE_ENV === "development" && (
            <pre style={{
              marginTop: "1rem",
              background: "#1a0a0a",
              border: "1px solid #ff450033",
              borderRadius: 8,
              padding: "1rem",
              fontSize: "0.75rem",
              color: "#ff4500",
              maxWidth: 480,
              overflowX: "auto",
              textAlign: "left",
            }}>
              {this.state.message}
            </pre>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
