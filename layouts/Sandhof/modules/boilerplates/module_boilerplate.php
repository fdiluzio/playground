
<h1>Module Boilerplate</h1>



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
