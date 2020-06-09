import './styles.scss';
import './scss/_grid.scss'

import {greet} from "./modules/greet";


async function print() {
  const response = await greet('John Doe');
  console.log(response);
}

print();