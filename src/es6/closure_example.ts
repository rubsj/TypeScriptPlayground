//basic closure example returning primitive

function basicClosureRetuningPrimitive() {
    function outer(){
        let counter = 0;
        function incrementCounter(){
            return  counter++;
        }

        return incrementCounter;
    }

    const myNewFunction = outer();
    console.log("myNewFunction", myNewFunction);
    let updatedCounter = myNewFunction();
    console.log("updatedCounter1 val :" , updatedCounter );
    updatedCounter = myNewFunction();
    console.log("updatedCounter2 val :" , updatedCounter);
    updatedCounter = myNewFunction();
    console.log("updatedCounter3 val :" , updatedCounter);
}

//basicClosureRetuningPrimitive();

function basicClosureRetuningObject() {
    function outer(){
        let counter = 0;
        function incrementCounter(val){
            return {count: counter++ , passedVal : val} ;
        }

        return incrementCounter;
    }

    const myNewFunction = outer();
    console.log("myNewFunction", myNewFunction);
    let updatedCounter = myNewFunction('abc');
    console.log("updatedCounter1 val :" , updatedCounter );
    updatedCounter = myNewFunction({hello : 'hello'});
    console.log("updatedCounter2 val :" , updatedCounter);
    updatedCounter = myNewFunction(4);
    console.log("updatedCounter3 val :" , updatedCounter);
}
//basicClosureRetuningObject();

function basicClosureRetuningFuncInObj(){
    function outer(){
        let counter = 0;
        function incrementCounter(){
           let counter1 = 5;            //this is always new value to the returned function if incrementCounter is returned but will reuse val if incrementCounter() is returned
            return ()=> {
                console.log("counter :" , counter);
                console.log("counter1 : " , counter1);
                return counter++ + counter1++} ;
        }
        let counter1 = 20;
        function incrementSavedCounter(){
            let counter1 = 10;
            return () => counter1++;
        }
        let counter2 = 100;
        function incrementSavedFuncCounter(){

            function savedCounterFunc() {

              return  counter2++;
            }
            return savedCounterFunc;
        }
         //when  incrementCounter is returned the call to incrementCounter will return new function call everytime
        // when  incrementCounterCalled is returned the call to incrementCounterCalled will return the existing function call
        // it does not matter how function definition is created when returning the function  incrementCounter , incrementSavedCounter and incrementSavedFuncCounter behave the same
        return {incrementCounter : incrementCounter , incrementCounterCalled:incrementCounter(), incrementSavedCounter :incrementSavedCounter , incrementSavedFuncCounter :incrementSavedFuncCounter} ;
    }

    const myNewFunction = outer();
    let updatedCounter  = myNewFunction.incrementCounter();
    console.log("updatedCounter1 val :" , updatedCounter, updatedCounter() );
    updatedCounter = myNewFunction.incrementCounter();
    console.log("updatedCounter2 val :" , updatedCounter, updatedCounter() );
    updatedCounter = myNewFunction.incrementCounter();
    console.log("updatedCounter3 val :" , updatedCounter, updatedCounter() );
    updatedCounter = myNewFunction.incrementSavedCounter();
    console.log("updatedCounter3 val :" , updatedCounter, updatedCounter() );
    updatedCounter = myNewFunction.incrementSavedCounter();
    console.log("updatedCounter3 val :" , updatedCounter, updatedCounter() );
    updatedCounter = myNewFunction.incrementSavedFuncCounter();
    console.log("updatedCounter3 val :" , updatedCounter, updatedCounter() );
    updatedCounter = myNewFunction.incrementSavedFuncCounter();
    console.log("updatedCounter3 val :" , updatedCounter, updatedCounter() );
    let calledFunc = myNewFunction.incrementCounterCalled();
    console.log("calledFunc" , calledFunc);
    calledFunc = myNewFunction.incrementCounterCalled();
    console.log("calledFunc 2" , calledFunc);
    calledFunc = myNewFunction.incrementCounterCalled();
    console.log("calledFunc 3" , calledFunc);

}

basicClosureRetuningFuncInObj();
