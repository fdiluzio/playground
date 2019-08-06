//------------------------------------------------------------------------------------------------
// Lazy loading
//------------------------------------------------------------------------------------------------

document.addEventListener('lazybeforeunveil', function (e) {
    var element = $(e.target),
        ajax    = element.data('ajax');

    if (ajax) {
        $.ajax({
            url: ajax
        }).done(function (data) {
            element.before(data);
            element.remove();
            selt.modules.update();
        });
    }
});

//------------------------------------------------------------------------------------------------
// Modules
//------------------------------------------------------------------------------------------------

// check if selt exists so we don't access an empty object
if (typeof window.selt === 'undefined') {
    window.selt = {
        modules: {}
    };
} else if (!window.selt.modules) {
    window.selt.modules = {};
}

selt.loadExternalJavascript('javascript/base/lazysizes.min.js');


if (selt.modules) {

    selt.modules.spritelist  = {};
    selt.modules.requireList = [];

    selt.modules.call = function (moduleName, command, params) {
        if (selt.modules[moduleName] && selt.modules[moduleName][command]) {
            selt.modules[moduleName][command](params);
        }
    };

    selt.modules.update = function () {

        for (var moduleName in selt.modules) {

            var module = selt.modules[moduleName];

            if (selt.modules.hasOwnProperty(moduleName) && module.state !== 1) {
                if (module.require && Array.isArray(module.require) && module.require.length) {
                    selt.modules.require(module);
                } else if (module.init) {
                    module.state = 1;
                    module.init();
                    console.log('initiated module ' + module.name);
                }
            }
        }
    };


    selt.modules.require = function (module) {

        module.require.forEach(function (path) {

            if (selt.modules.requireList.indexOf(path) < 0) {
                selt.loadExternalJavascript(path, false, function () {
                    selt.modules.requireList.push(path);
                    var pathArrayPos = module.require.indexOf(path);
                    module.require.splice(pathArrayPos, 1);
                    selt.modules.update();
                });

            } else {
                var pathArrayPos = module.require.indexOf(path);
                module.require.splice(pathArrayPos, 1);
                selt.modules.update();
            }
        });

    };
}