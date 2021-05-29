gulp_place("./fs.sub.js", "file_once");/* global statSync */
gulp_place("utils/log.sub.js", "file_once");/* global log */
function fileModification(file){
    try{ const { mtime }= statSync(file); return mtime; }
    catch(error){ log(1, error.message ? error.message : error); return Date.now(); }
}