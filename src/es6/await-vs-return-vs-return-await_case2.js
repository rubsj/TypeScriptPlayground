const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function waitOrRejectOrErr() {

    //wait a sec
    await sleep(1000);
    return new Promise((resolve, reject) => {

        let randomVal = Math.random() * 100;
        console.log('random val is :', randomVal);
        if (randomVal <= 50) {
            resolve('Hello Promises');
        } else if (randomVal > 50 && randomVal <= 90) {
            reject('In 40% of the cases, I am rejected!!');
        }

        throw Error('In 10% of the cases, I fail. Miserably.');

    });
}

//the returned promise will always fulfill with undefined, without waiting.
/**
 * Since we don't await or return the result of waitAndMaybeReject(), we don't react to it in any way. Code like this is usually a mistake.
 * The catch block is never called either leading to unhandled promise rejection warning
 */
async function justCallAsyncFunc() {
    try {
        waitOrRejectOrErr();
    } catch (e) {
        console.log('in the catch block of just call async func');
        return `Caught Error ${e}`;
    }
}

//the returned promise will always wait one second, then either fulfill with undefined, or fulfill with "caught"
/**
 * Because we await the result of waitAndMaybeReject(), its rejection will be turned into a throw, and our catch block will execute. However, if waitAndMaybeReject() fulfills, we don't do anything with the value.
 */
async function awaitAsyncFunc() {
    try {
        await waitOrRejectOrErr();
    } catch (e) {
        return `Caught Error ${e}`;
    }
}

//the returned promise will always wait one second, then either fulfill with "yay", or reject with Error('Boo!').
/**
 * By returning waitAndMaybeReject(), we're deferring to its result, so our catch block never runs.
 */
async function returnAsyncFunc() {
    try {
        return waitOrRejectOrErr();
    } catch (e) {
        return `Caught Error ${e}`;
    }
}

//the returned promise will always wait one second, then either fulfill with "yay", or fulfill with "caught".
/**
 * Because we await the result of waitAndMaybeReject(), its rejection will be turned into a throw, and our catch block will execute. If waitAndMaybeReject() fulfills, we return its result.
 */
async function returnAwaitAsyncFunc() {
    try {
        return await waitOrRejectOrErr();
    } catch (e) {
        console.log('in the catch of returnAwaitAsyncFunc');
        return `Caught Error ${e.toString()}`;
    }
}

//Outside of try/catch blocks, return await is redundant.
// ttps://github.com/eslint/eslint/blob/master/docs/rules/no-return-await.md
async function withoutTryCatchAsyncFunc() {
    return waitOrRejectOrErr();
}

/*
justCallAsyncFunc().then(v=>console.log(v , 'justCallAsyncFunc'))
                   .catch(v=>console.log(v.toString(), 'justCallAsyncFunc in catch of promise')); */


awaitAsyncFunc().then(v=> console.log(v , 'awaitAsyncFunc'))
                .catch(v=>console.log(v.toString(), 'awaitAsyncFunc in catch of promise'));
returnAsyncFunc().then(v =>console.log(v , 'returnAsyncFunc'))
                 .catch(v=>console.log(v.toString(), 'returnAsyncFunc in catch of promise'));





withoutTryCatchAsyncFunc().then(v =>console.log(v , 'withoutTryCatchAsyncFunc'))
                          .catch(v=>console.log(v.toString(), 'withoutTryCatchAsyncFunc in catch of promise'));


returnAwaitAsyncFunc().then(v => console.log(v, 'returnAwaitAsyncFunc'))
    .catch(v => console.log(v.toString(), 'returnAwaitAsyncFunc in catch of promise'));
