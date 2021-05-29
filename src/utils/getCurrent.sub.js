gulp_place("consts/info.sub.js", "file_once");/* global info */
gulp_place("./error.sub.js", "file_once");/* global error */
/**
 * @typedef T_cli_arg
 * @type {object}
 * @property {T_info_cmd} command
 * @property {string} param
 */
/**
 * Process cli arguments
 * @param {string[]} args 
 * @returns {T_cli_arg}
 */
function getCurrent(args){
    let command, param;
    const inArgsList= arg=> ({ args })=> args.includes(arg);
    for(let i=0, { length }= args, ci, arg; i<length; i++){
        arg= args[i];
        ci= info.commands.findIndex(inArgsList(arg));
        if(ci===-1) continue;
        command= info.commands[ci];
        if(!command.param) continue;
        i+= 1;
        param= args[i];
    }
    if(!command)
        command= { cmd: "help" };
    if(command.param&&typeof param==="undefined")
        return error(`Missign argument(s).`);
    return { command, param };
}