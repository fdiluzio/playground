<link rel="stylesheet" href="css/responsive-table.css">


<?php $gliderID = rand(); ?>
<section class="responsive-table" data-group-id="<?= $gliderID ?>">


    <div class="row-item">

        <!--ZIMMER BESCHREIBUNG-->
        <div class="row-item--head">
            <div class="layout-float">
                <img class="image"
                     src="https://www.sandhof.at/website/var/tmp/image-thumbnails/0/135/thumb__small/hotel_sandhof_lux-hotelappartement_wohnraum.jpeg"
                     alt="">
                <div><strong>Doppelzimmer Standard- klein -</strong><br/>
                    <small class="desc">Kleines Doppelzimmer Standard ca. 12m² mit Bad, WC, TV für 1-2 Personen.</small>
                </div>
            </div>
        </div>
        <!--ZIMMER PREISE-->
        <div class="row-item--columns">
            <div class="glide_table_item">

                <div class="glide__track" data-glide-el="track">

                    <div class="glide__slides">
                        <div class="column glide__slide">
                            <div class="column-item">
                                <h6 class="column-header">Hauptsaison I</h6>
                                <span class="column-item--price">von € 300,- <br/>bis € 340,-</span>
                            </div>
                        </div>

                        <div class="column glide__slide">
                            <div class="column-item">
                                <h6 class="column-header">Hauptsaison II</h6>
                                <span class="column-item--price">von € 300,- <br/>bis € 340,-</span>
                            </div>
                        </div>

                        <div class="column glide__slide">
                            <div class="column-item">
                                <h6 class="column-header">Nebensaison</h6>
                                <span class="column-item--price">von € 300,- <br/>bis € 340,-</span>
                            </div>
                        </div>

                        <div class="column glide__slide">
                            <div class="column-item">
                                <h6 class="column-header">VOR- /NACHSAISON</h6>
                                <span class="column-item--price">von € 300,- <br/>bis € 340,-</span>
                            </div>
                        </div>
                    </div>

                </div>
                <!--SLIDER KONTROL PFEILEN-->
                <div class="table-controls">
                    <button data-table-control="<" class="glide__arrow_wrp--left">
                        <div class="glide__arrow glide__arrow--left"><img src="icn/arrow_right_black.svg" alt=""></div>
                    </button>
                    <button data-table-control=">" class="glide__arrow_wrp--right">
                        <div class="glide__arrow glide__arrow--right"><img src="icn/arrow_right_black.svg" alt=""></div>
                    </button>
                </div>

            </div>
        </div>
    </div>

</section>


<!-- Module system -->
<script>

    (function () {

        'use strict';

        var moduleName = 'responsive_table_module'; // naming convention XXX_module

        if (typeof selt === 'undefined') {
            selt = {
                modules: {}
            };
        } else if (!selt.modules) {
            selt.modules = {};
        }

        selt.modules[moduleName] = {

            name: moduleName,
            require: ['javascript/project/glide.min.js'],

            init: function () {

                this.initSliders();

            },


            initSliders: function () {

                var context = document.querySelector('[data-group-id="<?=$gliderID?>"]'),
                    gliders = selt.collectionToArray(context.querySelectorAll('.glide_table_item'));

                var controls = {

                    controlNext: selt.collectionToArray(context.querySelectorAll('[data-table-control=">"]')),
                    controlPrev: selt.collectionToArray(context.querySelectorAll('[data-table-control="<"]')),

                    _disable: function (coll) {
                        coll.forEach(function (el) {
                            el.setAttribute('disabled', '');

                        })
                    },

                    _enable: function (coll) {
                        coll.forEach(function (el) {
                            el.removeAttribute('disabled');

                        })
                    },

                    disable: {
                        prev: function () {
                            controls._disable(controls.controlPrev)
                        },
                        next: function () {
                            controls._disable(controls.controlNext)
                        }
                    },

                    enable: {
                        prev: function () {
                            controls._enable(controls.controlPrev)
                        },
                        next: function () {
                            controls._enable(controls.controlNext)
                        }
                    },

                    reset: function () {
                        this.show.prev();
                        this.show.next();
                    }

                };


                gliders.forEach(function (el) {

                    el.glider = new Glide(el, {
                        type: 'slider', //'slider', carousel
                        startAt: 0,
                        perView: 4,
                        peek: {before: 0, after: 0},
                        bound: false,
                        rewind: false,
                        swipeThreshold: false,
                        gap: 0,
                        slideCount: 4,
                        breakpoints: {
                            480: {
                                perView: 1
                            },
                            640: {
                                perView: 1
                            },
                            975: {
                                perView: 1,
                                // swipeThreshold: true
                            },
                            1200: {
                                perView: 3
                            }
                        }

                    }).mount().on(['run'], function (e) {
                        // Handler logic ...

                        console.log('arguments', e)

                        console.log(el.glider.index, el.glider.settings.perView);

                        if (el.glider.index > 0) {
                            controls.enable.prev();
                        } else {
                            controls.disable.prev();
                        }

                        if (el.glider.index + el.glider.settings.perView === el.glider.settings.slideCount) {
                            controls.disable.next();
                        } else {
                            controls.enable.next();
                        }
                    });

                    controls.disable.prev();

                });


                selt.collectionToArray(context.querySelectorAll('[data-table-control]'))
                    .forEach(function (el) {
                        el.addEventListener('click', function () {
                            var direction = this.dataset.tableControl
                            gliders.forEach(function (el) {
                                el.glider.go(direction);
                            });
                        })
                    })


            }


        };

    }());//EOS
</script>


