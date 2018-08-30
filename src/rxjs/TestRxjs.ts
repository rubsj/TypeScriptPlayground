import { interval } from "rxjs/internal/observable/interval";
import { from } from "rxjs/internal/observable/from";
import { map } from "rxjs/internal/operators/map";
import { mapTo } from "rxjs/internal/operators/mapTo";
import { take } from "rxjs/internal/operators/take";
import { delay } from "rxjs/internal/operators/delay";
import { mergeAll } from "rxjs/internal/operators/mergeAll";
import { merge } from "rxjs";
import { combineAll } from "rxjs/internal/operators/combineAll";
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import { of } from "rxjs/internal/observable/of";
import { Observable } from "rxjs/internal/Observable";

class InIt {
    public static main(): void {

//emit every 2.5 seconds
const first = interval(2500);
//emit every 2 seconds
const second = interval(2000);
//emit every 1.5 seconds
const third = interval(1500);
//emit every 1 second
const fourth = interval(1000);

//emit outputs from one observable
const example = merge(
  first.pipe(mapTo('FIRST!')),
  second.pipe(mapTo('SECOND!')),
  third.pipe(mapTo('THIRD')),
  fourth.pipe(mapTo('FOURTH'))
);
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
const subscribe = example.subscribe(val => console.log(val));
        
    }    
}

InIt.main();