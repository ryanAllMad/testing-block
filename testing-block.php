<?php
/**
 * Plugin Name:       Testing Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       testing-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
// function create_block_testing_block_block_init() {
// 	register_block_type( __DIR__ . '/build' );
// }
// add_action( 'init', 'create_block_testing_block_block_init' );
add_action('wp_enqueue_scripts', 'my_enqueue_assets');
add_action('enqueue_block_editor_assets', 'my_enqueue_block_assets');

function my_enqueue_assets() {
  $css_dir = plugin_dir_url(__FILE__) . 'build';
  wp_enqueue_style('testing-block', $css_dir . '/index.css', []);
}

function my_enqueue_block_assets() {

  $build_dir = plugin_dir_url(__FILE__) . 'build';

  wp_enqueue_script('testing-block', $build_dir . '/index.js', [ 'lodash', 'wp-block-editor', 'wp-blocks', 'wp-data', 'wp-dom-ready', 'wp-element', 'wp-i18n' ] , null, true);
  wp_enqueue_style('testing-block', $build_dir . '/index.css', [ 'wp-edit-blocks' ]);
}
