import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

//sample 1
class Startup {
    public static main(): number {
        let stream$ = Observable.create((obs: any) => obs.next(1));
        stream$.subscribe((data: any) => console.log('data', data));
        return 0;
    }
}

Startup.main();

//sample 2
/*
 Create an observable that emits 'Hello' and 'World' on
 subscription.
 */
const hello = Observable.create(observer =>{
    observer.next('hello');
    observer.next('world !');
});

//output hello world!
const subscription = hello.subscribe(val => console.log(val));
subscription.unsubscribe();

//call the subscription from within a function
 function helloWorld(){
    console.log("hellow world called");
    hello.subscribe(val => console.log(val));
}

helloWorld();

// Sample 3
/*
 Increment value every 1s, emit even numbers.
 */

const evenNumbers = Observable.create(observer => {
    let val = 0;
    const interval = setInterval(() => {
        if (val % 2 === 0) {
            observer.next(val);
        }
        val++;
    }, 1000);

    //TODO find how this return is called and what is alternate way to call it..
    // what does this return do ..why its needed 
    return () => { clearInterval(interval); console.log("cleared the interval");};
});

//output : 0...2...4...6...8
const evenNumSub = evenNumbers.subscribe(val => console.log(val));

//unsubscrie afeter 20 sec
setTimeout( ()=>{evenNumSub.unsubscribe()} , 20000);



