//referred https://scotch.io/tutorials/javascript-promises-for-dummies
//using es6 approach where .then.catch is used
function promiseForDummies() {
    let randomVal = Math.trunc(Math.random() * 10);
    console.log("randomVal ", randomVal);
    let isMomHappy = randomVal % 2 === 0;
    console.log("isMomHappy", isMomHappy);
    let willGetPhone = new Promise((resolve, reject) => {
        if (isMomHappy) {
            let phone = {
                brand: 'Samsung',
                color: 'black'
            };
            console.log("in if of willget phone promise");
            resolve(phone);
        } else {
            console.log("in else of willgretpromise promise");
            let reason = new Error('Mom is unhappy');
            reject(reason);
        }
    });
    let showOff = (phone) => {
        return new Promise((resolve, reject) => {
            const randomForShowOff = Math.trunc(Math.random() * 10) % 2 === 0;
            console.log("randomForShowOff", randomForShowOff);    //randomising if otherwise if was checking only phone then it was never reaching else case
            if (randomForShowOff && phone) {
                console.log("in if of show off promise");
                resolve(`Hey I got new ${phone.brand} phone of color ${phone.color} `);
            } else {
                console.log("in else of show off promise");
                reject(new Error('I am so disappointed :('));
            }

        });
    };

    let askMom = () => {
        console.log('before asking Mom');
        willGetPhone
            .then(showOff) //promise chaining
            .then(fulfilled => console.log(fulfilled))
            .catch(notFullFilled => console.log(notFullFilled.message));

        console.log('after asking mom');
    };

    askMom();
}

//promiseForDummies();

// this one is using sync-await instead of then catch
function promiseForDummiesWithAsync(){
    let randomVal =Math.trunc(Math.random() * 10);
    console.log("randomVal " , randomVal);
    let isMomHappy=randomVal % 2 === 0;
    console.log("isMomHappy" , isMomHappy);
    let willGetPhone = new Promise((resolve, reject) => {
        if (isMomHappy) {
            let phone = {
                brand: 'Samsung',
                color: 'black'
            };
            console.log("in if of willget phone promise");
            resolve(phone);
        } else {
            console.log("in else of willgretpromise promise");
            let reason = new Error('Mom is unhappy');
            reject(reason);
        }
    });

    // 2nd promise
   async function showOff (phone) {
        return new Promise((resolve, reject) => {
            const randomForShowOff = Math.trunc(Math.random() * 10) % 2 === 0;
            console.log("randomForShowOff", randomForShowOff);    //randomising if otherwise if was checking only phone then it was never reaching else case
            if (randomForShowOff && phone) {
                console.log("in if of show off promise");
                resolve(`Hey I got new ${phone.brand} phone of color ${phone.color} `);
            } else {
                console.log("in else of show off promise");
                reject(new Error('I am so disappointed :('));
            }

        });
    }

   //call our promise

   async function askMom(){
       try{
           console.log('before asking Mom');
           let phone =  await willGetPhone;
           let message = await showOff(phone);
           console.log(message);
           console.log('after asking mom');
       }catch (error){
           console.log(error.message);
       }
   }

    (async ()=>{
        await askMom();
    })();
    

}

promiseForDummiesWithAsync();

