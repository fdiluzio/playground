import KeyCodes from "./KeyCodes";

const ListboxButton = function (button, listbox) {
  this.button = button;
  this.listbox = listbox;
  this.registerEvents();
};

ListboxButton.prototype.registerEvents = function () {
  this.button.addEventListener('click', this.showListbox.bind(this));
  this.button.addEventListener('keyup', this.checkShow.bind(this));
  this.listbox.listboxNode.addEventListener('blur', this.hideListbox.bind(this));
  this.listbox.listboxNode.addEventListener('keydown', this.checkHide.bind(this));
  this.listbox.setHandleFocusChange(this.onFocusChange.bind(this));
};

ListboxButton.prototype.checkShow = function (evt) {
  const key = evt.which || evt.keyCode;

  switch (key) {
    case KeyCodes.UP:
    case KeyCodes.DOWN:
      evt.preventDefault();
      this.showListbox();
      this.listbox.checkKeyPress(evt);
      break;
  }
};

ListboxButton.prototype.checkHide = function (evt) {
  const key = evt.which || evt.keyCode;

  switch (key) {
    case KeyCodes.RETURN:
    case KeyCodes.ESC:
      evt.preventDefault();
      this.hideListbox();
      this.button.focus();
      break;
  }
};

ListboxButton.prototype.showListbox = function () {
  this.listbox.listboxNode.classList.remove('hidden');
  this.button.setAttribute('aria-expanded', 'true');
  this.listbox.listboxNode.focus();
};

ListboxButton.prototype.hideListbox = function () {
  this.listbox.listboxNode.classList.add('hidden');
  this.button.removeAttribute('aria-expanded');
};

ListboxButton.prototype.onFocusChange = function (focusedItem) {
  this.button.innerText = focusedItem.innerText;
};

export default ListboxButton;