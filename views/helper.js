function loginOrRegister(){

    return `<div> <a href ="/login">Login</a> | <a href ="/signup">SignUp</a> </div>`
    
    
    
    
    
}

function logoutButton(){

    return `<div>
    <form action="/logout" method="POST">
    <input type="submit" value="logout">
    </div>`
}
module.exports = 
{
logoutButton,
loginOrRegister
}