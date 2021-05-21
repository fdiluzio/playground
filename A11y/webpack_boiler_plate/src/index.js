import './styles.scss';
import './scss/_grid.scss'

import {greet} from "./modules/greet";
import {Listbox} from "./modules/Listbox";


async function print() {
  const response = await greet('John Doe');
  console.log(response);
}

print();

const button = document.getElementById('exp_button');
const exListbox = document.getElementById('exp_elem_list');
new Listbox(button, exListbox);
console.log('ListBox')