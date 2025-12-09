<?php
/**
 * Template para el Bloque Gutenberg: Mapa de Pueblos Indígenas
 * Guardar en: wp-content/themes/tu-tema/template-parts/blocks/mapa-indigenas.php
 * 
 * Variables disponibles:
 * - $block (WP_Block): Objeto del bloque
 * - $content (string): Contenido del bloque
 * - $is_preview (bool): Si se está previsualizando en el editor
 * - $post_id (int): ID del post actual
 */

// Obtener los datos de ACF
$titulo = get_field('titulo_mapa') ?: 'Pueblos Indígenas de Chile';
$descripcion = get_field('descripcion_general') ?: '';
$pueblos = get_field('pueblos_indigenas') ?: array();

// Generar ID único para este bloque
$block_id = 'mapa-' . $block['id'];

// Preparar datos para JavaScript
$pueblos_json = array();
if ($pueblos) {
    foreach ($pueblos as $index => $pueblo) {
        $pueblos_json[] = array(
            'id'                    => $index + 1,
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

// Schema.org markup
$schema = array(
    '@context' => 'https://schema.org',
    '@type' => 'Map',
    'name' => $titulo,
    'description' => $descripcion,
    'mapType' => 'VenueMap',
    'containsPlace' => array()
);

foreach ($pueblos_json as $pueblo) {
    $schema['containsPlace'][] = array(
        '@type' => 'Place',
        'name' => $pueblo['nombre_pueblo'],
        'description' => $pueblo['descripcion'],
        'geo' => array(
            '@type' => 'GeoCoordinates',
            'latitude' => $pueblo['latitud'],
            'longitude' => $pueblo['longitud']
        ),
        'address' => array(
            '@type' => 'PostalAddress',
            'addressRegion' => $pueblo['region'],
            'addressCountry' => 'CL'
        )
    );
}
?>

<section 
    class="bloque-mapa-indigenas" 
    id="<?php echo esc_attr($block_id); ?>"
    role="region" 
    aria-label="Mapa interactivo de pueblos indígenas de Chile"
    data-pueblos='<?php echo esc_attr(json_encode($pueblos_json)); ?>'
>
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
        <?php echo json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>
    </script>

    <div class="mapa-container">
        <!-- Header -->
        <header class="mapa-header">
            <h2 class="mapa-titulo"><?php echo esc_html($titulo); ?></h2>
            <?php if ($descripcion): ?>
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
                aria-label="Mapa interactivo"
            ></div>
            
            <!-- Lista de pueblos -->
            <aside class="pueblos-lista" aria-label="Lista de pueblos indígenas">
                <div class="lista-header">
                    <h3>Pueblos Indígenas</h3>
                    <button 
                        class="btn-reset-mapa" 
                        aria-label="Restablecer vista del mapa"
                        type="button"
                    >
                        <span class="btn-text">Ver todos</span>
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
