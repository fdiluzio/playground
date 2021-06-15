import MenuButton from "./MenuButton";
import MenuItem from "./MenuItem";
import KeyCodes from "./KeyCodes";

const Menu = function (button, menu, callback) {

  let msgPrefix = 'PopupMenu constructor argument domNode ';

  // Check whether domNode is a DOM element
  if (!menu instanceof Element) {
    throw new TypeError(msgPrefix + 'is not a DOM Element.');
  }

  // Check whether domNode has child elements
  if (menu.childElementCount === 0) {
    throw new Error(msgPrefix + 'has no element children.');
  }

  // Check whether domNode child elements are A elements
  let childElement = menu.firstElementChild;
  while (childElement) {
    const menuitem = childElement.firstElementChild;
    if (menuitem && menuitem.nodeName === 'A') {
      throw new Error(msgPrefix + 'Cannot have descendant elements are A elements.');
    }
    childElement = childElement.nextElementSibling;
  }

  this.currentItem = undefined;

  this.menu = menu;
  this.button = new MenuButton(button, this);

  this.menuitems = [];      // see PopupMenu init method
  this.firstChars = [];      // see PopupMenu init method

  this.firstItem = null;    // see PopupMenu init method
  this.lastItem = null;    // see PopupMenu init method

  if (!callback) {
    callback = () => {
    };
  }
  this.callback = callback;

  this.init();

};

/*
*   @method ActionMenu.prototype.init
*
*   @desc
*       Add domNode event listeners for mouseover and mouseout. Traverse
*       domNode children to configure each menuitem and populate menuitems
*       array. Initialize firstItem and lastItem properties.
*/
Menu.prototype.init = function () {
  let menuElement, menuItem, textContent, label;

  // Configure the domNode itself
  this.menu.tabIndex = 0;

  this.menu.setAttribute('role', 'menu');

  if (!this.menu.getAttribute('aria-labelledby') && !this.menu.getAttribute('aria-label') && !this.menu.getAttribute('title')) {
    label = this.button.domNode.innerHTML;
    this.menu.setAttribute('aria-label', label);
  }
  this.menu.addEventListener('keydown', this.handleKeydown.bind(this));
  this.menu.addEventListener('mouseenter', this.handleMouseover.bind(this));
  this.menu.addEventListener('mouseleave', this.handleMouseout.bind(this));

  // Traverse the element children of domNode: configure each with
  // menuitem role behavior and store reference in menuitems array.
  const menuElements = this.menu.getElementsByTagName('LI');

  for (let i = 0; i < menuElements.length; i++) {

    menuElement = menuElements[i];
    if (!menuElement.firstElementChild && menuElement.getAttribute('role') !== 'separator') {
      menuItem = new MenuItem(menuElement, this);
      menuItem.init();
      this.menuitems.push(menuItem);
      textContent = menuElement.textContent.trim();
      this.firstChars.push(textContent.substring(0, 1).toLowerCase());
    }
  }

  // Use populated menuitems array to initialize firstItem and lastItem.
  if (this.menuitems.length > 0) {
    this.firstItem = this.menuitems[0];
    this.currentItem = this.firstItem;
    this.lastItem = this.menuitems[this.menuitems.length - 1];
  }

};
Menu.prototype.handleKeydown = function (event) {
  let flag = false,
    char = event.key;

  function isPrintableCharacter(str) {
    return str.length === 1 && str.match(/\S/);
  }

  if (event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  if (event.shiftKey) {
    if (isPrintableCharacter(char)) {
      this.setFocusByFirstCharacter(char);
    }
  } else {
    switch (event.keyCode) {

      case KeyCodes.SPACE:
        flag = true;
        break;

      case KeyCodes.RETURN:
        this.close(true);
        this.callback(this.currentItem.domNode);
        this.setFocusToController();
        flag = true;
        break;

      case KeyCodes.ESC:
        this.close(true);
        this.setFocusToController();
        flag = true;
        break;

      case KeyCodes.UP:
        this.setFocusToPreviousItem();
        flag = true;
        break;

      case KeyCodes.DOWN:
        this.setFocusToNextItem();
        flag = true;
        break;

      case KeyCodes.HOME:
      case KeyCodes.PAGE_UP:
        this.setFocusToFirstItem();
        flag = true;
        break;

      case KeyCodes.END:
      case KeyCodes.PAGE_DOWN:
        this.setFocusToLastItem();
        flag = true;
        break;

      case KeyCodes.TAB:
        this.setFocusToController();
        this.close();
        break;

      default:
        if (isPrintableCharacter(char)) {
          this.setFocusByFirstCharacter(char);
        }
        break;
    }
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

/* EVENT HANDLERS */
Menu.prototype.handleMouseover = function () {
  this.button.cancelCloseTimer();
};

Menu.prototype.handleMouseout = function () {
  this.close();
};

/* FOCUS MANAGEMENT METHODS */
Menu.prototype.setFocus = function (item) {
  this.removeFocus();
  item.domNode.classList.add('focused');
  this.menu.setAttribute('aria-activedescendant', item.domNode.id);
  this.currentItem = item;
};

Menu.prototype.removeFocus = function () {
  for (let i = 0; i < this.menuitems.length; i++) {
    const mi = this.menuitems[i];
    mi.domNode.classList.remove('focused');
  }
}

Menu.prototype.setFocusToFirstItem = function () {
  this.setFocus(this.firstItem);
};

Menu.prototype.setFocusToLastItem = function () {
  this.setFocus(this.lastItem);
};

Menu.prototype.setFocusToPreviousItem = function () {
  let index;

  if (this.currentItem === this.firstItem) {
    this.setFocusToLastItem();
  } else {
    index = this.menuitems.indexOf(this.currentItem);
    this.setFocus(this.menuitems[index - 1]);
  }
};

Menu.prototype.setFocusToNextItem = function () {
  let index;

  if (this.currentItem === this.lastItem) {
    this.setFocusToFirstItem();
  } else {
    index = this.menuitems.indexOf(this.currentItem);
    this.setFocus(this.menuitems[index + 1]);
  }
};

Menu.prototype.setFocusByFirstCharacter = function (char) {
  let start, index;
  char = char.toLowerCase();

  // Get start index for search based on position of currentItem
  start = this.menuitems.indexOf(this.currentItem) + 1;
  if (start === this.menuitems.length) {
    start = 0;
  }

  // Check remaining slots in the menu
  index = this.getIndexFirstChars(start, char);

  // If not found in remaining slots, check from beginning
  if (index === -1) {
    index = this.getIndexFirstChars(0, char);
  }

  // If match was found...
  if (index > -1) {
    this.setFocus(this.menuitems[index]);
  }
};

Menu.prototype.getIndexFirstChars = function (startIndex, char) {
  for (let i = startIndex; i < this.firstChars.length; i++) {
    if (char === this.firstChars[i]) {
      return i;
    }
  }
  return -1;
};

Menu.prototype.getCurrentItem = function () {
  const id = this.menu.getAttribute('aria-activedescendant');
  if (!id) {
    this.menu.setAttribute('aria-activedescendant', this.firstItem.domNode.id);
    return this.firstItem;
  }
  for (let i = 0; i < this.menuitems.length; i++) {
    const mi = this.menuitems[i];
    if (mi.domNode.id === id) {
      return mi;
    }
  }
  this.menu.setAttribute('aria-activedescendant', this.firstItem.domNode.id);
  return this.firstItem;
};

Menu.prototype.open = function () {

  // set aria-expanded attribute
  this.button.isExpanded();

  const offset = this.button.rect().height + 'px';

  // position menu relative to button
  this.menu.style.display = 'block';
  this.menu.style.position = 'absolute';
  this.menu.style.top = offset;
  this.menu.style.left = '0px';
  this.menu.focus();

};

Menu.prototype.close = function () {
  this.menu.style.display = 'none';
  this.removeFocus();
  this.button.isNotExpanded();
};

Menu.prototype.setFocusToController = function () {
  this.button.domNode.focus();
};

export default Menu;