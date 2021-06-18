import './styles.scss';
import './scss/_grid.scss'

import {greet} from "./modules/greet";


async function print() {
  const response = await greet('John Doe');
  console.log(response);
}

print();


import {AriaWidgets} from "./modules/AriaWidgets";

AriaWidgets.listbox(document.body);

function updateLastAction(node) {
  console.log(node)
  // document.getElementById("action_output").value = event.domNode.innerHTML;
}

AriaWidgets.menu(document.body, updateLastAction);

import EventBus from "eventbusjs";
import Constants from "./modules/ifs-constants";

let constants = new Constants().constants;

document.addEventListener('click', e => {
  EventBus.dispatch(constants.events.BODY_CLICK, this);
})

