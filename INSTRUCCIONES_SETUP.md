# 📝 Instrucciones de Configuración - Encuesta Picanthon

## 🎯 Resumen
Esta guía te ayudará a configurar la integración entre tu aplicación Next.js y Google Sheets para guardar y mostrar las respuestas de la encuesta.

---

## 📋 Paso 1: Configurar Google Sheets

### 1.1 Crear la Spreadsheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala: **"Picanthon Survey Responses"**

### 1.2 Crear las hojas necesarias
Dentro de la spreadsheet, crea 2 hojas:

**Hoja 1: "Responses"**
- Esta hoja se llenará automáticamente con las respuestas del formulario
- No necesitas agregar headers manualmente, el script los creará

**Hoja 2: "Featured_Comments"**
- Aquí pondrás manualmente los comentarios destacados que quieres mostrar
- Agrega estos headers en la primera fila:
  - Columna A: `Pregunta`
  - Columna B: `Comentario`

**Ejemplo de Featured_Comments:**
| Pregunta | Comentario |
|----------|------------|
| ¿Qué fue lo que más te gustó? | El ambiente colaborativo fue increíble |
| ¿Qué cambiarías? | Me gustaría más tiempo para desarrollar |

---

## 🔧 Paso 2: Configurar Google Apps Script

### 2.1 Abrir el editor de Apps Script
1. En tu Google Sheet, ve a: **Extensions > Apps Script**
2. Se abrirá el editor de código

### 2.2 Copiar el código
1. Abre el archivo `google-apps-script.js` en la raíz de este proyecto
2. **Copia TODO el contenido** del archivo
3. Pégalo en el editor de Apps Script (reemplaza el código que esté ahí)
4. Guarda el proyecto (Ctrl+S o File > Save)

### 2.3 Deployar el script
1. En Apps Script, haz click en **Deploy > New deployment**
2. Haz click en el ícono de engranaje ⚙️ junto a "Select type"
3. Selecciona **"Web app"**
4. Configura:
   - **Description**: "Picanthon Survey API"
   - **Execute as**: Me (tu email)
   - **Who has access**: Anyone
5. Haz click en **Deploy**
6. **IMPORTANTE**: Autoriza los permisos cuando te lo pida
7. **Copia la URL del deployment** (algo como: `https://script.google.com/macros/s/XXXXX/exec`)

---

## 💻 Paso 3: Configurar la Aplicación Next.js

### 3.1 Crear el archivo de variables de entorno
1. En la raíz del proyecto, crea un archivo llamado `.env.local`
2. Agrega esta línea, reemplazando la URL con la que copiaste:
```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

### 3.2 Instalar dependencias (si es necesario)
```bash
pnpm install
```

### 3.3 Ejecutar en desarrollo
```bash
pnpm dev
```

---

## 🧪 Paso 4: Probar la Integración

### 4.1 Probar el formulario
1. Abre tu aplicación en: `http://localhost:3000`
2. Haz click en "Completar encuesta"
3. Llena el formulario completo
4. Envía las respuestas
5. Ve a tu Google Sheet y verifica que se haya agregado una fila nueva en la hoja "Responses"

### 4.2 Probar la página de resultados
1. Ve a: `http://localhost:3000/resultados`
2. Deberías ver:
   - El total de respuestas
   - Los promedios de cada pregunta (1-5)
   - La distribución de respuestas en gráficos
   - Los comentarios destacados (si agregaste algunos en la hoja "Featured_Comments")

---

## 📝 Paso 5: Agregar Comentarios Destacados Manualmente

### 5.1 Leer las respuestas
1. Ve a tu Google Sheet
2. Abre la hoja "Responses"
3. Lee las columnas:
   - `Q9_Mantener` (columna J)
   - `Q10_Cambiar` (columna K)
   - `Q11_Agregar` (columna L)

### 5.2 Seleccionar comentarios destacados
1. Elige los comentarios más interesantes/relevantes
2. Ve a la hoja "Featured_Comments"
3. Agrega filas con este formato:

| Pregunta | Comentario |
|----------|------------|
| ¿Qué mantendrías de la hackathon? | El texto completo del comentario |
| ¿Qué cambiarías de la hackathon? | Otro comentario interesante |
| ¿Qué agregarías a la Picanthon? | Más comentarios... |

### 5.3 Verificar en la página
1. Refresca la página de resultados
2. Los comentarios deberían aparecer en la sección "Comentarios Destacados"

---

## 🚀 Paso 6: Deploy a Producción (Vercel)

### 6.1 Configurar variables de entorno en Vercel
1. Ve a tu proyecto en [Vercel](https://vercel.com)
2. Ve a: **Settings > Environment Variables**
3. Agrega la variable:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - **Value**: Tu URL del Google Apps Script
   - **Environment**: Production, Preview, Development
4. Guarda los cambios

### 6.2 Re-deploy
1. Vercel debería hacer un re-deploy automáticamente
2. Si no, puedes hacerlo manualmente desde el dashboard
3. Una vez deployado, prueba la aplicación en producción

---

## 🔍 Troubleshooting

### Problema: Las respuestas no se guardan en Google Sheets
**Solución:**
- Verifica que la URL del script sea correcta en `.env.local`
- Verifica que el deploy del Apps Script esté configurado con "Who has access: Anyone"
- Revisa la consola del navegador (F12) para ver errores

### Problema: Los resultados no se cargan
**Solución:**
- Verifica que haya al menos una respuesta en la hoja "Responses"
- Verifica que la URL del script sea correcta
- Revisa que las hojas se llamen exactamente "Responses" y "Featured_Comments"

### Problema: Los comentarios destacados no aparecen
**Solución:**
- Verifica que la hoja "Featured_Comments" tenga los headers correctos
- Verifica que haya datos en la hoja
- Refresca la página de resultados

---

## 📊 Estructura de Datos

### Datos que se guardan por cada respuesta:
- Timestamp
- ID único
- Q1-Q8: Respuestas numéricas (1-5)
- Q9-Q11: Respuestas de texto abierto
- User Agent
- Si vino desde WhatsApp

### Datos que se calculan automáticamente:
- Total de respuestas
- Promedio de cada pregunta numérica
- Distribución de respuestas (cuántas personas eligieron 1, 2, 3, 4, 5)

---

## ✅ Checklist Final

- [ ] Google Sheet creada con hojas "Responses" y "Featured_Comments"
- [ ] Google Apps Script copiado y deployado
- [ ] URL del script copiada
- [ ] Archivo `.env.local` creado con la URL
- [ ] Aplicación corriendo localmente
- [ ] Formulario probado y guardando en Sheet
- [ ] Resultados mostrando datos reales
- [ ] Comentarios destacados agregados manualmente
- [ ] Variables de entorno configuradas en Vercel
- [ ] Aplicación funcionando en producción

---

## 🎉 ¡Listo!

Tu aplicación de encuesta está completamente configurada y lista para usar. Las respuestas se guardarán automáticamente en Google Sheets, los promedios se calcularán en tiempo real, y tú podrás seleccionar manualmente los mejores comentarios para mostrar en la página de resultados.

Si tienes algún problema, revisa la sección de Troubleshooting o verifica que hayas seguido todos los pasos correctamente.
