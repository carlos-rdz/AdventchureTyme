require('dotenv').config();

const users = require('./models/users');
const adventure = require('./models/adventure');
const questions = require('./models/questions');
const userquestions = require('./models/userquestions');


app.use(express.static('public'));

// Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());

//   let test = cloudinary.v2.uploader.upload("./images/stonemtn.jpeg", {phash:true},
//   function(error, result) {console.log(result, error)})
//     .then(console.log(test.phash));


questions.getQuestionsByAdventure(2)
  .then(data => userquestions.createUserQuestions(1,data))
  .then(console.log)
// userquestions.createUserQuestions(1)

// add protected route function
// after express sessions is installed**

//========
// Routes
//========

// Homepage
//----------
    // add signup and login redirects
app.get('/', (req, res) => {
    // need page from views
}); 

// Login
//-------
app.get('/login', (req, res) => {

});

app.post('login', (req, res) => {
    const theUsername = req.body.username;
    const thePassword = req.body.password;

    // find User by username - need RETRIEVE for findByUsername
    
    // Check if password matches - need bcrypt first

});

// Signup
//--------
app.get('/signup', (req, res) => {
    // need signup form
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
app.get('/profile/:id([0-9]+', (req,res) => {
    users.getUserById(req.params.id)
        .catch(err => {
            //change to some sort of redirect
            res.redirect('/login');
        })
        .then(theUser => {
            res.send(theUser);
        })
});

// Browse Adventure
app.get('/browse', (req, res) => {
    //get all adventures
});




users.createUser("test","7707513422","test","test")
    .then(console.log)

