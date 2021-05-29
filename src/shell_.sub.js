/* jshint maxcomplexity: 12 */
gulp_place("consts/info.sub.js", "file_once");/* global info */
gulp_place("consts/shell_cmds.sub.js", "file_once");/* global shell_cmds, shell_cmds_l */
gulp_place("fs_related/fileDataCSS.sub.js", "file_once");/* global fileDataCSS */
gulp_place("fs_related/updateFile.sub.js", "file_once");/* global updateFile */
gulp_place("fs_related/updateFileCustom.sub.js", "file_once");/* global updateFileCustom */
gulp_place("fs_related/compareFiles.sub.js", "file_once");/* global compareFiles */
gulp_place("utils/log.sub.js", "file_once");/* global log */
gulp_place("utils/logLines.sub.js", "file_once");/* global logLines */
gulp_place("utils/logRule.sub.js", "file_once");/* global logRule */
gulp_place("css_related/fromMixed.sub.js", "file_once");/* global fromMixed */
gulp_place("css_related/fromClassToInclude.sub.js", "file_once");/* global fromClassToInclude */
const { createInterface }= require("readline");

async function shell_({ param: file }){
    if(!file) throw Error("No 'file' defined");
    process.stdout.write(String.fromCharCode(27) + "]0;"+info.name+": interactive mode"+String.fromCharCode(7));
    const rl= createInterface({ input: process.stdin, output: process.stdout, historySize: 30 });
    const filterFileData= line=> fileDataCSS(file)[2].filter(l=> l.indexOf(line.slice(1).trim())!==-1).forEach(l=> log(2, l));
    log(1, "@s_Interactive shell");
    logLines(1, shell_cmds);
    while(true){
        const line= await command_(rl);
        if(!line) continue;
        try{
            switch(line[0].toLowerCase()){
                case "q": rl.close(); return true;
                case "?": filterFileData(line); break;
                case "!": updateFileCustom(file, line.slice(1).trim()); break;
                case "+":
                case "-":
                        updateFile(file, line.slice(0,1), fromMixed(line.slice(1).trim()));
                        break;
                case "@": fromClassToInclude(file, line.slice(1).trim()); break;
                case "=": compareFiles(file, line.slice(1).trim()); break;
                default:
                    log(1, "@g_printing…");
                    logRule(1, fromMixed(line));
            }
        } catch(e){
            log(1, e.message+" …exit with 'q'"); continue;
        }
    }
}
function command_(rl){ return new Promise(function(resolve){
    log(1, "@g_just write anything to converse or start line with: "+shell_cmds_l);
    rl.question("  : ", resolve);
}); }