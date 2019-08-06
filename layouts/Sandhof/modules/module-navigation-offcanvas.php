<?php
/**
 * Created by PhpStorm.
 * User: diluziof
 * Date: 2019-03-06
 * Time: 10:05
 */
?>

<div class="navigation-offcanvas-overlay" data-menu-overlay></div>

<nav class="navigation-offcanvas transition">

    <div class="hamburger-wrp hamburger-slim" data-menu-action="open">
        <img src="icn/ic_hamburger.svg"/>
    </div>

    <div class="scroll-area">

        <div class="hamburger-icon-inside-scroll-area" data-menu-action="close">
            <img src="icn/ic_close.svg"/>
        </div>

        <ul data-list-type="accordion">
            <li><a href="#">Startseite</a></li>
            <li><a href="#">Hotel Sandhof</a>
                <ul>
                    <li><a href="#">Kulinarik</a></li>
                    <li><a href="#">Weinverkostung</a></li>
                    <li><a href="#">Familien</a></li>
                    <li><a href="#">Wellness</a></li>
                </ul></li>
            <li><a href="#">Zimmer & Preise</a></li>
            <li><a href="#">Pauschalen</a></li>
            <li><a href="#">Skigebiet Arlberg</a>
                <ul>
                    <li><a href="#">Skischulen</a></li>
                    <li><a href="#">Skiverleih</a></li>
                    <li><a href="#">Der Weisse Ring</a></li>
                </ul>
            </li>
            <li><a href="#">EN</a></li>
        </ul>

    </div>
</nav>


<!-- Module system -->
<script>

    (function () {

        var moduleName = 'offcanvas-navigation_module'; // naming convention XXX_module

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


                var offCanvasMenu = $('.navigation-offcanvas'),
                    menuIcon      = $('[data-menu-action]');


                function offCanvasMenuEventHandler() {

                    switch (this.getAttribute('data-menu-action')) {
                        case 'open':
                            // this.setAttribute('data-menu-action', 'close')
                            // this.classList.add('close');
                            offCanvasMenu.sidr('open');
                            break;
                        case 'close':
                            // this.setAttribute('data-menu-action', 'open');
                            // this.classList.remove('close');
                            offCanvasMenu.sidr('close');
                            break;
                        default:
                    }

                }

                offCanvasMenu.sidr(menuIcon);
                menuIcon.on('click', offCanvasMenuEventHandler);

            }

        };

    }());//EOS
</script>

