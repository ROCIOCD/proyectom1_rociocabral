// =========================================
// 1. Selección de elementos del DOM
// =========================================
const paletteContainer = document.getElementById('palette-container');
const generateBtn = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size');
const toast = document.getElementById('toast');


function generateRandomHex() {
    // Genera un número aleatorio, lo pasa a hexadecimal y asegura que tenga 6 caracteres
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return `#${randomColor.toUpperCase()}`;
}

// =========================================
// 3. Lógica: Microfeedback (Toast)
// =========================================
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false'); // Accesibilidad

    // Ocultar el toast automáticamente después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        toast.setAttribute('aria-hidden', 'true');
    }, 3000);
}

// =========================================
// 4. Lógica: Renderizado dinámico
// =========================================
function renderPalette() {
    // Limpiamos el contenedor por si hay colores de una generación anterior
    paletteContainer.innerHTML = '';

    // Leemos el tamaño seleccionado en el input (6, 8 o 9)
    const size = parseInt(paletteSizeSelect.value);

    // Creamos la cantidad de tarjetas solicitadas
    for (let i = 0; i < size; i++) {
        const hexColor = generateRandomHex();

        // Creamos el contenedor de la tarjeta
        const colorCard = document.createElement('div');
        colorCard.classList.add('color-card');
        colorCard.style.backgroundColor = hexColor;

        // Creamos el texto que mostrará el código HEX
        const colorText = document.createElement('p');
        colorText.textContent = hexColor;


        // Insertamos el texto en la tarjeta, y la tarjeta en el contenedor principal
        colorCard.appendChild(colorText);
        paletteContainer.appendChild(colorCard);
    }

    // Disparamos el microfeedback
    showToast('¡Paleta generada!');
}

// =========================================
// 5. Eventos
// =========================================
// Ejecutamos la función principal al hacer clic en el botón
generateBtn.addEventListener('click', renderPalette);

