# ⚡ RESUMEN RÁPIDO - Lo que necesitas hacer

## 🎯 Para que funcione completo, necesitas:

### 1️⃣ Crear Google Sheet
- Nombre: "Picanthon Survey Responses"
- 2 hojas: "Responses" y "Featured_Comments"

### 2️⃣ Configurar Google Apps Script
- Ir a: Extensions > Apps Script
- Copiar TODO el código de `google-apps-script.js`
- Deploy > New deployment > Web app
- Execute as: Me
- Who has access: **Anyone** ← IMPORTANTE
- Copiar la URL que te da

### 3️⃣ Configurar el proyecto
- Crear archivo `.env.local` en la raíz
- Pegar: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL=la_url_que_copiaste`

### 4️⃣ Listo!
```bash
pnpm install
pnpm dev
```

---

## 📝 Para agregar comentarios destacados (después)

1. Abrí Google Sheets
2. Andá a la hoja "Featured_Comments"
3. Agregá filas con este formato:

| Pregunta | Comentario |
|----------|------------|
| ¿Qué fue lo que más te gustó? | El texto del comentario que quieras mostrar |
| ¿Qué cambiarías? | Otro comentario... |

4. Refrescá la página de resultados y listo

---

## 🚀 Deploy a Vercel

1. Conectá el repo a Vercel
2. Agregá la variable de entorno:
   - Name: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - Value: La URL del script
3. Deploy

---

## ❓ Si algo no funciona

Lee: `INSTRUCCIONES_SETUP.md` (tiene TODO paso a paso con capturas)

---

**Eso es todo! 🎉**
