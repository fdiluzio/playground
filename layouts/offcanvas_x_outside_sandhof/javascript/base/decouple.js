(function (f) {

    if (typeof selt === 'undefined') {
        selt = {};
    }

    window.selt.decouple = f()

})(function () {

    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {exports: {}};
                t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }

        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function (require, module, exports) {
            'use strict';

            var requestAnimFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            }().bind(window));

            function decouple(node, event, fn) {
                var eve,
                    tracking = false;

                function captureEvent(e) {
                    eve = e;
                    track();
                }

                function track() {
                    if (!tracking) {
                        requestAnimFrame(update);
                        tracking = true;
                    }
                }

                function update() {
                    fn.call(node, eve);
                    tracking = false;
                }

                node.addEventListener(event, captureEvent, false);

                return captureEvent;
            }

            /**
             * Expose decouple
             */
            module.exports = decouple;

        }, {}]
    }, {}, [1])(1)
});