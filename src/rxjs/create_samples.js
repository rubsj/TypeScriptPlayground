"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
//sample 1
var Startup = /** @class */ (function () {
    function Startup() {
    }
    Startup.main = function () {
        var stream$ = rxjs_1.Observable.create(function (obs) { return obs.next(1); });
        stream$.subscribe(function (data) { return console.log('data', data); });
        return 0;
    };
    return Startup;
}());
Startup.main();
//sample 2
/*
 Create an observable that emits 'Hello' and 'World' on
 subscription.
 */
var hello = rxjs_1.Observable.create(function (observer) {
    observer.next('hello');
    observer.next('world !');
});
//output hello world!
var subscription = hello.subscribe(function (val) { return console.log(val); });
subscription.unsubscribe();
//call the subscription from within a function
function helloWorld() {
    console.log("hellow world called");
    hello.subscribe(function (val) { return console.log(val); });
}
helloWorld();
// Sample 3
/*
 Increment value every 1s, emit even numbers.
 */
var evenNumbers = rxjs_1.Observable.create(function (observer) {
    var val = 0;
    var interval = setInterval(function () {
        if (val % 2 === 0) {
            observer.next(val);
        }
        val++;
    }, 1000);
    //TODO find how this return is called and what is alternate way to call it..
    // what does this return do ..why its needed 
    return function () { clearInterval(interval); console.log("cleared the interval"); };
});
//output : 0...2...4...6...8
var evenNumSub = evenNumbers.subscribe(function (val) { return console.log(val); });
//unsubscrie afeter 20 sec
setTimeout(function () { evenNumSub.unsubscribe(); }, 20000);
