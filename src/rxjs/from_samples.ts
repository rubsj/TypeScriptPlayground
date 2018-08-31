import { from } from 'rxjs';

//emit result of promise
let promiseSrc$ = from(new Promise(resolve => {
    resolve('some data');

}));

//output : some data
const subscribePr = promiseSrc$.subscribe(val => console.log(val));
// subscribePr.unsubscribe();
/* TODO when observable is created from promise , how to unsubscribe after promise is done
 * In current case if I unsubscribe the subscription is terminated before promise is done ..
 */


// emit source array
let arraySource$ = from([{ name: 'Ruby' }, { name: 'Jha' }, 2, 3, 'many things']);
const subscribeArr = arraySource$.subscribe(val => console.log(val));
subscribeArr.unsubscribe();

//emit source collection
const map = new Map();
map.set(1, 'Mango');
map.set(2, 'pineapple');

//print key 1 value Mango key 2 value pineapple

let collSource$ = from(map);
const collSub1 = collSource$.subscribe((val: [number, string]) => {
    console.log('key', val[0]);
    console.log('value', val[1]);
});
collSub1.unsubscribe();
 //print [ 1, 'Mango' ] ,[ 2, 'pineapple' ]
const collSub2 = collSource$.subscribe(val => console.log(val));
collSub2.unsubscribe();

//emit string as a sequence
const strSource$ = from('Hello World');
//output: 'H','e','l','l','o',' ','W','o','r','l','d'
const subscribe = strSource$.subscribe(val => console.log(val));