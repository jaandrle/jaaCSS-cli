gulp_place("consts/cp_cnv_csv.sub.js", "file_once");/* global cp */
gulp_place("utils/toCamelCase.sub.js", "file_once");/* global toCamelCase */
gulp_place("./toClassValue.sub.js", "file_once");/* global toClassValue */

function fromCSS(param){
    const [ idxF, idxL ]= [ "index", "lastIndex" ].map(n=> param[n+"Of"](":"));
    if(idxF!==idxL) return fromCSSMultiple(param);
    const [ property, value ]= param.split(":").map(w=> w.replace(";", "").trim());
    const className_pre= Reflect.has(cp, property) ? Reflect.get(cp, property) :  toCamelCase(property);
    return [ className_pre+toClassValue(property, value), property+": "+value+";" ];
}
function fromCSSMultiple(param){
    const params= param.split(";").map(l=> l.trim()).filter(Boolean);
    const [ f, l ]= params.map(l=> l.split("-")[0]);
    if(f!==l) return params.forEach(fromCSS);
    const params_entries= params.map(param=> param.split(":").map(w=> w.replace(";", "").trim()));
    const className_post= params_entries.map(([p])=> p.split("-")[1][0].toUpperCase()).join("");
    const values= params_entries.map(([p,v])=> `${p}: ${v};`).join(" ");
    return [ f+className_post+toClassValue(f, params_entries[0][1]), values ];
}