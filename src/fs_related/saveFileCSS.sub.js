gulp_place("./fs.sub.js", "file_once");/* global writeFileSync */
gulp_place("./fileModification.sub.js", "file_once");/* global fileModification */
gulp_place("./temp_vars.sub.js", "file_once");/* global file_path: true, file_data: true */

function saveFileCSS(){
    const [ , pre= "", curr= [], post= "" ]= file_data || [];
    const data= ([ pre,
        "/* jaaCSS:start */",
        curr.join("\n"),
        "/* jaaCSS:end */",
    post ]).join("\n");
    writeFileSync(file_path, data);
    if(file_data)
        file_data[0]= fileModification(file_path);
}