gulp_place("./log.sub.js", "file_once");/* global log */
/**
 * @param {T_log_intendantion} tab
 * @param {T_log_string[]|string[]} multiline_text 
 */
function logLines(tab, multiline_text){
    if(!Array.isArray(multiline_text)) multiline_text= multiline_text.split(/(?<=\.) /g);
    return log(tab, multiline_text.join("\n"+"  ".repeat(tab)));
}
