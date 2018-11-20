const twilio = require('twilio');
// const accountSid = 'AC83299797729e54b4fcf99251ee06ed97'; // Your Account SID from www.twilio.com/console
// const authToken = '6ac6215052f3743a04bd38491cb9669c';   // Your Auth Token from www.twilio.com/console

let client = new twilio(process.env.ACCOUNT_SID , process.env.AUTH_TOKEN);
// let adventureName = "Test";
// let from = '+16789448410';
// let to = '+17146093784';

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