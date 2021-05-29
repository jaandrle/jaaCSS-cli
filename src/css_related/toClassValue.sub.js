gulp_place("consts/cp_cnv_csv.sub.js", "file_once");/* global csv, cnv */
gulp_place("utils/toCamelCase.sub.js", "file_once");/* global toCamelCase */

function toClassValue(property, value){
    if(!/\d/.test(value)) return "__"+(Reflect.has(csv, value)?Reflect.get(csv, value):toCamelCase(value));
    if(/ /.test(value))
        return "__"+value.replace(/%/g, "pct").replace(/ /g, "_");
    const [ number, measurement= "" ]= value.split(/(?<=\d)(?=\D)/);
    const number_s= parseFloat(number).toString().split("").map(l=> l==="-"?"m":(l==="."?"d":l)).join("");
    return "__"+number_s+(Reflect.get(cnv, property)===measurement?"":measurement.replace(/%/g, "pct"));
}