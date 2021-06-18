import KeyCodes from "./KeyCodes";
import EventBus from "eventbusjs";
import Constants from "./ifs-constants";

const constants = new Constants().constants;

const MenuButton = function (button, popupMenu) {
  this.domNode = button;
  this.popupMenu = popupMenu;
  this.domNode.setAttribute('aria-haspopup', 'true');
  this.closeTimeOutMarker = null;
  this.registerEvents();
};

MenuButton.prototype.registerEvents = function () {
  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  // this.domNode.addEventListener('mouseenter', this.handleMouseover.bind(this));
  this.domNode.addEventListener('touchstart', this.handleMouseover.bind(this));
  // this.domNode.addEventListener('mouseleave', this.handleMouseout.bind(this));
  EventBus.addEventListener(constants.events.BODY_CLICK, this.closeEvents.bind(this));
  EventBus.addEventListener(constants.events.CLOSE_OTHERS, this.closeEvents.bind(this));
};

MenuButton.prototype.handleKeydown = function (event) {
  let stopEvent = false;

  switch (event.keyCode) {
    case KeyCodes.SPACE:
    case KeyCodes.RETURN:
    case KeyCodes.DOWN:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      }
      stopEvent = true;
      break;

    case KeyCodes.UP:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToLastItem();
        stopEvent = true;
      }
      break;

    default:
      break;
  }

  if (stopEvent) {
    event.stopPropagation();
    event.preventDefault();
  }
};

MenuButton.prototype.closeEvents = function (event) {
  if (event.target !== this) {
    this.popupMenu.close();
  }
};


MenuButton.prototype.handleClick = function (event) {
  event.stopPropagation();
  EventBus.dispatch(constants.events.CLOSE_OTHERS, this);
  if (this.domNode.getAttribute('aria-expanded') === 'true') {
    this.popupMenu.close();
  } else {
    this.popupMenu.open();
    this.popupMenu.removeFocus();
    this.popupMenu.setFocusToFirstItem();
  }
};

MenuButton.prototype.handleMouseover = function (event) {
  if (event.type === 'touchstart') {
    this.touchDevice = true;
    event.stopImmediatePropagation();
    return;
  }
  if (!this.touchDevice) {
    this.popupMenu.open();
    this.popupMenu.setFocusToFirstItem();
    this.popupMenu.removeFocus();
  }
};

MenuButton.prototype.handleMouseout = function () {
  this.closeTimeOutMarker = setTimeout(this.popupMenu.close.bind(this.popupMenu), 300);
};

MenuButton.prototype.cancelCloseTimer = function () {
  clearTimeout(this.closeTimeOutMarker);
};

MenuButton.prototype.isExpanded = function () {
  this.domNode.setAttribute('aria-expanded', 'true');
};

MenuButton.prototype.isNotExpanded = function () {
  this.domNode.removeAttribute('aria-expanded');
};

MenuButton.prototype.rect = function () {
  return this.domNode.getBoundingClientRect();
};

MenuButton.prototype.window = function () {
  return this.domNode.parentNode.getBoundingClientRect();
};


export default MenuButton;

