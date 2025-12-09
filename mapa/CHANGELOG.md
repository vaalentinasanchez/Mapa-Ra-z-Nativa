# Changelog

Todos los cambios notables en este proyecto se documentarán en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y este proyecto se adhiere al [Versionado Semántico](https://semver.org/lang/es/).

## [1.0.0] - 2024-12-09

### Agregado

- Bloque Gutenberg personalizado para mapas interactivos
- Integración con Advanced Custom Fields Pro
- Mapa interactivo con Leaflet.js
- Clustering automático de marcadores
- Popups con información detallada de pueblos
- Navegación por teclado completa
- Soporte responsive para mobile, tablet y desktop
- Schema.org markup para SEO
- Accesibilidad WCAG AA
- 8 pueblos indígenas de ejemplo con datos reales:
  - Mapuche
  - Aymará
  - Atacameño
  - Rapa Nui
  - Diaguita
  - Kawésqar
  - Yámana
  - Quechua
- Animaciones suaves en interacciones
- Paleta de colores diseñada para Raíz Nativa

### Características del Mapa

- Centro inicial en Chile continental
- Zoom inicial: 4 (muestra todo Chile)
- Clustering para 15+ marcadores
- Tiles de OpenStreetMap
- Controles de zoom interactivos
- Scroll del mapa inteligente

### Campos ACF Incluidos

- Título del Mapa (Text)
- Descripción General (Textarea)
- Pueblos Indígenas (Repeater con 8 subcampos):
  - Nombre del Pueblo
  - Latitud
  - Longitud
  - Región
  - Descripción
  - Población Aproximada
  - Imagen Representativa
  - Color del Marcador

### Archivos Incluidos

- `raiznativa-mapa.php` - Archivo principal del plugin
- `functions.php` - Registro del bloque y campos ACF
- `block.json` - Configuración del bloque
- `mapa-indigenas.js` - Lógica JavaScript con Leaflet
- `mapa-indigenas.css` - Estilos responsivos
- `mapa-indigenas.php` - Template ACF
- `index.html` - Demo ejecutable
- `acf-export.json` - Exportación de campos ACF
- `README.md` - Documentación completa
- `INSTALL.md` - Guía de instalación paso a paso
- `CHANGELOG.md` - Este archivo

### Dependencias

- WordPress 5.9+
- PHP 7.4+
- Advanced Custom Fields Pro 5.11+
- Leaflet.js 1.9.4 (CDN)
- Leaflet MarkerCluster 1.4.1 (CDN)

### Navegadores Soportados

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

### Rendimiento

- Carga inicial: ~2KB JS (minificado)
- Leaflet.js: ~45KB (desde CDN)
- CSS personalizado: ~6KB
- Sin base de datos adicional requerida

### Seguridad

- Escaping de datos HTML
- Sanitización de atributos data-*
- Validación de coordenadas
- NONCE para acciones administrativas
- Compatible con WordPress Security Standards

### Accesibilidad

- ARIA labels en controles
- Navegación por teclado (Arrow Keys)
- Focus indicators visibles
- Contraste WCAG AA en textos
- Alt text en imágenes
- Semántica HTML correcta
- Screen reader compatible

### SEO

- Schema.org markup (Map + Place)
- Meta tags estructurados
- Open Graph tags
- Alt text en imágenes
- Estructura semántica
- Sitemaps compatible

---

## Notas de Desarrollo

### Próximas Versiones (Roadmap)

- [ ] v1.1.0 - Filtrado de pueblos por región
- [ ] v1.1.0 - Búsqueda fulltext
- [ ] v1.2.0 - Integración con tours virtuales
- [ ] v1.2.0 - Timeline histórico
- [ ] v2.0.0 - Comparación entre pueblos
- [ ] v2.0.0 - Exportación de datos
- [ ] v2.1.0 - Multi-idioma (ES/EN)

### Conocidos Issues

Ninguno reportado en v1.0.0

### Contributors

- Taller Digital UCHILE
- Raíz Nativa Project

---

**Última actualización:** 2024-12-09
