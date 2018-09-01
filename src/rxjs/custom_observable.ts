/**
 * The class needs a create() method that takes a function as a parameter.
 * The create() method should return an Observable.
 * Furthermore, our Observable class needs a subscribe() method that takes a function as a parameter.
 */
export class MyObservable{
    //What do we know about the behaviourFn() that was passed into the create method?
    // We know it takes an Observer instance as a parameter and it also lays out what values the Observer instance should emit.
    private behaviourFn ;
    static create(behaviourFn) : MyObservable{
        return new MyObservable(behaviourFn);
    }

    constructor(behaviourFn){
       this.behaviourFn = behaviourFn;
    }

    /**
     * For anything to be able to capture those emitted values, we need to implement our last method, subscribe
     * subscribe() takes dataFn() as a parameter and needs to somehow invoke our behaviourFn when the subscribe() method is being invoked to trigger the behavior.
     * @param dataFn
     */
    subscribe(dataFn){
        let observer = new MyObserver(dataFn);
        this.behaviourFn(observer);
    }
}

/**
 * we need an Observer class so that we actually have something to pass to our behaviourFn().
 * Observer must be the one responsible for invoking dataFn() so it seems only reasonable that dataFn() is passed into the constructor of our Observer class for later use,
 *
 * By implementing this Observer class, we have done three things: one is to pass the dataFn() through the constructor
 * and make it into a field on the Observer class; another is to create a next() method on the Observer,
 * which had to be done as we learned that an Observer instance should call next() to generate values;
 * the third and final thing we did was to ensure that we invoked dataFn() inside of the next() method to be sure that
 * the subscriber is being told every time we generate a value by calling the next() method.
 */
class MyObserver{
    constructor(private dataFn){}

    next(val){
        this.dataFn(val);
    }
}

let stream$ = MyObservable.create(observer => observer.next(1));
stream$.subscribe(val => console.log(val));