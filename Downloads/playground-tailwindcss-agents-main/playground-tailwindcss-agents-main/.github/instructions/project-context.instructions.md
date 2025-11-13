# Playground Tailwind CSS - Instrucciones para Agente IA

Este es un proyecto educativo para experimentar con HTML y Tailwind CSS usando agentes IA en VS Code.

---

## 🎯 Propósito del Proyecto

Este es un **playground educativo** donde los estudiantes pueden:
- Experimentar con HTML puro y Tailwind CSS
- Crear componentes y páginas web visualmente atractivas
- Aprender diseño web moderno con ayuda del agente IA
- Visualizar cambios en tiempo real con hot-reload

---

## 📋 Reglas Generales del Proyecto

### Estructura del Proyecto
- **NUNCA** modifiques `package.json`, `tailwind.config.js` o archivos de configuración sin permiso explícito
- **NUNCA** ejecutes `npm install` o `npm run dev` - el servidor ya está corriendo
- Todos los cambios deben hacerse en `index.html` o archivos en `assets/`
- El archivo principal de trabajo es `index.html`

### Archivos Clave
```
index.html              → Archivo HTML principal (AQUÍ trabajamos)
assets/css/base.css    → Input de Tailwind (NO modificar)
assets/css/styles.css  → Output compilado (NO modificar manualmente)
assets/js/scripts.js   → JavaScript vanilla opcional
tailwind.config.js     → Configuración de Tailwind (NO modificar sin permiso)
```

---

## 🎨 Reglas de Estilizado con Tailwind CSS

### Uso Obligatorio de Tailwind
1. **TODOS los estilos DEBEN usar clases utilitarias de Tailwind CSS**
2. **PROHIBIDO** usar:
   - Estilos inline con atributo `style="..."`
   - CSS personalizado en archivos separados
   - Otros frameworks CSS (Bootstrap, Bulma, etc.)
3. Tailwind ya está configurado y funcionando correctamente

### Ejemplos Correctos vs Incorrectos

❌ **INCORRECTO**:
```html
<div style="color: blue; margin: 20px;">Texto</div>
<div class="mi-clase-custom">Texto</div>
```

✅ **CORRECTO**:
```html
<div class="text-blue-500 m-5">Texto</div>
<div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">Texto</div>
```

### Clases de Tailwind Recomendadas para Estudiantes
- **Layout**: `flex`, `grid`, `container`, `mx-auto`
- **Spacing**: `p-4`, `m-8`, `space-y-4`, `gap-6`
- **Colors**: `bg-blue-500`, `text-gray-800`, `border-red-300`
- **Typography**: `text-xl`, `font-bold`, `leading-relaxed`
- **Responsive**: `md:flex`, `lg:grid-cols-3`, `sm:text-sm`
- **Effects**: `hover:bg-blue-600`, `shadow-lg`, `rounded-xl`, `transition-all`

---

## 🏗️ Reglas de HTML Semántico

### Estructura Semántica Obligatoria
1. Usa **HTML5 semántico** siempre:
   - `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
2. NO uses `<div>` cuando exista un elemento semántico apropiado
3. Estructura SEO-friendly desde el inicio

### Ejemplos de Estructura Correcta

❌ **INCORRECTO**:
```html
<div class="header">
  <div class="nav">
    <div>Elemento 1</div>
    <div>Elemento 2</div>
  </div>
</div>
```

✅ **CORRECTO**:
```html
<header class="bg-white shadow-md">
  <nav class="container mx-auto px-4 py-3">
    <ul class="flex gap-4">
      <li><a href="#" class="hover:text-blue-600">Elemento 1</a></li>
      <li><a href="#" class="hover:text-blue-600">Elemento 2</a></li>
    </ul>
  </nav>
</header>
```

### Listas para Contenido Repetido
- Usa `<ul>`, `<ol>`, `<li>` para elementos repetidos
- NUNCA uses múltiples `<div>` para listas de items
- Ejemplos: menús de navegación, tarjetas de productos, listas de características

---

## ♿ Accesibilidad (A11y)

### Reglas Obligatorias
1. **Atributo `lang`**: El HTML tiene `lang="es_CL"` configurado
2. **Atributos ARIA** cuando sea necesario:
   - `aria-label` para iconos sin texto
   - `aria-expanded` para elementos colapsables
   - `role` para componentes complejos
3. **Alt text** obligatorio en todas las `<img>`
4. **Contraste de color** adecuado (usa dark:text-gray-800, no gray-400 en fondos claros)
5. **Navegación por teclado**: todos los elementos interactivos deben ser accesibles

### Ejemplo Accesible
```html
<button 
  aria-label="Abrir menú de navegación" 
  class="p-2 hover:bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500">
  <svg class="w-6 h-6" aria-hidden="true">...</svg>
</button>
```

---

## 📱 Responsive Design

### Mobile-First Approach
1. Diseña primero para móvil, luego escala con breakpoints
2. Usa los prefijos de Tailwind: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
3. Prueba todos los diseños en diferentes tamaños

### Breakpoints de Tailwind
```
sm:  640px   → Teléfonos grandes
md:  768px   → Tablets
lg:  1024px  → Laptops
xl:  1280px  → Desktops
2xl: 1536px  → Pantallas grandes
```

### Ejemplo Responsive
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <div class="p-4 bg-white rounded-lg shadow">Card 1</div>
  <div class="p-4 bg-white rounded-lg shadow">Card 2</div>
  <div class="p-4 bg-white rounded-lg shadow">Card 3</div>
</div>
```

---

## ⚡ Performance y Optimización

### Objetivos de Performance
- **Meta**: 100/100 en Google PageSpeed Insights (Mobile & Desktop)
- Minimiza JavaScript del lado del cliente
- Usa rendering del lado del servidor cuando sea posible

### Fuentes Tipográficas
1. **USA** paquetes `@fontsource` para Google Fonts
2. **NO USES** el CDN de Google Fonts (`<link>` a fonts.googleapis.com)
3. **PREFIERE** fuentes variables cuando estén disponibles
4. Configura las fuentes en `tailwind.config.js` bajo `fontFamily`

#### Proceso para Agregar Fuentes
```bash
# 1. Instalar la fuente
npm install @fontsource-variable/inter

# 2. Importar en base.css
# @import '@fontsource-variable/inter';

# 3. Configurar en tailwind.config.js
# fontFamily: { sans: ['Inter Variable', 'sans-serif'] }
```

---

## 💻 JavaScript

### Reglas de JavaScript
1. **Solo JavaScript vanilla** está permitido
2. **NO uses** frameworks/librerías (React, Vue, jQuery, etc.) sin permiso explícito
3. El archivo de trabajo es `assets/js/scripts.js`
4. Mantén el JavaScript mínimo y progresivo (mejora progresiva)

### Ejemplo de JavaScript Permitido
```javascript
// assets/js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#toggle-menu');
  button?.addEventListener('click', () => {
    // Lógica simple
  });
});
```

---

## Uso de Readme.md
Actualiza el readme.md para reflejar los cambios y nuevas funcionalidades importantes que implementes en el proyecto.