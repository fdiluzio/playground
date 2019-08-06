<link rel="stylesheet" href="css/gallery.css">
<link rel="stylesheet" href="css/gallery-theme.css">

<h2>Gallery Module Boilerplate</h2>

    <section class="gallery">

        <?php $galleryID = rand(); ?>
        <div class="glide_<?= $galleryID ?> events">
            <div class="glide__track" data-glide-el="track">
                <div class="glide__slides">
                    <?php for ($i = 0; $i < 2; $i++) { ?>
                        <article class="event-item glide__slide">
                            <img src="https://dummyimage.com/600x400/abcabc/fff.jpg" alt=""/>
                        </article>
                        <article class="event-item glide__slide">
                            <img src="https://dummyimage.com/600x400/bbcbbc/fff.jpg" alt=""/>
                        </article>
                    <?php } ?>
                    <article class="event-item glide__slide">
                        <img src="https://dummyimage.com/600x400/000/fff.jpg" alt=""/>
                    </article>

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

    </section>


<!-- Module system -->
<script>

    (function () {

        var moduleName = 'gallery_module'; // naming convention XXX_module

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

