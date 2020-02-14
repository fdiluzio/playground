"use strict";
exports.__esModule = true;
var message = 'HELLO World';
console.log(message);
var isBeginner = true;
var total = 23;
var sentance = "I am a " + (isBeginner ? 'beginner' : 'expert') + ".\nin typescript";
console.log(sentance);
var person = ['tom', 5];
console.log(person);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
console.log('color = ', c);
var Colors;
(function (Colors) {
    Colors[Colors["Red"] = 5] = "Red";
    Colors[Colors["Green"] = 255] = "Green";
    Colors[Colors["Blue"] = 456] = "Blue";
})(Colors || (Colors = {}));
;
var cs = Colors.Blue;
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
function addOneOrTwo(num1, num2) {
    if (num2 === void 0) { num2 = 0; }
    return num1 + num2;
}
console.log('add One or Two', addOneOrTwo(42));
var tom = {
    surname: 'diluzio',
    firstName: 'frank',
    race: 'caucasion'
};
console.log(tom);
// https://www.typescriptlang.org/docs/handbook/generics.html
function identity(arg) {
    return arg;
}
console.log(identity("myString"));
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
console.log(loggingIdentity([4, 5]));
console.log(loggingIdentity(['tom', 'cat']));
