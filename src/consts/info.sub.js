/**
 * @typedef T_info_cmd
 * @type {object}
 * @property {string} cmd Internal command name
 * @property {string[]} args External command name (via terminal)
 * @property {string|string[]} desc Description
 * @property {string} [param] Param identificator
 */
const info= {
    name: __filename.slice(__filename.lastIndexOf("/")+1, __filename.lastIndexOf(".")),
    version: gulp_place("app.version", "variable"),
    description: gulp_place("app.description", "variable"),
    cwd: process.cwd(),
    /** @type {T_info_cmd[]} */
    commands: [
            {
            cmd: "help", args: [ "--help", "-h" ],
            desc: "Shows this text"
        },
        {
            cmd: "init", args: [ "--init" ], param: "css_like_file",
            desc: [
                "Creates inital file structure with `jaaCSS` section",
                "The section is separated by comments `/* jaaCSS:start/end */`",
                "This command/step can be ommited,",
                "the `-I` will do it itself, if the section doesn’t exists."
            ]
        },
        {
            cmd: "html", args: [ "--html" ], param: "html_like_file",
            desc: [
                "[WIP] Show classes from HTML"
            ]
        },
        {
            cmd: "shell", args: [ "--interactive", "-I" ], param: "css_like_file",
            desc: [
                "Interactive shell for manipulating with `jaaCSS` section.",
                "With prefixes +/- you can add/remove styles from file (e.g. `+ fontS__1`).",
                "With prefix '?' you can filter existing rules.",
                "Using @e_'q'@R_ quits shell and program.",
                "Without prefixes it works as `--eval`."
            ]
        },
        {
            cmd: "eval", args: [ "--eval" ], param: "value_c",
            desc: "Just console log conversion"
        }
    ],
    params: {
        css_like_file: "CSS (like) file",
        html_like_file: "HTML (like) file",
        value_c: [
            "The value part for evaluing in the form:",
            "  - `property: value;` …or",
            "  - `property__value`"
        ]
    }
};