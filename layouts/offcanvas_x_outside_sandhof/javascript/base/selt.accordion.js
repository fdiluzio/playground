// accordion
(function accordionNavigation() {

    var moduleName = 'accordion_module'; // naming convention XXX_module

    if (typeof selt === 'undefined') {
        selt = {
            modules: {}
        };
    } else if (!selt.modules) {
        selt.modules = {};
    }

    selt.modules[moduleName] = {

        name: moduleName,
        require: null,

        init: function () {

            var elements = document.querySelectorAll('[data-list-type="accordion"]');

            function eventHandler(e) {

                if (e.target === this.querySelector('a')) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                if (this.classList.contains('show')) {
                    this.classList.remove('show');
                } else {
                    this.classList.add('show');
                }

            }

            [].forEach.call(elements, function (el) {

                var listElments = el.querySelectorAll('li');

                [].forEach.call(listElments, function (el) {
                    if (el.querySelector('ul')) {
                        // has children
                        el.classList.add('has-children');
                        el.addEventListener('click', eventHandler, false);
                    }
                });

            });
        }
    };


})();
