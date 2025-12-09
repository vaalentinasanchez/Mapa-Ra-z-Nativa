# 📖 Guía de Instalación - Mapa de Pueblos Indígenas

## Requisitos Previos

- WordPress 5.9 o superior
- Advanced Custom Fields Pro (versión 5.11+)
- PHP 7.4 o superior
- Navegador moderno con soporte para ES6

## Paso 1: Preparar el Entorno

### 1.1 Verificar WordPress y ACF

```bash
# Acceder a tu instalación de WordPress
cd /path/to/wordpress
```

1. Ir a **Plugins > Plugins Instalados**
2. Verificar que "Advanced Custom Fields Pro" está activado
3. Si no está instalado, descargarlo de: https://www.advancedcustomfields.com/

### 1.2 Limpiar caché

Si usas caché (W3 Total Cache, WP Super Cache, etc.):
1. Ir a configuración del plugin de caché
2. Purgar todo el caché

## Paso 2: Crear Estructura de Plugin

### Opción A: Como Plugin Nuevo (Recomendado)

```bash
# Crear directorio del plugin
mkdir -p wp-content/plugins/raiznativa-mapa
cd wp-content/plugins/raiznativa-mapa

# Crear subdirectorios
mkdir -p css
mkdir -p js
mkdir -p template-parts/blocks
```

### Opción B: Integrar en Tema Existente

```bash
# Si usas tema personalizado
cd wp-content/themes/tu-tema

# Crear directorios si no existen
mkdir -p css
mkdir -p js
mkdir -p template-parts/blocks
```

## Paso 3: Copiar Archivos

### Desde Plugin

**Estructura final:**
```
wp-content/plugins/raiznativa-mapa/
├── raiznativa-mapa.php          (crear - ver Paso 4)
├── functions.php                (copiar)
├── block.json                   (copiar)
├── acf-export.json             (copiar)
├── css/
│   └── mapa-indigenas.css       (copiar)
├── js/
│   └── mapa-indigenas.js        (copiar)
└── template-parts/
    └── blocks/
        └── mapa-indigenas.php   (copiar)
```

### Desde Tema

**Estructura final:**
```
wp-content/themes/tu-tema/
├── functions.php                (actualizar)
├── css/
│   └── mapa-indigenas.css       (copiar)
├── js/
│   └── mapa-indigenas.js        (copiar)
└── template-parts/
    └── blocks/
        └── mapa-indigenas.php   (copiar)
```

## Paso 4: Crear Archivo de Plugin (Si Aplica)

**Crear:** `wp-content/plugins/raiznativa-mapa/raiznativa-mapa.php`

```php
<?php
/**
 * Plugin Name: Raíz Nativa - Mapa de Pueblos Indígenas
 * Plugin URI: https://tallerdigital.uchile.cl/raiznativa/
 * Description: Bloque Gutenberg con mapa interactivo de pueblos indígenas de Chile
 * Version: 1.0.0
 * Author: Taller Digital UCHILE
 * Author URI: https://tallerdigital.uchile.cl
 * Text Domain: raiznativa
 * Domain Path: /languages
 * Requires: 5.9
 * Requires PHP: 7.4
 * Requires Plugins: advanced-custom-fields-pro
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Definir constantes
define( 'RAIZNATIVA_MAPA_VERSION', '1.0.0' );
define( 'RAIZNATIVA_MAPA_PATH', plugin_dir_path( __FILE__ ) );
define( 'RAIZNATIVA_MAPA_URL', plugin_dir_url( __FILE__ ) );

// Verificar ACF
register_activation_hook( __FILE__, function() {
    if ( ! is_plugin_active( 'advanced-custom-fields-pro/acf.php' ) &&
         ! is_plugin_active( 'advanced-custom-fields/acf.php' ) ) {
        deactivate_plugins( plugin_basename( __FILE__ ) );
        wp_die(
            'Este plugin requiere Advanced Custom Fields Pro. Por favor instálalo y actívalo primero.'
        );
    }
});

// Incluir functions
require_once RAIZNATIVA_MAPA_PATH . 'functions.php';
?>
```

## Paso 5: Instalar Campos ACF

### Opción A: Importar desde JSON

1. Ir a **Advanced Custom Fields > Tools**
2. Scroll a **Import Field Group**
3. Seleccionar archivo: `acf-export.json`
4. Click **Import Field Group**

### Opción B: Crear Manualmente

1. Ir a **Advanced Custom Fields > Field Groups**
2. Click **New Field Group**
3. Nombre: "Mapa de Pueblos Indígenas"

**Campo 1 - Título:**
- Label: "Título del Mapa"
- Name: `titulo_mapa`
- Type: Text
- Default: "Pueblos Indígenas de Chile"

**Campo 2 - Descripción:**
- Label: "Descripción General"
- Name: `descripcion_general`
- Type: Textarea
- Rows: 4

**Campo 3 - Repeater:**
- Label: "Pueblos Indígenas"
- Name: `pueblos_indigenas`
- Type: Repeater

**Subcampos del Repeater:**

| Label | Name | Type | Required |
|-------|------|------|----------|
| Nombre del Pueblo | nombre_pueblo | Text | ✓ |
| Latitud | latitud | Number | ✓ |
| Longitud | longitud | Number | ✓ |
| Región | region | Text | ✗ |
| Descripción | descripcion | Textarea | ✗ |
| Población Aproximada | poblacion_aproximada | Text | ✗ |
| Imagen | imagen | Image | ✗ |
| Color del Marcador | color_marcador | Color Picker | ✗ |

**Ubicación:**
- Block > is equal to > acf/mapa-pueblos-indigenas

## Paso 6: Activar Plugin

1. Ir a **Plugins > Plugins Instalados**
2. Buscar "Raíz Nativa - Mapa"
3. Click **Activar**

**Debería aparecer un mensaje de éxito**

## Paso 7: Probar el Bloque

1. **Crear nueva página:**
   - Ir a **Pages > New Page**
   - Nombre: "Mapa de Pueblos Indígenas"
   - Click **Edit with Blocks**

2. **Agregar bloque:**
   - Click "+" para añadir bloque
   - Buscar "Mapa de Pueblos Indígenas"
   - Click para insertar

3. **Configurar datos:**
   - Llenar "Título del Mapa"
   - Llenar "Descripción General"
   - Click "+ Añadir Pueblo"
   - Completar campos del pueblo
   - Repetir para cada pueblo

4. **Publicar:**
   - Click **Publicar**
   - Ver en el sitio

## Paso 8: Agregar Datos de Pueblos

### Coordenadas de Ejemplo

```json
{
  "pueblos": [
    {
      "nombre": "Mapuche",
      "lat": -37.7510,
      "lng": -72.9333,
      "region": "La Araucanía"
    },
    {
      "nombre": "Aymará",
      "lat": -18.4667,
      "lng": -70.2833,
      "region": "Arica y Parinacota"
    },
    {
      "nombre": "Atacameño",
      "lat": -22.5,
      "lng": -68.1992,
      "region": "Antofagasta"
    },
    {
      "nombre": "Rapa Nui",
      "lat": -27.1127,
      "lng": -109.3497,
      "region": "Isla de Pascua"
    }
  ]
}
```

## Solución de Problemas

### Problema: "Bloque no aparece"

**Solución:**
1. Verificar que ACF Pro está activado
2. Limpiar caché (todos los plugins)
3. Ir a **Settings > Permalinks** y click **Save Changes**
4. Reload página

### Problema: "El mapa no se carga"

**Solución:**
1. Abrir **Console** (F12 > Console)
2. Verificar que no haya errores JavaScript
3. Confirmar que Leaflet.js se carga (buscar leaflet.js en Network)
4. Verificar atributo `data-pueblos` tenga JSON válido

### Problema: "Estilos incorrectos"

**Solución:**
1. Limpiar caché del navegador (Ctrl+Shift+Delete)
2. Verificar que `mapa-indigenas.css` está encolado
3. Verificar no haya conflictos CSS
4. Revisar con DevTools

### Problema: "Error de ACF"

**Solución:**
1. Ir a **Advanced Custom Fields > Tools**
2. Click **Sync Available**
3. Confirmar sincronización

## Verificación Final

### Checklist

- [ ] WordPress 5.9+
- [ ] ACF Pro instalado y activado
- [ ] Archivos copiados correctamente
- [ ] Campos ACF creados/importados
- [ ] Plugin activado (si aplica)
- [ ] Bloque aparece en editor
- [ ] Bloque se renderiza en frontend
- [ ] Mapa interactivo funciona
- [ ] Datos se muestran correctamente

## Siguiente Paso

Ir a **README.md** para documentación completa y personalización avanzada.

## Support

- Documentación: `README.md`
- Email: taller.digital@uchile.cl
- Web: https://tallerdigital.uchile.cl/raiznativa/

---

**¡Instalación completada!** 🎉
