import Listbox from "./Listbox";
import Menu from "./Menu";

const AriaWidgets = {

  // @param scope = DOM Element
  // @param callback = function
  listbox: (scope, callback) => {

    [].forEach.call(scope.querySelectorAll('[data-aria-listbox]'), el => {
      const button = el.querySelector('button[aria-haspopup="listbox"]');
      const exListbox = el.querySelector('ul[role="listbox"]');
      new Listbox(button, exListbox, callback);
    });


  },

  menu: (scope, callback) => {

    [].forEach.call(scope.querySelectorAll('[data-aria-menu]'), el => {
      const button = el.querySelector('button[aria-haspopup]');
      const menu = el.querySelector('ul[role="menu"]');
      new Menu(button, menu, callback);
    });
  }
};

export {AriaWidgets};