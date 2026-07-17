// =========================================
// 1. Selección de elementos del DOM
// =========================================
const paletteContainer = document.getElementById('palette-container');
const generateBtn = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size');
const toast = document.getElementById('toast');

// Objeto global para almacenar los colores bloqueados
let lockedColors = JSON.parse(localStorage.getItem('lockedColors')) || [];

function generateRandomHex() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return `#${randomColor.toUpperCase()}`;
}

// =========================================
// 2. Lógica: Microfeedback (Toast)
// =========================================
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.setAttribute('aria-hidden', 'true');
    }, 3000);
}

// =========================================
// 3. Función maestra de renderizado (Centralizada)
// =========================================
function createColorCard(hexColor, index) {
    const colorCard = document.createElement('div');
    colorCard.classList.add('color-card');
    colorCard.style.backgroundColor = hexColor;

    const lockButton = document.createElement('button');
    lockButton.textContent = lockedColors[index] ? '🔒' : '🔓';
    lockButton.classList.add('lock-btn');

    const colorText = document.createElement('p');
    colorText.textContent = hexColor;

    const colorTextHSL = document.createElement('p');
    colorTextHSL.textContent = hexToHSL(hexColor);

    colorCard.appendChild(lockButton);
    colorCard.appendChild(colorText);
    colorCard.appendChild(colorTextHSL);

    // Eventos
    colorCard.addEventListener('click', () => {
        navigator.clipboard.writeText(hexColor);
        showToast("Copiado: " + hexColor);
    });

    lockButton.addEventListener('click', (e) => {
        e.stopPropagation();
        lockedColors[index] = !lockedColors[index];
        lockButton.textContent = lockedColors[index] ? '🔒' : '🔓';
        localStorage.setItem('lockedColors', JSON.stringify(lockedColors));
    });

    return colorCard;
}

// =========================================
// 4. Lógica: Renderizado dinámico
// =========================================
function renderPalette() {
    paletteContainer.innerHTML = '';
    const size = parseInt(paletteSizeSelect.value);
    const savedPalette = JSON.parse(localStorage.getItem('lastPalette')) || [];
    let newPalette = [];

    for (let i = 0; i < size; i++) {
        const hexColor = (lockedColors[i] && savedPalette[i]) ? savedPalette[i] : generateRandomHex();
        newPalette.push(hexColor);
        paletteContainer.appendChild(createColorCard(hexColor, i));
    }

    localStorage.setItem('lastPalette', JSON.stringify(newPalette));
    localStorage.setItem('lockedColors', JSON.stringify(lockedColors));
    showToast('¡Paleta generada!');
}

// =========================================
// 5. Conversión HEX a HSL
// =========================================
function hexToHSL(hex) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// =========================================
// 6. Eventos
// =========================================
generateBtn.addEventListener('click', renderPalette);

window.addEventListener('load', () => {
    const savedPalette = JSON.parse(localStorage.getItem('lastPalette'));
    if (savedPalette) {
        paletteSizeSelect.value = savedPalette.length;
        paletteContainer.innerHTML = '';
        savedPalette.forEach((hex, i) => paletteContainer.appendChild(createColorCard(hex, i)));
    }
});