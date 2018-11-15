const db = require('./db');

class UserQuestions {
    constructor(id,user_id,question_id,response,completed) {
        this.id = id;
        this.user_id = user_id;
        this.question_id = question_id;
        this.response = response;
        this.completed = completed;
    }

// CREATE
// an array get created upon a users selection of adventure
// nee to fix this

static createUserQuestions(user,ArrayofQuestionClasses){
   return Promise.all(ArrayofQuestionClasses.map(element => {
        return db.one(`insert into userquestions
        (user_id,question_id)
        values
        ($1,$2)
        returning id`,[user,element.id])
    }))
        .then(arrayOfData => {
            return arrayOfData.map( (id,index) => {
                return new UserQuestions (id.id, user, ArrayofQuestionClasses[index].id, null, null)
            })
        }
                )
}

// UPDATE

// RETRIEVE
// GET adventure for user by userquestionid

// DELETE
}

module.exports = UserQuestions