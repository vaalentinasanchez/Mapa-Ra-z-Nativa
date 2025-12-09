<?php
/**
 * Registrar Bloque Gutenberg: Mapa de Pueblos Indígenas de Chile
 * Raíz Nativa - WordPress Integration
 * 
 * Este archivo contiene:
 * - Registro del bloque personalizado
 * - Encolado de assets (CSS, JS, Leaflet)
 * - Configuración de campos ACF
 * 
 * Agregar este código al functions.php de tu tema o como MU-Plugin
 */

// ============================================================================
// REGISTRO DEL BLOQUE GUTENBERG
// ============================================================================

add_action('acf/init', 'raiznativa_registrar_bloque_mapa');
function raiznativa_registrar_bloque_mapa() {
    
    // Verificar que ACF Pro está activado
    if ( !function_exists('acf_register_block_type') ) {
        return;
    }
    
    acf_register_block_type(array(
        'name'              => 'mapa-pueblos-indigenas',
        'title'             => __('Mapa de Pueblos Indígenas', 'raiznativa'),
        'description'       => __('Mapa interactivo de pueblos indígenas de Chile con información detallada', 'raiznativa'),
        'render_template'   => 'template-parts/blocks/mapa-indigenas.php',
        'render_callback'   => 'raiznativa_render_mapa_block',
        'category'          => 'formatting',
        'icon'              => 'location-alt',
        'keywords'          => array('mapa', 'indígenas', 'chile', 'pueblos', 'interactivo'),
        'supports'          => array(
            'align' => array('wide', 'full'),
            'mode'  => false,
            'jsx'   => true
        ),
        'enqueue_assets'    => 'raiznativa_enqueue_mapa_assets',
    ));
}

// ============================================================================
// RENDER CALLBACK
// ============================================================================

function raiznativa_render_mapa_block($block, $content = '', $is_preview = false) {
    
    // Obtener los datos de ACF
    $titulo = get_field('titulo_mapa') ?: 'Pueblos Indígenas de Chile';
    $descripcion = get_field('descripcion_general') ?: '';
    $pueblos = get_field('pueblos_indigenas') ?: array();
    
    // Generar ID único para el bloque
    $block_id = 'mapa-block-' . $block['id'];
    
    // Preparar datos de pueblos en JSON
    $pueblos_json = array();
    if (!empty($pueblos)) {
        foreach ($pueblos as $pueblo) {
            $pueblos_json[] = array(
                'id'                    => isset($pueblo['ID']) ? $pueblo['ID'] : count($pueblos_json) + 1,
                'nombre_pueblo'         => $pueblo['nombre_pueblo'] ?? '',
                'latitud'               => floatval($pueblo['latitud'] ?? 0),
                'longitud'              => floatval($pueblo['longitud'] ?? 0),
                'region'                => $pueblo['region'] ?? '',
                'descripcion'           => $pueblo['descripcion'] ?? '',
                'poblacion_aproximada'  => $pueblo['poblacion_aproximada'] ?? '',
                'imagen'                => isset($pueblo['imagen']) && is_array($pueblo['imagen']) 
                    ? $pueblo['imagen']['url'] 
                    : $pueblo['imagen'] ?? '',
                'imagen_alt'            => isset($pueblo['imagen']) && is_array($pueblo['imagen']) 
                    ? $pueblo['imagen']['alt'] 
                    : '',
                'color_marcador'        => $pueblo['color_marcador'] ?? '#8b5a3c'
            );
        }
    }
    
    // Crear Schema.org markup
    $schema = array(
        '@context'     => 'https://schema.org',
        '@type'        => 'Map',
        'name'         => $titulo,
        'description'  => $descripcion,
        'mapType'      => 'VenueMap',
        'containsPlace' => array()
    );
    
    foreach ($pueblos_json as $pueblo) {
        $schema['containsPlace'][] = array(
            '@type'       => 'Place',
            'name'        => $pueblo['nombre_pueblo'],
            'description' => $pueblo['descripcion'],
            'geo'         => array(
                '@type'     => 'GeoCoordinates',
                'latitude'  => $pueblo['latitud'],
                'longitude' => $pueblo['longitud']
            ),
            'address'     => array(
                '@type'         => 'PostalAddress',
                'addressRegion' => $pueblo['region'],
                'addressCountry' => 'CL'
            )
        );
    }
    
    // Renderizar el bloque
    ?>
    <section 
        class="bloque-mapa-indigenas" 
        id="<?php echo esc_attr($block_id); ?>"
        role="region" 
        aria-label="<?php esc_attr_e('Mapa interactivo de pueblos indígenas de Chile', 'raiznativa'); ?>"
        data-pueblos="<?php echo esc_attr(json_encode($pueblos_json)); ?>"
    >
        <!-- Schema.org JSON-LD -->
        <script type="application/ld+json">
            <?php echo json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>
        </script>

        <div class="mapa-container">
            <!-- Header -->
            <header class="mapa-header">
                <h2 class="mapa-titulo"><?php echo esc_html($titulo); ?></h2>
                <?php if (!empty($descripcion)): ?>
                    <p class="mapa-descripcion"><?php echo wp_kses_post($descripcion); ?></p>
                <?php endif; ?>
            </header>
            
            <!-- Contenido principal -->
            <div class="mapa-contenido">
                <!-- Mapa Leaflet -->
                <div 
                    id="<?php echo esc_attr($block_id); ?>-mapa" 
                    class="mapa-canvas" 
                    role="application" 
                    aria-label="<?php esc_attr_e('Mapa interactivo', 'raiznativa'); ?>"
                ></div>
                
                <!-- Lista de pueblos -->
                <aside class="pueblos-lista" aria-label="<?php esc_attr_e('Lista de pueblos indígenas', 'raiznativa'); ?>">
                    <div class="lista-header">
                        <h3><?php esc_html_e('Pueblos Indígenas', 'raiznativa'); ?></h3>
                        <button 
                            class="btn-reset-mapa" 
                            aria-label="<?php esc_attr_e('Restablecer vista del mapa', 'raiznativa'); ?>"
                            type="button"
                        >
                            <span class="btn-text"><?php esc_html_e('Ver todos', 'raiznativa'); ?></span>
                        </button>
                    </div>
                    
                    <div class="lista-scroll">
                        <ul class="pueblos-items" id="pueblos-list">
                            <!-- Se llenará con JavaScript -->
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    </section>
    
    <script>
        // Inicializar el mapa cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', function() {
            const blockElement = document.getElementById('<?php echo esc_js($block_id); ?>');
            if (blockElement && window.MapaIndigenasBlock) {
                window.MapaIndigenasBlock.init(blockElement);
            }
        });
    </script>
    <?php
}

// ============================================================================
// ENCOLADO DE ASSETS
// ============================================================================

function raiznativa_enqueue_mapa_assets() {
    // Leaflet CSS
    wp_enqueue_style(
        'leaflet-css',
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
        array(),
        '1.9.4'
    );
    
    // Leaflet MarkerCluster CSS
    wp_enqueue_style(
        'leaflet-markercluster-css',
        'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css',
        array(),
        '1.4.1'
    );
    
    wp_enqueue_style(
        'leaflet-markercluster-default-css',
        'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css',
        array(),
        '1.4.1'
    );
    
    // Mapa Indigenas CSS
    wp_enqueue_style(
        'mapa-indigenas-css',
        get_template_directory_uri() . '/css/mapa-indigenas.css',
        array(),
        '1.0.0'
    );
    
    // Leaflet JS
    wp_enqueue_script(
        'leaflet-js',
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
        array(),
        '1.9.4',
        true
    );
    
    // Leaflet MarkerCluster JS
    wp_enqueue_script(
        'leaflet-markercluster-js',
        'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js',
        array('leaflet-js'),
        '1.4.1',
        true
    );
    
    // Mapa Indigenas JS
    wp_enqueue_script(
        'mapa-indigenas-js',
        get_template_directory_uri() . '/js/mapa-indigenas.js',
        array('leaflet-js', 'leaflet-markercluster-js'),
        '1.0.0',
        true
    );
}

// ============================================================================
// CONFIGURACIÓN DE CAMPOS ACF
// ============================================================================

add_action('acf/include_fields', 'raiznativa_registrar_campos_acf');
function raiznativa_registrar_campos_acf() {
    
    if ( !function_exists('acf_add_local_field_group') ) {
        return;
    }
    
    acf_add_local_field_group(array(
        'key'                   => 'group_mapa_indigenas',
        'title'                 => __('Configuración del Mapa de Pueblos Indígenas', 'raiznativa'),
        'fields'                => array(
            
            // Campo: Título del Mapa
            array(
                'key'           => 'field_titulo_mapa',
                'label'         => __('Título del Mapa', 'raiznativa'),
                'name'          => 'titulo_mapa',
                'type'          => 'text',
                'required'      => 0,
                'default_value' => __('Pueblos Indígenas de Chile', 'raiznativa'),
                'placeholder'   => __('Título del mapa...', 'raiznativa'),
            ),
            
            // Campo: Descripción General
            array(
                'key'           => 'field_descripcion_general',
                'label'         => __('Descripción General', 'raiznativa'),
                'name'          => 'descripcion_general',
                'type'          => 'textarea',
                'required'      => 0,
                'rows'          => 4,
                'placeholder'   => __('Descripción introductoria sobre los pueblos indígenas...', 'raiznativa'),
            ),
            
            // Repeater: Pueblos Indígenas
            array(
                'key'           => 'field_pueblos_indigenas',
                'label'         => __('Pueblos Indígenas', 'raiznativa'),
                'name'          => 'pueblos_indigenas',
                'type'          => 'repeater',
                'layout'        => 'block',
                'button_label'  => __('+ Añadir Pueblo', 'raiznativa'),
                'sub_fields'    => array(
                    
                    // Nombre del Pueblo
                    array(
                        'key'       => 'field_nombre_pueblo',
                        'label'     => __('Nombre del Pueblo', 'raiznativa'),
                        'name'      => 'nombre_pueblo',
                        'type'      => 'text',
                        'required'  => 1,
                    ),
                    
                    // Latitud
                    array(
                        'key'           => 'field_latitud',
                        'label'         => __('Latitud', 'raiznativa'),
                        'name'          => 'latitud',
                        'type'          => 'number',
                        'required'      => 1,
                        'step'          => 0.0001,
                        'placeholder'   => '-33.4489',
                    ),
                    
                    // Longitud
                    array(
                        'key'           => 'field_longitud',
                        'label'         => __('Longitud', 'raiznativa'),
                        'name'          => 'longitud',
                        'type'          => 'number',
                        'required'      => 1,
                        'step'          => 0.0001,
                        'placeholder'   => '-70.6693',
                    ),
                    
                    // Región
                    array(
                        'key'           => 'field_region',
                        'label'         => __('Región', 'raiznativa'),
                        'name'          => 'region',
                        'type'          => 'text',
                        'placeholder'   => __('Región Metropolitana', 'raiznativa'),
                    ),
                    
                    // Descripción
                    array(
                        'key'           => 'field_descripcion',
                        'label'         => __('Descripción', 'raiznativa'),
                        'name'          => 'descripcion',
                        'type'          => 'textarea',
                        'rows'          => 3,
                        'maxlength'     => 500,
                    ),
                    
                    // Población Aproximada
                    array(
                        'key'           => 'field_poblacion',
                        'label'         => __('Población Aproximada', 'raiznativa'),
                        'name'          => 'poblacion_aproximada',
                        'type'          => 'text',
                        'placeholder'   => __('50.000 habitantes', 'raiznativa'),
                    ),
                    
                    // Imagen Representativa
                    array(
                        'key'           => 'field_imagen',
                        'label'         => __('Imagen Representativa', 'raiznativa'),
                        'name'          => 'imagen',
                        'type'          => 'image',
                        'return_format' => 'array',
                        'preview_size'  => 'medium',
                    ),
                    
                    // Color del Marcador
                    array(
                        'key'           => 'field_color_marcador',
                        'label'         => __('Color del Marcador', 'raiznativa'),
                        'name'          => 'color_marcador',
                        'type'          => 'color_picker',
                        'default_value' => '#8b5a3c',
                    ),
                ),
            ),
        ),
        
        'location'              => array(
            array(
                array(
                    'param'     => 'block',
                    'operator'  => '==',
                    'value'     => 'acf/mapa-pueblos-indigenas',
                ),
            ),
        ),
        
        'menu_order'            => 0,
        'position'              => 'normal',
        'style'                 => 'default',
        'label_placement'       => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen'        => array(),
        'active'                => true,
        'description'           => __('Configurar el mapa interactivo de pueblos indígenas', 'raiznativa'),
    ));
}
