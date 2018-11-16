function logoutButton(){

    return `
    <div class="text-white>
        <form action="/logout" method="POST">
            <input type="submit" value="logout">
        </form>
    </div>
    `;
}
function loginOrRegister(){

    return `
    <div>
        <a class="text-white" href ="/login">Login </a> 
        | 
        <a class="text-white" href ="/signup">SignUp</a> 
    </div>
    `;
}

module.exports = 
{
    logoutButton,
    loginOrRegister
}