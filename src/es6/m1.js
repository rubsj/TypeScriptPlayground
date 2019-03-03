const fs = require('fs');
console.log("in m1 file");
fs.readFile(__filename, 'utf8', (err , data)=>{
    console.log(data.length);
});

module.exports = ()=>{
    console.log("I am a function now");
};  //default exports is a function to change it from obj to array