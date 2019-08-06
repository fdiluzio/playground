<?php
/**
 * Created by PhpStorm.
 * User: diluziof
 * Date: 2019-03-06
 * Time: 12:58
 */
?>

<link rel="stylesheet" href="css/header.css">
<header class="page-header sticky-top show" data-scroll="sticky">


    <?php
    include('modules/module-navigation-offcanvas.php');
    ?>

    <div class="top-bar">

        <div class="header-logo">
            <img src="img/sandhof_logo.svg"/>
        </div>

        <div class="link-btns divider--pipe">

            <a href="/zimmer-anfragen-kategorie" class="icon-link">
                <figure>
                    <img src="icons/anfragen.svg" alt="anfragen">
                    <figcaption>Anfragen</figcaption>
                </figure>
            </a>

            <a href="/zimmer-buchen" class="icon-link">
                <figure>
                    <img src="icons/buchen.svg" alt="buchen">
                    <figcaption>Buchen</figcaption>
                </figure>
            </a>

            <a href="/kontakt" class="icon-link">
                <figure>
                    <img src="icons/anrufen.svg" alt="anrufen">
                    <figcaption>Anrufen</figcaption>
                </figure>
            </a>

        </div>

    </div>

</header>


<!-- Module system -->
<script>

    (function () {

        var moduleName = 'sticky_top_module'; // naming convention XXX_module

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

                var header            = document.querySelector('[data-scroll="sticky"]'),
                    minScrollDistance = header.getBoundingClientRect().height,
                    scrollPos         = 0,
                    scrollDirection   = 'down';


                //document.body.style.marginTop = minScrollDistance + 'px';


                function stickyheader() {

                    var windowDimensions = document.body.getBoundingClientRect();


                    if (windowDimensions.width < 640) {

                        minScrollDistance = header.getBoundingClientRect().height;

                        // detects new state and compares it with the new one
                        if (windowDimensions.top > scrollPos) {

                            // console.log('up');
                            scrollDirection = 'up';
                            header.classList.add('show');
                        } else {
                            // console.log('down');
                            scrollDirection = 'down';
                            header.classList.remove('show');

                        }
                        // saves the new position for iteration.
                        scrollPos = windowDimensions.top;

                        if (scrollDirection === 'down') {
                            if (this.pageYOffset < minScrollDistance) {
                                header.classList.remove('sticky-top');
                            } else {
                                header.classList.add('sticky-top');
                            }
                        }


                    }


                }

                selt.decouple(window, 'scroll', stickyheader);


            }

        };

    }());//EOS


</script>

