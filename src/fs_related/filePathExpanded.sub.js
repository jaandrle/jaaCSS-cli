gulp_place("consts/info.sub.js", "file_once");/* global info */
function filePathExpanded(file_path){
    if(file_path.slice(0, file_path.indexOf("/")).slice(-1)!==".")
        return file_path;
    // ./a-z | ../a-z
    return file_path[1]!=="." ?
        info.cwd+file_path.slice(1) :
        info.cwd.slice(0, info.cwd.lastIndexOf("/"))+file_path.slice(2);
}