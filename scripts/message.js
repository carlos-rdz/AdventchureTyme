const twilio = require('twilio');
const twilioCred = require('twilioCred');

let client = new twilio(twilioCred.accountSid, twilioCred.authToken);
// let from = my twilio #: '+16789448410';


function start(body, from, to){
        client.messages
        .create({ from: from, 
                    body: body, 
                    to: to
                })
            .then(message => console.log(message.sid))
            .done();
};




module.exports = start;