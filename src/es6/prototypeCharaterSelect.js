// Initialize constructor functions
function Hero(name , level){
    this.name=name;
    this.level=level;
}

// Initialize Warrior constructor
function Warrior(name , level , weapon){
    Hero.call(this, name , level);   // Chain constructor with call
    this.weapon = weapon;  // Add a new property
}

// Initialize Healer constructor
function Healer(name, level, spell) {
    Hero.call(this, name, level);

    this.spell = spell;
}

//link prototypes and the prototype methods
Warrior.prototype = Object.create(Hero.prototype);
Healer.prototype = Object.create(Hero.prototype);

Hero.prototype.greet = function () {
    return `${this.name} says hello.`;
};

Warrior.prototype.attack = function () {
  return `${this.name} attacks with the ${this.weapon}.`;
};

Healer.prototype.heal = function(){
    return `${this.name} casts ${this.spell}.`;
};

// Initialize individual character instances
const hero1 = new Warrior('Bjorn', 1, 'axe');
const hero2 = new Healer('Kanin', 1, 'cure');
console.log(hero1.attack());
console.log(hero1.greet());
console.log(hero2.heal());
console.log(hero2.greet());