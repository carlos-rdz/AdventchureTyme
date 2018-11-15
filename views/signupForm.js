
function signupForm(){

    return `
    <form action="/register" method="POST">
    <label> Name </label>
        <input type="text" name="name"  >
    <label> Phone Number </label>
        <input type="number" name="phonenumber"  >
    <label> Username </label>
        <input type="text" name="username"  >
    <label> Password </label>    
        <input type="password" name="password" >
        <br>
        <input type="submit">
    </form>
    `;
}

module.exports = signupForm;