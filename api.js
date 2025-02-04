// api.js

// Cargar el JSON de CIE-10
fetch('cie10.json')
    .then(response => response.json())
    .then(data => {
        // Obtener los parámetros de búsqueda desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const codigo = urlParams.get('codigo');  // Ejemplo: ?codigo=A000
        const grupo = urlParams.get('grupo');    // Ejemplo: ?grupo=COLERA

        // Filtrar los datos si hay parámetros
        let resultados = data;
        if (codigo) {
            resultados = resultados.filter(item => item.codigo === codigo);
        }
        if (grupo) {
            resultados = resultados.filter(item => item.grupo.toLowerCase().includes(grupo.toLowerCase()));
        }

        // Mostrar los resultados en la consola (puedes cambiar esto para mostrarlos en la página)
        console.log("Resultados de búsqueda:", resultados);

        // Devolver los resultados como una respuesta JSON para el front-end
        window.resultados = resultados;
    })
    .catch(error => console.error("Error al cargar JSON:", error));
