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
            })
    }

    // RETRIEVE
    static getMostRecentUserQuestion(userId){
        return db.one(`select userquestions.id,user_id,question_id,response, completed
        from userQuestions
        join questions 
        on questions.id = userquestions.question_id
        join adventures
        on adventures.id = questions.adventure_id
        and completed is NULL
        where user_id = $1
        order by questions.ord
        limit 1`,[userId])
            .then(data => {
                return new UserQuestions (data.id, data.user_id, data.question_id, data.response, data.completed)
            })
            .catch(()=>{
                // console.log(".catch ran");
                return "error";
            })
    }

    // UPDATE
    updateResponse(response){
        this.response = response
        return db.result(`update userquestions set response=$1 where id=$2`,[response,this.id])
    }
    updateCompleted(isCompleted){
        this.completed = isCompleted
        return db.result(`update userquestions set completed=$1 where id=$2`,[isCompleted,this.id])
    }

    // DELETE

}

module.exports = UserQuestions