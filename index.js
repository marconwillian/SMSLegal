const fetch = require("node-fetch");

const data = {
    user: 'null',
    pass: 'null',
    urlBase: 'null'
};

const access = {
    message: () => {
        if(!data.user)
            return {error: "ERR", message: "User don't definided"}
    
        if(!data.pass)
            return {error: "ERR", message: "Pass don't definided"}
    },
    verify: () => {
        if(!data.user)
            return true
    
        if(!data.pass)
            return true
    }
}

const smslegal = {
    config: ({user, pass}) => {
        data.user = user;
        data.pass = pass;
        data.urlBase = `http://smsmarketing.smslegal.com.br/index.php?app=webservices&u=${data.user}&p=${data.pass}`;
    },
    send: async ({numberSMS, message}) => {

        if(access.verify())
            return access.message();

        const request = await fetch(`${data.urlBase}&ta=pv&to=${numberSMS}&msg=${message}`);
        const response = await request.text();


        if(response.includes('OK')){
            var logResponse = {
                    statusRequest: "success",
                    messageId: parseInt(response.split("OK ")[1])
                };                
        } else if(response.includes('ERR')){
            var logResponse = {
                statusRequest: "error",
                number: parseInt(response.split("ERR ")[1])
            };
        }

        return logResponse;
    },
    verifyStatus: async ({messageId}) => {

        if(access.verify())
            return access.message();
            
        const request = await fetch(`${data.urlBase}&ta=ds&slid=${messageId}`);
        const response = await request.text();
        const statusSMS = parseInt(response);

        if(response.includes('ERR')){
            var logResponse = {
                statusRequest: "error",
                number: parseInt(response.split("ERR ")[1])
            };
        } else {
            switch (statusSMS) {
                case 0:
                    var message = 'SMS PROCESSADA - AGUARDA ATUALIZAÇÃO DA OPERADORA.';
                    break;
                case 1:
                    var message = 'SMS ENTREGUE NA OPERADORA - AGUARDA ATUALIZAÇÃO DO STATUS FINAL.';
                    break;
                case 2:
                    var message = 'FALHA NO ENVIO DA SMS - OCORREU UMA FALHA NO ENVIO DA MENSAGEM.';
                    break;
                case 3:
                    var message = 'SMS ENTREGUE NO CELULAR - SMS FOI ENTREGUE NO CELULAR DE DESTINO. STATUS FINAL.';
                    break;
            }

            var logResponse = {
                statusRequest: "success",
                statusSMS,
                message
            };
        };
        return logResponse;
    },
    balance: async () => {

        if(access.verify())
            return access.message();

        const request = await fetch(`${data.urlBase}&ta=cr`);
        const response = await request.text();

        if(response.includes('OK')){
            var logResponse = {
                    statusRequest: "success",
                    smsRemaining: parseInt(response.split("OK ")[1])
                };                
        } else if(response.includes('ERR')){
            var logResponse = {
                statusRequest: "error",
                number: parseInt(response.split("ERR ")[1])
            };
        }

        return logResponse;
    }
}


module.exports = smslegal;