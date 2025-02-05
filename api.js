// URL del JSON alojado en GitHub Pages
const API_URL = "https://alejandropr23.github.io/JsonCie/cie10.json";

// Función para obtener los datos con parámetros opcionales
async function obtenerDatos(codigo, grupo, page = 1, limit = 50) {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("No se pudo cargar el archivo JSON.");

        const data = await response.json();
        let resultado = data;

        // Filtrar por código si se proporciona
        if (codigo) {
            resultado = resultado.filter(item => item.codigo?.toUpperCase() === codigo.toUpperCase());
        }

        // Filtrar por grupo si se proporciona
        if (grupo) {
            resultado = resultado.filter(item => item.grupo?.toLowerCase().includes(grupo.toLowerCase()));
        }

        // Convertir page y limit a números válidos
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 50;

        // Calcular el índice de inicio y final de la página
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Obtener solo la parte de datos correspondiente a la página solicitada
        const paginatedResults = resultado.slice(startIndex, endIndex);

        // Información de paginación
        const paginationInfo = {
            totalResults: resultado.length,
            totalPages: Math.ceil(resultado.length / limit),
            currentPage: page,
            resultsPerPage: limit
        };

        return { pagination: paginationInfo, data: paginatedResults };
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return { error: "Error al procesar la solicitud." };
    }
}

// Función para manejar la respuesta en formato JSON
async function procesarSolicitud() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get("codigo") || null;
    const grupo = urlParams.get("grupo") || null;
    const page = urlParams.get("page") || 1;
    const limit = urlParams.get("limit") || 50;

    // Obtener los datos filtrados y paginados
    const resultado = await obtenerDatos(codigo, grupo, page, limit);

    // Construir la respuesta JSON
    const jsonResponse = JSON.stringify(resultado, null, 2);

    // Modificar los encabezados para que el navegador lo trate como JSON
    document.body.innerHTML = `<pre>${jsonResponse}</pre>`;
    document.body.style.fontFamily = "monospace"; // Mejor legibilidad
}

// Ejecutar la función cuando la página cargue
procesarSolicitud();
