<link rel="stylesheet" href="css/gallery.css">
<link rel="stylesheet" href="css/gallery-theme.css">

<div class="abstand-top abstand-bottom">
    <div class="constrainer--maxwidth layout-padding-sides--full">

        <aside class="gallery">

            <?php
            $galleryID = rand();
            $colorList = ['CFAFC6', '6AB4B5', '05767A', '01444C', 'DCC3D7', 'abd', 'def', 'fed', 'edf', 'dde'];
            ?>
            <div class="glide_<?= $galleryID ?> events">
                <div class="glide__track" data-glide-el="track">
                    <div class="glide__slides">
                        <?php for ($i = 0; $i < 5; $i++) { ?>
                            <article class="event-item glide__slide">
                                <img src="https://dummyimage.com/<?= ($i + 1) * 150 ?>x<?= ($i + 1) * 150 ?>/<?= $colorList[$i] ?>/fff" alt=""/>
                            </article>
                        <?php } ?>
                    </div>
                </div>

                <div data-glide-el="controls">
                    <div class="glide__arrow_wrp--left" data-glide-dir="<">
                        <div class="glide__arrow glide__arrow--left"><img src="icn/arrow_right.svg" alt=""></div>
                    </div>
                </div>
                <div data-glide-el="controls">
                    <div class="glide__arrow_wrp--right" data-glide-dir=">">
                        <div class="glide__arrow glide__arrow--right"><img src="icn/arrow_right.svg" alt=""></div>
                    </div>
                </div>

            </div>

        </aside>

    </div>
</div>

<!-- Module system -->
<script>

    (function () {

        var moduleName = 'gallery<?=$galleryID?>_module'; // naming convention XXX_module

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

                new Glide('.glide_<?=$galleryID?>', {
                    type: 'carousel', //'slider' carousel,
                    startAt: 0,
                    perView: 3,
                    peek: {before: 0, after: 0},
                    breakpoints: {
                        480: {
                            perView: 1,
                            peek: {before: 0, after: 0}
                        },
                        640: {
                            perView: 1,
                            peek: {before: 145, after: 145}
                        }
                    }

                }).mount()
            }
        };

    }());//EOS
</script>

