import colors from 'colors';

export default class Log {
    constructor(){

    }
    Show(path){
        console.log(`[Server]   ${path}`.green);
    }
    Error(path){
        console.log(`[Error]    ${path}`.red);
    }
    Info(path){
        console.log(`[Info]     ${path}`.yellow);
    }
}
    