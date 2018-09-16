let myPhone = {
    name: 'Samsung',
    getName: function () {
        console.log(this.name);
        return `my phone's name is ${this.name}`
    },
};

//console.log(myPhone , "execute get name", myPhone.getName());

let myPhoneFunc = () => {
     let name= 'Samsung';
     let nameStr = function getName() {
        console.log(this.name);
        return `my phone's name is ${name}`;
    };
    return nameStr ;
};
console.log(myPhoneFunc());
let returnedFunc =  myPhoneFunc();
console.log(returnedFunc());