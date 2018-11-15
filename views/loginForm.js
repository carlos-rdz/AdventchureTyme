function loginForm(){

    return `
    <form action="/login" method="POST">
    <label> Username </label>
        <input type="text" name="username"  >
    <label> Password </label>    
        <input type="password" name="password" >
        <br>
        <input type="submit">
    </form>
    `;
}

module.exports = loginForm;