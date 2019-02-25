//this is determined by how a function is invoked. As you can see, all the above functions have been called in a global context.
var c = 20;

function gx2 () {
    return this;
}

function fx2 () {
    return c;
}

console.log(gx2() === this); // => True
console.log(fx2());  // => 20

//********************************************************
//When a function is called as a method of an object, this is set to the object the method is called on.
var o = {
    prop: 37,
    f: function() {
        return this.prop;
    }
};

console.log(o.f()); // => 37
//**********************************************************
function fx1 () {
    return this;
}

var obj3 = {
    method: function () {
        return this;
    }
};

var x_obj = {
    y_obj: {
        method: function () {
            return this;
        }
    }
};

console.log(fx1() === this); // => True ..We are still in a global context.
console.log(obj3.method() === this); // => False ..Function is called as a method of an object.
console.log(obj3.method() === obj3); // => True ..Function is called as a method of an object.
console.log(x_obj.y_obj.method() === x_obj); // => False ... Function is called as a method of object y_obj, so this is its context.

//**********************************************************
//In strict mode, rules are different. Context remains as whatever it was set to. In this particular example, this was not defined, so it’s remained undefined.
function f2 () {
    'use strict';
    return this;
}

console.log(f2() === undefined); // => True

//**********************************************************************
//the function is called as a method of an object, no matter how it was defined.
function fx () {
    return this;
}

var obj2 = {
    method: fx
};

console.log(obj2.method() === this); // => False
console.log(obj2.method() === obj2); // => True

//********************************************************
//this is dynamic, meaning it can change from one object to another
var obj1 = {
    method: function () {
        return this;
    }
};

var sec_obj1 = {
    method: obj1.method
};
console.log(sec_obj1.method() === obj1); // => False
console.log(sec_obj1.method() === sec_obj1); // => True

//**********************************************************
//We can call fruit by this and by object name.
var shop = {
    fruit: "Apple",
    sellMe: function() {
        console.log("this ", this.fruit); // => this Apple
        console.log("shop ", shop.fruit); // => shop Apple
    }
};

shop.sellMe();

//************************************************************
//new operator creates an instance of an object. Context of the function will be set to the created instance of an object.
var Foo = function () {
    this.bar = "baz";
};
var foo1 = new Foo();
console.log(foo1.bar); // => baz
console.log({}.bar); // => undefined


//**************************************************************************
//Call, apply, bind
var bar = "xo xo";
var foo = {
    bar: "lorem ipsum"
};

function testBar() {
    return this.bar ? this.bar : bar;
}

/*console.log(testBar()); // => xo xo
console.log(testBar.call(foo));  // => lorem ipsum
console.log(testBar.apply(foo)); // => lorem ipsum*/
const boundless = testBar();
const boundOne = testBar.bind({bar: "it's been bound!"});
const boundTwo = testBar.bind(foo);
console.log(testBar()); // => xo xo             We called test in a global context.
console.log(boundless); // => xo xo             Again, the global context
console.log(testBar.call(foo));  // => lorem ipsum       By using call, we call the test in context of foo.
console.log(testBar.apply(foo)); // => lorem ipsum       By using apply, we call the test in context of foo.
console.log(boundOne()); // => it's been bound!  By using bind above, we permanently set this to be the object sent in, with the value of property bar changed.
console.log(boundTwo()); // => lorem ipsum       The context of foo again


//*********************************************************************
//The bind method permanently sets the context to the provided value.
// After using bind, this is immutable, even by invoking call, apply or bind.
var b = 5;

function test() {
    return this.b;
}

var bound = test.bind({x: 10});

console.log(bound());  // => undefined
console.log(bound.call(this)); // => undefined

var sec_bound = test.bind({b: 15});
console.log(sec_bound()); // => 15

//********************************************************************
//scope in arrow and regular function
//When we use arrow functions, this retains the value of the enclosing lexical context.
var obj = {method: () => this};
var sec_obj = {
    method: function () {
        return this;
    }
};

console.log(obj.method() === obj); // => False
console.log(obj.method() === this); // => True
console.log(sec_obj.method() === sec_obj); // => True


//****************************************************
//scope in arrow and regular function
var a = "global";

var obj = {
    method: function () {
        return {
            a: "inside method",
            normal: function () {
                return this.a;
            },
            arrowFunction: () => this.a
        };
    },
    a: "inside obj"
};

console.log(obj.method().normal());  // => inside method
console.log(obj.method().arrowFunction()); // => inside obj

//*****************************************************