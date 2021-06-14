/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
import ListboxButton from "./ListBoxButton";
import KeyCodes from "./KeyCodes";


export default function Listbox(button, list, callback) {
  this.selection = null;
  this.listboxNode = list;
  this.activeDescendant = this.listboxNode.getAttribute('aria-activedescendant');
  this.multiselectable = this.listboxNode.hasAttribute('aria-multiselectable');
  this.moveUpDownEnabled = false;
  this.siblingList = null;
  this.upButton = null;
  this.downButton = null;
  this.moveButton = null;
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

/**
 * @desc
 *  Register events for the listbox interactions
 */
Listbox.prototype.registerEvents = function () {
  this.listboxNode.addEventListener('focus', this.setupFocus.bind(this));
  this.listboxNode.addEventListener('blur', this.onBlur.bind(this));
  this.listboxNode.addEventListener('keydown', this.checkKeyPress.bind(this));
  this.listboxNode.addEventListener('click', this.checkClickItem.bind(this));
};

Listbox.prototype.selected = function () {
  this.listboxButton.hideListbox();
  if (this.selection)
    this.callback(this.selection, this);
};

/**
 * @desc
 *  If there is no activeDescendant, focus on the first option
 */
Listbox.prototype.setupFocus = function () {
  if (this.activeDescendant) {
    return;
  }

  this.focusFirstItem();
};

/**
 * @desc
 *  Focus on the first option
 */
Listbox.prototype.focusFirstItem = function () {
  const firstItem = this.listboxNode.querySelector('[role="option"]');
  if (firstItem) {
    this.focusItem(firstItem);
  }
};

/**
 * @desc
 *  Focus on the last option
 */
Listbox.prototype.focusLastItem = function () {
  const itemList = this.listboxNode.querySelectorAll('[role="option"]');

  if (itemList.length) {
    this.focusItem(itemList[itemList.length - 1]);
  }
};

/**
 * @desc
 *  Handle various keyboard controls; UP/DOWN will shift focus; SPACE selects
 *  an item.
 *
 * @param evt
 *  The keydown event object
 */
Listbox.prototype.checkKeyPress = function (evt) {
  const key = parseInt(evt.which || evt.keyCode);
  let nextItem = document.getElementById(this.activeDescendant);
  if (!nextItem) {
    return;
  }
  switch (key) {
    case KeyCodes.PAGE_UP:
    case KeyCodes.PAGE_DOWN:
      if (this.moveUpDownEnabled) {
        evt.preventDefault();
        if (key === KeyCodes.PAGE_UP) {
          this.moveUpItems();
        } else {
          this.moveDownItems();
        }
      }
      break;
    case KeyCodes.UP:
    case KeyCodes.DOWN:
      evt.preventDefault();
      if (this.moveUpDownEnabled && evt.altKey) {
        if (key === KeyCodes.UP) {
          this.moveUpItems();
        } else {
          this.moveDownItems();
        }
        return;
      }
      if (key === KeyCodes.UP) {
        nextItem = nextItem.previousElementSibling;
      } else {
        nextItem = nextItem.nextElementSibling;
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
    case KeyCodes.SPACE:
      evt.preventDefault();
      this.toggleSelectItem(nextItem);
      break;
    case KeyCodes.BACKSPACE:
    case KeyCodes.DELETE:
    case KeyCodes.RETURN:
      if (!this.moveButton) {
        return;
      }
      const keyshortcuts = this.moveButton.getAttribute('aria-keyshortcuts');
      if (key === KeyCodes.RETURN && keyshortcuts.indexOf('Enter') === -1) {
        return;
      }
      if (
        (key === KeyCodes.BACKSPACE || key === KeyCodes.DELETE) &&
        keyshortcuts.indexOf('Delete') === -1
      ) {
        return;
      }
      evt.preventDefault();
      let nextUnselected = nextItem.nextElementSibling;
      while (nextUnselected) {
        if (nextUnselected.getAttribute('aria-selected') != 'true') {
          break;
        }
        nextUnselected = nextUnselected.nextElementSibling;
      }
      if (!nextUnselected) {
        nextUnselected = nextItem.previousElementSibling;
        while (nextUnselected) {
          if (nextUnselected.getAttribute('aria-selected') != 'true') {
            break;
          }
          nextUnselected = nextUnselected.previousElementSibling;
        }
      }

      this.moveItems();

      if (!this.activeDescendant && nextUnselected) {
        this.focusItem(nextUnselected);
      }
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

/**
 * @desc
 *  Check if an item is clicked on. If so, focus on it and select it.
 *
 * @param evt
 *  The click event object
 */
Listbox.prototype.checkClickItem = function (evt) {
  const option = getOption(evt);
  if (option.getAttribute('role') === 'option') {
    this.focusItem(option);
    this.toggleSelectItem(option);
    this.selected();
  }
};

/**
 * @desc
 *  Toggle the aria-selected value
 *
 * @param element
 *  The element to select
 */
Listbox.prototype.toggleSelectItem = function (element) {
  if (this.multiselectable) {
    element.setAttribute(
      'aria-selected',
      element.getAttribute('aria-selected') === 'true' ? 'false' : 'true'
    );

    if (this.moveButton) {
      if (this.listboxNode.querySelector('[aria-selected="true"]')) {
        this.moveButton.setAttribute('aria-disabled', 'false');
      } else {
        this.moveButton.setAttribute('aria-disabled', 'true');
      }
    }
  }
};

/**
 * @desc
 *  Defocus the specified item
 *
 * @param element
 *  The element to defocus
 */
Listbox.prototype.defocusItem = function (element) {
  if (!element) {
    return;
  }
  if (!this.multiselectable) {
    element.removeAttribute('aria-selected');
  }
  element.classList.remove('focused');
};

/**
 * @desc
 *  Focus on the specified item
 *
 * @param element
 *  The element to focus
 */
Listbox.prototype.focusItem = function (element) {

  this.defocusItem(document.getElementById(this.activeDescendant));
  if (!this.multiselectable) {
    element.setAttribute('aria-selected', 'true');
  }
  element.classList.add('focused');
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

  if (!this.multiselectable && this.moveButton) {
    this.moveButton.setAttribute('aria-disabled', false);
  }

  this.checkUpDownButtons();
  this.handleFocusChange(element);
  this.selection = element;

};

Listbox.prototype.onBlur = function (element) {
  this.selected();
};

/**
 * @desc
 *  Enable/disable the up/down arrows based on the activeDescendant.
 */
Listbox.prototype.checkUpDownButtons = function () {
  const activeElement = document.getElementById(this.activeDescendant);

  if (!this.moveUpDownEnabled) {
    return false;
  }

  if (!activeElement) {
    this.upButton.setAttribute('aria-disabled', 'true');
    this.downButton.setAttribute('aria-disabled', 'true');
    return;
  }

  if (this.upButton) {
    if (activeElement.previousElementSibling) {
      this.upButton.setAttribute('aria-disabled', false);
    } else {
      this.upButton.setAttribute('aria-disabled', 'true');
    }
  }

  if (this.downButton) {
    if (activeElement.nextElementSibling) {
      this.downButton.setAttribute('aria-disabled', false);
    } else {
      this.downButton.setAttribute('aria-disabled', 'true');
    }
  }
};

/**
 * @desc
 *  Add the specified items to the listbox. Assumes items are valid options.
 *
 * @param items
 *  An array of items to add to the listbox
 */
Listbox.prototype.addItems = function (items) {
  if (!items || !items.length) {
    return false;
  }

  items.forEach((function (item) {
    this.defocusItem(item);
    this.toggleSelectItem(item);
    this.listboxNode.append(item);
  }).bind(this));

  if (!this.activeDescendant) {
    this.focusItem(items[0]);
  }

  this.handleItemChange('added', items);
};

/**
 * @desc
 *  Remove all of the selected items from the listbox; Removes the focused items
 *  in a single select listbox and the items with aria-selected in a multi
 *  select listbox.
 *
 * @returns items
 *  An array of items that were removed from the listbox
 */
Listbox.prototype.deleteItems = function () {
  let itemsToDelete;

  if (this.multiselectable) {
    itemsToDelete = this.listboxNode.querySelectorAll('[aria-selected="true"]');
  } else if (this.activeDescendant) {
    itemsToDelete = [document.getElementById(this.activeDescendant)];
  }

  if (!itemsToDelete || !itemsToDelete.length) {
    return [];
  }

  itemsToDelete.forEach((function (item) {
    item.remove();

    if (item.id === this.activeDescendant) {
      this.clearActiveDescendant();
    }
  }).bind(this));

  this.handleItemChange('removed', itemsToDelete);

  return itemsToDelete;
};

Listbox.prototype.clearActiveDescendant = function () {
  this.activeDescendant = null;
  this.listboxNode.setAttribute('aria-activedescendant', null);

  if (this.moveButton) {
    this.moveButton.setAttribute('aria-disabled', 'true');
  }

  this.checkUpDownButtons();
};

/**
 * @desc
 *  Shifts the currently focused item up on the list. No shifting occurs if the
 *  item is already at the top of the list.
 */
Listbox.prototype.moveUpItems = function () {

  if (!this.activeDescendant) {
    return;
  }

  const currentItem = document.getElementById(this.activeDescendant);
  const previousItem = currentItem.previousElementSibling;

  if (previousItem) {
    this.listboxNode.insertBefore(currentItem, previousItem);
    this.handleItemChange('moved_up', [currentItem]);
  }

  this.checkUpDownButtons();
};

/**
 * @desc
 *  Shifts the currently focused item down on the list. No shifting occurs if
 *  the item is already at the end of the list.
 */
Listbox.prototype.moveDownItems = function () {

  if (!this.activeDescendant) {
    return;
  }

  const currentItem = document.getElementById(this.activeDescendant);
  const nextItem = currentItem.nextElementSibling;

  if (nextItem) {
    this.listboxNode.insertBefore(nextItem, currentItem);
    this.handleItemChange('moved_down', [currentItem]);
  }

  this.checkUpDownButtons();
};

/**
 * @desc
 *  Delete the currently selected items and add them to the sibling list.
 */
Listbox.prototype.moveItems = function () {
  if (!this.siblingList) {
    return;
  }

  const itemsToMove = this.deleteItems();
  this.siblingList.addItems(itemsToMove);
};

/**
 * @desc
 *  Enable Up/Down controls to shift items up and down.
 *
 * @param upButton
 *   Up button to trigger up shift
 *
 * @param downButton
 *   Down button to trigger down shift
 */
Listbox.prototype.enableMoveUpDown = function (upButton, downButton) {
  this.moveUpDownEnabled = true;
  this.upButton = upButton;
  this.downButton = downButton;
  upButton.addEventListener('click', this.moveUpItems.bind(this));
  downButton.addEventListener('click', this.moveDownItems.bind(this));
};

/**
 * @desc
 *  Enable Move controls. Moving removes selected items from the current
 *  list and adds them to the sibling list.
 *
 * @param button
 *   Move button to trigger delete
 *
 * @param siblingList
 *   Listbox to move items to
 */
Listbox.prototype.setupMove = function (button, siblingList) {
  this.siblingList = siblingList;
  this.moveButton = button;
  button.addEventListener('click', this.moveItems.bind(this));
};

Listbox.prototype.setHandleItemChange = function (handlerFn) {
  this.handleItemChange = handlerFn;
};

Listbox.prototype.setHandleFocusChange = function (focusChangeHandler) {
  this.handleFocusChange = focusChangeHandler;
};

function getOption(evt) {
  let el = evt.target;
  while (el.nodeName !== 'LI') {
    el = el.parentNode;
  }
  return el;
}