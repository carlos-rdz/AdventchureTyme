
function signupForm(){

    return `
    <div class"container">
    
    <form action="/signup" method="POST">
    
    <div class="row justify-content-start mb-4">
    <label class="col-3"> Name </label>
        <input class="col-3 mr-4" type="text" name="name" required>
    </div>
     <div class="row justify-content-start mb-4">
    <label class="col-3"> Phone Number </label>
        <input class="col-3 mr-4" type="text" name="phonenumber" pattern="[0-9]{10}" placeholder="10digits No spaces or hyphens" required>
        </div>
        <div class="row justify-content-start mb-4">
    <label class="col-3"> Username </label>
        <input class="col-3 mr-4" type="text" name="username" required>
        </div>
        <div class="row justify-content-start mb-4">
    <label class="col-3"> Password </label>    
        <input class="col-3 mr-4" type="password" name="password" minlength="12" placeholder="minlength 12" required>
        </div>
    <br>
        <input type="submit">
    
    </form>
    </div>
    `;
}

module.exports = signupForm;