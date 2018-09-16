import { MyObserver, MySubscription } from './custom_observable';

class MyObservableWithSubscription {
    constructor(private behaviourFn){
    }

    static create(behaviourFn) : MyObservableWithSubscription{
        return new MyObservableWithSubscription(behaviourFn);
    }

    /**
     * we save the result of calling this.behaviourFn() into a variable called cleanUpFn.
     *
     *  cleanUpFn() we defined in behaviourFn()
     *
     *  we expose the cleanUpFn() property by returning it as part of an object and assigning it to the unsubscribe() property.
     *  
     * @param dataFn
     * @returns {MySubscription}
     */
    subscribe(dataFn): MySubscription{
        let observer = new MyObserver(dataFn);
        let cleanUpFn= this.behaviourFn(observer);

        return {
            unsubscribe : cleanUpFn
        };
    }
}

let stream$ = MyObservableWithSubscription.create(observer => observer.next("hello subscription"));

stream$.subscribe(val => console.log(`print only the val : ${val}`));

let streamWithCleanup$ = MyObservableWithSubscription.create(observer => {
    let counter = 0;
    let id = setInterval(()=> observer.next(counter++) , 1000);
    return function cleanUp(){
        console.log("clearing the interval on call of unsubscribe");
        clearInterval(id);
    }
}) ;

const subscription = streamWithCleanup$.subscribe(data => {
    if(data%2===0){
        console.log(`even numbers : ${data}`);
    }
});

setTimeout( ()=> subscription.unsubscribe() , 25000);

