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

// CONSTANTS
selt.state = {
    LOADING: 1,
    LOADED: 2,
    INITIALIZED: 3
}

selt.modules.dependenciesLoaded         = [];
selt.modules.dependenciesLoading = [];

selt.modules.call = function (moduleName, command, params) {
    if (selt.modules[moduleName] && selt.modules[moduleName][command]) {
        selt.modules[moduleName][command](params);
    }
};

selt.modules.once = function (callback) {
    for (var moduleName in selt.modules) {
        var module = selt.modules[moduleName];
        if (selt.modules.hasOwnProperty(moduleName) && module.state !== 1) {
            callback(module);
        }
    }
};

selt.modules.update = function () {

    for (var moduleName in selt.modules) {

        var module = selt.modules[moduleName];
        if (selt.modules.hasOwnProperty(moduleName) && module.state !== selt.state.INITIALIZED) {
            if (module.require && Array.isArray(module.require) && module.require.length) {
                selt.modules.require(module);
            } else if (module.state && module.state < selt.state.INITIALIZED && module.init) {
                module.state = selt.state.INITIALIZED;
                module.init();
            } else if (module.init ){
                module.state = selt.state.INITIALIZED;
                module.init();
            }
        }
    }
};

selt.modules.mount = function (moduleName) {
    selt.modules.call(moduleName, 'mount');
};

selt.modules.require = function (module) {

    module.require.forEach(function (path) {

        var pathArrayPos;
            
        if (selt.modules.dependenciesLoaded.indexOf(path) < 0) {
            // dependency is not available yet
            module.state = selt.state.LOADING;
            
            // check if dependency is still loading
            if (selt.modules.dependenciesLoading.indexOf(path) < 0) {
                // add path to dependencies being loaded
                selt.modules.dependenciesLoading.push(path);
                // load dependency
                selt.loadExternalJavascript(path, false, function () {
                    // dependency loaded
                    selt.modules.dependenciesLoaded.push(path);
                    pathArrayPos = selt.modules.dependenciesLoading.indexOf(path);
                    selt.modules.dependenciesLoading.splice(pathArrayPos, 1);
                    selt.modules.update();
                });

            }

        } else {

            // remove the requirement form module list
            pathArrayPos = module.require.indexOf(path);
            module.require.splice(pathArrayPos, 1);
            selt.modules.update();

        }
        
    });
    


};
