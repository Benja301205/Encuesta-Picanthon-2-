# 🔥 Picanthon Survey App

Aplicación de encuesta para recopilar feedback de los participantes de la Picanthon. Las respuestas se guardan automáticamente en Google Sheets y se muestran en tiempo real con estadísticas agregadas.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/benjabertone3012-3254s-projects/v0-picanthon-survey-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/iFkJOF9ySuJ)

---

## ✨ Características

- 📝 **Formulario de 11 preguntas** (8 numéricas + 3 de texto abierto)
- 💾 **Guardado automático** en Google Sheets via Apps Script
- 📊 **Resultados en tiempo real** con promedios y distribuciones
- 💬 **Comentarios destacados** seleccionados manualmente
- 📱 **Detección de WhatsApp** para tracking
- 🔌 **Funciona offline** (guardado en localStorage)
- ♿ **Accesible** usando Radix UI
- 🎨 **Diseño moderno** con Tailwind CSS

---

## 🚀 Quick Start

### 1. Clonar el repositorio
```bash
git clone https://github.com/Benja301205/Encuesta-Picanthon-2-.git
cd Encuesta-Picanthon-2-
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar Google Sheets (obligatorio)
Lee las instrucciones completas en: **[INSTRUCCIONES_SETUP.md](./INSTRUCCIONES_SETUP.md)**

Resumen rápido:
1. Crea un Google Sheet con hojas "Responses" y "Featured_Comments"
2. Copia el código de `google-apps-script.js` a Apps Script
3. Deploya el script como Web App
4. Copia la URL del deployment

### 4. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz:
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

### 5. Ejecutar en desarrollo
```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```
app/
├── page.tsx              # Landing page
├── formulario/page.tsx   # Formulario de encuesta
├── resultados/page.tsx   # Visualización de resultados
└── layout.tsx           # Layout principal

components/
└── ui/                  # Componentes UI (Radix + Tailwind)

lib/
├── config.ts           # Configuración (URLs)
└── utils.ts            # Utilidades

google-apps-script.js   # Script para Google Sheets (backend)
```

---

## 📚 Documentación

- **[INSTRUCCIONES_SETUP.md](./INSTRUCCIONES_SETUP.md)** - Guía paso a paso para configurar todo
- **[COMO_FUNCIONA.md](./COMO_FUNCIONA.md)** - Explicación técnica del flujo y arquitectura

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15.5.6
- **UI**: React 19, TypeScript, Tailwind CSS v4
- **Componentes**: Radix UI
- **Backend**: Google Apps Script + Google Sheets
- **Deploy**: Vercel
- **Analytics**: Vercel Analytics

---

## 📊 Cómo Funciona

### Envío de Respuestas
1. Usuario completa el formulario
2. Datos se envían a Google Apps Script (POST)
3. Script guarda en Google Sheet "Responses"
4. Backup local en localStorage

### Visualización de Resultados
1. Página de resultados solicita datos (GET)
2. Apps Script calcula promedios y distribuciones
3. Lee comentarios destacados de hoja "Featured_Comments"
4. Devuelve JSON con toda la data
5. Frontend muestra gráficos y estadísticas

### Gestión de Comentarios Destacados
1. Tú lees las respuestas de texto en Google Sheets
2. Seleccionas los mejores comentarios manualmente
3. Los copias a la hoja "Featured_Comments"
4. Se muestran automáticamente en la página de resultados

---

## 🔧 Configuración de Google Sheets

### Hoja "Responses" (automática)
Se llena automáticamente con cada respuesta del formulario.

### Hoja "Featured_Comments" (manual)
Formato:
| Pregunta | Comentario |
|----------|------------|
| ¿Qué fue lo que más te gustó? | Texto del comentario |

---

## 🚀 Deploy a Producción

### Vercel
1. Conecta el repo a Vercel
2. Configura la variable de entorno:
   - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` = tu URL de Apps Script
3. Deploy automático

---

## 🐛 Troubleshooting

### Las respuestas no se guardan
- Verifica que `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` esté configurado
- Verifica que el deploy de Apps Script tenga acceso "Anyone"

### Los resultados no cargan
- Verifica que haya al menos una respuesta en Sheets
- Verifica que las hojas se llamen exactamente "Responses" y "Featured_Comments"

### Los comentarios no aparecen
- Verifica que la hoja "Featured_Comments" tenga headers: `Pregunta` y `Comentario`

---

## 📝 Licencia

Este proyecto fue generado con [v0.app](https://v0.app) y es de uso libre para la Picanthon.

---

## 🤝 Contribuir

Si encontrás bugs o querés agregar features, sentite libre de abrir un issue o PR.

---

## 📧 Contacto

Para preguntas sobre la Picanthon, contactá a los organizadores.

---

**🔥 Powered by Picante**