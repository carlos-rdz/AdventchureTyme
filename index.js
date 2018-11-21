require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser');

// Twilio features require
const {https} = require('follow-redirects');
const message = require('./scripts/message');

// models
const users = require('./models/users');
const adventure = require('./models/adventure');
const questions = require('./models/questions');
const userquestions = require('./models/userquestions');
const db = require('./models/db');

// views
const page = require('./views/page');
const loginForm = require('./views/loginForm');
const signupForm = require('./views/signupForm');
const adventureList = require('./views/adventureList');
const showUser = require('./views/showUser');
const userAdventureList = require('./views/userAdventureList');


// session init
app.use(session({
    store: new pgSession({
        pgPromise: db
    }),
    secret: 'abc123kasfsdbukbfrkqwuehnfioaebgfskdfhgcniw3y4fto7scdghlusdhbv',
    saveUninitialized: false,
    cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000 
    }
}));

app.use(express.static('public'));
// Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));
// Configure body-parser to read JSON bodies
app.use(bodyParser.json());
    


//========
// Routes
//========

// Protected Routes function
//--------------------------
function protectRoute(req, res, next) {
    let isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        next();
    } else {
        res.redirect(`/`);
    }
}

// middleware
app.use((req, res, next) => {
    let isLoggedIn = req.session.user ? true : false;
    // console.log(req.session.user);
    // console.log(`On ${req.path}, is a user logged in? ${isLoggedIn}`);
    // We call the next function
    next();
});

// Homepage
//----------
app.get('/', (req, res) => {
    const thePage = page('Welcome! Please login or signup to continue', req.session.user);
    res.send(thePage);
}); 

// Login
//-------
app.get('/login', (req, res) => {
    res.send(page(loginForm()));
});

app.post('/login', (req, res) => {
    const theUsername = req.body.username;
    const thePassword = req.body.password;

    users.getUserByUserName(theUsername)
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
        // Check if passwords match via bcrypt
        .then(theUser => {
            if (theUser.passwordDoesMatch(thePassword)) {
                req.session.user = theUser;
                req.session.save(function(err){
                    res.redirect('/profile');
                });
            }else {
                res.redirect('/login');
            }
        });
    });

// Logout
//--------
app.post(`/logout`, (req, res) => {
    // kill the session
    req.session.destroy();
    // redirect them to homepage
    res.redirect(`/`);
});

// Signup
//--------
app.get('/signup', (req, res) => {
    res.send(page(signupForm()));
});

app.post('/signup', (req, res) => {
    const newName = req.body.name;
    // twilio prefers the '+1' for more reliability so we prepend 
    // it instead of having the user input it
    const newPhoneNumber = "+1" + req.body.phonenumber;
    const newUsername = req.body.username;
    const newPassword = req.body.password;

    //add user
    users.createUser(newName, newPhoneNumber, newUsername, newPassword)
        .catch(() => {
            res.redirect('/');
        })
        .then(newUser => {
            // take them to the list of adventures
            req.session.user = newUser;
            req.session.save(function(err){  
                res.redirect('/browse');
            })
        });
});

// Profile
//---------
// show list of adventures this user has added
app.get('/profile',protectRoute, (req,res) => {
    let userId = req.session.user.id
    adventure.getAdventuresByUserId(userId)
        .then(advArray => {
        res.send(page(userAdventureList(advArray),req.session.user));
        });
});

app.post('/profile', protectRoute, (req,res) => {
    let adventureId = req.body.adventureId;
    let userId = req.session.user.id;
    questions.getQuestionsByAdventure(adventureId)
    // this loads the questions to the user
        .then(data => {
            return userquestions.createUserQuestions(userId,data)
        })
        // this displays the users adventures
        .then(data => {
            return adventure.getAdventuresByUserId(userId)
        })
        .then(dataArray => {
            res.redirect('/profile');
        })
        
});

app.post('/start', protectRoute, (req,res) => {
    let user = req.session.user;
    message(`Welcome ${user.name}!`, `+16789448410`, `${user.phonenumber}` )
    message(`In these adventures, you take a picture of signage with text representing your answer. Be as square as possible to the signage in question when taking a picture and we'll do the rest! Good Luck!`, `+16789448410`, `${user.phonenumber}`);
    issueFirstQuestion(user.id);
    res.send(page(`Check your phone and have fun ${user.name}!`));
});

// Browse Adventure
app.get('/browse', protectRoute, (req, res) => {
    adventure.getAllAdventures()
        .then(allAdventures => {
            const adventureUL = adventureList(allAdventures);
            const thePage = page(adventureUL, req.session.user);
            res.send(thePage);
        });
});

// Twilio integration

// on incoming text message
app.post('/sms', (req, res) => {
    // pull mms url from txt msg
    let twilioUrl = req.body.MediaUrl0;
    // pull phone num of sender
    let userPhone = req.body.From;
    users.getUserByPhonenumber(userPhone)
        .then(user => {
            // gets the object associating a question with a user
            return userquestions.getMostRecentUserQuestion(user.id)
        })
        .then(userQuestionObj => {
            // gets the actual question text and passes data for use down the promise chain
            return Promise.all([questions.getQuestionsByQuestion_Id(userQuestionObj.question_id), userQuestionObj]) 
        })
        .then(dataArr => {
            // dataArr[0] = contains answer text from the question object
            // dataArr[1] = contains the userQuestionObj to be passed down the chain
            return Promise.all([dataArr[0].answer, dataArr[1]])
        })
        .then(dataArr => {
            // Twilio stores mms files on Amazon S3 servers but the response json 
            // gives an additional url route that has to be resolved to copy the user
            // txted image to feed to Google Vision
        return resolveURL(twilioUrl)
            .then((remoteAddress) => {
            //writes image data to file
                const fs = require('fs');
                const imageDownload = require('image-download');
                const imageType = require('image-type');
                
                return imageDownload(`${remoteAddress}`)
                .then(buffer => {
                    const type = imageType(buffer);
                    // we had to make sure the image was stored prior to the answer validation 
                    // further down the chain or it would check a previous image
                    // so we wrapped it in a promise that forces a sequential order of excecution
                    return (new Promise( (resolve, reject) => {
                        fs.writeFile('./images/user_submit.' + type.ext, buffer, (err) => { 
                            if (err){
                                reject();
                            }else{
                                resolve(dataArr);
                            }
                        })
                        
                    }))
                })
            })
        })
        // Now with our image stored we can pass is to Google to spit back 
        // any text it recognizes in the image as a string.
        .then(dataArr => {
        return Promise.all([visionOCR(), dataArr[0], dataArr[1]])
        })
        .then(dataArr => {
            // With the text returned from Google, the correct answer and the userObj
            // we can actually run the check now
            return validateText(dataArr[0],dataArr[1],dataArr[2]) 
        });
    });

  

// Twilio hosts mms images on S3servers and the MediaUrl has to be resolved before 
// I can actually use the address to write an img file locally
function resolveURL(address){
    console.log("entered resolve url");
    return (new Promise((resolve, reject) => {
        https.get(address,(response) => {   
            if(response){
                // console.log(response);
                resolve(response.responseUrl);
            }else{
                reject("Whoops");
            }
        });     
    }));

};

function validateText(userAnswer, correctAnswer, userQuestionObj){
    // toLowerCase ensures case insensitive string comparison 
    const userAnswerStr = userAnswer.toLowerCase();
    const correctAnswerStr = correctAnswer.toLowerCase();
    // If the user submits a picture with the correct answer
    // we issue the next question via Twilio
    if (userAnswerStr.includes(correctAnswerStr)){
        console.table(`userquestionobj ${userQuestionObj}`);
        return userQuestionObj.updateCompleted('true')
        .then(()=> {
            issueNextQuestion(userQuestionObj)
        })
    //If the user answer didn't validate we send them an error message
    //and let them try again with a new picture. 
    }else{
        validationError(userQuestionObj);
    }
}

function validationError(userQuestionObj){
    users.getUserById(userQuestionObj.user_id)
    .then(userObj => {
        message('That image doesn\'t seem correct. Please try again making sure your picture is squarely-facing your signage and where possible, try including just the sign text you\'re trying to submit.','+16789448410', `${userObj.phonenumber}` )    
    })
}

function issueFirstQuestion(userID){
    userquestions.getMostRecentUserQuestion(userID)
        .then(data => {
            return questions.getQuestionsByQuestion_Id(data.question_id) 
        })
        .then(data => {
            return Promise.all([data, users.getUserById(userID)])
        })
        .then(dataArr => {
            message(`${dataArr[0].question}`, `+16789448410`, `${dataArr[1].phonenumber}` );
        });
    }

function issueNextQuestion(userQuestionObj){
    // Before issuing a question we check the db that there are more questions left
    return userquestions.getMostRecentUserQuestion(userQuestionObj.user_id)
    .then(result => {
        // If our sql query throws an error we .catch it and know there 
        // are no more questions left, therefore the user finished the adventure
        // and we send a congradulatory message
        if(result === "error"){
            return users.getUserById(userQuestionObj.user_id)
            .then(userObj => {
                message("Hey you won!", `+16789448410`, `${userObj.phonenumber}` );   
            })
        // If the sql query has more questions we know the previous question 
        // had to have been answered correctly so we combine a congratulatory message
        // and send the next unanswered question
        }else{
            return users.getUserById(userQuestionObj.user_id)
            .then(userObj => {
                return questions.getQuestionsByQuestion_Id(result.question_id)
                .then(questionObj=> {
                    message(`Good Job! Here's your next question: ${questionObj.question}`, `+16789448410`, `${userObj.phonenumber}` );
                })
            })
        }
    })    
}
       

app.listen(3000, () => {
    console.log('your express app is readddddy')
});