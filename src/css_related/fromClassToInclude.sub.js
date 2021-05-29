gulp_place("utils/log.sub.js", "file_once");/* global log */
gulp_place("utils/logLines.sub.js", "file_once");/* global logLines */
gulp_place("fs_related/isFileExtEq.sub.js", "file_once");/* global isFileExtEq */
gulp_place("./fromClass.sub.js", "file_once");/* global fromClass */

function fromClassToInclude(file, line){
    log(1, "@g_printing…");
    const rules= line.split(" ").map(r=> r.trim()).sort();
    logLines(1, isFileExtEq(file, "scss") ?
        rules.map(r=> `@include ${r}();`) :
        rules.map(r=> fromClass(r)[1]));
}