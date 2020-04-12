const smslegal = require('./index');

smslegal.config({user: 'USER', pass: 'PASS'});

const numberSMS = 5566996956402;
const message = 'Olar, quero uma mensagem de tudo bem?';
const messageId = 2396622;

const enviar = async () => {
    //const response = await smslegal.verifyStatus({messageId});
    //const response = await smslegal.send({numberSMS, message});
    const response = await smslegal.balance();
    console.log(response);
}

enviar();