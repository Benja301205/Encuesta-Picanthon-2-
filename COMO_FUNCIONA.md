# 🔄 Cómo Funciona la Encuesta Picanthon

## Flujo General del Sistema

```
┌─────────────────┐
│   Usuario Web   │
│  o WhatsApp     │
└────────┬────────┘
         │
         │ 1. Completa formulario
         ▼
┌─────────────────────────┐
│  Formulario Next.js     │
│  /formulario/page.tsx   │
└────────┬────────────────┘
         │
         │ 2. Envía datos (POST)
         ▼
┌─────────────────────────┐
│  Google Apps Script     │
│  (Backend automático)   │
└────────┬────────────────┘
         │
         │ 3. Guarda en Sheet
         ▼
┌─────────────────────────┐
│   Google Sheets         │
│   Hoja: "Responses"     │
└─────────────────────────┘
```

---

## Flujo de Visualización de Resultados

```
┌─────────────────┐
│   Usuario Web   │
└────────┬────────┘
         │
         │ 1. Visita /resultados
         ▼
┌─────────────────────────┐
│  Página de Resultados   │
│  /resultados/page.tsx   │
└────────┬────────────────┘
         │
         │ 2. Solicita datos (GET)
         ▼
┌─────────────────────────┐
│  Google Apps Script     │
│  Calcula promedios      │
└────────┬────────────────┘
         │
         │ 3. Lee datos
         ▼
┌─────────────────────────┐
│   Google Sheets         │
│   Hoja: "Responses"     │
│   + "Featured_Comments" │
└────────┬────────────────┘
         │
         │ 4. Devuelve JSON
         ▼
┌─────────────────────────┐
│  Página de Resultados   │
│  Muestra gráficos       │
│  + comentarios          │
└─────────────────────────┘
```

---

## Gestión de Comentarios Destacados

```
┌─────────────────────────┐
│  Administrador (TÚ)     │
└────────┬────────────────┘
         │
         │ 1. Lee respuestas de texto en Sheet
         ▼
┌─────────────────────────┐
│   Google Sheets         │
│   Hoja: "Responses"     │
│   Columnas Q9, Q10, Q11 │
└────────┬────────────────┘
         │
         │ 2. Selecciona mejores comentarios
         │    (manualmente)
         ▼
┌─────────────────────────┐
│   Google Sheets         │
│   Hoja:                 │
│   "Featured_Comments"   │
│                         │
│   Pregunta | Comentario │
│   ---------|----------- │
│   ¿Qué...? | Texto...   │
└────────┬────────────────┘
         │
         │ 3. Se muestran automáticamente
         ▼
┌─────────────────────────┐
│  Página de Resultados   │
│  Sección: "Comentarios  │
│  Destacados"            │
└─────────────────────────┘
```

---

## Datos que se Guardan

### Por cada respuesta del formulario:
```javascript
{
  id: "uuid-generado",
  timestamp: "2025-10-21T15:30:00Z",
  q1: "5",  // Probabilidad de volver
  q2: "4",  // Opinión del lugar
  q3: "5",  // Opinión de la comida
  q4: "5",  // Experiencia con mentores
  q5: "4",  // Opinión mini games
  q6: "5",  // Opinión consigna
  q7: "4",  // Opinión pitch
  q8: "4",  // Opinión jueces
  q9: "El ambiente fue increíble...",      // Texto: Qué mantener
  q10: "Me gustaría más tiempo...",        // Texto: Qué cambiar
  q11: "Agregar más mentores técnicos...", // Texto: Qué agregar
  userAgent: "Mozilla/5.0...",
  isFromWhatsApp: false
}
```

---

## Datos que se Calculan (Automático)

### El script calcula en tiempo real:

```javascript
{
  success: true,
  totalResponses: 42,
  averages: {
    q1: 4.5,  // Promedio de todas las respuestas Q1
    q2: 4.2,  // Promedio de todas las respuestas Q2
    // ... etc para Q3-Q8
  },
  distribution: {
    q1: [1, 2, 5, 12, 22],  // Cuántos eligieron 1★, 2★, 3★, 4★, 5★
    q2: [2, 3, 8, 15, 14],  // Para cada pregunta
    // ... etc para Q3-Q8
  },
  featuredComments: [
    {
      question: "¿Qué fue lo que más te gustó?",
      comment: "El ambiente colaborativo..."
    }
    // ... más comentarios que tú seleccionaste
  ]
}
```

---

## Estructura de Google Sheets

### Hoja "Responses"
```
| Timestamp | ID | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9_Mantener | Q10_Cambiar | Q11_Agregar | User_Agent | Desde_WhatsApp |
|-----------|----|----|----|----|----|----|----|----|----|--------------|--------------|--------------|-----------:|----------------|
| 2025...   | ab12 | 5 | 4 | 5 | 5 | 4 | 5 | 4 | 4 | Texto... | Texto... | Texto... | Mozilla... | false |
| 2025...   | cd34 | 4 | 5 | 3 | 5 | 5 | 4 | 5 | 3 | Texto... | Texto... | Texto... | Mozilla... | true  |
```

### Hoja "Featured_Comments"
```
| Pregunta                           | Comentario                                           |
|------------------------------------|------------------------------------------------------|
| ¿Qué mantendrías de la hackathon?  | El ambiente colaborativo fue increíble               |
| ¿Qué cambiarías de la hackathon?   | Me gustaría más tiempo para desarrollar el proyecto  |
| ¿Qué agregarías a la Picanthon?    | Más mentores técnicos especializados                 |
```

---

## Tecnologías Utilizadas

### Frontend (Next.js)
- **React 19** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Radix UI** - Componentes accesibles

### Backend (Google Apps Script)
- **JavaScript** - Lenguaje del script
- **Google Sheets API** - Base de datos
- **Web App Deployment** - Endpoints REST

### Conexión
- **Fetch API** - HTTP requests
- **JSON** - Formato de datos
- **Environment Variables** - Configuración segura

---

## Ventajas de esta Arquitectura

1. **Sin servidor backend propio**: Google Apps Script es gratis y escalable
2. **Datos visibles**: Puedes ver todas las respuestas en una Sheet normal
3. **Fácil de administrar**: Solo copias/pegas comentarios destacados
4. **Cálculos automáticos**: Los promedios se calculan en tiempo real
5. **Sin base de datos**: Google Sheets es tu base de datos
6. **Deploy simple**: Solo configurar una URL de entorno

---

## Seguridad

- **No-CORS**: El formulario usa modo no-cors para evitar problemas CORS
- **Variables de entorno**: La URL del script no se expone en el código
- **LocalStorage backup**: Si falla el envío, se guarda localmente
- **Validación**: El formulario valida todos los campos antes de enviar

---

## Próximos Pasos Opcionales

### Para mejorar aún más:
1. **Autenticación**: Agregar login para ver resultados (si quieres que sea privado)
2. **Dashboard admin**: Crear una página para seleccionar comentarios desde la web
3. **Notificaciones**: Enviar email cuando alguien completa la encuesta
4. **Análisis avanzado**: Agregar más gráficos y estadísticas
5. **Export CSV**: Botón para descargar todas las respuestas

---

## Mantenimiento

### Tareas periódicas:
- **Revisar respuestas**: Entrar a Google Sheets regularmente
- **Actualizar comentarios**: Cambiar los destacados según nuevas respuestas
- **Verificar funcionamiento**: Probar el formulario cada tanto

### No requiere mantenimiento:
- El script de Apps Script
- Los cálculos de promedios
- La conexión entre frontend y backend

---

¡El sistema está diseñado para ser automático y fácil de mantener! 🚀
