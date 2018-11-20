function adventureToItem(adventureObject){
    return `
    <div class="row justify-content-start top-buffer mb-4">
    <div class="col-sm">${adventureObject.name}</div>
    <form action="/profile" method="POST">
    <input type="submit" value="Add Adventure!">
    <input type="hidden" name="adventureId" value=${adventureObject.id}>
    </form>
    </div>
    `
    // <div> <a href ="/profile/:id([0-9]+)">Add</a> </div>
    
    // should redirect to session id profile
}


function adventureList(arrayOfAdventures){
    
    const adventureItems = arrayOfAdventures.map(adventureToItem).join('');
    


    return `
        <div class="container">
        
        ${adventureItems}
        
        </div> 
    `
}


module.exports = adventureList