import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-balance">
            Contanos cómo viviste la <span className="text-[#ff4500]">Picanthon</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-medium tracking-wide">
            — Edición 03 · Buenos Aires —
          </p>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Queremos entender qué funcionó y qué mejorar para la próxima edición. Tu opinión es fundamental para crear
            una mejor experiencia.
          </p>
        </div>

        <Card className="bg-card backdrop-blur-lg border-white/10 p-8 md:p-12">
          <div className="space-y-6">
            <div className="flex justify-center text-6xl">
              🌶️
            </div>
            <Button
              asChild
              size="lg"
              className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300 text-lg py-6"
            >
              <Link href="/formulario">Completar encuesta</Link>
            </Button>
          </div>
        </Card>

        <footer className="pt-8 text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            🤖 Powered by <span className="text-[#ff4500] font-semibold">Alertly</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
