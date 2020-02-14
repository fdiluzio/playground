(function(){

    getParam = function (wParam) {
        var segments,
            i,
            params = window.location.search.substring(1).split('&');
        for (i = 0; params[i]; i += 1) if (segments = params[i].split('='), segments[0] === wParam) return segments[1]
    }

    function scrollToChart(e){
        var chart = document.querySelector('[data-view="chart"]');
        if (getParam('doAction') !== 'undefined'){

            chart.scrollIntoView();
            window.scrollTo(0, window.scrollY - 80);
        }
    }

    document.addEventListener('DOMContentLoaded', scrollToChart, false);

}(window, document));