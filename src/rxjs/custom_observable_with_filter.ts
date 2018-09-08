import { MyObservable, MyObserver } from './custom_observable';

export class MyObservableWithFilter extends MyObservable {
    constructor(private filterFn, behaviourFn) {
        super(behaviourFn);   //TODO what is the difference between private param and non private param in constructor
    }

    subscribe(dataFn) {
        let observer = new MyObserver(dataFn);
        observer.next = val => {
            //override next
            if (this.filterFn(val)) {
                dataFn(val);
            }
        };

        let cleanupFn = this.behaviourFn(observer);
        return {
            unsubscribe: cleanupFn,
        };
    }


}

let streamWithFilter$ = MyObservableWithFilter.create(observer => {
    let counter = 0;
    let id = setInterval(() => observer.next(counter++), 1000);
    return function cleanUp() {
        console.log('clearing the interval on call of unsubscribe');
        clearInterval(id);
    };
}).filter(val => val % 2 === 0);

const subscription = streamWithFilter$.subscribe(data => {

    console.log(`even numbers : ${data}`);

});

setTimeout(() => subscription.unsubscribe(), 25000);