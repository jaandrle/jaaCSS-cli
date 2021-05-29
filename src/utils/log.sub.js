gulp_place("consts/colors.sub.js", "file_once");/* global colors */
/**
 * String with coloring support using `@_[eswRyg]` (error/success/warning/Reset/yellow/gray)
 * @typedef T_log_string
 * @type {string}
 */
/**
 * `tab` times double-space intendation
 * @typedef T_log_intendantion
 * @type {number}
 */
/**
 * Console log
 * @param {T_log_intendantion} tab 
 * @param {T_log_string|string} text 
 */
function log(tab, text){
    return console.log("  ".repeat(tab)+text.replace(/@(\w)_/g, (_, m)=> colors[m])+colors.R);
}