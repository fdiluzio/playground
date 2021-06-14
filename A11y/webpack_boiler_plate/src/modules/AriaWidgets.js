import Listbox from "./Listbox";
const AriaWidgets = {

  // @param scope = DOM Element
  // @param callback = function
  listbox: (scope, callback) => {

    [].forEach.call(scope.querySelectorAll('[data-aria-listbox]'), el => {
      const button = el.querySelector('[aria-haspopup="listbox"]');
      const exListbox = el.querySelector('[role="listbox"]');
      new Listbox(button, exListbox, callback);
    });


  }
};

export {AriaWidgets};