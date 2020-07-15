import { get } from "./utils/request";

import statusSmsMessage from './utils/statusSmsMessage';

interface ErrorAccess {
    error: string;
    message: string;
}

interface Access {
    user?: string;
    pass?: string;
    message: any;
    verify: any;
}

export interface ConfigOptionsModel {
    user: string;
    pass: string;
}

interface Request {
    statusRequest: string;
}

export interface SendData {
    numberSMS: number;
    message: string;
}

interface Send extends Request {
    messageId?: number;
    number?: number;
}

export interface VerifyStatusData {
    messageId: number;
}

interface VerifyStatus extends Request {
    statusSMS?: number;
    message?: string;
    number?: number;
}

interface Balance extends Request {
    smsRemaining?: number;
    number?: number;
}

let endPoint: string | undefined = undefined;

const access: Access = {
    user: undefined,
    pass: undefined,
    message: () => {
        let errorReturn: ErrorAccess;

        if(access.user===undefined) {
            errorReturn =  {error: "ERR", message: "User don't defined"};
        } else {
            errorReturn =  {error: "ERR", message: "Pass don't defined"};
        }
        
        return errorReturn;
    },
    verify: () => {

        if(access.user!==undefined){
            return true
        }
    
        if(access.pass!==undefined){
            return true
        }

        return false;
    }
}

const config = ({user, pass}: ConfigOptionsModel): void => {
    access.user = user;
    access.pass = pass;
    endPoint = `http://smsmarketing.smslegal.com.br/index.php?app=webservices&u=${access.user}&p=${access.pass}`;
};

const send = async ({numberSMS, message}: SendData): Promise<Send> => {

    if(!access.verify())
        return access.message();

    const response = await get(`${endPoint}&ta=pv&to=${numberSMS}&msg=${message}`) as string;

    let logResponse: Send = {
        statusRequest: "error",
        number: 0
    };

    if(response.includes('OK')){
        logResponse = {
                statusRequest: "success",
                messageId: parseInt(response.split("OK ")[1])
            };                
    } else if(response.includes('ERR')){
        logResponse = {
            statusRequest: "error",
            number: parseInt(response.split("ERR ")[1])
        };
    }

    return logResponse;
};

const verifyStatus = async ({messageId}: VerifyStatusData): Promise<VerifyStatus> => {

    if(!access.verify())
        return access.message();
        
    const response = await get(`${endPoint}&ta=ds&slid=${messageId}`) as string;
    const statusSMS = parseInt(response);

    let logResponse: VerifyStatus = {
        statusRequest: "error",
        number: 0
    };

    if(response.includes('ERR')){
        logResponse = {
            statusRequest: "error",
            number: parseInt(response.split("ERR ")[1])
        };
    } else {
        let message: string = statusSmsMessage(statusSMS);
        
        logResponse = {
            statusRequest: "success",
            statusSMS,
            message
        };
    };
    return logResponse;
};

const balance = async (): Promise<Balance> => {

    if(!access.verify())
        return access.message();

    try {

        const response = await get(`${endPoint}&ta=cr`) as string;
        
        let logResponse: Balance;

        if(response.includes('OK')){
            logResponse = {
                    statusRequest: "success",
                    smsRemaining: parseInt(response.split("OK ")[1])
                };                
        } else if(response.includes('ERR')){
            throw response;
        } else {
            throw '';
        }

        return logResponse;
    } catch(err) {
        let errorResponse: Balance;
        if(err.includes('ERR')){
            errorResponse = {
                statusRequest: "error",
                number: parseInt(err.split("ERR ")[1])
            };
        } else {
            errorResponse = {
                statusRequest: "error",
                number: 0
            };
        }

        return errorResponse;
    }
};

export default {config, send, verifyStatus, balance};