import KeyCodes from "./KeyCodes";

const ActionButton = function (button) {
  this.domNode   = button;
  this.domNode.setAttribute('aria-haspopup', 'true');
  this.popupMenu = false;
  this.hasFocus = false;
  this.hasHover = false;
  this.registerMenu();
  this.registerEvents();
};

ActionButton.prototype.registerMenu = function () {
  const popupMenu = document.getElementById(this.domNode.getAttribute('aria-controls'));
  if (popupMenu) {
    if (popupMenu.getAttribute('aria-activedescendant')) {
      this.popupMenu = new PopupMenuActionActivedescendant(popupMenu, this);
      this.popupMenu.init();
    }
    else {
      this.popupMenu = new PopupMenuAction(popupMenu, this);
      this.popupMenu.init();
    }
  }
};

ActionButton.prototype.registerEvents = function () {
  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
};

ActionButton.prototype.handleKeydown = function (event) {
  var flag = false;

  switch (event.keyCode) {
    case KeyCodes.SPACE:
    case KeyCodes.RETURN:
    case KeyCodes.DOWN:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      }
      flag = true;
      break;

    case KeyCodes.UP:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToLastItem();
        flag = true;
      }
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

ActionButton.prototype.handleClick = function (event) {
  if (this.domNode.getAttribute('aria-expanded') == 'true') {
    this.popupMenu.close(true);
  }
  else {
    this.popupMenu.open();
    this.popupMenu.setFocusToFirstItem();
  }
};

ActionButton.prototype.handleFocus = function (event) {
  this.popupMenu.hasFocus = true;
};

ActionButton.prototype.handleBlur = function (event) {
  this.popupMenu.hasFocus = false;
  setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);

};

ActionButton.prototype.handleMouseover = function (event) {
  this.hasHover = true;
  this.popupMenu.open();
};

ActionButton.prototype.handleMouseout = function (event) {
  this.hasHover = false;
  setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
};



export default ActionButton;