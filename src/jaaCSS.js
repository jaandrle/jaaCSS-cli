#!/usr/bin/env node
/* jshint maxcomplexity: 12, maxdepth: 3 */
gulp_place("utils/*.sub.js", "files_once");/* global log, logRule, error, getCurrent, printMain, printHelp */
gulp_place("fs_related/showHTML.sub.js", "file_once"); /* global showHTML */
gulp_place("fs_related/initCSS.sub.js", "file_once"); /* global initCSS */
gulp_place("shell_.sub.js", "file_once");/* global shell_ */
gulp_place("css_related/fromMixed.sub.js", "file_once");/* global fromMixed */

(async function main_(){
    printMain();
    const current= getCurrent(process.argv.slice(2));
    switch(current.command.cmd){
        case    "help":  return printHelp();
        case    "html":  return showHTML(current).forEach(c=> log(1, c));
        case    "init":  return initCSS(current);
        case   "shell":  return shell_(current);
        case    "eval":  return logRule(1, fromMixed(current.param));
    }
})()
.then(()=> process.exit())
.catch(error);