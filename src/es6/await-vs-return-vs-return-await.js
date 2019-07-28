//https://jakearchibald.com/2017/await-vs-return-vs-return-await/
async function waitAndMaybeReject() {
    //wait a sec
    await new Promise(resolve => setTimeout(resolve, 1000));
    //toss a coin
    const isHeads = Boolean(Math.round(Math.random()));
   // console.log('is Heads: ' , isHeads);
    if (isHeads) return `yay isHeads`;
    throw Error(`Boo !!`);
}

//the returned promise will always fulfill with undefined, without waiting.
/**
 * Since we don't await or return the result of waitAndMaybeReject(), we don't react to it in any way. Code like this is usually a mistake.
 * The catch block is never called either leading to unhandled promise rejection warning
 */
async function justCallAsyncFunc() {
    try {
        waitAndMaybeReject();
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
        await waitAndMaybeReject();
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
        return waitAndMaybeReject();
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
        return await waitAndMaybeReject();
    } catch (e) {
        console.log('in the catch of returnAwaitAsyncFunc');
        return `Caught Error ${e}`;
    }
}

//Outside of try/catch blocks, return await is redundant.
// https://github.com/eslint/eslint/blob/master/docs/rules/no-return-await.md
async function withoutTryCatchAsyncFunc() {
    return waitAndMaybeReject();
}

/*justCallAsyncFunc().then(v=>console.log(v , 'justCallAsyncFunc'))
                   .catch(v=>console.log(v.toString(), 'justCallAsyncFunc in catch of promise'));

awaitAsyncFunc().then(v=> console.log(v , 'awaitAsyncFunc'))
                .catch(v=>console.log(v.toString(), 'awaitAsyncFunc in catch of promise'));
returnAsyncFunc().then(v =>console.log(v , 'returnAsyncFunc'))
                 .catch(v=>console.log(v.toString(), 'returnAsyncFunc in catch of promise'));


withoutTryCatchAsyncFunc().then(v =>console.log(v , 'withoutTryCatchAsyncFunc'))
                          .catch(v=>console.log(v.toString(), 'withoutTryCatchAsyncFunc in catch of promise')); */

returnAwaitAsyncFunc().then(v =>console.log(v , 'returnAwaitAsyncFunc'))
    .catch(v=>console.log(v.toString(), 'returnAwaitAsyncFunc in catch of promise'));
