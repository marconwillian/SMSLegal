const smslegal = require('./index');

smslegal.config({user: 'USER', pass: 'PASS'});

const numberSMS = 5566996956402;
const message = 'Olar, quero uma mensagem de tudo bem?';

const enviar = async () => {
    const response = await smslegal.send({numberSMS, message});
    console.log(response);
}

enviar();