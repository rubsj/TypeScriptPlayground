function Student (name, age) {
    this.name = name;
    this.age = age;
}

Student.prototype.toString = function toString () {
    return this.name + " is " + this.age + " years old.";
};

var me = new Student("Joshua", 26);
console.log(me.toString());

var Laws = {
    drinking_age : function (age, fn) {
        fn(age > 21);
    }
};

Student.prototype.check_drinking = function check_drinking (fn) {
    Laws.drinking_age(this.age, function (able_to_drink) {
        if (able_to_drink) {
            fn(null, true);
        } else {
            fn(this.age + " does not meet the minimum drinking age.", false);
        }
    });
};

console.log(me.check_drinking(()=>{return }));
