export {}
let message = 'HELLO World';
console.log(message);

let isBeginner:boolean = true;

let total:number = 23;
let sentance:string = `I am a ${isBeginner ? 'beginner' : 'expert'}.
in typescript`;

console.log(sentance);

let person: [string,number] = ['tom', 5];
console.log(person);


enum Color {Red, Green, Blue};
let c: Color = Color.Green;
console.log('color = ', c);

enum Colors {Red = 5, Green = 255, Blue = 456};
let cs: Colors = Colors.Blue;
console.log('color = ', cs);


function hasName(obj: any) : obj is { name: string } {
    return !!obj &&
        typeof obj === "object" &&
        "name" in obj
}

function add(num1: number,num2: number): number {
    return num1 + num2;
}

console.log(add(3,9));

function addOneOrTwo(num1: number,num2: number = 0): number {
    return num1 + num2;
}

console.log('add One or Two', addOneOrTwo(42));


