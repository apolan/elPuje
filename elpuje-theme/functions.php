<?php

/**
 * Plugin Name
 *
 * @uses wp_enqueue_script action
 */
function load_jquery() {

    wp_deregister_script('jquery');
    wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), null, true);
}

add_action('wp_enqueue_script', 'load_jquery');


function scripts() {
    wp_enqueue_style('bootstrap', get_template_directory_uri() . '/css/bootstrap.css', array(), '3.3.7');
    wp_enqueue_style('basic-css', get_template_directory_uri() . '/style.css', array(), '3.3.7');
//    wp_enqueue_style('service-css', get_template_directory_uri() . '/css/service.css', array(), '3.3.7');
    wp_enqueue_style('habilitas-css', get_template_directory_uri() . '/css/habilitados.css', array(), '3.3.7');
    wp_enqueue_style('animate-css', get_template_directory_uri() . '/css/animate.css', array(), '3.3.7');
    wp_enqueue_style('form-css', get_template_directory_uri() . '/css/form.css', array(), '3.3.7');
    wp_enqueue_style('wizard-css', get_template_directory_uri() . '/css/wizard.css', array(), '1');
    wp_enqueue_style('justified-css', get_template_directory_uri() . '/css/jquery.justified.css', array(), '1');

// wp_enqueue_script('fonts', 'https://use.fontawesome.com/fc37eb67c4.js', false, '', false);

    wp_enqueue_script('bootstrap', get_template_directory_uri() . '/js/bootstrap.js', array('jquery'), '3.3.7', true);
    wp_enqueue_script('typed', get_template_directory_uri() . '/js/typed.js', array('jquery'), '1', false);
    wp_enqueue_script('basic-script', get_template_directory_uri() . '/js/src-elpuje.js', false, '1', true);
    wp_enqueue_script('init-script', get_template_directory_uri() . '/js/src.js', false, '1', true);

}


add_action('wp_enqueue_scripts', 'scripts');

