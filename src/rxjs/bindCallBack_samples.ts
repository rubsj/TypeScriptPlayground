import {bindCallback} from 'rxjs';

//example one where callback function is not doing anything
let  somefunction = (a,b,c , callback)=>{
    console.log(a);
    console.log(b);
    console.log(c);
};

const boundSomeFunction = bindCallback(somefunction);
boundSomeFunction("hey" , [1,2,3] , {someProperty: 'someValue'}).subscribe(val => console.log(val));

//example 2 where callback function is doing something
const hello = (message , callback) => callback(`hello ${message}`);
const sayHello = bindCallback(hello);
const source$= sayHello("Ruby");
source$.subscribe(val => console.log(val));
