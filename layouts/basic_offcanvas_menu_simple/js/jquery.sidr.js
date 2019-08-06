(function ($) {

    "use strict";

    // Sidr public methods
    var methods = {
        open: function () {
            $(this).addClass('isopen');
        },
        close: function () {
            $(this).removeClass('isopen');
        }
    };


    $.fn.sidr = function (iconORmethodName) {

        if (this.data && this.data().sidr) {

            if (methods[iconORmethodName]) {
                methods[iconORmethodName].call(this);
            }

        }

        var $sideMenu = iconORmethodName;
        var $this = $(this);

        if (!$this.data('sidr')) {
            $this.data('sidr', true);

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

    };

    var touchObject = {
        fingerCount: 0,
        startX: 0,
        startY: 0,
        swipeLength: 0,
        isDragging: false,
        tx: 0
    };

    function swipeStart(event) {

        var touches;

        touchObject.isDragging = true;

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        touchObject.startX = touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        touchObject.startY = touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        //touchObject.tx = parseInt($(e.currentTarget).css('transform').split(',')[4]);

    }

    function swipeMove(event) {

        if (touchObject.isDragging !== true) {
            return;
        }

        var positionOffset, touches, manualSlide;

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

            manualSlide = 250 + (touchObject.swipeLength * positionOffset);

            event.data.menu.pos = manualSlide;

            manualSlide -= 250

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


        if (touchObject.isDragging === true && event.data.menu.pos) {

            if (event.data.menu.pos >= 200) {
                $(this).sidr('open');
                event.data.menu.attr('data-menu-action', 'close');
                event.data.menu.addClass('close');
            } else {
                $(this).sidr('close');
                event.data.menu.attr('data-menu-action', 'open');
                event.data.menu.removeClass('close');
            }


        }

        touchObject.isDragging = false;
        event.data.menu.pos    = null;
    }

})(jQuery);
