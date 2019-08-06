if (typeof gfb === 'undefined') {
    gfb = {};
}

// Window resize handler
(function (gfb) {

    if (gfb.windowResizer && gfb.debug) {
        console.log('[ window.windowResizer has been already initialized ]');
        return;
    }

    var resizer = gfb.windowResizer || {};

    resizer.queue = (new function(){
        var storage = [];
        this.checkID = function (id) {
            var result = false;
            storage.forEach(function(el){
                if (!el) return;
                if (el.id === id && !result) {
                    result = true;
                }
            });
            return result;
        };

        this.remove = function(id) {
            var result = false;
            storage.forEach(function(el, index, arr){
                if (!el) return;
                if (el.id === id) {
                    arr.splice(index, 1);
                    result = true;
                }
            });
            return result;
        };

        this.add = function (func, force) {

            var funcID;

            do {
                funcID = Math.floor(Math.random()*8917349726576234785);
            } while ( this.checkID(funcID) );

            storage.push({
                id: funcID,
                func: func
            });

            if ( force ) {
                setTimeout(func, 10);
            }

            return funcID;
        };

        this.run = function() {
            storage.forEach(function(el){
                // add to stack so one function after another executes
                setTimeout(el.func, 0);
            });
        };
    }());

    resizer.timerID = 0;

    gfb.windowResizer = resizer.queue;

    window.addEventListener('resize', function() {
        clearTimeout( resizer.timerID );
        resizer.timerID = setTimeout(function() {
            resizer.queue.run();
        }, 300);
    }, false);

})(gfb);

(function (gfb) {



}(gfb))