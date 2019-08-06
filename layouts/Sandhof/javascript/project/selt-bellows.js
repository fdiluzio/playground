(function () {

    'use strict';

    // check if selt exists so we don't access an empty object
    if (typeof window.selt === 'undefined') {
        window.selt = {};
    }

    var bellows = {};

    // constants
    var ANIMATE  = 'animating',
        OPEN     = 'open',
        CLOSED   = 'closed',
        DURATION = 800,
        EASING   = 'easeOutCubic';

    bellows.getBellowHeight = function (target) {

        var preDisplay = target.style.display;

        target.style.display   = 'block';
        target.style.boxSizing = "border-box";
        var compStyles         = window.getComputedStyle(target);
        // var marginBottom       = (window.getComputedStyle(this).getPropertyValue('margin-top'));
        var result             = {
            height: compStyles.getPropertyValue('height')
        };

        target.style.display = preDisplay;

        return result.height;

    };

    bellows.slideDown = function (callback) {

        var target       = this.content,
            targetHeight = bellows.getBellowHeight.call(this, target);
        var tab          = this;

        tab.bellowstate = ANIMATE;
        tab.classList.add('bellow-open');

        // set properties to start slide
        target.style.height  = 0;
        target.style.display = 'block';


        anime({
            targets: target,
            height: parseInt(targetHeight),
            easing: EASING,
            duration: DURATION,
            complete: function (anim) {
                tab.bellowstate     = OPEN;
                target.style.height = "";
                if (typeof callback === 'function') {
                    callback(anim);
                }
            }
        });

    }

    bellows.slideUp = function (callback) {

        var target      = this.content,
            tab         = this;
        tab.bellowstate = ANIMATE;
        tab.classList.remove('bellow-open');

        anime({
            targets: target,
            height: 0,
            easing: EASING,
            duration: DURATION,
            complete: function (anim) {
                tab.bellowstate      = CLOSED;
                target.style.height  = "";
                target.style.display = 'none';
                if (typeof callback === 'function') {
                    callback(anim);
                }
            }
        });

    };

    bellows.closeAllinGroup = function (bellowsGroup) {
        var me = this;
        bellowsGroup.forEach(function (el) {
            if (el !== me)
                bellows.slideUp.call(el);
        });
    };

    bellows.apply = function (options) {

        var bellowsGroup,
            isGroup = false;

        if (options && options.groupId) {
            bellowsGroup = document.querySelector('[data-bellow-group="' + options.groupId + '"]');
            bellowsGroup = bellowsGroup.querySelectorAll('[data-bellow-tab]');
            isGroup      = true;
        } else {
            bellowsGroup = document.querySelectorAll('[data-bellow-tab]');
        }

        if (bellowsGroup.length === 0) {
            console.error('Error: Bellows Module. No Elements selected');
            return false;
        }

        if (!bellowsGroup.forEach) {
            bellowsGroup = selt.collectionToArray(bellowsGroup);
        }


        bellowsGroup.forEach(function (el) {

            var dataSet = el.dataset,
                contentEl;

            contentEl  = document.querySelector('[data-bellow-content="' + dataSet.bellowTab + '"]');
            el.content = contentEl;

            // skip el if it already was initiated
            if (!el.bellowstate) {

                // set bellow state
                if (dataSet.bellowState) {
                    el.bellowstate          = OPEN;
                    contentEl.style.display = 'block';
                } else {
                    el.bellowstate = CLOSED;
                }

                el.addEventListener('click', function () {

                    var state = this.bellowstate;

                    if (state === CLOSED) {
                        bellows.slideDown.call(this, function (anime) {
                            selt.sendCustomEvent(contentEl, 'bellowsopened');
                        });
                        if (isGroup && options.autoClose) {
                            bellows.closeAllinGroup.call(this, bellowsGroup);
                        }
                    } else if (state === OPEN) {
                        bellows.slideUp.call(this, function () {
                            selt.sendCustomEvent(contentEl, 'bellowsclosed');
                        });
                    }

                });
            }
        });

    };

    window.selt.bellows = bellows;

})(window);