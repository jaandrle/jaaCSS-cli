gulp_place("consts/info.sub.js", "file_once");/* global info */
gulp_place("./log.sub.js", "file_once");/* global log */
function printMain(){
    const { name, version, description }= info;
    log(1, `@w_${name}@${version}`);
    log(1, description);
    const cmds= info.commands.map(({args})=> args[0].replace("--", "")).join(", ");
    log(1, `@w_Usage: ${name} --[cmd] [param]`);
    log(2, `…cmd: ${cmds}`);
    log(2, "…param: Based on cmd\n");
}