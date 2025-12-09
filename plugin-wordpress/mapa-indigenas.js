/**
 * Mapa Interactivo de Pueblos Indígenas de Chile
 * Bloque Gutenberg para WordPress - Raíz Nativa
 */

window.MapaIndigenasBlock = (function() {
    'use strict';
    
    // Estado global del bloque
    const state = {
        map: null,
        markers: [],
        markerClusterGroup: null,
        currentPueblo: null,
        isMobile: window.innerWidth < 768,
        pueblos: []
    };
    
    // Configuración del mapa
    const mapConfig = {
        centerChile: [-23.6345, -70.3977],
        initialZoom: 4,
        minZoom: 3,
        maxZoom: 18
    };
    
    /**
     * Inicializar el bloque
     */
    function init(blockElement) {
        state.pueblos = JSON.parse(blockElement.getAttribute('data-pueblos') || '[]');
        
        if (state.pueblos.length === 0) {
            console.warn('No hay datos de pueblos indígenas');
            return;
        }
        
        // Obtener elementos del DOM
        const mapaContainer = blockElement.querySelector('#mapa-interactivo');
        const pueblosList = blockElement.querySelector('#pueblos-list');
        const resetBtn = blockElement.querySelector('.btn-reset-mapa');
        
        if (!mapaContainer || !pueblosList) {
            console.error('Elementos necesarios no encontrados');
            return;
        }
        
        // Inicializar mapa
        initializeMap(mapaContainer);
        
        // Renderizar lista de pueblos
        renderPueblosList(pueblosList, blockElement);
        
        // Configurar eventos
        setupEventListeners(blockElement, pueblosList);
        
        // Evento del botón reset
        if (resetBtn) {
            resetBtn.addEventListener('click', resetMap);
        }
        
        // Detectar cambios de tamaño
        window.addEventListener('resize', debounce(handleResize, 250));
        
        // Actualizar Schema.org
        updateSchema(blockElement);
    }
    
    /**
     * Inicializar Leaflet
     */
    function initializeMap(container) {
        // Crear mapa
        state.map = L.map(container).setView(mapConfig.centerChile, mapConfig.initialZoom);
        
        // Capa de tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: mapConfig.maxZoom,
            minZoom: mapConfig.minZoom
        }).addTo(state.map);
        
        // Agrupar marcadores si hay muchos
        state.markerClusterGroup = L.markerClusterGroup({
            maxClusterRadius: 80,
            disableClusteringAtZoom: 10
        });
        
        // Crear marcadores
        state.pueblos.forEach(pueblo => {
            createMarker(pueblo);
        });
        
        state.map.addLayer(state.markerClusterGroup);
        
        // Ajustar vista inicial
        if (state.pueblos.length > 0) {
            fitMapToMarkers();
        }
    }
    
    /**
     * Crear marcador para un pueblo
     */
    function createMarker(pueblo) {
        const L_svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="40">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 7 10 11 10 11s10-4 10-11c0-5.52-4.48-10-10-10z" 
                      fill="${pueblo.color_marcador}" stroke="#fff" stroke-width="1"/>
                <circle cx="12" cy="12" r="4" fill="#fff"/>
            </svg>
        `;
        
        const marker = L.marker([pueblo.latitud, pueblo.longitud], {
            icon: L.divIcon({
                html: L_svg,
                iconSize: [32, 40],
                iconAnchor: [16, 40],
                popupAnchor: [0, -40],
                className: 'custom-marker'
            }),
            title: pueblo.nombre_pueblo
        });
        
        // Contenido del popup
        const popupContent = createPopupContent(pueblo);
        marker.bindPopup(popupContent, {
            maxWidth: 350,
            className: 'mapa-popup'
        });
        
        // Eventos del marcador
        marker.on('click', function() {
            selectPueblo(pueblo);
            highlightPuebloInList(pueblo.id);
            scrollToPuebloInList(pueblo.id);
        });
        
        marker.on('mouseover', function() {
            if (!state.isMobile) {
                animateMarker(marker);
                highlightPuebloInList(pueblo.id);
            }
        });
        
        marker.on('mouseout', function() {
            if (!state.isMobile && state.currentPueblo?.id !== pueblo.id) {
                resetMarkerAnimation(marker);
                removeHighlightFromList();
            }
        });
        
        // Guardar referencia
        pueblo.marker = marker;
        state.markerClusterGroup.addLayer(marker);
        state.markers.push(marker);
    }
    
    /**
     * Crear contenido del popup
     */
    function createPopupContent(pueblo) {
        const imagenHTML = pueblo.imagen 
            ? `<img src="${pueblo.imagen}" alt="${pueblo.imagen_alt}" class="popup-imagen" loading="lazy">`
            : '';
        
        return `
            <div class="mapa-popup-content">
                ${imagenHTML}
                <h4>${escapeHtml(pueblo.nombre_pueblo)}</h4>
                <div class="popup-meta">
                    <span class="popup-region">📍 ${escapeHtml(pueblo.region)}</span>
                    <span class="popup-poblacion">👥 ${escapeHtml(pueblo.poblacion_aproximada)}</span>
                </div>
                <p class="popup-descripcion">${escapeHtml(pueblo.descripcion)}</p>
            </div>
        `;
    }
    
    /**
     * Renderizar lista de pueblos
     */
    function renderPueblosList(container, blockElement) {
        container.innerHTML = state.pueblos.map(pueblo => `
            <li 
                class="pueblo-item" 
                data-pueblo-id="${pueblo.id}"
                data-lat="${pueblo.latitud}"
                data-lng="${pueblo.longitud}"
                tabindex="0"
                role="button"
                aria-label="Ver ${escapeHtml(pueblo.nombre_pueblo)} en el mapa"
            >
                <div 
                    class="pueblo-marker" 
                    style="background-color: ${pueblo.color_marcador}"
                    aria-hidden="true"
                ></div>
                <div class="pueblo-info">
                    <h4>${escapeHtml(pueblo.nombre_pueblo)}</h4>
                    ${pueblo.region ? `<span class="pueblo-region">📍 ${escapeHtml(pueblo.region)}</span>` : ''}
                    ${pueblo.descripcion ? `<p class="pueblo-descripcion">${escapeHtml(pueblo.descripcion)}</p>` : ''}
                </div>
            </li>
        `).join('');
    }
    
    /**
     * Configurar eventos
     */
    function setupEventListeners(blockElement, pueblosList) {
        // Click en items de la lista
        pueblosList.addEventListener('click', function(e) {
            const item = e.target.closest('.pueblo-item');
            if (item) {
                const puebloId = parseInt(item.dataset.puebloId);
                const pueblo = state.pueblos.find(p => p.id === puebloId);
                if (pueblo) {
                    selectPueblo(pueblo);
                }
            }
        });
        
        // Navegación por teclado
        pueblosList.addEventListener('keydown', function(e) {
            const items = Array.from(pueblosList.querySelectorAll('.pueblo-item'));
            const currentItem = e.target.closest('.pueblo-item');
            const currentIndex = items.indexOf(currentItem);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                nextIndex = Math.min(currentIndex + 1, items.length - 1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                nextIndex = Math.max(currentIndex - 1, 0);
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const puebloId = parseInt(currentItem.dataset.puebloId);
                const pueblo = state.pueblos.find(p => p.id === puebloId);
                if (pueblo) {
                    selectPueblo(pueblo);
                }
                return;
            }
            
            if (nextIndex !== undefined) {
                items[nextIndex].focus();
            }
        });
        
        // Hover en items (solo desktop)
        if (!state.isMobile) {
            pueblosList.addEventListener('mouseenter', function(e) {
                const item = e.target.closest('.pueblo-item');
                if (item) {
                    const puebloId = parseInt(item.dataset.puebloId);
                    const pueblo = state.pueblos.find(p => p.id === puebloId);
                    if (pueblo && !state.currentPueblo) {
                        highlightPuebloInList(puebloId);
                        if (pueblo.marker) {
                            animateMarker(pueblo.marker);
                        }
                    }
                }
            }, true);
            
            pueblosList.addEventListener('mouseleave', function(e) {
                const item = e.target.closest('.pueblo-item');
                if (item && !state.currentPueblo) {
                    const puebloId = parseInt(item.dataset.puebloId);
                    const pueblo = state.pueblos.find(p => p.id === puebloId);
                    if (pueblo && pueblo.marker) {
                        resetMarkerAnimation(pueblo.marker);
                    }
                    removeHighlightFromList();
                }
            }, true);
        }
    }
    
    /**
     * Seleccionar un pueblo
     */
    function selectPueblo(pueblo) {
        state.currentPueblo = pueblo;
        
        // Zoom y popup del marcador
        if (pueblo.marker) {
            state.map.setView(
                [pueblo.latitud, pueblo.longitud],
                12,
                { animate: true, duration: 0.5 }
            );
            pueblo.marker.openPopup();
        }
        
        // Resaltar en lista
        highlightPuebloInList(pueblo.id);
        
        // Scroll en mobile
        if (state.isMobile) {
            scrollToPuebloInList(pueblo.id);
        }
    }
    
    /**
     * Resaltar pueblo en lista
     */
    function highlightPuebloInList(puebloId) {
        document.querySelectorAll('.pueblo-item').forEach(item => {
            if (parseInt(item.dataset.puebloId) === puebloId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    /**
     * Remover highlight de lista
     */
    function removeHighlightFromList() {
        document.querySelectorAll('.pueblo-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    /**
     * Scroll a pueblo en lista
     */
    function scrollToPuebloInList(puebloId) {
        const item = document.querySelector(`.pueblo-item[data-pueblo-id="${puebloId}"]`);
        if (item && item.parentElement.parentElement) {
            item.parentElement.parentElement.scrollTop = item.offsetTop - 100;
        }
    }
    
    /**
     * Animar marcador
     */
    function animateMarker(marker) {
        const element = marker.getElement();
        if (element) {
            element.classList.add('bounce');
        }
    }
    
    /**
     * Resetear animación del marcador
     */
    function resetMarkerAnimation(marker) {
        const element = marker.getElement();
        if (element) {
            element.classList.remove('bounce');
        }
    }
    
    /**
     * Resetear mapa
     */
    function resetMap() {
        state.currentPueblo = null;
        
        // Cerrar todos los popups
        state.markers.forEach(marker => {
            marker.closePopup();
        });
        
        // Remover highlights
        removeHighlightFromList();
        
        // Volver a vista inicial
        state.map.setView(mapConfig.centerChile, mapConfig.initialZoom, { animate: true });
        
        fitMapToMarkers();
    }
    
    /**
     * Ajustar vista al tamaño de los marcadores
     */
    function fitMapToMarkers() {
        if (state.markerClusterGroup && state.markerClusterGroup.getLayers().length > 0) {
            state.map.fitBounds(state.markerClusterGroup.getBounds(), { padding: [50, 50] });
        }
    }
    
    /**
     * Manejar resize de ventana
     */
    function handleResize() {
        const wasMobile = state.isMobile;
        state.isMobile = window.innerWidth < 768;
        
        if (wasMobile !== state.isMobile) {
            // Invalidar el tamaño del mapa
            if (state.map) {
                setTimeout(() => {
                    state.map.invalidateSize();
                }, 100);
            }
        }
    }
    
    /**
     * Actualizar Schema.org
     */
    function updateSchema(blockElement) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Map",
            "name": blockElement.querySelector('.mapa-titulo')?.textContent || "Pueblos Indígenas de Chile",
            "description": blockElement.querySelector('.mapa-descripcion')?.textContent || "",
            "mapType": "VenueMap",
            "containsPlace": state.pueblos.map(pueblo => ({
                "@type": "Place",
                "name": pueblo.nombre_pueblo,
                "description": pueblo.descripcion,
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": pueblo.latitud,
                    "longitude": pueblo.longitud
                },
                "address": {
                    "@type": "PostalAddress",
                    "addressRegion": pueblo.region,
                    "addressCountry": "CL"
                }
            }))
        };
        
        const schemaElement = blockElement.querySelector('#schema-mapa');
        if (schemaElement) {
            schemaElement.textContent = JSON.stringify(schema, null, 2);
        }
    }
    
    /**
     * Utilitarios
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Retornar API pública
    return {
        init: init
    };
})();
