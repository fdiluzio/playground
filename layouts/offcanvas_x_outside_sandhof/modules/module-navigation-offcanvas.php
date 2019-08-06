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
        <div class="hamburger-icon"></div>
    </div>

    <div class="scroll-area">

        <ul data-list-type="accordion">
            <li><a href="#">Startseite</a>
                <ul>
                    <li><a href="#">1-1</a></li>
                    <li><a href="#">1-2</a></li>
                    <li><a href="#">Level 1-2</a>
                        <ul>
                            <li><a href="#">1-2-1</a></li>
                            <li><a href="#">1-2-2</a></li>
                            <li><a href="#">1-2-3</a></li>
                        </ul>
                        </a>
                    </li>
                </ul>
            </li>
            <li><a href="#">Hotel Sandhof</a></li>
            <li><a href="#">Zimmer & Preise</a>
                <ul>
                    <li><a href="#">3-1</a></li>
                    <li><a href="#">3-2</a></li>
                    <li><a href="#">3-3</a></li>
                </ul>
            </li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">EN</a></li>
        </ul>

        <div class="navigation-footer">

            <div class="address">
                <strong>Hotel Sandhof</strong>
                <br/><br/>

                Familie Prodinger, Dorf 124<br/>
                A-6764 Lech am Arlberg<br/>
                +43 5583 2298<br/>
                info@sandhof.at
            </div>
            <hr/>
            <div class="link-btns">
                <a href="/zimmer-anfragen-kategorie" class="icon-button">
                    <figure>
                        <img src="icons/anreise.svg" alt="anfragen">
                        <figcaption>Anreise</figcaption>
                    </figure>
                </a>
                <a href="/zimmer-anfragen-kategorie" class="icon-button">
                    <figure>
                        <img src="icons/jobs.svg" alt="anfragen">
                        <figcaption>Anfragen</figcaption>
                    </figure>
                </a>
                <a href="/zimmer-anfragen-kategorie" class="icon-button">
                    <figure>
                        <img src="icons/newsletter.svg" alt="anfragen">
                        <figcaption>Anfragen</figcaption>
                    </figure>
                </a>
                <a href="/zimmer-anfragen-kategorie" class="icon-button">
                    <figure>
                        <img src="icons/partner.svg" alt="anfragen">
                        <figcaption>Anfragen</figcaption>
                    </figure>
                </a>
                <a href="/zimmer-anfragen-kategorie" class="icon-button">
                    <figure>
                        <img src="icons/bewertungen.svg" alt="anfragen">
                        <figcaption>Anfragen</figcaption>
                    </figure>
                </a>
            </div>
            <div class="link-list">
                <a href="#">Datenschutz</a>
                <a href="#">AGB's</a>
                <a href="#">Impressum</a>
            </div>
        </div>

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
                            this.setAttribute('data-menu-action', 'close')
                            this.classList.add('close');
                            offCanvasMenu.sidr('open');
                            break;
                        case 'close':
                            this.setAttribute('data-menu-action', 'open');
                            this.classList.remove('close');
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

