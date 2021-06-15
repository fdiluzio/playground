import './scss/_main.scss'
import './scss/_grid.scss'

import {greet} from "./modules/greet";


async function print() {
  console.log('Printing Greet when ready ...');
  const response = await greet('John Doe');
  console.log('waited for greet');
  console.log(response);
}

print();
