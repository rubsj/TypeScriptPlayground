##NODE
- node ..opens node terminal where you can write code..alternative to developer tool
  - this is called node REPL refer "https://medium.com/trabe/mastering-the-node-js-repl-part-1-156ca2ee886a"
- node -help - help commands
- tab  - code complete
- tab tab ...on empty REPL terminal will bring all available APIs
- node - will nopen node ruffle?
- console -> enter -> gives all methods in console
- console library is by node
- MAth library is from JS V8 any VM
- every Vm is call stack and heap ..has single thread
- setTimeout 
  - each browser has its own V8 implementation
  - Node implements settimeout
-Node is a wrapper around V8
- anything not available out of the box need require('grd') even if packed in node itself ..rubble does not need it but js file will need
- `process` object is essential in node ..can talk to OS/ environment 
- you can customize the node process 
- Environment var can be passed like `PORT=4000 node script.js`
  - it can be read then as `process.env.PORT`
- argument to program can be passed as `node script.js 4000`
  - it can be read as `argv[2]` each part is part of array
- `require` is an object and function
- node does not support `import` so we have to use require only
- `require` returns an object which is all the exported item from the path or module
- node wraps every imported file in a function so if there is a var inside one of the imported file the variable is not going to be accessible in the file that is importing it.
- `require` is synchronous
- even though require is sync it can be made to return function which is async
-`require` has caching and node will cache this module..so if you make it require again..if you do need it multiple time turn require into function
-circular dependency is ok in node 
- if the module is not internal then node will search for it in `node_modules`
- a node developer must know `expreses` expressjs.com ..it was the first webframework for node..
- trick to see high level function in express  `console..dir(express , {depth : 0})` 
- alternatives to express are koa/sails

#### NOde references
- 'https://hackernoon.com/import-export-default-require-commandjs-javascript-nodejs-es6-vs-cheatsheet-different-tutorial-example-5a321738b50f'

### Node REPL
-  REPL stands for Read-Eval-Print-Loop and that is basically what it does: It reads an input, evaluates it, prints the result and starts the process again.
-  The common way of starting the Node.js REPL is invoking the node command with no arguments. 
-  The prompt will change and you can start typing. 
-  Node expects you to type an expression and will print the result of that expression
- The Node.js REPL also loads all the standard libraries in the global context so they are available to you
- The node REPL autocompletes commands when you hit the <tab> key. Unfortunately this does not work with expressions
- In the Node.js REPL you can reference the last value using the underscore character _
- There are some special commands that you can send to the REPL. These commands start with a dot
  - The .exit command finishes the REPL session. It’s the same thing as typing ctrl-d
  - .save allows you to save your current REPL session. The output file is a list of every expression you’ve run in that session :  .save mySession
  - we can load the session back into the REPL with the .load command : .load mySession
  - .editor command is quite useful to type multi-line content, even though I haven’t found yet a way to navigate up and down the lines. Press ^D to finish multi-line editing and ^C to cancel editing.
  - To get a list with he available commands you can use the .help command
  - .break & .clear - Break & Clear command can be used to terminate & come out of a multi line session.
  -



# Generic Javascript ES6 concepts

#### Descrturing
- case 1

#### Spreading
- when ...var is spread the value in it is spread
- when ...{obj} is spread the object is spread out
- spreading ...({}) is same as ...{}

#### Object specific
- {abc} is same as {abc: abc} 

#### Promise
- Promises are asynchronus. If there are two promises in a call both can get executed in mixed order
- if promises are chained it stops execution at the first promise that is rejected else will execute all promises in chain

#### Prototype inhenritance
- refer 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain'
- refer 'https://hackernoon.com/understanding-javascript-prototype-and-inheritance-d55a9a23bde2'
- refer 'https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript'
- prototype is an internal property, and cannot be accessed directly in code.
- Objects that you create have a [[Prototype]], as do built-in objects, such as Date and Array. A reference can be made to this internal property from one object to another via the prototype property, as we will see later in this tutorial.
- all JavaScript objects have a hidden, internal [[Prototype]] property (which may be exposed through `__proto__` in some browsers). Objects can be extended and will inherit the properties and methods on [[Prototype]] of their constructor.
- These prototypes can be chained, and each additional object will inherit everything throughout the chain. The chain ends with the Object.prototype.
- Constructor functions are functions that are used to construct new objects.
- To begin, a constructor function is just a regular function. It becomes a constructor when it is called on by an instance with the new keyword. In JavaScript, we capitalize the first letter of a constructor function by convention.
- Prototype properties and methods are not automatically linked when you use call() to chain constructors. We will use Object.create() to link the prototypes, making sure to put it before any additional methods are created and added to the prototype.
- Following the ECMAScript standard, the notation someObject.[[Prototype]] is used to designate the prototype of someObject. 
- *Since ECMAScript 2015, the [[Prototype]] is accessed using the accessors Object.getPrototypeOf() and Object.setPrototypeOf().* This is equivalent to the JavaScript property __proto__ which is non-standard but de-facto implemented by many browsers.
- It should not be confused with the `func.prototype` property of functions, which instead specifies the [[Prototype]] to be assigned to all instances of objects created by the given function when used as a constructor. 
- The Object.prototype property represents the Object prototype object.

#### This keyword
- The value of `this` is usually determined by a functions execution context.
- In the global scope, `this` refers to the global object (the window object if executed in browser).
- When the `new` keyword is used(a constructor), `this` is bound to the new object being created.
- We can set the value of `this` explicitly with `call()`, `bind()`, and `apply()`
  - `Call` takes any number of parameters: `this`, followed by the additional arguments. 
  - `Apply` takes only two parameters: `this`, followed by an array of the additional arguments.
  - The parameters in `bind()` are identical to `call()` but `bind()` is not invoked immediately. 
  - Instead, `bind()` returns a function with the context of `this` bound already.
  - Because of this, `bind(`) is useful when we don’t know all of our arguments up front.
- Arrow Functions don’t bind `this` — instead `this` is bound lexically (i.e. based on the original context)

##### this concepts
- When a function is called as a method of an object, this is set to the object the method is called on.
- The same principle applies when invoking a function with the new operator to create an instance of an object. When invoked in this manner, the value of this within the scope of the function will be set to the newly created instance.
- When called as an unbound function, this will default to the global context or window object in the browser.
- if the function is executed in strict mode, the context will default to undefined.


##### Context vs. Scope
-Every function invocation has both a scope and a context associated with it. 
-Fundamentally, scope is function-based while context is object-based.
- In other words, scope pertains to the variable access of a function when it is invoked and is unique to each invocation.
- Context is always the value of the this keyword which is a reference to the object that “owns” the currently executing code.
- This is where confusion often sets in, the term “execution context” is actually for all intents and purposes referring more to scope and not context as previously discussed. 
- An execution context can be divided into a creation and execution phase. In the creation phase, the interpreter will first create a _variable object_ (also called an activation object) that is composed of all the variables, function declarations, and arguments defined inside the execution context. From there the _scope chain_ is initialized next, and the value of `this` is determined last. Then in the execution phase, code is interpreted and executed.
##### The Scope Chain
- For each execution context there is a scope chain coupled with it. The scope chain contains the variable object for every execution context in the execution stack. It is used for determining variable access and identifier resolution. For example:
```
function first() {
    second();
    function second() {
        third();
        function third() {
            fourth();
            function fourth() {
                // do something
            }
        }
    }   
}
first();
```
- Running the preceding code will result in the nested functions being executed all the way down to the fourth function. At this point the scope chain would be, from top to bottom: fourth, third, second, first, global. The fourth function would have access to global variables and any variables defined within the first, second, and third functions as well as the functions themselves.
- Name conflicts amongst variables between different execution contexts are resolved by climbing up the scope chain, moving locally to globally. This means that local variables with the same name as variables higher up the scope chain take precedence.

##### Closures
- Accessing variables outside of the immediate lexical scope creates a closure. 
- In other words, a closure is formed when a nested function is defined inside of another function, allowing access to the outer functions variables. 
- Returning the nested function allows you to maintain access to the local variables, arguments, and inner function declarations of its outer function. 
- 


