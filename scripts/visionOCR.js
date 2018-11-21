// Vison OCR api
const vision = require('@google-cloud/vision');

// This shell cmd maps where the authentication json is stored. Will the json file need to go on the server then?
// export GOOGLE_APPLICATION_CREDENTIALS="/PATH_TO_JSON_FILE/DigitalCrafts-ScavengerHunt-b7df5a3616de.json"


// // upload an image to bucket
// gsutil cp './images/IMG_6780.jpg' gs://'scavenger_hunt_images'

// Creates a client
const client = new vision.ImageAnnotatorClient();

// LOCAL IMAGE TESTING
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
//  const imgAddress = './images/user_submit.jpg';

// Performs text detection on the local file
// Outputs array of objects with lots of data
// First array object gives single string of all found text
// Additional objects store what Google thought were word/grammar breaks individually
function extractText(){
 return client
  .textDetection('./images/user_submit.jpg')
  .then(results => {
    const detections = results[0].textAnnotations;
    console.log('Text:');
    // detections.forEach(text => console.log(text));
    // returns all text found as single string
    return detections[0].description;
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}

// REMOTE IMAGE TESTING (for use with images hosted on Google Storage)
//  /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */

// const bucketName = 'scavenger_hunt_images';
// const fileName = 'IMG_6780.jpg';

// // Performs text detection on the gcs hosted image
// function extractText(imgAddress){
// client
//   .textDetection(`gs://${bucketName}/${fileName}`)
//   // .textDetection(`gs://${imgAddress}`)
//   .then(results => {
//     const detections = results[0].textAnnotations;
//     // console.log(detections);
//     console.log('Text:');
//     detections.forEach(text => console.log(text));
    
//     return detections;
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
// }

// extractText(imgAddress);



module.exports = extractText;
