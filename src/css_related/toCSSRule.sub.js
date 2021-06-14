gulp_place("fs_related/isFileExtEq.sub.js", "file_once");/* global isFileExtEq */

function toCSSRule(file, name, rule){
    if(isFileExtEq(file, "scss")) return `@mixin ${name} { ${rule} } .${name} { @include ${name}(); }`;
    if(isFileExtEq(file, "styl")) return `${name}() { ${rule} } .${name} { ${name}(); }`;
    
    return `.${name} { ${rule} }`;
}
