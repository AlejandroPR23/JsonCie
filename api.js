// URL del JSON alojado en GitHub Pages
const API_URL = "https://alejandropr23.github.io/JsonCie/cie10.json";

// Función para obtener los datos con parámetros opcionales
async function obtenerDatos(codigo, grupo) {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        let resultado = data;

        // Filtrar por código si se proporciona
        if (codigo) {
            resultado = resultado.filter(item => item.codigo === codigo.toUpperCase());
        }

        // Filtrar por grupo si se proporciona
        if (grupo) {
            resultado = resultado.filter(item => item.grupo.toLowerCase().includes(grupo.toLowerCase()));
        }

        return resultado;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return { error: "Error al procesar la solicitud." };
    }
}

// Función para manejar la respuesta en formato JSON
async function procesarSolicitud() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get("codigo");
    const grupo = urlParams.get("grupo");

    // Obtener los datos filtrados
    const resultado = await obtenerDatos(codigo, grupo);

    // Devolver JSON en la respuesta
    const jsonResponse = JSON.stringify(resultado, null, 2);

    // Modificar los encabezados para que el navegador lo trate como JSON
    document.body.innerHTML = `<pre>${jsonResponse}</pre>`;
}

// Ejecutar la función cuando la página cargue
procesarSolicitud();
