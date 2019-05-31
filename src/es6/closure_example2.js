//https://www.pluralsight.com/guides/javascript-callbacks-variable-scope-problem
let arr = [];
//problematic for loop
for(var i=0; i<5; i++){
    let delay =200;
    setTimeout(function(){
        arr[i]={};
        arr[i].something=i;
        console.log('inside set timeout error loop',i, arr);
    } , delay*i);
    console.log('inside for error loop',i, arr);
}

//for loop with fix using approach 1

let arr2 = [];
for(var j=0; j<5; j++){
    let delay =300;
    setTimeout(callbackClosure(j , function(){
        arr2[j]={};
        arr2[j].something=j;
        console.log('inside set timeout solution1 loop',j, arr2);
    }), delay*j);
   console.log('inside for solution 1 loop',j, arr2);
}

/*
* The callbackClosure function returns a function that invokes the actual callback with an explicit copy of i as an argument.
* Since each function declares it's own scope, and i has a base atomic type (int) it is not passed as a reference,
* but rather as a copy (unlike objects) which ensures that the actual callback will be executed against the correct value.
*/
function callbackClosure(i , callback){
    return function(){
        return callback(i);
    }
}


//for loop with fix using approach 2
/*
 (function() {
  // Something declared here will only be available to the function below.
  // Code here is executed only once upon the creation of the inner function
  return function(callbackArguments) {
    // Actual callback here
  };
})(); // The last brackets execute the outer function

Note that the outer function is only used for encapsulating the inner function, and creating a separate variable scope for the inner function.
Also, the outer function returns a value of type Function which is the exact type a callback should be.
So, applying this to the previous example we arrive here:

* */
let arr3 = [];
let count = 0, length = arr3.length;
for(var k=0; k<5; k++){
    let delay =400;
    setTimeout((function(){
        let x =k; // x is a copy of k only available to the scope of the inner function
        return function(){
            arr3[x]={};
            arr3[x].something=x;
            console.log('inside set timeout solution2 loop',k ,x, arr3);
            ++count;
            if( count === length ) {
                // Code executed only after all the processing tasks have been completed
                console.log('inside for solution 2 loop',k, arr3);
            }
        }
    })(), delay*k);

}

// ES6 solution approach replace var with let and no need of separate scope creation
let arr4 = [];
//problematic for loop
for(let l=0; l<5; l++){
    let delay =200;
    setTimeout(function(){
        arr4[l]={};
        arr4[l].something=l;
        console.log('inside set timeout solution3 loop',l, arr4);
    } , delay*l);
    console.log('inside for solution3 loop',l, arr4);
}