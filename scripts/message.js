const twilio = require('twilio');

let client = new twilio(process.env.ACCOUNT_SID , process.env.AUTH_TOKEN);
// let from = '+16789448410';
// let to = '+17146093784';

function start(body, from, to){
        return client.messages
        .create({ from: from, 
                    body: body, 
                    to: to
                })
            .then(message => console.log(message.sid))
            // .done()
            // .then(()=>{
            // })
};

module.exports = start;