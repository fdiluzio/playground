// navigation
function offCanvasMenu() {

    var offCanvasMenu = $('.navigation-offcanvas'),
        menuIcon = offCanvasMenu.find('[data-menu-action]');


    function offCanvasMenuEventHandler() {

        switch (this.getAttribute('data-menu-action')) {
            case 'open':
                this.setAttribute('data-menu-action', 'close')
                this.classList.add('close');
                offCanvasMenu.sidr('open');
                break;
            case 'close':
                this.setAttribute('data-menu-action', 'open');
                this.classList.remove('close');
                offCanvasMenu.sidr('close');
                break;
            default:
        }

    }

    offCanvasMenu.sidr(menuIcon);
    menuIcon.on('click', offCanvasMenuEventHandler);


};


(function app() {

    'use strict';

    offCanvasMenu();


}());
