import './main.css';
import './module.scss';
import {greet} from "./greet";


async function print() {
  const response = await greet('John Doe');
  console.log(response);
}

print();