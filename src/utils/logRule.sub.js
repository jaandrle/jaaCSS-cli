gulp_place("./log.sub.js", "file_once");/* global log */
/**
 * @param {T_log_intendantion} tab 
 * @param {T_css_array} css_array
 */
function logRule(tab, [ selector, values ]){ return log(tab, `.${selector} { ${values} }`); }