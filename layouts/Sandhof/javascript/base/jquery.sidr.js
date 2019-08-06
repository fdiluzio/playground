(function ($) {

    "use strict";

    // Sidr public methods
    var methods = {
        open: function () {
            this.addClass('isopen');
            document.body.style.overflow = 'hidden';
            this[0].overlay.classList.add('show');

        },
        close: function () {
            this.removeClass('isopen');
            document.body.style.overflow = 'auto';
            this[0].overlay.classList.remove('show');
        }
    };


    $.fn.sidr = function (iconORmethodName) {

        if (this.data && this.data().sidr) {

            if (methods[iconORmethodName]) {
                methods[iconORmethodName].call(this);
            }

        }

        var $sideMenu   = iconORmethodName;
        this[0].overlay = document.querySelector('[data-menu-overlay]');

        if (!this.data('sidr')) {
            this.data('sidr', true);

            this.on('touchstart.sidr', {
                action: 'start',
                menu: $sideMenu
            }, swipeStart);

            this.on('touchmove.sidr', {
                action: 'move',
                menu: $sideMenu
            }, swipeMove);

            this.on('touchend.sidr', {
                action: 'end',
                menu: $sideMenu
            }, swipeEnd);

        }

    };

    var touchObject = {
        fingerCount: 0,
        startX: 0,
        startY: 0,
        swipeLength: 0,
        isDragging: false,
        lastSwipeLength: 0,
        action: 'close'
    };

    function swipeStart(event) {


        this.classList.remove('transition');

        var touches;

        touchObject.isDragging = true;

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        touchObject.startX = touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        touchObject.startY = touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

    }

    function swipeMove(event) {

        event.preventDefault();
        event.stopPropagation();

        if (touchObject.isDragging !== true) {
            return;
        }

        var positionOffset, touches, manualSlide, swipeLength;

        touches        = event.originalEvent !== undefined ? event.originalEvent.touches : null;
        touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        swipeLength = Math.round(touchObject.curX - touchObject.startX);

        touchObject.swipeLength = swipeLength;

        if (swipeLength > touchObject.lastSwipeLength ) {
            // console.log('open');
            touchObject.action = 'open';
        } else if (swipeLength < touchObject.lastSwipeLength) {
            // console.log('close');
            touchObject.action = 'close';

        }

        touchObject.lastSwipeLength = swipeLength;

        swipeLength = Math.abs(swipeLength);


        if (event.originalEvent !== undefined && swipeLength  ) {

            positionOffset = (touchObject.curX > touchObject.startX ? 1 : -1);

            manualSlide = (swipeLength * positionOffset);

            if (manualSlide < 0) {
                this.style.webkitTransform = "translateX(" + manualSlide + "px)";
                this.style.MozTransform    = "translateX(" + manualSlide + "px)";
                this.style.msTransform     = "translateX(" + manualSlide + "px)";
                this.style.transform       = "translateX(" + manualSlide + "px)";
            }

        }

    }

    function swipeEnd(event) {


        this.style.webkitTransform = "";
        this.style.MozTransform    = "";
        this.style.msTransform     = "";
        this.style.transform       = "";
        this.classList.add('transition');


        if (touchObject.action === 'open') {
            $(this).sidr('open');
            // event.data.menu.attr('data-menu-action', 'close');
            // event.data.menu.addClass('close');
        } else {
            $(this).sidr('close');
            // event.data.menu.attr('data-menu-action', 'open');
            // event.data.menu.removeClass('close');
        }

    }

})(jQuery);
