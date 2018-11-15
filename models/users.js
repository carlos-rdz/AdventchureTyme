const db = require('./db');

class User {
    constructor(id,name) {
        this.id = id;
        this.name = name;
    }
// CREATE
    static createUser(name){
        return db.one(`insert into users
        (name)
        values
        ($1)
        returning id`,[name])
            .then(data => {
                return new User (data.id, name);
            })
}

// RETRIEVE
    static getUserById(id){
        return db.one(
        `select * from users where id=$1`,[id]
        )
        .then(data => {
            return new User (data.id,data.name)
        })
    }

    static getAllUsers(){
        return db.any(
            `select * from users`
        ).then(data => {
            let userArray = data.map(indUser => {
                return new User (indUser.id,indUser.name)
            })
        return userArray
        }) .then(console.log)
    }

// UPDATE




// DELETE





}

module.exports = User