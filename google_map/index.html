<style media="screen">

    body, html {
        ‚ padding: 0;
        margin: 0;
    }

    iframe {
        border: none;
        width: 100%;
        height: 100%;
    }

    .footer-map {
        height: 90%;
        width: 100%;
        margin: 0 auto;
        background-color: #aaa;
    }
</style>

<div class="footer-map" data-fullscreen="">


    <label>RENT <input data-marker-group="rent" type="checkbox" checked="checked"/></label>
    <label>SHOPS <input data-marker-group="shops" type="checkbox" checked="checked"/></label>


    <iframe src="gmap/gmap.html" data-messenger="" data-fullscreen="" class="footer-map-content"></iframe>
</div>


<script src="data.js"></script>


<script>

    (function () {

        var moduleName = 'gmap_module'; // naming convention XXX_module

        if (typeof selt === 'undefined') {
            selt = {
                modules: {}
            };
        } else if (!selt.modules) {
            selt.modules = {};
        }

        selt.modules[moduleName] = {

            name: moduleName,

            init: function () {
                // console.log('init', this.name);
                gmap_module();
            }

        }

        function gmap_module() {


            var messenger = new selt.Messenger();

            // init postMessage
            messenger.init($('[data-messenger]')[0].contentWindow);


            // add listener command
            messenger.command['gmap.ready'] = function () {

                var message = {
                    name: "gmap.coordsToMarker",
                    params: mapmarkerdata
                };
                messenger.sendMessage(message);

            };

            messenger.command['gmap.update_logobar'] = function (message) {

               console.log('get logo bar', message.params.id);
               logoBarUrl = 'http://project.glanzer.ilongo.at/marken?lg=de&id=92';

            };

            // show / hide marker groups
            document.querySelectorAll('[data-marker-group]').forEach(function (item) {


                item.addEventListener('click', function () {

                    var message = {
                        name: "gmap.toggleGroup",
                        params: { type:this.getAttribute('data-marker-group'), checked: this.checked }
                    };

                    messenger.sendMessage(message);
                })
            })

        }
    }());//EOS


</script>

// jquery is loaded in footer

<script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
<script src="gmap/post_message.js"></script>


// called from document ready
<script type="text/javascript">
    $(function () {

        if (selt.modules) {
            for (var thisModule in selt.modules) {
                if (selt.modules.hasOwnProperty(thisModule)) {
                    selt.modules[thisModule].init();
                    console.log('initiated module ' + selt.modules[thisModule].name);
                }
            }

            selt.modules.call = function (moduleName, command) {
                if (selt.modules[moduleName] && selt.modules[moduleName][command]) {
                    selt.modules[moduleName][command](arguments);
                }
            };
        }

    })


</script>
