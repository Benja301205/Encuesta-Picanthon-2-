import type { ReactNode } from 'react'
import React from 'react'

export const metadata = {
  title: 'BootCamp Emprendedores · Trama ITBA',
  description: 'Dashboard de feedback · Edición 13 · Jun 2026',
}

export default function TramaLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        '--hot': '#F04E23',
        '--hot-2': '#F07545',
        '--hot-deep': '#C43315',
        '--ember': '#FFA870',
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
