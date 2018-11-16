function adventureToItem(adventureObject){
    return `
    <li>${adventureObject.name}</li>
    <form action="/test" method="POST">
    <input type="submit">
    </form>
    
    `
    // <div> <a href ="/profile/:id([0-9]+)">Add</a> </div>
    
    // should redirect to session id profile
}


function adventureList(arrayOfAdventures){
    
    const adventureItems = arrayOfAdventures.map(adventureToItem).join('');
    


    return `
        <ul>${adventureItems}</ul> 
    `
}


module.exports = adventureList