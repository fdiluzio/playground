import ListboxButton from "./ListBoxButton";
import KeyCodes from "./KeyCodes";

export default function Listbox(button, list, callback) {
  this.selection = null;
  this.lastSelection = null;
  this.listboxNode = list;
  this.activeDescendant = this.listboxNode.getAttribute('aria-activedescendant');
  this.keysSoFar = '';
  this.callback = () => {
  }; // empty function
  this.handleFocusChange = () => {
  };
  this.handleItemChange = (event, items) => {
  };
  this.registerEvents();
  this.listboxButton = new ListboxButton(button, this);
  if (typeof callback === 'function') {
    this.callback = callback;
  }
};

Listbox.prototype.registerEvents = function () {
  this.listboxNode.addEventListener('focus', this.setupFocus.bind(this));
  this.listboxNode.addEventListener('blur', this.onBlur.bind(this));
  this.listboxNode.addEventListener('keydown', this.checkKeyPress.bind(this));
  this.listboxNode.addEventListener('click', this.checkClickItem.bind(this));
};

Listbox.prototype.selected = function (skipHide = false) {
  if (!skipHide)
    this.hide();
  if (this.selection && this.selection.id !== this.lastSelection)
    this.callback(this.selection, this);
  this.listboxButton.setFocus();
};

Listbox.prototype.setupFocus = function () {

  this.lastSelection = this.listboxNode.querySelector('[aria-selected="true"]').id;

  if (this.activeDescendant) {
    return;
  }
  this.focusFirstItem();
};

Listbox.prototype.clearOption = function () {
  const option = this.listboxNode.querySelector('[aria-selected="true"]');
  option.setAttribute('aria-selected', 'false');
  option.classList.remove('focused');
};

Listbox.prototype.focusFirstItem = function () {
  const firstItem = this.listboxNode.querySelector('[role="option"]');
  if (firstItem) {
    this.clearOption();
    this.focusItem(firstItem);
  }
};

Listbox.prototype.focusLastItem = function () {
  const itemList = this.listboxNode.querySelectorAll('[role="option"]');
  if (itemList.length) {
    this.clearOption();
    this.focusItem(itemList[itemList.length - 1]);
  }
};

Listbox.prototype.checkKeyPress = function (evt) {
  const key = parseInt(evt.which || evt.keyCode);
  let nextItem = document.getElementById(this.activeDescendant);
  if (!nextItem) {
    return;
  }
  switch (key) {
    case KeyCodes.PAGE_UP:
      evt.preventDefault();
      this.focusFirstItem();
      break;
    case KeyCodes.PAGE_DOWN:
      evt.preventDefault();
      this.focusLastItem();
      break;
    case KeyCodes.UP:
    case KeyCodes.DOWN:
      evt.preventDefault();
      if (key === KeyCodes.UP) {
        nextItem = nextItem.previousElementSibling;
        if (!nextItem) {
          this.focusFirstItem();
          break;
        }
      } else {
        nextItem = nextItem.nextElementSibling;
        if (!nextItem) {
          this.focusLastItem();
          break;
        }
      }
      if (nextItem) {
        this.focusItem(nextItem);
      }
      break;
    case KeyCodes.HOME:
      evt.preventDefault();
      this.focusFirstItem();
      break;
    case KeyCodes.END:
      evt.preventDefault();
      this.focusLastItem();
      break;
    case KeyCodes.RETURN:
    case KeyCodes.ESC:
      evt.preventDefault();
      this.selected();
      break;
    case KeyCodes.TAB:
      if (this.listboxButton.button.getAttribute('aria-expanded') === 'true') {
        evt.preventDefault();
        this.selected();
      }
      break;
    default:
      const itemToFocus = this.findItemToFocus(key);
      if (itemToFocus) {
        this.focusItem(itemToFocus);
      }
      break;
  }
};

Listbox.prototype.findItemToFocus = function (key) {
  const itemList = this.listboxNode.querySelectorAll('[role="option"]');
  const character = String.fromCharCode(key);

  if (!this.keysSoFar) {
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].getAttribute('id') == this.activeDescendant) {
        this.searchIndex = i;
      }
    }
  }
  this.keysSoFar += character;
  this.clearKeysSoFarAfterDelay();

  let nextMatch = this.findMatchInRange(
    itemList,
    this.searchIndex + 1,
    itemList.length
  );
  if (!nextMatch) {
    nextMatch = this.findMatchInRange(
      itemList,
      0,
      this.searchIndex
    );
  }
  return nextMatch;
};

Listbox.prototype.clearKeysSoFarAfterDelay = function () {
  if (this.keyClear) {
    clearTimeout(this.keyClear);
    this.keyClear = null;
  }
  this.keyClear = setTimeout((function () {
    this.keysSoFar = '';
    this.keyClear = null;
  }).bind(this), 500);
};

Listbox.prototype.findMatchInRange = function (list, startIndex, endIndex) {
  // Find the first item starting with the keysSoFar substring, searching in
  // the specified range of items
  for (let n = startIndex; n < endIndex; n++) {
    const label = list[n].innerText;
    if (label && label.toUpperCase().indexOf(this.keysSoFar) === 0) {
      return list[n];
    }
  }
  return null;
};

Listbox.prototype.checkClickItem = function (evt) {
  const option = getOption(evt);
  if (option.getAttribute('role') === 'option') {
    this.focusItem(option);
    this.selected();
  }
};

Listbox.prototype.showSelected = function (element) {
  element.classList.add('focused');
  element.setAttribute('aria-selected', true);
};

Listbox.prototype.defocusItem = function (element) {
  if (!element) {
    return;
  }
  element.classList.remove('focused');
  element.setAttribute('aria-selected', false);
};

Listbox.prototype.focusItem = function (element) {

  this.defocusItem(document.getElementById(this.activeDescendant));

  this.showSelected(element);
  this.listboxNode.setAttribute('aria-activedescendant', element.id);
  this.activeDescendant = element.id;
  if (this.listboxNode.scrollHeight > this.listboxNode.clientHeight) {
    const scrollBottom = this.listboxNode.clientHeight + this.listboxNode.scrollTop;
    const elementBottom = element.offsetTop + element.offsetHeight;
    if (elementBottom > scrollBottom) {
      this.listboxNode.scrollTop = elementBottom - this.listboxNode.clientHeight;
    } else if (element.offsetTop < this.listboxNode.scrollTop) {
      this.listboxNode.scrollTop = element.offsetTop;
    }
  }
  this.handleFocusChange(element);
  this.selection = element;
};

Listbox.prototype.onBlur = function () {
  const skipHide = true;
  this.selected(skipHide);
};

Listbox.prototype.setHandleFocusChange = function (focusChangeHandler) {
  this.handleFocusChange = focusChangeHandler;
};

Listbox.prototype.show = function () {
  this.listboxNode.style.display = 'block';
  this.listboxNode.focus();
  this.listboxButton.listboxOpened();
};

Listbox.prototype.hide = function () {
  this.listboxNode.style.display = 'none';
  this.listboxButton.listboxClosed();
};


function getOption(evt) {
  let el = evt.target;
  while (el.nodeName !== 'LI') {
    el = el.parentNode;
  }
  return el;
}