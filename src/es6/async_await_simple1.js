async function demoGithubUser() {
    let name = prompt("Enter a name?", "iliakan");

   try {
        let user = await loadJson(`https://api.github.com/users/${name}`)
        alert(`Full name: ${user.name}.`);
        return user;
    }catch(err){
        if (err instanceof HttpError && err.response.status == 404) {
            alert("No such user, please reenter.");
            return demoGithubUser();
        } else {
            throw err;
        }
    }
}
