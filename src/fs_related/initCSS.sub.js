gulp_place("./fileDataCSS.sub.js", "file_once");/* global fileDataCSS */
gulp_place("./saveFileCSS.sub.js", "file_once");/* global saveFileCSS */

function initCSS({ param: file }){
    if(!file) throw Error("No 'file' defined");
    fileDataCSS(file);
    saveFileCSS();
}