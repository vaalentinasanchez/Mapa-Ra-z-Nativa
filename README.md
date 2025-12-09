# Mapa Indígenas Raíz Nativa

Este repositorio contiene el Bloque de Gutenberg para WordPress que visualiza el **Mapa Interactivo de Pueblos Indígenas** de Raíz Nativa.

## Estructura del Proyecto

```
.
├── mapa/                      # Todos los archivos del mapa completo
│   ├── Plugin_mapa.zip       # Plugin empaquetado para WordPress
│   ├── mapa-indigenas.js     # Lógica principal del mapa
│   ├── mapa-indigenas.css    # Estilos del mapa
│   ├── mapa-indigenas.php    # Integración con WordPress
│   ├── functions.php         # Funciones del plugin
│   ├── package.json          # Dependencias del proyecto
│   ├── README.md             # Documentación del proyecto
│   ├── INSTALL.md            # Guía de instalación
│   └── ...otros archivos
│
├── plugin-wordpress/          # Proyecto limpio del plugin
│   ├── Plugin_mapa.zip       # Plugin empaquetado
│   └── [Archivos de configuración y código del plugin]
│
└── documentacion/            # Documentación adicional

```

## 📦 Instalación Rápida

### Opción 1: Usar el Plugin ZIP

1. Descarga `Plugin_mapa.zip` desde la carpeta `mapa/` o `plugin-wordpress/`
2. En tu WordPress: **Plugins → Agregar nuevo → Subir plugin**
3. Selecciona el archivo ZIP y haz clic en **Instalar ahora**
4. Activa el plugin

### Opción 2: Instalación Manual

1. Copia la carpeta `plugin-wordpress` a `wp-content/plugins/` en tu instalación de WordPress
2. Renombra la carpeta a `mapa-indigenas` (si es necesario)
3. Ve a **Plugins** en el panel de WordPress
4. Busca "Mapa Indígenas" y haz clic en **Activar**

## 📋 Requisitos

- WordPress 5.0 o superior
- PHP 7.4 o superior
- Gutenberg (incluido en WordPress)

## 🗺️ Uso

Una vez activado, el plugin añade un bloque de Gutenberg llamado **"Mapa Indígenas"** disponible en el editor de bloques. Simplemente:

1. Abre el editor de una página o post
2. Busca el bloque "Mapa Indígenas"
3. El mapa se insertará en tu contenido

## 📂 Contenido de las Carpetas

### `/mapa`
Contiene todos los archivos relacionados con el mapa, incluyendo:
- Código fuente (JavaScript, CSS, PHP)
- Configuración de dependencias
- Documentación técnica
- Plugin empaquetado

### `/plugin-wordpress`
Versión limpia del plugin lista para instalar directamente en WordPress, con todos los archivos necesarios para funcionar como bloque de Gutenberg.

### `/documentacion`
Documentación adicional y guías de implementación.

## 🔧 Desarrollo

Para desarrollar o modificar el mapa:

```bash
cd mapa/
npm install
npm run dev      # Para desarrollo
npm run build    # Para producción
```

## 📝 Archivos Importantes

- `functions.php` - Funciones principales del plugin
- `mapa-indigenas.js` - Lógica del mapa
- `mapa-indigenas.css` - Estilos
- `README.md` - Documentación detallada
- `INSTALL.md` - Guía de instalación técnica

## 📄 Licencia

Ver archivo CHANGELOG.md para información sobre versiones.

## 👥 Contribuciones

Para contribuir al proyecto, contacta con el equipo de desarrollo.

---

**Última actualización:** Diciembre 2025
