gulp_place("utils/log.sub.js", "file_once");/* global log */
gulp_place("utils/logRule.sub.js", "file_once");/* global logRule */
gulp_place("./fileDataCSS.sub.js", "file_once");/* global fileDataCSS */
gulp_place("./saveFileCSS.sub.js", "file_once");/* global saveFileCSS */
gulp_place("./temp_vars.sub.js", "file_once");/* global file_data: false */
gulp_place("./isFileExtEq.sub.js", "file_once");/* global isFileExtEq */

function updateFile(file, op, [ name, rule ]){
    log(2, op==="+"?"@s_adding…":"@e_removing…");
    logRule(2, [ name, rule ]);
    const [ , , rules ]= fileDataCSS(file);
    if(op==="-") file_data[2]= rules.filter(l=> l.indexOf(name.trim()+" ")===-1);
    else {
        //'.styl'?: `fontS__1(){font-size: 1rem;}\n.fontS__1{\nfontS__1();\n}`
        rules.push(isFileExtEq(file, "scss") ?
            `@mixin ${name} { ${rule} } .${name} { @include ${name}(); }` :
            `.${name} { ${rule} }`);
        rules.sort();
    }
    saveFileCSS();
}