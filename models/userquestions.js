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
   ArrayofQuestionClasses.forEach(element => {
        return db.one(`insert into userquestions
        (user_id,question_id)
        values
        ($1,$2)
        returning id`,[user,element.id])
            .then(data => {
                return new UserQuestions (data.id, user, element.id, response=null, completed=null);
            })
    });
}

    


// UPDATE




// DELETE





}

module.exports = UserQuestions