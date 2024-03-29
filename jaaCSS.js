#!/usr/bin/env node

/* jshint maxcomplexity: 12, maxdepth: 3 */
/**
 * @typedef T_info_cmd
 * @type {object}
 * @property {string} cmd Internal command name
 * @property {string[]} args External command name (via terminal)
 * @property {string|string[]} desc Description
 * @property {string} [param] Param identificator
 */
const info = {
  name: __filename.slice(__filename.lastIndexOf("/") + 1, __filename.lastIndexOf(".")),
  version: "1.3.1",
  description: "EXPERIMENT – Helper for managing functional CSS classes",
  cwd: process.cwd(),
  /** @type {T_info_cmd[]} */
  commands: [{
    cmd: "help",
    args: ["--help", "-h"],
    desc: "Shows this text"
  }, {
    cmd: "init",
    args: ["--init"],
    param: "css_like_file",
    desc: ["Creates inital file structure with `jaaCSS` section", "The section is separated by comments `/* jaaCSS:start/end */`", "This command/step can be ommited,", "the `-I` will do it itself, if the section doesn’t exists."]
  }, {
    cmd: "html",
    args: ["--html"],
    param: "html_like_file",
    desc: ["[WIP] Show classes from HTML"]
  }, {
    cmd: "shell",
    args: ["--interactive", "-I"],
    param: "css_like_file",
    desc: ["Interactive shell for manipulating with `jaaCSS` section.", "With prefixes +/- you can add/remove styles from file (e.g. `+ fontS__1`).", "With prefix '?' you can filter existing rules.", "Using @e_'q'@R_ quits shell and program.", "Without prefixes it works as `--eval`."]
  }, {
    cmd: "eval",
    args: ["--eval"],
    param: "value_c",
    desc: "Just console log conversion"
  }],
  params: {
    css_like_file: "CSS (like) file",
    html_like_file: "HTML (like) file",
    value_c: ["The value part for evaluing in the form:", "  - `property: value;` …or", "  - `property__value`"]
  }
};
const colors = {
  e: "\x1b[38;2;252;76;76m",
  s: "\x1b[38;2;76;252;125m",
  w: "\x1b[33m",
  R: "\x1b[0m",
  y: "\x1b[38;2;200;190;90m",
  g: "\x1b[38;2;150;150;150m"
};
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
function log(tab, text) {
  return console.log("  ".repeat(tab) + text.replace(/@(\w)_/g, (_, m) => colors[m]) + colors.R);
}
/**
 * Shows error log and exits with `1`
 * @param {Error|string} e Error
 */
function error(e) {
  const message = e instanceof Error ? e.message : e;
  const help_text = `@w_See help using '${info.commands[0].args[0]}'.`;
  log(1, `@e_Error: ${message} ${help_text}`);
  return process.exit(1);
}
/**
 * @typedef T_cli_arg
 * @type {object}
 * @property {T_info_cmd} command
 * @property {string} param
 */
/**
 * Process cli arguments
 * @param {string[]} args 
 * @returns {T_cli_arg}
 */
function getCurrent(args) {
  let command, param, options = {};
  const inArgsList = arg => ({
    args
  }) => args.includes(arg);
  for (let i = 0, {
      length
    } = args, ci, arg; i < length; i++) {
    arg = args[i];
    ci = info.commands.findIndex(inArgsList(arg));
    if (ci === -1) {
      const arg_next = args[i + 1];
      const is_arg_next_name = !arg_next || arg_next.indexOf("--") === 0;
      Reflect.set(options, arg.replace("--", ""), is_arg_next_name ? true : arg_next);
      if (!is_arg_next_name) i += 1;
      continue;
    }
    command = info.commands[ci];
    if (!command.param) continue;
    i += 1;
    param = args[i];
  }
  if (!command) command = {
    cmd: ""
  };
  if (command.param && typeof param === "undefined") return error(`Missign argument(s).`);
  return {
    command,
    param,
    options
  };
}
/**
 * @param {T_log_intendantion} tab
 * @param {T_log_string[]|string[]} multiline_text 
 */
function logLines(tab, multiline_text) {
  if (!Array.isArray(multiline_text)) multiline_text = multiline_text.split(/(?<=\.) /g);
  return log(tab, multiline_text.join("\n" + "  ".repeat(tab)));
}
/**
 * @param {T_log_intendantion} tab 
 * @param {T_css_array} css_array
 */
function logRule(tab, [selector, values]) {
  return log(tab, `.${selector} { ${values} }`);
}

function printHelp() {
  log(1, "@s_Help:");
  log(2, "Commands:");
  info.commands.forEach(({
    args,
    param,
    desc
  }) => {
    const args_text = args.join("|");
    param = param ? " " + param : "";
    log(3, `@g_${args_text}@R_${param}`);
    logLines(4, desc);
  });
  log(2, "Params:");
  for (const [param, desc] of Object.entries(info.params)) {
    log(3, `@g_${param}`);
    logLines(4, desc);
  }
}

function printMain() {
  const {
    name,
    version,
    description
  } = info;
  log(1, `@w_${name}@${version}`);
  log(1, description);
  const cmds = info.commands.map(({
    args
  }) => args[0].replace("--", "")).join(", ");
  log(1, `@w_Usage: ${name} --[cmd] [param]`);
  log(2, `…cmd: ${cmds}`);
  log(2, "…param: Based on cmd\n");
}

function toCamelCase(property) {
  return property.split(/[- ]/).map((t, i) => i ? t[0].toUpperCase() + t.slice(1) : t).join("");
}

function filePathExpanded(file_path) {
  if (file_path.slice(0, file_path.indexOf("/")).slice(-1) !== ".") return file_path;
  // ./a-z | ../a-z
  return file_path[1] !== "." ? info.cwd + file_path.slice(1) : info.cwd.slice(0, info.cwd.lastIndexOf("/")) + file_path.slice(2);
}
const {
  existsSync,
  statSync,
  readFileSync,
  writeFileSync
} = require("fs");

function showHTML({
  param: file
}) {
  file = filePathExpanded(file);
  if (!existsSync(file)) return [""];
  let out = new Set();
  const is_jaaCSS = c => c.indexOf("__") !== -1;
  const append = c => out.add(c);
  for (const line of readFileSync(file).toString().split(/\r?\n/)) {
    const reg = /class=(?:"|')([^"']*)(?:"|')/.exec(line);
    if (!reg || !is_jaaCSS(reg[1])) continue;
    reg[1].split(/ +/).filter(is_jaaCSS).forEach(append);
  }
  out = Array.from(out).sort();
  return out;
}
let file_path;
let file_data;

function fileModification(file) {
  try {
    const {
      mtime
    } = statSync(file);
    return mtime;
  } catch (error) {
    log(1, error.message ? error.message : error);
    return Date.now();
  }
}

function fileDataCSS(file) {
  file = filePathExpanded(file);
  if (!existsSync(file)) {
    file_path = file;
    file_data = [Date.now(), "", [], ""];
    return file_data;
  }
  const mtime = fileModification(file);
  if (file_data && file_path === file && mtime <= file_data[0]) return file_data;
  const content = [
    [],
    [],
    []
  ];
  let type = 0;
  for (const line of readFileSync(file).toString().split(/\r?\n/)) {
    if (line.indexOf("/* jaaCSS:") !== -1) {
      if (type !== 1) content[type] = content[type].join("\n");
      type += 1;
      continue;
    }
    if (type !== 1 || line.trim()) content[type].push(line);
  }
  if (type !== 1) content[type] = content[type].join("\n");
  file_path = file;
  file_data = [mtime, ...content];
  return file_data;
}

function saveFileCSS() {
  const [, pre = "", curr = [], post = ""] = file_data || [];
  const data = ([pre, "/* jaaCSS:start */",
    curr.join("\n"), "/* jaaCSS:end */",
    post
  ]).join("\n");
  writeFileSync(file_path, data);
  if (file_data) file_data[0] = fileModification(file_path);
}

function initCSS({
  param: file
}) {
  if (!file) throw Error("No 'file' defined");
  fileDataCSS(file);
  saveFileCSS();
}
const shell_cmds = ["q: Quit interactive shell", " : Just echo full rule (e.g. `fontS__1`)", "?: Searching registered rules (e.g. `? fontS`)", "+: Add rule to the file (e.g. `+ fontS__1`)", "-: Remove rule to the file (e.g. `- fontS__1`)", "!: Add rule by full recepy (e.g. `! color__urgent { color: red; }`", "=: [WIP] Compare classes in CSS like file and HTML like one (`>` only in CSS | `<` only in HTML)", "@: Converting class names (for example from HTML) to the CSS rules/SASS includes."];
const shell_cmds_l = shell_cmds.map(line => (l => l === "q" ? "@R_q@g_" : l)(line.charAt(0))).join("/");

function isFileExtEq(file, target = "scss") {
  return file.slice(-target.length - 1) === "." + target;
}

function toCSSRule(file, name, rule) {
  if (isFileExtEq(file, "scss")) return `@mixin ${name} { ${rule} } .${name} { @include ${name}(); }`;
  if (isFileExtEq(file, "styl")) return `${name}() { ${rule} } .${name} { ${rule}; }`;
  return `.${name} { ${rule} }`;
}

function updateFile(file, op, [name, rule]) {
  log(2, op === "+" ? "@s_adding…" : "@e_removing…");
  logRule(2, [name, rule]);
  const [, , rules] = fileDataCSS(file);
  if (op === "-") file_data[2] = rules.filter(l => l.indexOf(name.trim() + " ") === -1);
  else {
    rules.push(toCSSRule(file, name, rule));
    rules.sort();
  }
  saveFileCSS();
}

function updateFileCustom(file, rule_full) {
  log(2, "@s_adding…");
  const [name_candidate, rule_candidate] = rule_full.split(/ *(?:\{|\}) */);
  const name = name_candidate[0] === "." ? name_candidate.slice(1) : name_candidate;
  const rule = rule_candidate + (rule_candidate[rule_candidate.length - 1] === ";" ? "" : ";");
  const [, , rules] = fileDataCSS(file);
  const rule_final = toCSSRule(file, name, rule);
  log(2, rule_final);
  rules.push(rule_final);
  rules.sort();
  saveFileCSS();
}

function compareFiles(file_css, file_other) {
  const classes_other = showHTML({
    param: file_other
  });
  const classes_css = fileDataCSS(file_css)[2].map(l => /\.([^ \{]+) *\{/.exec(l)[1]);
  const classes_together = new Set([...classes_css, ...classes_other]);
  classes_together.forEach(function (c) {
    const status = compareNth(c);
    if (status === "=") return false;
    log(1, c + ": " + status);
  });

  function compareNth(c) {
    const in_css = classes_css.indexOf(c) !== -1;
    const in_other = classes_other.indexOf(c) !== -1;
    return in_css && in_other ? "=" : (in_css ? ">" : "<");
  }
}
/**
 * convert properties (defines aliases e.g.: "font-size"→"fontS)
 * @type {object}
 */
const cp = JSON.parse(`{
    "font-size":"fontS","font-weight":"fontW","text-align":"textA","text-transform":"textT","line-height":"lineH","white-space":"whiteS",
    "object-fit":"objectF",
    "justify-content":"F_justify","justify-self":"F_justifyS","align-items":"F_align","align-self":"F_alignS","flex":"F_size","flex-flow":"F_flow",
    "min-height":"minH","max-height":"maxH","min-width":"minW","max-width":"maxW",
    "padding-top":"paddingT","padding-right":"paddingR","padding-bottom":"paddingB","padding-left":"paddingL",
    "margin-top":"marginT","margin-right":"marginR","margin-bottom":"marginB","margin-left":"marginL"}`);
/**
 * convert number values (defines default measumerents e.g.: "fontS__1"→"font-size: 1rem")
 * @type {object}
 */
const cnv = JSON.parse(`{
    "font-size":"rem","line-height":"em",
    "margin":"rem","margin-top":"rem","margin-right":"rem","margin-bottom":"rem","margin-left":"rem",
    "padding":"rem","padding-top":"rem","padding-right":"rem","padding-bottom":"rem","padding-left":"rem",
    "width":"%","height":"%","min-width":"%","min-height":"%","max-width":"%","max-height":"%"}`);
/**
 * convert string values (defines aliases e.g.: "flex-end"→"fE")
 * @type {object}
 */
const csv = JSON.parse(`{
    "max-content":"maxC","min-content":"minC","fit-content":"fitC",
    "flex":"f","block":"b","relative":"r","absolute":"a",
    "left":"l","right":"r","center":"c",
    "column nowrap":"cN","column wrap":"cW","row nowrap":"rN","row wrap":"rW","flex-start":"fS","flex-end":"fE","space-between":"sB","space-evenly":"sE",
    "uppercase":"uCase","lowercase":"lCase"}`);

function testMultipleValuesCSV(i, property) {
  if (i !== 5) return true;
  return property === "position";
}

function toClassValue(property, value) {
  if (!/\d/.test(value)) return "__" + (Reflect.has(csv, value) ? Reflect.get(csv, value) : toCamelCase(value));
  if (/ /.test(value)) return "__" + value.replace(/%/g, "pct").replace(/ /g, "_");
  const [number, measurement = ""] = value.split(/(?<=\d)(?=[a-zA-Z])/);
  const number_s = parseFloat(number).toString().split("").map(l => l === "-" ? "m" : (l === "." ? "d" : l)).join("");
  return "__" + number_s + (Reflect.get(cnv, property) === measurement ? "" : measurement.replace(/%/g, "pct"));
}

function toValue(property, value) {
  if (!/\d/.test(value)) return value.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  value = value.replace(/pct/g, "%").replace(/^m/, "-").replace(/_/g, " ").replace(/(\d)d(\d)/, (_, d1, d2) => (d1 === "0" ? "" : d1) + "." + d2);
  if (!/\d$/.test(value) || value === "0") return value;
  return value + (Reflect.has(cnv, property) ? Reflect.get(cnv, property) : "");
}

function fromClass(param) {
  if (/[TBLR][TBLR]/.test(param)) return fromClassMultiple(param);
  let [to_property, to_value] = param.split("__");
  const p_idx = Object.values(cp).indexOf(to_property);
  const property = p_idx !== -1 ? Object.keys(cp)[p_idx] : to_property.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  if (p_idx === -1 && typeof cp[property] !== "undefined") to_property = cp[property];
  const v_idx = Object.values(csv).findIndex((v, i) => v === to_value && testMultipleValuesCSV(i, property));
  const value = v_idx !== -1 ? Object.keys(csv)[v_idx] : toValue(property, to_value);
  return [to_property + toClassValue(property, value), property + ": " + value + ";"];
}

function fromClassMultiple(param) {
  const [to_property, to_value] = param.split("__");
  const slice = (str, i, l = str.length) => str.slice(0, l + i) + str.slice(l + i + 1);
  const p1 = fromClass(slice(to_property, -1) + "__" + to_value);
  const p2 = fromClass(slice(to_property, -2) + "__" + to_value);
  return [param, p1[1] + " " + p2[1]];
}

function fromCSS(param) {
  const [idxF, idxL] = ["index", "lastIndex"].map(n => param[n + "Of"](":"));
  if (idxF !== idxL) return fromCSSMultiple(param);
  const [property, value] = param.split(":").map(w => w.replace(";", "").trim());
  const className_pre = Reflect.has(cp, property) ? Reflect.get(cp, property) : toCamelCase(property);
  return [className_pre + toClassValue(property, value), property + ": " + value + ";"];
}

function fromCSSMultiple(param) {
  const params = param.split(";").map(l => l.trim()).filter(Boolean);
  const [f, l] = params.map(l => l.split("-")[0]);
  if (f !== l) return params.forEach(fromCSS);
  const params_entries = params.map(param => param.split(":").map(w => w.replace(";", "").trim()));
  const className_post = params_entries.map(([p]) => p.split("-")[1][0].toUpperCase()).join("");
  const values = params_entries.map(([p, v]) => `${p}: ${v};`).join(" ");
  return [f + className_post + toClassValue(f, params_entries[0][1]), values];
}

function fromMixed(convert_candidate) {
  const is_css = /:/.test(convert_candidate);
  if (!is_css && !/__/.test(convert_candidate)) throw new Error("May be typo?");
  return is_css ? fromCSS(convert_candidate) : fromClass(convert_candidate);
}

function fromClassToInclude(file, line) {
  log(1, "@g_printing…");
  const rules = line.split(" ").map(r => r.trim()).sort();
  const convertRule = isFileExtEq(file, "scss") ? r => `@include ${r}();` : (isFileExtEq(file, "styl") ? r => r + "();" : r => fromClass(r)[1]);
  logLines(1, rules.map(convertRule));
}
const {
  createInterface
} = require("readline");
async function shell_({
  param: file,
  options
}) {
  if (!file) throw Error("No 'file' defined");
  process.stdout.write(String.fromCharCode(27) + "]0;" + info.name + ": interactive mode" + String.fromCharCode(7));
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    historySize: 30
  });
  const filterFileData = line => fileDataCSS(file)[2].filter(l => l.indexOf(line.slice(1).trim()) !== -1).forEach(l => log(2, l));
  log(1, "@s_Interactive shell");
  logLines(1, shell_cmds);
  if (options.in) rl.write(options.in);
  while (true) {
    const line = await command_(rl);
    if (!line) continue;
    try {
      switch (line[0].toLowerCase()) {
      case "q":
        rl.close();
        return true;
      case "?":
        filterFileData(line);
        break;
      case "!":
        updateFileCustom(file, line.slice(1).trim());
        break;
      case "+":
      case "-":
        updateFile(file, line.slice(0, 1), fromMixed(line.slice(1).trim()));
        break;
      case "@":
        fromClassToInclude(file, line.slice(1).trim());
        break;
      case "=":
        compareFiles(file, line.slice(1).trim());
        break;
      default:
        log(1, "@g_printing…");
        logRule(1, fromMixed(line));
      }
    } catch (e) {
      log(1, e.message + " …exit with 'q'");
      continue;
    }
  }
}

function command_(rl) {
  return new Promise(function (resolve) {
    log(1, "@g_just write anything to converse or start line with: " + shell_cmds_l);
    rl.question("  : ", resolve);
  });
}
(async function main_() {
  const current = getCurrent(process.argv.slice(2));
  if (current.command.cmd !== "eval") printMain();
  switch (current.command.cmd) {
  case "help":
    return printHelp();
  case "html":
    return showHTML(current).forEach(c => log(1, c));
  case "init":
    return initCSS(current);
  case "shell":
    return shell_(current);
  case "eval":
    return logRule(0, fromMixed(current.param));
  }
})().then(() => process.exit()).catch(error);