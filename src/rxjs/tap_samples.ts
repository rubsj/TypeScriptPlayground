import { of } from 'rxjs';
import { filter, map, take, tap,  } from 'rxjs/operators';
import { interval } from 'rxjs';
import { merge } from 'rxjs';

let stream$ = of(1, 2, 3, 4, 5, 6, 7)
    .pipe(
       // tap(data => console.log(`initial data ${data}`)),
        filter(val => val % 2 === 0),
       // tap(val => console.log(`filtered data ${val}`)),
        map(val => Math.pow(val, 2)),
      //  tap(val => console.log(`mapped number ${val}`)),
    );


 stream$.subscribe(val => console.log(`subscribed value ${val}`));

let streamWithError$ = merge(interval(10).pipe(take(10)), of( '11' , '12' , '13' , 'errorVal'))
    .pipe(map((data : any) => {

        if(data==='errorVal'){
            throw new Error(`map threw error ${data}`);
        }

        return data*2;

    }),
        tap(data => console.log(`logged by tap ${data}`) , err => console.error(`error came and tap catched it ${err} `))

    );


streamWithError$.subscribe(val =>  console.log(`logged by subscriber ${val}`));
