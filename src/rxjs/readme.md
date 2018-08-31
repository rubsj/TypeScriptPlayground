# RXJS Concepts
### References
- https://rxjs-dev.firebaseapp.com/api   (RX JS official documentation)
- https://github.com/ReactiveX/rxjs (RXJS source code)
- 

## Concepts

#### Observer pattern
The pattern has two key players involved: a Subject and an Observer. A Subject is observed by an Observer. Typically, a Subject holds an internal list of Observers that should be notified when a change happens on the Subject. It is quite common that the Subject is a model and the Observers are some kind of UI component.
In short, Subjects should be able to:
- Hold a list of Observers
- Add an Observer
- Remove an Observer
- Notify all Observers when a change happens
The Observer, on the other hand, should only hold one property, and that is an update() method that can be called by a Subject when an update has occurred.

#### Creation Operator
 ##### Create 
- **refer** - https://www.learnrxjs.io/operators/creation/create.html
- **signature** - public static create(onSubscription: function(observer: Observer): TeardownLogic): Observable
- **description** - Creates a new Observable, that will execute the specified function when an Observer subscribes to it.
- **Notes** -
  - Because Observable extends class which already has defined static `create` function, but with different type signature, it was impossible to assign proper signature to `Observable.create`. Because of that, it has very general type `Function` and thus function passed to create will not be type checked, unless you explicitly state what signature it should have.     
  - When using TypeScript it is recommended to declare type signature of function passed to `create` as `(observer: Observer) => TeardownLogic`, where `Observer` and `TeardownLogic` are interfaces provided by the library.  
  - TeardownLogic interface is of type  Unsubscribable | Function | void;
  
##### of
- Emits the arguments you provide, then completes.
- Unlike [`from`](#from), it does not do any flattening and emits each argument in whole as a separate `next` notification.

##### from
- **signature**: from(ish: ObservableInput, mapFn: function, thisArg: any, scheduler: Scheduler): Observable
- Turn an array, promise, or iterable into an observable.
- Converts almost anything to an Observable.
- :bulb: This operator can be used to convert a promise to an observable!   
- :bulb: For arrays and iterables, all contained values will be emitted as a sequence!
- :bulb: This operator can also be used to emit a string as a sequence of characters!

  




 




