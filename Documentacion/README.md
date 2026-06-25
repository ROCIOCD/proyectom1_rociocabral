# 🎨 Colorfly Studio — Generador de Paletas de Colores

Proyecto Integrador Módulo 1 — Henry Full Stack 3.0 + IA  
**Desarrolladora:** Rocío Cabral

---

## 📋 Descripción

Colorfly Studio es una aplicación web estática e interactiva que permite generar paletas de colores aleatorias con un solo clic. Fue desarrollada como MVP para el equipo creativo de una agencia de branding, con el objetivo de acelerar el flujo de propuestas visuales.

---

## ✅ Funcionalidades

- **Generar paleta** con un botón principal
- **Seleccionar el tamaño** de la paleta: 6, 8 o 9 colores
- **Visualización de cada color** con su código HEX y su equivalente en HSL
- **Copiar al portapapeles** haciendo clic sobre cualquier tarjeta de color
- **Bloquear colores** para conservarlos al regenerar la paleta (🔒/🔓)
- **Persistencia con localStorage**: la última paleta y los bloqueos se recuperan al recargar la página
- **Microfeedback visual** mediante toast (notificación en pantalla)
- **Animación hover** en las tarjetas de color
- **Accesibilidad básica**: labels asociados, foco visible, `aria-live` y `aria-hidden`

---

## 🛠️ Tech Stack

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura (`header`, `main`, `section`) |
| CSS3 | Flexbox, Grid, variables CSS, transiciones |
| JavaScript (Vanilla) | DOM, eventos, localStorage, Clipboard API |
| Git + GitHub | Control de versiones |
| GitHub Pages | Despliegue en producción |

---

## 📁 Estructura del proyecto

```
proyectom1_rociocabral/
├── index.html       # Estructura semántica de la app
├── styles.css       # Estilos, layout y microfeedback visual
└── script.js        # Lógica de generación, bloqueo y persistencia
```

---

## 🚀 Cómo ejecutar localmente

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/ROCIOCD/proyectom1_rociocabral.git
   ```
2. Ingresá a la carpeta:
   ```bash
   cd proyectom1_rociocabral
   ```
3. Abrí `index.html` en tu navegador (doble clic o con Live Server en VS Code).

> No requiere instalación de dependencias ni servidor backend.

---

## 🌐 Demo en producción

👉 [Ver demo en GitHub Pages](https://rociocd.github.io/proyectom1_rociocabral/)

> ⚠️ Nota: verificá que GitHub Pages esté activado en el repositorio (Settings → Pages → Branch: main).

---

## 🧠 Decisiones técnicas

### Generación de colores
Se utiliza `Math.random()` junto con conversión a hexadecimal para generar colores en formato HEX (`#RRGGBB`). Adicionalmente, se implementó la función `hexToHSL()` para convertir cada color a su representación HSL, mostrando ambos formatos en la tarjeta.

### Bloqueo de colores
Se mantiene un array global `lockedColors` que registra qué posiciones están bloqueadas. Al regenerar la paleta, los colores bloqueados se recuperan desde `localStorage` en lugar de generar uno nuevo.

### Persistencia
Se usa `localStorage` para guardar tanto la última paleta generada (`lastPalette`) como el estado de los bloqueos (`lockedColors`). Al cargar la página, si existe una paleta guardada, se renderiza automáticamente.

### Microfeedback
Se implementó un componente **toast** puro en CSS/JS (sin librerías) que aparece al generar la paleta y al copiar un color al portapapeles, con transición de opacidad y visibilidad.

### Accesibilidad
- `<label>` asociado al `<select>` mediante `for`/`id`
- Foco visible en botón y select (`outline` naranja)
- `aria-live="polite"` en el contenedor de la paleta
- `role="alert"` y `aria-hidden` dinámico en el toast

---

## 📌 Extra credit implementado

- [x] Bloqueo de colores por posición
- [x] Guardado de paleta en localStorage
- [x] Animaciones sutiles (hover con `translateY`)
- [x] Copiar código HEX al portapapeles con un clic
- [x] Visualización de color en dos formatos (HEX + HSL)

---

## 🤖 Uso de IA

Durante el desarrollo se utilizaron herramientas de IA (Claude de Anthropic) para:

- Revisar la lógica de la función `hexToHSL()`
- Mejorar la estructura de comentarios del código
- Consultar buenas prácticas de accesibilidad web
- Generar este README

Los prompts utilizados y sus resultados están documentados en la carpeta `/Documentación/prompts-ia/`.

---

## 👩‍💻 Autora

**Rocío Cabral**  
GitHub: [@ROCIOCD](https://github.com/ROCIOCD)  
Bootcamp: Henry Full Stack 3.0 + IA — Módulo 1
