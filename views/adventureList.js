function adventureToItem(adventureObject){
    return `
    <li>${adventureObject.name}</li>`
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