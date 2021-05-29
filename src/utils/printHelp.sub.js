gulp_place("consts/info.sub.js", "file_once");/* global info */
gulp_place("./log.sub.js", "file_once");/* global log */
gulp_place("./logLines.sub.js", "file_once");/* global logLines */
function printHelp(){
    log(1, "@s_Help:");
    log(2, "Commands:");
    info.commands.forEach(({ args, param, desc })=> {
        const args_text= args.join("|");
        param= param ? " "+param : "";
        log(3, `@g_${args_text}@R_${param}`);
        logLines(4, desc);
    });
    log(2, "Params:");
    for(const [ param, desc ] of Object.entries(info.params)){
        log(3, `@g_${param}`);
        logLines(4, desc);
    }
}