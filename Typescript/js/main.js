"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let message = 'HELLO World';
console.log(message);
let isBeginner = true;
let total = 23;
let sentance = `I am a ${isBeginner ? 'beginner' : 'expert'}.
in typescript`;
console.log(sentance);
let person = ['tom', 5];
console.log(person);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
let c = Color.Green;
console.log('color = ', c);
var Colors;
(function (Colors) {
    Colors[Colors["Red"] = 5] = "Red";
    Colors[Colors["Green"] = 255] = "Green";
    Colors[Colors["Blue"] = 456] = "Blue";
})(Colors || (Colors = {}));
;
let cs = Colors.Blue;
console.log('color = ', cs);
function hasName(obj) {
    return !!obj &&
        typeof obj === "object" &&
        "name" in obj;
}
function add(num1, num2) {
    return num1 + num2;
}
console.log(add(3, 9));
function addOneOrTwo(num1, num2 = 0) {
    return num1 + num2;
}
console.log('add One or Two', addOneOrTwo(42));
let tom = {
    surname: 'diluzio',
    firstName: 'frank',
    race: 'caucasion'
};
console.log(tom);
function identity(arg) {
    return arg;
}
console.log(identity("myString"));
