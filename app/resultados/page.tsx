"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { BarChart3, TrendingUp, Users } from "lucide-react"

interface AggregatedResults {
  totalResponses: number
  averages: {
    q1: number
    q2: number
    q3: number
    q4: number
    q5: number
    q6: number
    q7: number
    q8: number
  }
  distribution: {
    [key: string]: number[]
  }
}

export default function ResultadosPage() {
  const [results, setResults] = useState<AggregatedResults | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch real data from Google Sheets
    // For now, using mock data
    const mockResults: AggregatedResults = {
      totalResponses: 42,
      averages: {
        q1: 4.5,
        q2: 4.2,
        q3: 3.8,
        q4: 4.7,
        q5: 4.1,
        q6: 4.3,
        q7: 4.0,
        q8: 3.9,
      },
      distribution: {
        q1: [1, 2, 5, 12, 22],
        q2: [2, 3, 8, 15, 14],
        q3: [3, 5, 10, 18, 6],
        q4: [0, 1, 3, 10, 28],
        q5: [1, 4, 7, 20, 10],
        q6: [1, 2, 6, 18, 15],
        q7: [2, 3, 9, 16, 12],
        q8: [2, 4, 11, 17, 8],
      },
    }

    setTimeout(() => {
      setResults(mockResults)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <BarChart3 className="w-16 h-16 text-[#ff4500] mx-auto animate-pulse" />
          <p className="text-muted-foreground">Cargando resultados...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="bg-card backdrop-blur-lg border-white/10 p-8 max-w-md w-full text-center">
          <p className="text-muted-foreground">No hay resultados disponibles todavía.</p>
        </Card>
      </div>
    )
  }

  const questions = [
    "¿Cuán probable es que vuelvas a anotarte?",
    "¿Qué te pareció el lugar?",
    "¿Qué te pareció la comida?",
    "¿Cómo fue la experiencia con los mentores?",
    "¿Qué te parecieron los mini games?",
    "¿Qué te pareció la consigna y el output?",
    "¿Qué te pareció la dinámica del pitch?",
    "¿Qué te pareció la decisión de los jueces?",
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Resultados <span className="text-[#ff4500]">Picanthon</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-lg">{results.totalResponses} respuestas</span>
          </div>
        </div>

        <Card className="bg-card backdrop-blur-lg border-white/10 p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <TrendingUp className="w-6 h-6 text-[#ff4500]" />
              <h2 className="text-2xl font-bold">Promedios Generales</h2>
            </div>

            <div className="space-y-6">
              {Object.entries(results.averages).map(([key, average], index) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm leading-relaxed flex-1">{questions[index]}</p>
                    <span className="text-2xl font-bold text-[#ff4500] min-w-[3rem] text-right">
                      {average.toFixed(1)}
                    </span>
                  </div>
                  <Progress value={(average / 5) * 100} className="h-2 bg-white/10" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-card backdrop-blur-lg border-white/10 p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <BarChart3 className="w-6 h-6 text-[#ff4500]" />
              <h2 className="text-2xl font-bold">Distribución de Respuestas</h2>
            </div>

            <div className="space-y-8">
              {Object.entries(results.distribution).map(([key, distribution], index) => (
                <div key={key} className="space-y-3">
                  <p className="text-sm font-medium leading-relaxed">{questions[index]}</p>
                  <div className="space-y-2">
                    {distribution.map((count, rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-8">{rating + 1}★</span>
                        <div className="flex-1 bg-white/5 rounded-full h-6 overflow-hidden">
                          <div
                            className="bg-[#ff4500] h-full transition-all duration-500 flex items-center justify-end pr-2"
                            style={{
                              width: `${(count / results.totalResponses) * 100}%`,
                            }}
                          >
                            {count > 0 && <span className="text-xs font-medium text-white">{count}</span>}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {((count / results.totalResponses) * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex justify-center">
          <Button asChild className="bg-white text-black hover:bg-white/90">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>

        <footer className="text-center text-muted-foreground text-sm pt-4">
          <p className="flex items-center justify-center gap-2">
            🤖 Powered by <span className="text-[#ff4500] font-semibold">Picante</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
