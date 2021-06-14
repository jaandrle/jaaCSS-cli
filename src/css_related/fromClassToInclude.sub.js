gulp_place("utils/log.sub.js", "file_once");/* global log */
gulp_place("utils/logLines.sub.js", "file_once");/* global logLines */
gulp_place("fs_related/isFileExtEq.sub.js", "file_once");/* global isFileExtEq */
gulp_place("./fromClass.sub.js", "file_once");/* global fromClass */

function fromClassToInclude(file, line){
    log(1, "@g_printing…");
    const rules= line.split(" ").map(r=> r.trim()).sort();
    const convertRule=  isFileExtEq(file, "scss") ?
                        r=> `@include ${r}();` : (
                    isFileExtEq(file, "styl") ?
                        r=> r+"();" :
                        r=> fromClass(r)[1] );
    logLines(1, rules.map(convertRule));
}
