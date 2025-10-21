# 📋 Lo que necesito que me pases para terminar la configuración

## ✅ Lo que YA está hecho:

- ✅ Todo el código del frontend (Next.js)
- ✅ El script de Google Apps Script (google-apps-script.js)
- ✅ Toda la documentación
- ✅ Integración completa lista para usar
- ✅ Subido a GitHub

---

## 📝 Lo que VOS tenés que hacer:

### Paso 1: Crear Google Sheet
1. Andá a [Google Sheets](https://sheets.google.com)
2. Creá una nueva hoja de cálculo
3. Nombrala: "Picanthon Survey Responses"
4. Creá 2 hojas adentro:
   - Una llamada: **"Responses"** (ahí se van a guardar las respuestas automáticamente)
   - Otra llamada: **"Featured_Comments"** (ahí vas a poner comentarios destacados)

### Paso 2: Configurar el script
1. En tu Google Sheet, andá a: **Extensions > Apps Script**
2. Se va a abrir un editor de código
3. Abrí el archivo `google-apps-script.js` que está en tu proyecto
4. Copiá TODO el código
5. Pegalo en el editor de Apps Script (reemplazá lo que esté ahí)
6. Guardá el proyecto (Ctrl+S)

### Paso 3: Deployar el script
1. En Apps Script, hacé click en **Deploy > New deployment**
2. Click en el ícono de engranaje ⚙️ junto a "Select type"
3. Elegí **"Web app"**
4. Configurá:
   - Execute as: **Me** (tu email)
   - Who has access: **Anyone** ← ¡MUY IMPORTANTE!
5. Click en **Deploy**
6. Te va a pedir autorizar permisos, aceptá todo
7. **COPIÁ LA URL** que te da (algo como: `https://script.google.com/macros/s/XXXXX/exec`)

### Paso 4: Pasarme la URL
**Copiá la URL del deployment y pasámela.**

---

## 🎯 Cuando me pases la URL, yo voy a:

1. Crear el archivo `.env.local` con la URL
2. Probar que funcione todo localmente
3. Configurar Vercel con la variable de entorno
4. Verificar que todo funcione en producción

---

## 📌 IMPORTANTE:

- La URL tiene que ser pública (Anyone access) para que funcione
- No compartas la URL públicamente después (aunque es relativamente segura)
- Podés cambiar el nombre de la Sheet si querés, pero avisame para actualizar el código

---

## ❓ Si tenés dudas en algún paso:

Lee las instrucciones completas en: **INSTRUCCIONES_SETUP.md**

Tiene TODO explicado paso a paso con más detalle.

---

**Resumiendo: Solo necesito que me pases la URL del deployment de Google Apps Script y yo me encargo del resto! 🚀**
