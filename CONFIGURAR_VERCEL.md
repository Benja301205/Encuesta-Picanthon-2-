# 🚀 Configurar Vercel para Producción

## ✅ Lo que ya está listo:

- ✅ Código completo funcionando
- ✅ Google Apps Script deployado y funcionando
- ✅ Variable de entorno configurada localmente
- ✅ Todo funcionando en desarrollo (localhost:3000)

---

## 📝 Para deployar a producción en Vercel:

### Opción A: Si ya tenés el proyecto en Vercel

1. Andá a tu proyecto en Vercel: https://vercel.com/benjabertone3012-3254s-projects/v0-picanthon-survey-app
2. Hacé click en **Settings**
3. En el menú lateral, hacé click en **Environment Variables**
4. Hacé click en **Add New**
5. Agregá:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - **Value**: `https://script.google.com/macros/s/AKfycbzKIEpnevxBwnPYtxnQhHk54EZGRmciBEIlouc0DiuWL0ytmD0G01CyCT1jZYAZcotW/exec`
   - **Environments**: Marcá las 3 (Production, Preview, Development)
6. Hacé click en **Save**
7. Andá a la pestaña **Deployments**
8. En el último deployment, hacé click en los 3 puntitos **...** y seleccioná **Redeploy**
9. Confirmá el redeploy

### Opción B: Si NO tenés el proyecto en Vercel todavía

1. Andá a [Vercel](https://vercel.com)
2. Hacé click en **Add New > Project**
3. Importá el repositorio: `Benja301205/Encuesta-Picanthon-2-`
4. Antes de hacer deploy, hacé click en **Environment Variables**
5. Agregá:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - **Value**: `https://script.google.com/macros/s/AKfycbzKIEpnevxBwnPYtxnQhHk54EZGRmciBEIlouc0DiuWL0ytmD0G01CyCT1jZYAZcotW/exec`
6. Hacé click en **Deploy**

---

## 🧪 Probar en producción:

Una vez deployado:

1. **Probar el formulario:**
   - Andá a tu URL de producción
   - Click en "Completar encuesta"
   - Llenalo completo y envialo
   - Verificá en tu Google Sheet que se haya guardado

2. **Probar los resultados:**
   - Andá a: `tu-url.vercel.app/resultados`
   - Deberías ver los promedios de las respuestas
   - Si ya agregaste comentarios destacados, deberían aparecer

---

## 📊 Agregar comentarios destacados:

1. Abrí tu Google Sheet: "Picanthon Survey Responses"
2. Andá a la hoja **"Featured_Comments"**
3. En la primera fila poné los headers:
   - Columna A: `Pregunta`
   - Columna B: `Comentario`
4. Agregá filas con comentarios, por ejemplo:

| Pregunta | Comentario |
|----------|------------|
| ¿Qué mantendrías de la hackathon? | El ambiente colaborativo fue increíble y la energía de todos los participantes |
| ¿Qué cambiarías de la hackathon? | Me gustaría que hubiera más tiempo para desarrollar el proyecto completamente |
| ¿Qué agregarías a la Picanthon? | Sería genial tener más mentores técnicos especializados en cada área |

5. Refrescá la página de resultados y los comentarios aparecerán automáticamente

---

## ✅ Checklist Final:

- [ ] Variable de entorno agregada en Vercel
- [ ] Proyecto re-deployado
- [ ] Formulario probado en producción (se guarda en Sheet)
- [ ] Resultados mostrando datos reales
- [ ] Comentarios destacados agregados (opcional)

---

## 🎉 ¡Listo!

Tu aplicación está en producción y completamente funcional. Las respuestas se guardarán automáticamente en Google Sheets cada vez que alguien complete el formulario.

**URL de la aplicación:** Tu URL de Vercel

**Google Sheet:** Tu spreadsheet con las respuestas

---

## 📞 Si algo no funciona:

1. Verificá que la variable de entorno esté bien copiada en Vercel
2. Verificá que hiciste el redeploy después de agregar la variable
3. Verificá que el Google Apps Script tenga acceso "Anyone"
4. Abrí la consola del navegador (F12) para ver si hay errores

---

**¡Todo funcionando! 🚀🔥**
