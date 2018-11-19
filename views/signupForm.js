
function signupForm(){

    return `
    <div class"container">
    
    <form action="/signup" method="POST">
    
    <div class="row ">
    <label class="col-sm"> Name </label>
        <input class="col-sm" type="text" name="name" required>
    </div>
     <div class="row">
    <label class="col-sm"> Phone Number </label>
        <input class="col-sm" type="tel" name="phonenumber" required>
        </div>
        <div class="row">
    <label class="col-sm"> Username </label>
        <input class="col-sm" type="text" name="username"  required>
        </div>
        <div class="row">
    <label class="col-sm"> Password </label>    
        <input class="col-sm" type="password" name="password" >
        </div>
    <br>
        <input type="submit">
    
    </form>
    </div>
    `;
}

module.exports = signupForm;