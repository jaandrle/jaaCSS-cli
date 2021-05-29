const shell_cmds= [
    "q: Quit interactive shell",
    " : Just echo full rule (e.g. `fontS__1`)",
    "?: Searching registered rules (e.g. `? fontS`)",
    "+: Add rule to the file (e.g. `+ fontS__1`)",
    "-: Remove rule to the file (e.g. `- fontS__1`)",
    "!: Add rule by full recepy (e.g. `! color__urgent { color: red; }`",
    "=: [WIP] Compare classes in CSS like file and HTML like one (`>` only in CSS | `<` only in HTML)",
    "@: Converting class names (for example from HTML) to the CSS rules/SASS includes."
];
const shell_cmds_l= shell_cmds.map(line=> (l=> l==="q"?"@R_q@g_":l)(line.charAt(0))).join("/");