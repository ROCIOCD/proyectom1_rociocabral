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
    // Creamos un array para almacenar los colores generados
    const palette = [];

    // Creamos la cantidad de tarjetas solicitadas
    for (let i = 0; i < size; i++) {
        const hexColor = generateRandomHex();
        // Guardamos el color en el array de la paleta
        palette.push(hexColor);

        // Creamos el contenedor de la tarjeta
        const colorCard = document.createElement('div');
        colorCard.classList.add('color-card');
        colorCard.style.backgroundColor = hexColor;

        // Creamos el texto que mostrará el código HEX
        const colorText = document.createElement('p');
        colorText.textContent = hexColor;

        // Creamos el texto que mostrará el código HSL
        const colorTextHSL = document.createElement('p');
        colorTextHSL.textContent = hexToHSL(hexColor);


        // Insertamos el texto en la tarjeta, y la tarjeta en el contenedor principal
        colorCard.appendChild(colorText);
        colorCard.appendChild(colorTextHSL);
        paletteContainer.appendChild(colorCard);
    }

    // Guardamos la paleta en el localStorage para que persista entre sesiones
    localStorage.setItem('lastPalette', JSON.stringify(palette));

    // Disparamos el microfeedback
    showToast('¡Paleta generada!');
}

// =========================================
// 5. Eventos
// =========================================
// Ejecutamos la función principal al hacer clic en el botón
generateBtn.addEventListener('click', renderPalette);

// =========================================
// 6. Convertir HEX a HSL
// =========================================
// Ejecutamos la función para generar la conversion a HSL
function hexToHSL(hex) {
    // Eliminar #
    hex = hex.replace('#', '');

    // Convertir HEX a RGB
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s, l;
    l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}


// =========================================
// 7. Recuperar la última paleta generada al cargar la página
// =========================================
// Si hay una paleta guardada en el localStorage, la recuperamos y la renderizamos
window.addEventListener('load', () => {
    //Buscamos la paleta guardada en el localStorage
    const savedPalette = JSON.parse(localStorage.getItem('lastPalette'));

    // Si no hay paleta guardada, salimos de la función
    if (!savedPalette) {
        return;
    }

    // Limpiamos el contenedor por si hay colores de una generación anterior
    paletteContainer.innerHTML = '';

    // Recorremos la paleta guardada y creamos las tarjetas correspondientes
    savedPalette.forEach(hexColor => {
        const colorCard = document.createElement('div');
        colorCard.classList.add('color-card');
        colorCard.style.backgroundColor = hexColor;

        const colorText = document.createElement('p');
        colorText.textContent = hexColor;

        const colorTextHSL = document.createElement('p');
        colorTextHSL.textContent = hexToHSL(hexColor);

        colorCard.appendChild(colorText);
        colorCard.appendChild(colorTextHSL);

        paletteContainer.appendChild(colorCard);
    });
});


