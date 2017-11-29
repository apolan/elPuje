<?php
get_header();
$counter = 0;
$args = array(
    category_name => 'palabras'
);
$query = new WP_Query($args);
$pathWP = get_bloginfo('template_url');

if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();
        $post_slug = $post->post_name;
        $contenido = get_the_content();
        $counter++;
    }
}
wp_reset_postdata();
?>

<script>
    var types = [<?php echo $contenido ?>];
</script>

<div id="section-rta" class="row text-center">
    <div class="col-xs-4">
    </div>
    <div class="col-xs-4">
        <h2>La respuesta es</h2> 
    </div>
    <div class="col-xs-4">

    </div>
</div>
<div id="section-message"class="row center" >
    <div id="co" class="col-xs-4 text-right">
        <h1>.CO</h1>    
    </div>
    <div id="complement" class="col-xs-8 text-left">
        <h1 id="typed-strings"></h1>    
    </div>
    <div id="col" class="col-xs-12 text-center">       
        <a href="http://www.colombia.co/">
            <img  src="<?php echo get_bloginfo('template_directory'); ?>/img/logo-all.png">
        </a>
    </div>  
</div>

<div id="section-footer" class="row">
    <div class="text-center">
        <img  src="<?php echo get_bloginfo('template_directory'); ?>/img/logo-puje.png">
    </div>
</div>

<?php
get_footer();
