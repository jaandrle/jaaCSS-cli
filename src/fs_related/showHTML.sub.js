gulp_place("./filePathExpanded.sub.js", "file_once");/* global filePathExpanded */
gulp_place("./fs.sub.js", "file_once");/* global existsSync, readFileSync */
function showHTML({ param: file }){
    file= filePathExpanded(file);
    if(!existsSync(file)) return [""];
    let out= new Set();
    const is_jaaCSS= c=> c.indexOf("__")!==-1;
    const append= c=> out.add(c);
    for(const line of readFileSync(file).toString().split(/\r?\n/)){
        const reg= /class=(?:"|')([^"']*)(?:"|')/.exec(line);
        if(!reg||!is_jaaCSS(reg[1])) continue;
        reg[1].split(/ +/).filter(is_jaaCSS).forEach(append);
    }
    out= Array.from(out).sort();
    return out;
}
