require('dotenv').config();

const users = require('./models/users');
const adventure = require('./models/adventure');
const questions = require('./models/questions');
const userquestions = require('./models/userquestions');

const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET
  });
  
//   let test = cloudinary.v2.uploader.upload("./images/stonemtn.jpeg", {phash:true},
//   function(error, result) {console.log(result, error)})
//     .then(console.log(test.phash));

questions.getQuestionsByAdventure(2)
  .then(data => userquestions.createUserQuestions(1,data))
  .then(console.log)
// userquestions.createUserQuestions(1)