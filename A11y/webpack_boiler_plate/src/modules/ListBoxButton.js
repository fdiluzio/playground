import KeyCodes from "./KeyCodes";
import EventBus from "eventbusjs";
import Constants from "./ifs-constants";
let constants = new Constants().constants;


const ListboxButton = function (button, listbox) {
  this.button = button;
  this.listbox = listbox;
  this.selection = this.button.querySelector('[data-listbox-selection]');
  this.registerEvents();
};

ListboxButton.prototype.registerEvents = function () {
  this.button.addEventListener('click', this.toggle.bind(this));
  this.button.addEventListener('keydown', this.onKeyDown.bind(this));
  this.listbox.setHandleFocusChange(this.onFocusChange.bind(this));
  EventBus.addEventListener(constants.events.BODY_CLICK, this.closeEvents.bind(this));
  EventBus.addEventListener(constants.events.CLOSE_OTHERS, this.closeEvents.bind(this));
};

ListboxButton.prototype.onKeyDown = function (evt) {
  const key = parseInt(evt.which || evt.keyCode);
  switch (key) {
    case KeyCodes.UP:
    case KeyCodes.DOWN:
      evt.preventDefault();
      this.showListBox();
      this.listbox.checkKeyPress(evt);
      break;
    case KeyCodes.TAB:
      if (this.button.getAttribute('aria-expanded') === 'true') {
        evt.preventDefault();
        this.setFocus();
      }
      break;
  }
};

ListboxButton.prototype.toggle = function (evt) {
  EventBus.dispatch(constants.events.CLOSE_OTHERS, this);
  evt.stopPropagation();
  const isExpanded = this.button.getAttribute('aria-expanded');
  if ( isExpanded === 'true') {
    this.hideListbox();
  } else if (!isExpanded) {
    this.showListBox();
  }
};

ListboxButton.prototype.showListBox = function () {
  this.listbox.show();
};

ListboxButton.prototype.hideListbox = function () {
  this.listbox.hide();
};

ListboxButton.prototype.listboxClosed = function (){
  this.button.removeAttribute('aria-expanded');
};

ListboxButton.prototype.listboxOpened = function (){
  this.button.setAttribute('aria-expanded', 'true');
};


ListboxButton.prototype.onFocusChange = function (focusedItem) {
  if (this.selection)
    this.selection.innerHTML = focusedItem.innerHTML;
};

ListboxButton.prototype.closeEvents = function (event = {}) {
  if (event.target !== this) {
    this.hideListbox();
  }
};
ListboxButton.prototype.setFocus = function (event = {}) {
 this.button.focus();
};


export default ListboxButton;