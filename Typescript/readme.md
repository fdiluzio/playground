### Working with typescript

#### Compile typescript file
* tsc main.ts
* tsc -b (Build using tsconfig.json)

#### Watch typescript file
* tsc main --watch

#### Typscript Config
* tsc --init

#### Run Js in Node
* node main.js

### Variable Types

#### Boolean, Number and String

`let myBoolean: boolean = true;`

`let myNumber: number = 0;`

`let myName: string = 'Frank'`

##### Using back ticks to define a template string
let sentance:string = \`I am a ${myBoolean ? 'beginner' : 'expert'}.
in typescript\`;

#### Subclass variable types

let n: null = null;
let u: undefined = undefined;

These types can be assigned to all variable types
i.e.
let myBoolean: boolean = null;
let myName: string = null;

#### Tuple Type
This is a 1:1 relationship — definition and value are identically matched by order and type

`let person: [string, number] = ['chris', 22]

#### Enum Type
A way to give names to numeric values

`enum Color {Red, Green, Blue};`

Where Color.Red returns 0; Color.Green returns 1; Color.Blue returns 2.

let c: Color = Color.Green;
console.log('color = ', c); // color = 1

Or you can set the values explicitly:

```enum Colors {Red = 5, Green = 255, Blue = 456};```

let cs: Colors = Colors.Blue;
console.log('color = ', cs);

#### Any Type
The type any is a dynamic type and can be reassigned to a different type. This type doesn't do any TypeScript checking.

`let randomValue: any = 10;`

`randomValue = true;`

`randomValue = 'string';`

#### Unknow Type
Similar to any, however, if the variable doesn't have properties like it will show an Typescript error. 

`myVariable.name; myVariable(); myVariable.toUpperCase();`

#### Unknow Type and Casting
Use casting to use methods of an unknown type when you know the type

`(myVariable as string).toUpperCase();`

### Union of types for the same variable

`let multiType: number | boolean;`

multiType = 20;

multiType = true;

### Functions









