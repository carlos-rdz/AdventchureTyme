// Vison OCR api
const vision = require('@google-cloud/vision');

 // This shell cmd maps where the authentication json is stored. Will the json file need to go on the server then?
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/mblatchford/Digital Crafts/DigitalCrafts-ScavengerHunt-b7df5a3616de.json"


// // upload an image to bucket
// // gsutil cp 'IMAGEPATH' gs://'scavenger_hunt_images'

// Creates a client
const client = new vision.ImageAnnotatorClient();

// LOCAL IMAGE TESTING
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
 const textFromImage = './images/IMG_6773.jpg';

// Performs text detection on the local file
client
  .textDetection(textFromImage)
  .then(results => {
    const detections = results[0].textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });


// REMOTE IMAGE TESTING
//  /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */

// const bucketName = 'Bucket where the file resides, e.g. my-bucket';
// const fileName = 'Path to file within bucket, e.g. path/to/image.png';

// Performs text detection on the gcs file
client
  .textDetection(`gs://${bucketName}/${fileName}`)
  .then(results => {
    const detections = results[0].textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

 