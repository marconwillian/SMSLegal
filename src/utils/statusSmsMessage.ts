const statusSmsMessage = (statusSMS: number) => {
    let message: string;

    switch (statusSMS) {
        case 0:
            message = 'SMS PROCESSADA - AGUARDA ATUALIZAÇÃO DA OPERADORA.';
            break;
        case 1:
            message = 'SMS ENTREGUE NA OPERADORA - AGUARDA ATUALIZAÇÃO DO STATUS FINAL.';
            break;
        case 2:
            message = 'FALHA NO ENVIO DA SMS - OCORREU UMA FALHA NO ENVIO DA MENSAGEM.';
            break;
        case 3:
            message = 'SMS ENTREGUE NO CELULAR - SMS FOI ENTREGUE NO CELULAR DE DESTINO. STATUS FINAL.';
            break;
        default: 
            message = '';
            break;
    }

    return message;
};

export default statusSmsMessage;