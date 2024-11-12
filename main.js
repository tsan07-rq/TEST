// Seleccionar todos los elementos de tipo canvas
const canvases = document.querySelectorAll("canvas");

// Función para redimensionar todos los canvas
function resizeAllCanvases() {
    canvases.forEach(canvas => {
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth * 0.9;  // Ancho al 90% de la ventana
        canvas.height = window.innerHeight * 0.7; // Altura al 70% de la ventana
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    });
}

// Inicializar tamaños de todos los canvas al cargar la página
resizeAllCanvases();

// Variables para controlar el dibujo
let drawing = false;

// Iniciar dibujo (mouse y táctil)
function startDrawing(event) {
    drawing = true;
    draw(event);
}

// Terminar dibujo (mouse y táctil)
function stopDrawing() {
    drawing = false;
    canvases.forEach(canvas => {
        const ctx = canvas.getContext("2d");
        ctx.beginPath(); // Termina el trazo
    });
}

// Función para dibujar en el canvas específico
function draw(event) {
    if (!drawing) return;

    // Identificar el canvas activo en el que se está dibujando
    const canvas = event.target;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#333";

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if (event.touches) {
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
    } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Agregar eventos de dibujo a cada canvas
canvases.forEach(canvas => {
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchend", stopDrawing);
    canvas.addEventListener("touchmove", draw);
});

// Redimensionar todos los canvas cuando cambia el tamaño de la ventana
window.addEventListener("resize", resizeAllCanvases);
