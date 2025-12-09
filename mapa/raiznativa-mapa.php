<?php
/**
 * Plugin Name: Raíz Nativa - Mapa de Pueblos Indígenas
 * Plugin URI: https://tallerdigital.uchile.cl/raiznativa/
 * Description: Bloque Gutenberg con mapa interactivo de pueblos indígenas de Chile con datos geográficos, culturales y poblacionales.
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

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define plugin constants
define( 'RAIZNATIVA_MAPA_VERSION', '1.0.0' );
define( 'RAIZNATIVA_MAPA_FILE', __FILE__ );
define( 'RAIZNATIVA_MAPA_PATH', plugin_dir_path( __FILE__ ) );
define( 'RAIZNATIVA_MAPA_URL', plugin_dir_url( __FILE__ ) );
define( 'RAIZNATIVA_MAPA_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Check if ACF Pro is active
 */
register_activation_hook( __FILE__, function() {
    if ( ! is_plugin_active( 'advanced-custom-fields-pro/acf.php' ) &&
         ! is_plugin_active( 'advanced-custom-fields/acf.php' ) ) {
        deactivate_plugins( plugin_basename( __FILE__ ) );
        wp_die(
            sprintf(
                /* translators: %s: Advanced Custom Fields Pro */
                esc_html__( 'El plugin Raíz Nativa requiere %s. Por favor instálalo y actívalo primero.', 'raiznativa' ),
                'Advanced Custom Fields Pro'
            )
        );
    }
});

/**
 * Include plugin functions
 */
require_once RAIZNATIVA_MAPA_PATH . 'functions.php';

/**
 * Plugin initialization hook
 */
do_action( 'raiznativa_mapa_loaded' );
