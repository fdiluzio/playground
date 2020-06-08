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

interface man {
    surname: string;
    firstName: string;
    middleName?: string;
}

// extend man
interface man {
    race: string;
}

let tom: man = {
    surname: 'diluzio',
    firstName: 'frank',
    race: 'caucasion'
};

console.log(tom);



// https://www.typescriptlang.org/docs/handbook/generics.html

function identity<T>(arg: T): T {
    return arg;
}

console.log( identity<string>("myString") );

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}

console.log( loggingIdentity<number>([4,5]) );
console.log( loggingIdentity<string>(['tom', 'cat']) );


