gulp_place("utils/log.sub.js", "file_once");/* global log */
gulp_place("css_related/toCSSRule.sub.js", "file_once");/* global toCSSRule */
gulp_place("./fileDataCSS.sub.js", "file_once");/* global fileDataCSS */
gulp_place("./saveFileCSS.sub.js", "file_once");/* global saveFileCSS */

function updateFileCustom(file, rule_full){
    log(2, "@s_adding…");
    const [ name_candidate, rule_candidate ]= rule_full.split(/ *(?:\{|\}) */);
    const name= name_candidate[0]==="." ? name_candidate.slice(1) : name_candidate;
    const rule= rule_candidate+(rule_candidate[rule_candidate.length-1]===";"?"":";");
    const [ , , rules ]= fileDataCSS(file);
    const rule_final= toCSSRule(file, name, rule);
    log(2, rule_final);
    rules.push(rule_final);
    rules.sort();
    saveFileCSS();
}
