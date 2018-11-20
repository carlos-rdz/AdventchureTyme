const db = require('./db');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
    constructor(id,name,phonenumber,username,phash) {
        this.id = id;
        this.name = name;
        this.phonenumber = phonenumber;
        this.username = username;
        this.phash = phash;
    }
// CREATE
    static createUser(name,phonenumber,username,password){
        console.log(`phone ${phonenumber}`);
        const salt = bcrypt.genSaltSync(saltRounds)
        const phash = bcrypt.hashSync(password,salt)
        return db.one(`insert into users
        (name,phonenumber,username,phash)
        values
        ($1,$2,$3,$4)
        returning id`,[name,phonenumber,username,phash])
            .then(data => {
                return new User (data.id, name, phonenumber,username,phash);
            })
    }

// RETRIEVE
    static getUserByUserName(username){
        return db.one(
        `select * from users where username=$1`,[username]
        )
        .then(data => {
            return new User (data.id,data.name,data.phonenumber,data.username,data.phash)
        })
    }

    static getUserById(id){
        return db.one(
        `select * from users where id=$1`,[id]
        )
        .then(data => {
            return new User (data.id,data.name,data.phonenumber,data.username,data.phash)
        })
    }

    static getUserByPhonenumber(phonenumber){
        return db.one(
        `select * from users where phonenumber=$1`,[phonenumber]
        )
        .then(data => {
            return new User (data.id,data.name,data.phonenumber,data.username)
        })
    }
    static getAllUsers(){
        return db.any(
            `select * from users`
        ).then(data => {
            let userArray = data.map(indUser => {
                return new User (data.id,data.name,data.phonenumber,data.username,data.phash)
            })
        return userArray
        }) .then(console.log)
    }

    passwordDoesMatch(thePassword) {
        const didMatch = bcrypt.compareSync(thePassword, this.phash);
        return didMatch;
    }

// UPDATE




// DELETE





}

module.exports = User