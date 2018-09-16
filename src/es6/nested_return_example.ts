const testName = 'Ruby';
let greet = 'World !';   // this does not get used as the greet in returning function is a new variable
let baseReturn = (val) => {
  return (greet)=> {
      return `${val} ${greet} !!! ${testName} `;
    }
};

let firstFunCall =baseReturn('Hello');
console.log("firstFunCall" , firstFunCall);
console.log(firstFunCall('World'));
console.log(baseReturn('Namaste')('Dunia :)'));