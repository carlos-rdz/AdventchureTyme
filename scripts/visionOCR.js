// Vison OCR api
const vision = require('@google-cloud/vision');

// This shell cmd maps where the authentication json is stored. Will the json file need to go on the server then?
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/mblatchford/Digital Crafts/DigitalCrafts-ScavengerHunt-b7df5a3616de.json"

// This shell cmd maps where the authentication json is stored. Will the json file need to go on the server then?
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/carlosrodriguez/DigitalCrafts/Scavenger/DigitalCrafts-ScavengerHunt-b7df5a3616de.json"


// // upload an image to bucket
// gsutil cp './images/IMG_6780.jpg' gs://'scavenger_hunt_images'

// Creates a client
const client = new vision.ImageAnnotatorClient();

// LOCAL IMAGE TESTING
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const imgAddress = './images/IMG_7882.jpg';

// Performs text detection on the local file
function extractText(imgAddress){
 return client
  .textDetection(`${imgAddress}`)
  .then(results => {
    const detections = results[0].textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
    return detections;
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}

// REMOTE IMAGE TESTING
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
