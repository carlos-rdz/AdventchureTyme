const twilio = require('twilio');

// need to shift these credentials out of this file
const accountSid = 'AC83299797729e54b4fcf99251ee06ed97'; // Your Account SID from www.twilio.com/console
const authToken = '6ac6215052f3743a04bd38491cb9669c';   // Your Auth Token from www.twilio.com/console

let client = new twilio(accountSid, authToken);
let adventureName = "Test";

function start(){
        client.messages
        .create({ from: '+16789448410', 
                    body: `Welcome to the ${adventureName} Adventure! Good Luck!`, 
                    to: '+17146093784'
                })
            .then(message => console.log(message.sid))
            .done();
};

module.exports = start;