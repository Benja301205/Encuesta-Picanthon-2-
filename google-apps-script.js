// ============================================
// GOOGLE APPS SCRIPT PARA PICANTHON SURVEY
// ============================================
//
// INSTRUCCIONES DE INSTALACIÓN:
//
// 1. Crear una Google Sheet nueva con el nombre "Picanthon Survey Responses"
// 2. En la sheet, ir a: Extensions > Apps Script
// 3. Copiar TODO este código en el editor
// 4. Crear 2 hojas en tu spreadsheet:
//    - Hoja 1: "Responses" (donde se guardarán las respuestas)
//    - Hoja 2: "Featured_Comments" (donde pondrás los comentarios destacados)
// 5. Guardar el script y hacer "Deploy" > "New deployment"
//    - Tipo: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Autorizar los permisos
// 7. Copiar la URL del deployment
// 8. Pegar esa URL en tu código de Next.js (lo haremos después)
//
// ============================================

// Función para recibir los datos del formulario (POST request)
function doPost(e) {
  try {
    // Parsear los datos recibidos
    const data = JSON.parse(e.postData.contents);

    // Obtener la hoja de respuestas
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Responses');

    // Si no existe la hoja, crearla con headers
    if (!sheet) {
      sheet = ss.insertSheet('Responses');
      sheet.appendRow([
        'Timestamp',
        'ID',
        'Q1_Probabilidad_Volver',
        'Q2_Lugar',
        'Q3_Comida',
        'Q4_Mentores',
        'Q5_MiniGames',
        'Q6_Consigna',
        'Q7_Pitch',
        'Q8_Jueces',
        'Q9_Mantener',
        'Q10_Cambiar',
        'Q11_Agregar',
        'User_Agent',
        'Desde_WhatsApp'
      ]);
    }

    // Agregar la nueva fila con los datos
    sheet.appendRow([
      data.timestamp,
      data.id,
      data.q1,
      data.q2,
      data.q3,
      data.q4,
      data.q5,
      data.q6,
      data.q7,
      data.q8,
      data.q9,
      data.q10,
      data.q11,
      data.userAgent,
      data.isFromWhatsApp
    ]);

    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Respuesta guardada exitosamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Manejo de errores
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para obtener los resultados agregados (GET request)
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Responses');

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'No hay respuestas todavía'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Obtener todos los datos (excluyendo el header)
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    if (rows.length === 0) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          totalResponses: 0,
          averages: {},
          distribution: {},
          featuredComments: []
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Calcular promedios de las preguntas numéricas (Q1-Q8)
    const numericQuestions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];
    const averages = {};
    const distribution = {};

    // Inicializar distribución
    numericQuestions.forEach(q => {
      distribution[q] = [0, 0, 0, 0, 0]; // Para valores 1-5
    });

    // Calcular sumas y distribuciones
    const sums = {};
    numericQuestions.forEach(q => sums[q] = 0);

    rows.forEach(row => {
      numericQuestions.forEach((q, index) => {
        const colIndex = index + 2; // Las respuestas numéricas empiezan en la columna 2
        const value = parseInt(row[colIndex]);
        if (value >= 1 && value <= 5) {
          sums[q] += value;
          distribution[q][value - 1]++; // Array es 0-indexed
        }
      });
    });

    // Calcular promedios
    numericQuestions.forEach(q => {
      averages[q] = parseFloat((sums[q] / rows.length).toFixed(2));
    });

    // Obtener comentarios destacados de la hoja "Featured_Comments"
    const featuredSheet = ss.getSheetByName('Featured_Comments');
    let featuredComments = [];

    if (featuredSheet) {
      const featuredData = featuredSheet.getDataRange().getValues();
      // Asumiendo que la primera fila es header: [Pregunta, Comentario]
      featuredComments = featuredData.slice(1).map(row => ({
        question: row[0],
        comment: row[1]
      }));
    }

    // Preparar respuesta
    const result = {
      success: true,
      totalResponses: rows.length,
      averages: averages,
      distribution: distribution,
      featuredComments: featuredComments
    };

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
