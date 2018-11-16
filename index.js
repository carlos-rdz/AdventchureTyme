require('dotenv').config();

const users = require('./models/users');
const adventure = require('./models/adventure');
const questions = require('./models/questions');
const userquestions = require('./models/userquestions');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./models/db');

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

// Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());
    
const page = require('./views/page');
const loginForm = require('./views/loginForm');
const signupForm = require('./views/signupForm');
const adventureList = require('./views/adventureList');
const showUser = require('./views/showUser');
const userAdventureList = require('./views/userAdventureList');


// questions.getQuestionsByAdventure(2)
//   .then(data => userquestions.createUserQuestions(1,data))
//   .then(console.log)
// userquestions.createUserQuestions(1)

//========
// Routes
//========

// Protected Routes function
//--------------------------
// function protectRoute(req, res, next) {
//     let isLoggedIn = req.session.user ? true : false;
//     if (isLoggedIn) {
//         next();
//     } else {
//         res.redirect(`/login`);
//     }
// }
// middleware
// app.use((req, res, next) => {

//     let isLoggedIn = req.session.user ? true : false;
    
//     console.log(req.session.user);
//     console.log(`On ${req.path}, is a user logged in? ${isLoggedIn}`);

//     // We call the next function
//     next();

// });

// Homepage
//----------
    // add signup and login redirects
app.get('/', (req, res) => {
    const thePage = page('Welcome.  Please login or signup to continue');
    res.send(thePage);
}); 

// Login
//-------
app.get('/login', (req, res) => {
    const theForm = loginForm();
    const thePage = page(theForm);
    res.send(thePage);
});

app.post('/login', (req, res) => {
    const theUsername = req.body.username;
    const thePassword = req.body.password;

    // find User by username - need RETRIEVE for findByUsername
    users.getUserByUserName(theUsername)
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
        // Check if password matches - need bcrypt first
        .then(theUser => {
            if (theUser.passwordDoesMatch(thePassword)) {
                req.session.user = theUser;
                res.redirect(`/profile/${theUser.id}`);
            } else {
                res.redirect('/login');
            }
        })
// once sessions is added we will add a logout route

});

// Signup
//--------
app.get('/signup', (req, res) => {
    const theForm = signupForm();
    const thePage = page(theForm);
    res.send(thePage);
});

app.post('/signup', (req, res) => {
    const newName = req.body.name;
    const newPhoneNumber = req.body.phoneNumber;
    const newUsername = req.body.username;
    const newPassword = req.body.password;

    //add user
    //createUser needs more paramaters
    users.createUser(newName, newPhoneNumber, newUsername, newPassword)
        .catch(() => {
            res.redirect('/signup');
        })
        .then(newUser => {
            // take them to the list of adventures
            res.redirect('/browse');
        })
});

// Profile
//---------
// show list of adventures this user has added
app.get('/profile/:id([0-9]+)', (req,res) => {
    users.getUserById(req.params.id)
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
        .then(theUser => {
            res.send(theUser);
        })
});

app.post('/test', (req,res) => {
// need to grab user ids from session
// need to grab adventure ids from submit
 let adventureId = req.body.adventureId
    questions.getQuestionsByAdventure(adventureId)
    // this loads the questions to the user
        .then(data => {
            return userquestions.createUserQuestions(1,data)
        })
        // this displays the users adventures
        // .then(console.log)
        .then(data => {
            return adventure.getAdventuresByUserId(1)})
            // need to write a view that takes a list of adventures as an argument and returns html list with add button
        .then(dataArray => {
             res.send(page(userAdventureList(dataArray)))
            })
        
        });
app.post('/test2', (req,res) => {
// need to grab user ids from session
// need to grab adventure ids from submit
    res.send(page("you have started the adventure"))
    
    // 
});

// Browse Adventure
app.get('/browse', (req, res) => {
    adventure.getAllAdventures()
        .then(allAdventures => {
            const adventureUL = adventureList(allAdventures);
            const thePage = page(adventureUL);
            res.send(thePage);
        })
});

// twilio test

const message = require('./message');
// will text message on route, but just a function 
// can call it anywhere if we pass appropriate params
app.get('/start', (req,res)=> {
    message("`Welcome to the Adventure! Good Luck!`", '+16789448410', '+17146093784' );
    res.send("message sent");
});


app.listen(3000, () => {
    console.log('your express app is readddddy')
});


// users.createUser("test","7707513422","test","test")
//     .then(console.log)
