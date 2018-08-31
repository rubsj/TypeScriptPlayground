import {of} from 'rxjs';

//example 1
//emits any number of provided values in sequence
const source = of(1,2,3,4,5);

//output: 1,2,3,4,5
const subscription = source.subscribe(val => console.log(val));

//example 2
//emits values of any type
const anySource = of({name : 'Ruby'} , [2,4,6] , () => "Hello World" , function hello(){return "test hello function"});
const anySrcSubscribe = anySource.subscribe(val => console.log(val));