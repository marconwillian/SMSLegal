const fetch = require("node-fetch");
const data = {
    user: 'null',
    pass: 'null'
}
const smslegal = {
    config: ({user, pass}) => {
        data.user = user;
        data.pass = pass;
    },
    send: async ({numberSMS, message}) => {

        if(!data.user)
            return {error: "ERR", message: "User don't definided"}

        if(!data.pass)
            return {error: "ERR", message: "Pass don't definided"}

        const request = await fetch(`http://smsmarketing.smslegal.com.br/index.php?app=webservices&u=${data.user}&p=${data.pass}&ta=pv&to=${numberSMS}&msg=${message}`);
        const response = await request.text();


        if(response.includes('OK')){
            var logResponse = {
                    status: "success",
                    messageId: parseInt(response.split("OK ")[1])
                };                
        } else if(response.includes('ERR')){
            var logResponse = {
                status: "error",
                number: parseInt(response.split("ERR ")[1])
            };
        }

        return logResponse;
    }
}


module.exports = smslegal;