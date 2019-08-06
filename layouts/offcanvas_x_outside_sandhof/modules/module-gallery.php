<?php
/**
 * Created by PhpStorm.
 * User: diluziof
 * Date: 2019-03-11
 * Time: 15:34
 */
?>

<h1>Module Gallery</h1>



<div class="glide">
    <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
            <li class="glide__slide">0</li>
            <li class="glide__slide">1</li>
            <li class="glide__slide">2</li>
        </ul>
    </div>
</div>


<!-- Module system -->
<script>

    (function () {

        var moduleName = 'XXXXX_module'; // naming convention XXX_module

        if (typeof selt === 'undefined') {
            selt = {
                modules: {}
            };
        } else if (!selt.modules) {
            selt.modules = {};
        }

        selt.modules[moduleName] = {

            name: moduleName,
            require: null, //['path-to.js', 'path-to-another.js']

            init: function () {


            }

        };

    }());//EOS
</script>


