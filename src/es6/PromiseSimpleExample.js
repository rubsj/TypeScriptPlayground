/**
 * I’ve named it PromiseSimple so it won’t clash with the native Promise in case you want to copy and paste it into your Chrome console.
 * Our promise implementation has a constructor,
 * 2 public methods that you may be familiar with then() and catch(), and 2 internal methods _onResolve() and _onReject().
 *
 * When you create a promise, you do so like this new Promise((resolve, reject) => {....}).
 You pass it a callback function which I’ve named executionFunction in the constructor.
 The execution function takes a resolve and reject which map to the internal _onResolve() and _onReject() function.
 These are the functions that will be called when the fetch calls the resolve or reject.

 The constructor also creates a promiseChain array and handleError function.
 When a series of .then(() => {}) are added, it pushes each function onto the promiseChain.
 When a user calls catch(() => {}), it assigns the function to the internal handleError.
 Notice that the then() and catch() function return this;. This allows you to chain multiple then()’s since you’re returning the object itself.
 */
class PromiseSimple {
    constructor(executionFunction) {
        this.promiseChain = [];
        this.handleError = () => {
        };

        this._onResolve = this._onResolve.bind(this);
        this._onReject = this._onReject.bind(this);
        executionFunction(this._onResolve, this._onReject);
    }

    then(onResolve) {
        this.promiseChain.push(onResolve);
        return this;
    }

    catch(handleError) {
        this.handleError = handleError;
        return this;
    }

    _onResolve(value) {
        let storedValue = value;
        try {
            this.promiseChain.forEach((nextFunc) => {
                storedValue = nextFunc(storedValue);
            });
        } catch (error) {
            this.promiseChain = [];
            this._onReject(error);
        }
    }

    _onReject(error) {
        this.handleError(error);
    }
}

fakeApiBackend = () => {
    const user = {
        username: 'treyhuffine',
        favoriteNumber: 42,
        profile: 'https://gitconnected.com/treyhuffine'
    };
    // Introduce a randomizer to simulate the
    // the probability of encountering an error
    if (Math.random() > .5) {
        return {
            data: user,
            statusCode: 200,
        };
    } else {
        return {
            statusCode: 404,
            message: 'Could not find user',
            error: 'Not Found',
        };

    }

};

// Assume this is your AJAX library. Almost all newer
// ones return a Promise Object
const makeApiCall = () => {
    return new PromiseSimple((resolve, reject) => {
        // Use a timeout to simulate the network delay waiting for the response.
        // This is THE reason you use a promise. It waits for the API to respond
        // and after received, it executes code in the `then()` blocks in order.
        // If it executed is immediately, there would be no data.
        setTimeout(() => {
            const apiResponse = fakeApiBackend();
            if (apiResponse.statusCode >= 400) {
                reject(apiResponse);
            } else {
                resolve(apiResponse.data);
            }
        }, 600);
    });
};

makeApiCall().then((user) => {
    console.log('In the first .then()');
    return user;
}).then(user => {
    console.log(`User ${user.username}'s favorite number is ${user.favoriteNumber}`);
    return user;
}).then((user) => {
    console.log('The previous .then() told you the favoriteNumber')
    return user.profile;
}).then((profile) => {
    console.log(`The profile URL is ${profile}`);
}).then(() => {
    console.log('This is the last then()');
}).catch((error) => {
    console.log(error.message);
});
