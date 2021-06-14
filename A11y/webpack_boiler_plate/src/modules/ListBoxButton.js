import KeyCodes from "./KeyCodes";
import EventBus from 'eventbusjs';
import Constants from "./ifs-constants";

const ListboxButton = function (button, listbox) {
  this.button = button;
  this.listbox = listbox;
  this.registerEvents();
};

ListboxButton.prototype.registerEvents = function () {
  this.button.addEventListener('click', this.toggle.bind(this));
  this.button.addEventListener('keydown', this.checkShow.bind(this));
  this.selection = this.button.querySelector('[data-listbox-selection]');
  this.listbox.listboxNode.addEventListener('blur', this.hideListbox.bind(this));
  this.listbox.listboxNode.addEventListener('keydown', this.checkHide.bind(this));
  this.listbox.setHandleFocusChange(this.onFocusChange.bind(this));
  this.constants = new Constants().constants;
  EventBus.addEventListener(this.constants.events.BODY_CLICK, this.hideListbox.bind(this));
};

ListboxButton.prototype.checkShow = function (evt) {
  const key = parseInt(evt.which || evt.keyCode);

  switch (key) {
    case KeyCodes.UP:
    case KeyCodes.DOWN:
      evt.preventDefault();
      // this.showListbox();
      this.listbox.checkKeyPress(evt);
      break;
    case KeyCodes.ESC:
      evt.preventDefault();
      this.hideListbox();
      this.button.focus();
      break;
    case KeyCodes.TAB:
      if (this.button.getAttribute('aria-expanded') === 'true') {
        evt.preventDefault();
        this.hideListbox();
        this.button.focus();
      }
      break;
  }
};

ListboxButton.prototype.checkHide = function (evt) {
  const key = parseInt(evt.which || evt.keyCode);

  switch (key) {
    case KeyCodes.RETURN:
    case KeyCodes.ESC:
      evt.preventDefault();
      this.hideListbox();
      this.button.focus();
      break;
    case KeyCodes.UP:
    case KeyCodes.DOWN:
      evt.preventDefault();
      break;
  }
};

ListboxButton.prototype.toggle = function (e) {
  EventBus.dispatch(this.constants.events.CLOSE_OTHERS);
  e.stopPropagation();
  if (this.button.getAttribute('aria-expanded') === 'true') {
    this.hideListbox();
  } else if (!this.button.getAttribute('aria-expanded')) {
    this.expand();
  }
};

ListboxButton.prototype.expand = function () {
  EventBus.dispatch(this.constants.events.BODY_CLICK, this);
  this.listbox.listboxNode.style.display = 'block';
  this.button.setAttribute('aria-expanded', 'true');
  this.listbox.listboxNode.focus();
};


ListboxButton.prototype.showListbox = function () {
  this.expand();

};

ListboxButton.prototype.hideListbox = function () {
  this.listbox.listboxNode.style.display = 'none';
  this.button.removeAttribute('aria-expanded');
};

ListboxButton.prototype.onFocusChange = function (focusedItem) {
  if (this.selection)
    this.selection.innerHTML = focusedItem.innerHTML;
};

export default ListboxButton;