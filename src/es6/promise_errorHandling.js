const promiseThatResolves = () => new Promise((resolve) => {
    resolve();
});

// Leads to UnhandledPromiseRejection
promiseThatResolves().then(
    () => { throw new Error("throw error from resolve") },
    (err) => console.log("improper error handling",err),
);

// Proper error handling
promiseThatResolves()
    .then(() => {
        throw new Error("throwing error from resolve to handle properly");
    })
    .catch(err => console.log("proper error handling", err));