gulp_place("./fromClass.sub.js", "file_once");/* global fromClass */
gulp_place("./fromCSS.sub.js", "file_once");/* global fromCSS */
function fromMixed(convert_candidate){
    const is_css= /:/.test(convert_candidate);
    if(!is_css&&!/__/.test(convert_candidate))
        throw new Error("May be typo?");
    return is_css ? fromCSS(convert_candidate) : fromClass(convert_candidate);
}