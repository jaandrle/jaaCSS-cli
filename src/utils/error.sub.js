gulp_place("consts/info.sub.js", "file_once");/* global info */
gulp_place("./log.sub.js", "file_once");/* global log */
/**
 * Shows error log and exits with `1`
 * @param {Error|string} e Error
 */
function error(e){
    const message= e instanceof Error ? e.message : e;
    const help_text= `@w_See help using '${info.commands[0].args[0]}'.`;
    log(1, `@e_Error: ${message} ${help_text}`);
    return process.exit(1);
}