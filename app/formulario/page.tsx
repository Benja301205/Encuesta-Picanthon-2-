"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { GOOGLE_SCRIPT_URL } from "@/lib/config"
import { Wifi, WifiOff, MessageCircle, Loader2 } from "lucide-react"

interface FormData {
  q1: string
  q2: string
  q3: string
  q4: string
  q5: string
  q6: string
  q7: string
  q8: string
  q9: string
  q10: string
  q11: string
}

export default function FormularioPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isOnline, setIsOnline] = useState(true)
  const [isFromWhatsApp, setIsFromWhatsApp] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
  })

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check if coming from WhatsApp
    const userAgent = navigator.userAgent.toLowerCase()
    setIsFromWhatsApp(userAgent.includes("whatsapp"))

    // Check if already submitted
    const submitted = localStorage.getItem("picanthon_submitted")
    if (submitted) {
      setHasSubmitted(true)
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const generateUUID = () => {
    // Fallback para navegadores que no soportan crypto.randomUUID()
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }

    // Fallback manual compatible con todos los navegadores
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "")
    if (!allFieldsFilled) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completá todas las preguntas antes de enviar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const submissionId = generateUUID()
      const timestamp = new Date().toISOString()

      const submission = {
        id: submissionId,
        timestamp,
        ...formData,
        userAgent: navigator.userAgent,
        isFromWhatsApp,
      }

      // Save to localStorage
      localStorage.setItem("picanthon_submission", JSON.stringify(submission))
      localStorage.setItem("picanthon_submitted", "true")

      // Send to Google Sheets via Apps Script
      if (GOOGLE_SCRIPT_URL) {
        try {
          const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requiere no-cors
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submission),
          })

          // Con no-cors no podemos leer la respuesta, pero si no da error, asumimos que funcionó
          console.log('[v0] Form submitted to Google Sheets')
        } catch (error) {
          console.error('[v0] Error sending to Google Sheets:', error)
          // No mostramos error al usuario porque ya guardamos en localStorage
        }
      } else {
        console.warn('[v0] GOOGLE_SCRIPT_URL not configured, skipping cloud sync')
      }

      toast({
        title: "¡Gracias por tu feedback!",
        description: "Tu respuesta ha sido enviada exitosamente.",
      })

      router.push("/resultados")
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
      toast({
        title: "Error al enviar",
        description: "Hubo un problema al enviar tu respuesta. Por favor intentá de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewResponse = () => {
    localStorage.removeItem("picanthon_submitted")
    localStorage.removeItem("picanthon_submission")
    setHasSubmitted(false)
    setFormData({
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: "",
      q11: "",
    })
  }

  if (hasSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="bg-card backdrop-blur-lg border-white/10 p-8 max-w-md w-full text-center space-y-6">
          <h2 className="text-2xl font-bold">Ya enviaste tu respuesta</h2>
          <p className="text-muted-foreground">
            Gracias por completar la encuesta. Si querés enviar una nueva respuesta, hacé click en el botón de abajo.
          </p>
          <Button onClick={handleNewResponse} className="w-full bg-white text-black hover:bg-white/90">
            Enviar nueva respuesta
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Encuesta <span className="text-[#ff4500]">Picanthon</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span>En línea</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-500" />
                  <span>Sin conexión</span>
                </>
              )}
            </div>
            {isFromWhatsApp && (
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Desde WhatsApp</span>
              </div>
            )}
          </div>
        </div>

        <Card className="bg-card backdrop-blur-lg border-white/10 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Scale Questions */}
            <ScaleQuestion
              number={1}
              question="¿Del 1 al 5 cuán probable es que vuelvas a anotarte a la segunda edición de la Picanthon?"
              value={formData.q1}
              onChange={(value) => setFormData({ ...formData, q1: value })}
            />

            <ScaleQuestion
              number={2}
              question="¿Del 1 al 5 qué te pareció el lugar?"
              value={formData.q2}
              onChange={(value) => setFormData({ ...formData, q2: value })}
            />

            <ScaleQuestion
              number={3}
              question="¿Del 1 al 5 qué te pareció la comida?"
              value={formData.q3}
              onChange={(value) => setFormData({ ...formData, q3: value })}
            />

            <ScaleQuestion
              number={4}
              question="¿Del 1 al 5 cómo fue la experiencia de tu grupo con los mentores?"
              value={formData.q4}
              onChange={(value) => setFormData({ ...formData, q4: value })}
            />

            <ScaleQuestion
              number={5}
              question="¿Del 1 al 5 qué te parecieron los mini games?"
              value={formData.q5}
              onChange={(value) => setFormData({ ...formData, q5: value })}
            />

            <ScaleQuestion
              number={6}
              question="¿Del 1 al 5 qué te pareció la consigna y el output esperado?"
              value={formData.q6}
              onChange={(value) => setFormData({ ...formData, q6: value })}
            />

            <ScaleQuestion
              number={7}
              question="¿Del 1 al 5 qué te pareció la dinámica del pitch/pregunta de mentores? (¿Pudieron transmitir lo que habían creado?)"
              value={formData.q7}
              onChange={(value) => setFormData({ ...formData, q7: value })}
            />

            <ScaleQuestion
              number={8}
              question="¿Del 1 al 5 qué te pareció la decisión final de los jueces?"
              value={formData.q8}
              onChange={(value) => setFormData({ ...formData, q8: value })}
            />

            {/* Open-ended Questions */}
            <OpenQuestion
              number={9}
              question="¿Qué mantendrías de la hackathon? ¿Qué fue lo que más te gustó?"
              value={formData.q9}
              onChange={(value) => setFormData({ ...formData, q9: value })}
            />

            <OpenQuestion
              number={10}
              question="¿Qué cambiarías de la hackathon? ¿Qué fue lo que menos te gustó?"
              value={formData.q10}
              onChange={(value) => setFormData({ ...formData, q10: value })}
            />

            <OpenQuestion
              number={11}
              question="¿Qué agregarías a la Picanthon?"
              value={formData.q11}
              onChange={(value) => setFormData({ ...formData, q11: value })}
            />

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300 text-lg py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar respuestas"
              )}
            </Button>
          </form>
        </Card>

        <footer className="text-center text-muted-foreground text-sm">
          <p className="flex items-center justify-center gap-2">
            🤖 Powered by <span className="text-[#ff4500] font-semibold">Alertly</span>
          </p>
        </footer>
      </div>
    </div>
  )
}

function ScaleQuestion({
  number,
  question,
  value,
  onChange,
}: {
  number: number
  question: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium leading-relaxed">
        {number}. {question}
      </Label>
      <RadioGroup value={value} onValueChange={onChange} className="flex gap-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="flex items-center space-x-2">
            <RadioGroupItem value={num.toString()} id={`q${number}-${num}`} className="border-white/20" />
            <Label htmlFor={`q${number}-${num}`} className="cursor-pointer font-normal">
              {num}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

function OpenQuestion({
  number,
  question,
  value,
  onChange,
}: {
  number: number
  question: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-3">
      <Label htmlFor={`q${number}`} className="text-base font-medium leading-relaxed">
        {number}. {question}
      </Label>
      <Textarea
        id={`q${number}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escribí tu respuesta aquí..."
        className="min-h-24 bg-input border-white/10 focus:border-[#ff4500]/50 resize-none"
        rows={3}
      />
    </div>
  )
}
