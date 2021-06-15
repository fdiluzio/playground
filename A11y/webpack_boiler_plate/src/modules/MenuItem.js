const MenuItem = function (domNode, menuObj) {
  this.domNode = domNode;
  this.menu = menuObj;
};

MenuItem.prototype.init = function () {
  this.domNode.tabIndex = -1;
  if (!this.domNode.getAttribute('role')) {
    this.domNode.setAttribute('role', 'menuitem');
  }
  this.domNode.addEventListener('click', this.handleClick.bind(this));
};

/* EVENT HANDLERS */

MenuItem.prototype.handleClick = function (event) {
  this.menu.callback(this.domNode);
  this.menu.setFocusToController();
  this.menu.close();
};

export default MenuItem;