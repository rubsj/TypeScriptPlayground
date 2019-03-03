/*setTimeout(()=>{console.log("Hello")} , 1000);

const os = require('os');
os.cpus();
process.stdout.write(
    os.cpus().toString()
);

console.log(process);*/

//create node server
/*const http = require('http');

const listener = (req , resp)=>{
//read from request
    resp.write("Hello Node \n");
    resp.end();
};
const server = http.createServer(listener);
server.listen(3000);*/
//require takes two things ..path or module name
//require('http'); //its being passed module name
//require('./es6'); //its passing path

const m1 = require('./m1.js');

//console.log('m1' , m1);
m1();
