//refer - http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/
// “John is running fast because he is trying to catch the train.”
var person = {
    firstName: "Penelope",
    lastName: "Barrymore",
    showFullName: function(){
        /**​// Notice we use "this" just as we used "he" in the example sentence earlier?:*/
         console.log(`${this.firstName}  ${this.lastName}`);
       /**  ​// We could have also written this */
     //   console.log(person.firstName + " " + person.lastName);
        /**If we use person.firstName and person.lastName, as in the last example, our code becomes ambiguous.
         *  Consider that there could be another global variable (that we might or might not be aware of) with the name “person.”
         *  Then, references to person.firstName could attempt to access the firstName property from the person global variable,
         *  and this could lead to difficult-to-debug errors.
         *  So we use the “this” keyword not only for aesthetics (i.e., as a referent),
         *  but also for precision; its use actually makes our code more unambiguous, just as the pronoun “he” made our sentence more clear.
         *  It tells us that we are referring to the specific John at the beginning of the sentence.*/
    },
};

// "this" inside the showFullName () method that is defined inside the person object still refers to the person object, hence:
person.showFullName(); // Penelope Barrymore

/**
 * The this keyword is most misunderstood when
 *  -> we borrow a method that uses this
 *     - it is fixed by using function call()/apply()
 *  -> when we assign a method that uses this, to a variable
 *     - We can fix this problem by specifically setting the this value with the bind method
 *  -> when a function that uses this is passed as a callback function
 *     - it is fixed by using function bind()
 *  -> when this is used inside a closure
 *     - To fix the problem with using this inside the anonymous function passed to the forEach method, we use a common practice in JavaScript and set the this value to another variable before we enter anonymous function
 */

// If we invoke showFullName with a different object:
var anotherPerson = {
    firstName   :"Rohit",
    lastName    :"Khan"
};
// We can use the apply method to set the "this" value explicitly—more on the apply () method later.
// "this" gets the value of whichever object invokes the "this" Function, hence:
person.showFullName.apply (anotherPerson); // Rohit Khan
/** So the context is now anotherPerson because anotherPerson invoked
 *  the person.showFullName ()  method by virtue of using the apply () method
 *  The takeaway is that the object that invokes the this Function is in context, and we can change the context
 *  by invoking the this Function with another object; then this new object is in context. */

//lost of context in inner anonymous function
var user = {
    tournament:"The Masters",
    data      :[
        {name:"T. Woods", age:37},
        {name:"P. Mickelson", age:43}
    ],
    clickHandler: function(){
        console.log('this' , this);
        let that=this;
        this.data.forEach(function(person){
            console.log('this inside for each', this);
            console.log (person.name + " is playing at " + that.tournament);
        })
    }
}
