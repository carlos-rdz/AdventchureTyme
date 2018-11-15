function adventureToItem(adventureObject){
    return `
    <li>${adventureObject.name}</li>
    `
}


function adventureList(arrayOfAdventures){
    
    const adventureItems = arrayOfAdventures.map(adventureToItem).join('');
    


    return `
        <ul>${adventureItems}</ul>
    `
}


module.exports = adventureList