gulp_place("consts/cp_cnv_csv.sub.js", "file_once");/* global cp, csv */
gulp_place("./toClassValue.sub.js", "file_once");/* global toClassValue */
gulp_place("./toValue.sub.js", "file_once");/* global toValue */

function fromClass(param){
    if(/[TBLR][TBLR]/.test(param)) return fromClassMultiple(param);
    let [ to_property, to_value ]= param.split("__");
    const p_idx= Object.values(cp).indexOf(to_property);
    const property= p_idx!==-1 ? Object.keys(cp)[p_idx] : to_property.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    if(p_idx===-1&&typeof cp[property]!=="undefined") to_property= cp[property];
    const v_idx= Object.values(csv).indexOf(to_value);
    const value= v_idx!==-1 ? Object.keys(csv)[v_idx] : toValue(property, to_value);
    return [ to_property+toClassValue(property, value), property+": "+value+";" ];
}
function fromClassMultiple(param){
    const [ to_property, to_value ]= param.split("__");
    const slice= (str, i, l= str.length)=> str.slice(0, l+i)+str.slice(l+i+1);
    const p1= fromClass(slice(to_property, -1)+"__"+to_value);
    const p2= fromClass(slice(to_property, -2)+"__"+to_value);
    return [ param, p1[1]+" "+p2[1] ];
}