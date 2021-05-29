/* jshint maxdepth: 3, maxcomplexity: 11 */
gulp_place("./filePathExpanded.sub.js", "file_once");/* global filePathExpanded */
gulp_place("./fs.sub.js", "file_once");/* global existsSync, readFileSync */
gulp_place("./temp_vars.sub.js", "file_once");/* global file_path: true, file_data: true */
gulp_place("./fileModification.sub.js", "file_once");/* global fileModification */

function fileDataCSS(file){
    file= filePathExpanded(file);
    if(!existsSync(file)){
        file_path= file;
        file_data= [ Date.now(), "", [], "" ];
        return file_data;
    }
    const mtime= fileModification(file);
    if(file_data&&file_path===file&&mtime<=file_data[0])
        return file_data;
    const content= [ [], [], [] ];
    let type= 0;
    for(const line of readFileSync(file).toString().split(/\r?\n/)){
        if(line.indexOf("/* jaaCSS:")!==-1){
            if(type!==1)
                content[type]= content[type].join("\n");
            type+= 1;
            continue;
        }
        if(type!==1||line.trim())
            content[type].push(line);
    }
    if(type!==1)
        content[type]= content[type].join("\n");
    file_path= file;
    file_data= [ mtime, ...content ];
    return file_data;
}