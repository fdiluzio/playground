//#################################################################################################
// Tools ver 18.06.03
//#################################################################################################
/*jslint passfail: false, nomen: true, regexp: true, unparam: true, stupid: true, todo: true, vars: true, white: true */

// check if selt exists so we don't access an empty object
if (typeof selt === 'undefined') {
    selt = {};
}

(function (window, document, selt) {

    'use strict';


    //------------------------------------------------------------------------------------------------
    // AJAX
    // new selt.AjaxClass()
    //------------------------------------------------------------------------------------------------

    selt.AjaxClass = function (options) {


        var oReq = new XMLHttpRequest();

        oReq.addEventListener("progress", updateProgress);
        oReq.addEventListener("load", transferComplete);
        oReq.addEventListener("error", transferFailed);
        oReq.addEventListener("abort", transferCanceled);


        function addHeaders(headers) {
            if (typeof headers === 'object') {
                Object.keys(headers).forEach(function (key) {
                    oReq.setRequestHeader(key, headers[key])
                });
            }
        }

        oReq.open();

        // progress on transfers from the server to the client (downloads)
        function updateProgress(oEvent) {
            if (oEvent.lengthComputable) {
                var percentComplete = oEvent.loaded / oEvent.total * 100;
                // ...
            } else {
                // Unable to compute progress information since the total size is unknown
            }
        }

        function transferComplete(evt) {
            console.log("The transfer is complete.");
        }

        function transferFailed(evt) {
            console.log("An error occurred while transferring the file.");
        }

        function transferCanceled(evt) {
            console.log("The transfer has been canceled by the user.");
        }


    };


    //------------------------------------------------------------------------------------------------
    // RETRIEVE GET VARIABLES FROM URL
    //------------------------------------------------------------------------------------------------

    selt.getParam = function (wParam) {
        var params = window.location.search.substring(1).split('&'),
            segments, i;

        for (i = 0; params[i]; i += 1) {
            segments = params[i].split('=');
            if (segments[0] === wParam) {
                return segments[1];
            }
        }
    };

    selt.getParamObj = function () {
        var paramObj = {},
            segments, i;
        var params   = window.location.search.substring(1).split('&');
        for (i = 0; i < params.length; i += 1) {
            segments              = params[i].split('=');
            paramObj[segments[0]] = segments[1];
        }


        return paramObj;

    };

    selt.paramObj = selt.getParamObj();


    selt.loadExternalJavascript = function (src, async, onload) {

        var s   = document.createElement('script');
        s.type  = 'text/javascript';
        s.async = async ? true : false;
        s.src   = src;
        var x   = document.querySelector('head');
        x.appendChild(s);
        if (typeof onload === 'function') {
            s.onload = onload;
        }

    };

    // <link rel="stylesheet" type="text/css" href="main.css" />

    selt.loadExternalCss = function (filename) {

        var styleSheet = document.createElement("link")
        styleSheet.setAttribute("rel", "stylesheet")
        styleSheet.setAttribute("type", "text/css")
        styleSheet.setAttribute("href", filename)

        var head = document.querySelector('head');
        head.appendChild(styleSheet);
        if (typeof onload === 'function') {
            styleSheet.onload = onload;
        }

    };


    selt.sendCustomEvent = function (elem, eventName) {
        var event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
        elem.dispatchEvent(event);
    };


    var scrollContainer = window.document.scrollingElement || window.document.documentElement || window.document.body;

    selt.scrollToElement = function (el, offset, container) {

        var sEl             = container || scrollContainer,
            box             = el.getBoundingClientRect(),
            sElPos, distance, duration,
            compStyles      = window.getComputedStyle(sEl),
            topBorderOffset = parseInt(compStyles.getPropertyValue('border-top-width'));

        offset = topBorderOffset + (offset || 0);


        if (container) { // apply scroll to child element

            sElPos   = sEl.getBoundingClientRect();
            offset   = box.top + scrollElement.scrollTop - sElPos.top - offset;
            distance = Math.abs(sEl.scrollTop - offset);

        } else { // scroll document

            offset   = box.top + pageYOffset - offset;
            distance = Math.abs(pageYOffset - offset);
        }

        distance = Math.min(distance, 500);
        duration = Math.max(distance / 200 * 1000, 800);

        anime({
            targets: sEl,
            scrollTop: offset,
            duration: duration,
            easing: 'easeOutCubic'
        });

    };

    selt.collectionToArray = function(collection)
    {
        var ary = [];
        for(var i=0, len = collection.length; i < len; i++)
        {
            ary.push(collection[i]);
        }
        return ary;
    };

}(window, document, selt));
