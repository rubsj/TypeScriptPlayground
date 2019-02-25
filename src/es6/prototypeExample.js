function Animal(name){
    this.name=name;
}

Animal.prototype.sleep= function(){
    console.log(` ${this.name} : Zzz`);
};

Animal.prototype.type='animal';

function Dog(name){
    this.name = name;
}

Dog.prototype = Object.create(new Animal());
Dog.prototype.makeSound = function(){
    console.log(`${this.name} says : Woof Woof and its type is ${this.type}`);
};

let dog = new Dog('tony');
dog.makeSound();
dog.sleep();
console.log(Object.getPrototypeOf(dog));

let cat = new Animal('kitty');
cat.type='cat';
cat.sleep();
console.log(Object.getPrototypeOf(cat));
cat.makeSound();