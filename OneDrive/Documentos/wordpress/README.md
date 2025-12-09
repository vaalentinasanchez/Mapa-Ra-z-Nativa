# 🌍 Mapa de Pueblos Indígenas de Chile - Raíz Nativa

Bloque Gutenberg personalizado para WordPress con mapa interactivo de pueblos indígenas de Chile.

## 📋 Contenidos

- `index.html` - Versión HTML ejecutable (para demostración)
- `mapa-indigenas.js` - JavaScript con lógica del mapa y interactividad
- `mapa-indigenas.css` - Estilos responsive y diseño
- `functions.php` - Registro del bloque Gutenberg y campos ACF
- `block.json` - Configuración nativa del bloque
- `mapa-indigenas.php` - Template de WordPress

## 🚀 Instalación Rápida

### Opción 1: Como Plugin de WordPress (Recomendado)

1. **Crear estructura de carpetas:**
   ```
   wp-content/plugins/raiznativa-mapa/
   ├── functions.php
   ├── block.json
   ├── css/
   │   └── mapa-indigenas.css
   ├── js/
   │   └── mapa-indigenas.js
   └── template-parts/
       └── blocks/
           └── mapa-indigenas.php
   ```

2. **Crear `wp-content/plugins/raiznativa-mapa/raiznativa-mapa.php`:**
   ```php
   <?php
   /**
    * Plugin Name: Raíz Nativa - Mapa de Pueblos Indígenas
    * Plugin URI: https://tallerdigital.uchile.cl/raiznativa/
    * Description: Bloque Gutenberg con mapa interactivo de pueblos indígenas
    * Version: 1.0.0
    * Author: Taller Digital UCHILE
    * Author URI: https://tallerdigital.uchile.cl
    * Text Domain: raiznativa
    * Domain Path: /languages
    */
   
   // Incluir functions
   require_once plugin_dir_path( __FILE__ ) . 'functions.php';
   ?>
   ```

3. **Activar el plugin en WordPress**

### Opción 2: Como Parte del Tema

1. Copiar archivos a `wp-content/themes/tu-tema/`
2. Crear directorio `template-parts/blocks/`
3. Incluir `functions.php` en el `functions.php` del tema:
   ```php
   require_once get_template_directory() . '/functions.php';
   ```

## 🛠️ Dependencias Necesarias

### WordPress
- Versión 5.9+ (para soporte completo de Gutenberg)
- Advanced Custom Fields Pro (para campos personalizados)

### JavaScript Externo
- Leaflet.js 1.9.4 (CDN)
- Leaflet MarkerCluster 1.4.1 (CDN)

**Nota:** Las librerías se cargan automáticamente desde CDN. No requiere instalación.

## 📊 Estructura de Datos - ACF

El bloque utiliza los siguientes campos ACF:

### Campo Raíz
- **Name:** `titulo_mapa`
- **Type:** Text
- **Default:** "Pueblos Indígenas de Chile"

### Campo Repeater: `pueblos_indigenas`

Cada elemento del repeater contiene:

| Field | Type | Required | Default | Descripción |
|-------|------|----------|---------|-------------|
| `nombre_pueblo` | Text | ✓ | - | Nombre del pueblo indígena |
| `latitud` | Number | ✓ | - | Coordenada de latitud (ej: -33.4489) |
| `longitud` | Number | ✓ | - | Coordenada de longitud (ej: -70.6693) |
| `region` | Text | ✗ | - | Región geográfica de Chile |
| `descripcion` | Textarea | ✗ | - | Descripción breve (máx 500 caracteres) |
| `poblacion_aproximada` | Text | ✗ | - | Ej: "1.400.000" |
| `imagen` | Image | ✗ | - | Imagen representativa |
| `color_marcador` | Color Picker | ✗ | #8b5a3c | Color del marcador en el mapa |

## 🗺️ Ejemplo de Datos

```json
{
  "titulo_mapa": "Pueblos Indígenas de Chile",
  "descripcion_general": "Explora la rica diversidad cultural...",
  "pueblos_indigenas": [
    {
      "nombre_pueblo": "Mapuche",
      "latitud": -37.7510,
      "longitud": -72.9333,
      "region": "La Araucanía",
      "descripcion": "El pueblo Mapuche es el más grande de Chile...",
      "poblacion_aproximada": "1.400.000",
      "imagen": "https://...",
      "color_marcador": "#8b5a3c"
    }
  ]
}
```

## 🎨 Características

### Funcionalidad del Mapa
- ✅ Mapa interactivo con Leaflet.js
- ✅ Clustering automático de marcadores (15+)
- ✅ Popups con información detallada
- ✅ Navegación por teclado
- ✅ Responsive design (mobile, tablet, desktop)

### Interactividad
- **Click en pueblo de la lista:** Zoom a marcador + popup
- **Hover en lista (desktop):** Resalta marcador con animación
- **Click en marcador:** Abre popup + resalta en lista
- **Botón "Ver todos":** Reset a vista inicial
- **Navegación Arrow Keys:** Moverse entre pueblos

### Diseño
- 📱 Mobile-first responsive
- 🎯 WCAG AA accessibility
- 📊 Schema.org markup (structured data)
- 🌈 Paleta de colores Raíz Nativa

## 🔍 SEO y Accesibilidad

### Schema.org
El bloque genera automáticamente markup Schema.org con tipo `Map` que contiene múltiples Places:

```json
{
  "@context": "https://schema.org",
  "@type": "Map",
  "name": "Pueblos Indígenas de Chile",
  "containsPlace": [
    {
      "@type": "Place",
      "name": "Mapuche",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -37.7510,
        "longitude": -72.9333
      }
    }
  ]
}
```

### Accesibilidad
- ✅ ARIA labels en elementos interactivos
- ✅ Navegación por teclado completa
- ✅ Focus indicators visibles
- ✅ Contraste WCAG AA
- ✅ Alt text en imágenes

## 🎯 Uso en Página

1. **Ir a Gutenberg Editor**
2. **Buscar bloque:** "Mapa de Pueblos Indígenas"
3. **Añadir al contenido**
4. **Configurar campos ACF:**
   - Título del mapa
   - Descripción
   - Añadir pueblos con botón "+ Añadir Pueblo"

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Una columna
- Mapa: 380px height
- Lista debajo del mapa
- Scroll independiente en lista

### Tablet (768px - 1024px)
- Una columna
- Mapa: 450px height

### Desktop (≥ 1024px)
- Dos columnas (60% mapa, 40% lista)
- Mapa: 600px height
- Scroll independiente

## 🌐 Paleta de Colores

```css
--primary: #5a4535 (Café oscuro)
--secondary: #8b5a3c (Café medio)
--accent: #d4a574 (Ocre claro)
--highlight: #D2691E (Terracota)
--background: #f5f1ed (Beige claro)
--text: #4a3728 (Café oscuro)
```

## 📖 Documentación Detallada

### JavaScript API

```javascript
// Inicializar bloque
window.MapaIndigenasBlock.init(blockElement);
```

El módulo expone la función `init()` que:
- Parsea datos JSON
- Inicializa el mapa Leaflet
- Renderiza la lista de pueblos
- Configura event listeners
- Actualiza Schema.org

### Estructura de Eventos

```javascript
// Evento: Click en pueblo de lista
pueblosList.addEventListener('click', selectPueblo);

// Evento: Hover (desktop)
pueblosList.addEventListener('mouseenter', highlightPueblo);

// Evento: Navegación teclado
pueblosList.addEventListener('keydown', handleKeyboard);
```

## 🐛 Troubleshooting

### El mapa no aparece
- Verificar que Leaflet.js se carga desde CDN
- Comprobar console por errores JavaScript
- Verificar que el elemento `.mapa-canvas` existe

### Datos no se muestran
- Verificar estructura JSON en `data-pueblos`
- Confirmar que ACF tiene valores
- Revisar que las coordenadas sean válidas

### Estilos no se aplican
- Asegurar que `mapa-indigenas.css` está encolado
- Verificar no haya conflictos de CSS
- Limpiar cache del navegador

## 🔧 Personalización

### Cambiar centro inicial del mapa
En `mapa-indigenas.js`, línea ~23:
```javascript
const mapConfig = {
    centerChile: [-23.6345, -70.3977],  // Cambiar estas coordenadas
    initialZoom: 4,
```

### Cambiar proveedor de tiles
En `mapa-indigenas.js`, línea ~73:
```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // Cambiar URL del proveedor
```

### Personalizar colores
Editar variables CSS en `mapa-indigenas.css` sección `:root`

## 📄 Archivos

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Demo ejecutable standalone |
| `mapa-indigenas.js` | Lógica principal del mapa |
| `mapa-indigenas.css` | Estilos y responsive |
| `mapa-indigenas.php` | Template ACF |
| `functions.php` | Registro bloque + campos ACF |
| `block.json` | Configuración bloque nativo |
| `README.md` | Esta documentación |

## 📝 Licencia

Proyecto de Raíz Nativa - Taller Digital UCHILE

## 🤝 Soporte

Para reportar issues o sugerencias:
- Email: taller.digital@uchile.cl
- Web: https://tallerdigital.uchile.cl/raiznativa/

## 🎓 Recursos

- [Leaflet.js Docs](https://leafletjs.com/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [WordPress Block API](https://developer.wordpress.org/block-editor/)
- [Schema.org Map Type](https://schema.org/Map)

---

**Versión:** 1.0.0  
**Última actualización:** Diciembre 2024
