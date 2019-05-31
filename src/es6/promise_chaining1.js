const delayedPromise = (ms) => new Promise((resolve, reject) => {
        let randomVal = Math.random() * 100;
        if (randomVal <= 50) {
            console.log('resolving the promise ...');
            setTimeout(() => resolve('Hello Promises'), ms);
        } else if (randomVal > 50 && randomVal <= 90) {
            setTimeout(() => reject('In 40% of the cases, I am rejected!!'), ms);
        }

        //  throw new Error('In 10% of the cases, I fail. Miserably.');
        console.log("this line will be called before promise resolves or rejects");
        return "Hello from promise"; //there is no handler for it
    }
);

const delay = (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
});

delayedPromise(1000).then(resolved => {
    console.log('Resolved after 5 seconds', resolved);
    return delay(2000);
}).then(() => console.log('Resolved after 2 seconds'))
    .catch(err => console.log('Rejected after 5 seconds', err))
    .then(() => {
        console.log('Done.');
    });
