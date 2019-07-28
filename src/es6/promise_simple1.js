const myPromise = new Promise((resolve , reject) =>{
    let randomVal = Math.random()*100;
    if(randomVal<=50){
        console.log('resolving the promise ...');
        resolve('Hello Promises');
    }else if(randomVal>50 && randomVal<=90){
        reject('In 40% of the cases, I am rejected!!');
    }

    throw new Error('In 10% of the cases, I fail. Miserably.');

});

myPromise.then(resolved=>console.log(resolved) , err=> console.log(err.toString())); //this is same as line below
myPromise.then(rsvl=>console.log("resolved 2" ,rsvl)).catch(err=> console.log("rejected 2: ",err.toString()));
// Two functions
var result="default val";
const onResolved = (resolvedValue) =>result =resolvedValue;
const onRejected = (error) => result =error.toString();

myPromise.then(onResolved).then(null , onRejected);

console.log("printing the value of result :" , result);

setTimeout(()=>console.log("printing the value of result in set timeout :" , result) , 400);