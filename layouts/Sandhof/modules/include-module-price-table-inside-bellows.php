<div class="abstand-top abstand-bottom">

    <div class="constrainer--maxwidth layout-padding-sides">


        <?php $gliderID = rand();?>
        <section class="responsive-table" data-group-id="<?=$gliderID?>">

            <?php include('layouts/layout_price_table_header.php') ?>
            <?php include('layouts/layout_price_table_item.php') ?>
            <?php include('layouts/layout_price_table_item.php') ?>
            <?php include('layouts/layout_price_table_item.php') ?>
            <?php include('layouts/layout_price_table_item.php') ?>
            <?php include('layouts/layout_price_table_item.php') ?>

        </section>

    </div>


</div>

<!-- Module system -->
<script>

    (function () {

        'use strict';

        var moduleName = '<?= $mountModuleName ?>'; // naming convention XXX_module

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

            mount: function () {

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
                        perView: 1,
                        peek: {before: 0, after: 0},
                        bound: false,
                        rewind: false,
                        swipeThreshold: false,
                        gap: 0,
                        slideCount: 4

                    }).mount().on(['run'], function (e) {
                        // Handler logic ...
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


