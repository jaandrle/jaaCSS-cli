
function toCamelCase(property){
    return property.split(/[- ]/).map((t, i)=> i?t[0].toUpperCase()+t.slice(1):t).join("");
}