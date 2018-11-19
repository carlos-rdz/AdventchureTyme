function adventureToItem(adventureObject){
    return `
    <div class="row justify-content-start">
    <div class="col-sm">
    ${adventureObject.name}
    </div>
    <form action="/start" method="POST">
    <input type="submit" value="Start!">
    <input type="hidden" name="adventureObject" value=${adventureObject.id}>
    </form>
    </div>

  
    `

    // can i send the adventure id here???

    // <div> <a href ="/profile/:id([0-9]+)">Add</a> </div>
    
    // should redirect to session id profile
}


function userAdventureList(arrayOfAdventures){
    
    const adventureItems = arrayOfAdventures.map(adventureToItem).join('');
    


    return `

    <div class="container">
        ${adventureItems}
    </div>
    `
}


module.exports = userAdventureList