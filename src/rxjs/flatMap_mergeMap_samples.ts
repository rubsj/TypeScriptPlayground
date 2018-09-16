import { of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';

function example1(){    //mergeMap with observable
    const source$ = of('hello');
    //map to inner observable and flatten
    const example$ = source$.pipe(
        mergeMap((val)=> of(` ${val} World !`) )
    );

    example$.subscribe(val => console.log(val));
}

example1();

// example 2 mergeMap with promise
function example2(){
    const source$ = of('hello');
    const myPromise = val => new Promise(resolve => resolve(`${val} World from Promise`));
    source$.pipe(
        mergeMap(val => myPromise(val))
    ).subscribe(val => console.log(val));
}

example2();

//example 3
function example3(){
    const letters$ = of('a' , 'b' , 'c');
    const mergedOb$=  letters$.pipe(
        mergeMap(val => interval(1000).pipe(take(2), map(x=> x+val)))
    );

    mergedOb$.subscribe(val=> console.log(val));
}

example3();