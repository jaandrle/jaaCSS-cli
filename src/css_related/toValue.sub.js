gulp_place("consts/cp_cnv_csv.sub.js", "file_once");/* global cnv */

function toValue(property, value){
    if(!/\d/.test(value)) return value.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    value= value
        .replace(/pct/g, "%")
        .replace(/^m/, "-")
        .replace(/_/g, " ")
        .replace(/(\d)d(\d)/, (_, d1, d2)=> (d1==="0"?"":d1)+"."+d2);
    if(!/\d$/.test(value)||value==="0") return value;
    return value + ( Reflect.has(cnv, property)?Reflect.get(cnv, property):"" );
}