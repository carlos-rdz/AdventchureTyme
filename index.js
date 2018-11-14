require('dotenv').config();

const users = require('./models/users');
const adventure = require('./models/adventure');

const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET
  });
  

//   let test = cloudinary.v2.uploader.upload("./images/stonemtn.jpeg", {phash:true},
//   function(error, result) {console.log(result, error)})
//     .then(console.log(test.phash));

adventure.getAdventureByName("New York")
  .then(console.log)