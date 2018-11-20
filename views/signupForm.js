
function signupForm(){

    return `
    <div class"container">
    
    <form action="/signup" method="POST">
    
    <div class="row justify-content-start mb-4">
    <label class="col-3"> Name </label>
        <input class="col-3 mr-4" type="text" name="name" >
    </div>
     <div class="row justify-content-start mb-4">
    <label class="col-3"> Phone Number </label>
        <input class="col-3 mr-4" type="text" name="phonenumber" >
        </div>
        <div class="row justify-content-start mb-4">
    <label class="col-3"> Username </label>
        <input class="col-3 mr-4" type="text" name="username" >
        </div>
        <div class="row justify-content-start mb-4">
    <label class="col-3"> Password </label>    
        <input class="col-3 mr-4" type="password" name="password" >
        </div>
    <br>
        <input type="submit">
    
    </form>
    </div>
    `;
}

module.exports = signupForm;