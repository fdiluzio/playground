(function ($) {

    "use strict";

    var sizes,
        mainContainer;

    // Private methods
    var privateMethods = {
        execute: function (action, name, callback) {
            // Check arguments
            if (typeof name === 'function') {
                callback = name;
                name = 'sidr';
            } else if (!name) {
                name = 'sidr';
            }

            // Declaring
            var $menu = $('#' + name),
                onOpen = $menu.data('onOpen'),
                onClose = $menu.data('onClose'),
                menuWidth;

            // Open Sidr
            if ('open' === action || ('toggle' === action && !$menu.hasClass('isopen'))) {
                $menu.addClass('isopen');

                menuWidth = privateMethods.getMenuSize();

                $menu.velocity({
                    translateX: menuWidth
                }, {
                    duration: 500,
                    easing: 'easeInCubic',
                    complete: function () {
                        onOpen();
                    }
                });

                if ( $(window).width() > 640 ){

                    mainContainer.css({
                        marginLeft: menuWidth
                    });
                }



            }
            // Close Sidr
            else {
                $menu.removeClass('isopen');

                $menu.velocity({
                    translateX: 0
                }, {
                    duration: 500,
                    easing: 'easeInCubic',
                    complete: function () {
                        onClose();
                    }
                });

                mainContainer.css({
                    marginLeft: 0
                });

            }
        },

        getMenuSize: function () {
            return ( $(window).width() > 1400 ) ? sizes.wide : sizes.narrow;
        }


    };

    // Sidr public methods
    var methods = {
        open: function (name, callback) {
            privateMethods.execute('open', name, callback);
        },
        close: function (name, callback) {
            privateMethods.execute('close', name, callback);
        },
        toggle: function (name, callback) {
            privateMethods.execute('toggle', name, callback);
        },
        // I made a typo, so I mantain this method to keep backward compatibilty with 1.1.1v and previous
        toogle: function (name, callback) {
            privateMethods.execute('toggle', name, callback);
        }
    };

    $.sidr = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'function' || typeof method === 'string' || !method) {
            return methods.toggle.apply(this, arguments);
        }

        $.error('Method ' + method + ' does not exist on jQuery.sidr');


    };
    var touchObject = {
        fingerCount: 0,
        startX: 0,
        startY: 0,
        swipeLength: 0,
        isDragging: false,
        tx: 0
    };

    var swipeStart = function (event) {

        var touches;

        touchObject.isDragging = true;

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        touchObject.startX = touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        touchObject.startY = touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        //touchObject.tx = parseInt($(e.currentTarget).css('transform').split(',')[4]);

    };

    var swipeMove = function (event) {

        if (!touchObject.isDragging === true) {
            return;
        }

        var curLeft, swipeDirection, positionOffset, touches, manualSlide, offset;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;


        touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(touchObject.curX - touchObject.startX, 2)));

        event.data.menu.pos = null;

        if (event.originalEvent !== undefined && touchObject.swipeLength > 10) {

            event.preventDefault();
            event.stopPropagation();

            touchObject.isDragging = true;


            positionOffset = (touchObject.curX > touchObject.startX ? 1 : -1);

            offset = privateMethods.getMenuSize();
            manualSlide =  offset + ( touchObject.swipeLength * positionOffset );

            event.data.menu.pos = manualSlide;

            if (manualSlide < offset) {

                event.data.menu.velocity({
                    translateX: manualSlide + 'px'
                }, {
                    duration: 0
                });

            }
        }

    };

    var swipeEnd = function (event) {


        if (touchObject.isDragging === true && event.data.menu.pos) {

            console.log(event.data.menu.pos)

            if (event.data.menu.pos >= 250) {
                $.sidr('open');
            } else {
                $.sidr('close');
            }

        }

        touchObject.isDragging = false;
        event.data.menu.pos = null;
    };

    $.fn.sidr = function (options) {

        var settings = $.extend({
            name: 'sidr', // Name for the 'sidr'
            side: 'left', // Accepts 'left' or 'right'
            sizes: {
                wide: 400,
                narrow: 320
            },
            onOpen: function () {
            }, // Callback when sidr opened
            onClose: function () {
            }, // Callback when sidr closed
            onCloseDone: function () {
            } // Callback when sidr closed

        }, options);

        sizes = settings.sizes;
        mainContainer = $('#constrainer');

        var name = settings.name,
            $sideMenu = $('#' + name),
            menuWidth;

        // Adding styles and options
        $sideMenu
            .addClass('sidr')
            .addClass(settings.side)
            .data({
                onOpen: settings.onOpen,
                onClose: settings.onClose,
                onCloseDone: settings.onCloseDone
            });

        return this.each(function () {
            var $this = $(this),
                data = $this.data('sidr');


            // If the plugin hasn't been initialized yet
            if (!data) {
                $this.data('sidr', name);


                menuWidth = privateMethods.getMenuSize();
                $this.css({
                    left: -menuWidth,
                    width: menuWidth
                })

                $this.on('touchstart.sidr', {
                    action: 'start',
                    menu: $sideMenu
                }, swipeStart);

                $this.on('touchmove.sidr', {
                    action: 'move',
                    menu: $sideMenu
                }, swipeMove);

                $this.on('touchend.sidr', {
                    action: 'end',
                    menu: $sideMenu
                }, swipeEnd);

            }
        });
    };

})(jQuery);
