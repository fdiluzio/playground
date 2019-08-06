(function app() {

  'use strict';


  // navigation
  (function offCanvasMenu() {

    var element = document.querySelector('.navigation');
    var offCanvasMenu = element.querySelector('.navigation-offcanvas');

    [].forEach.call(element.querySelectorAll('[data-action]'), function(el, index) {
      el.addEventListener('click', eventHandler, false);
    });

    function open() {
      offCanvasMenu.classList.add('show');
    }

    function close() {
      offCanvasMenu.classList.remove('show');
    }

    function eventHandler(e) {

      switch (this.getAttribute('data-action')) {
        case 'open':
          this.setAttribute('data-action', 'close')
          this.classList.add('close');
          open();
          break;
        case 'close':
          this.setAttribute('data-action', 'open');
          this.classList.remove('close');
          close();
          break;
        default:
      }

    }

  }());


  // accordion
  (function accordionNavigation() {

    var elements = document.querySelectorAll('[data-list-type="accordion"]');


    [].forEach.call(elements, function(el, index) {

      var listElments = el.querySelectorAll('li');

      [].forEach.call(listElments, function(el, index) {
        if (el.querySelector('ul')) {
          // has children
          el.classList.add('has-children');
          el.addEventListener('click', eventHandler, false);
        }
      });



    });

    function open() {
      // offCanvasMenu.classList.add('show');
    }

    function close() {
      // offCanvasMenu.classList.remove('show');
    }

    function eventHandler(e) {

      if (e.target === this.querySelector('a')) {
        e.preventDefault();
        e.stopPropagation();
        if (this.classList.contains('show')) {
          this.classList.remove('show');
        } else {
          this.classList.add('show');
        }
      }


    }

  }())



}());
