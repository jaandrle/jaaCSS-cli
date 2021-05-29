'use strict';
const { app, scripts, gulp: { src, dest } }= global; /* exported app */ 
const { createWriteStream }= require("fs");
const { spawn }= require("child_process");
const gulpPlace= require("gulp-place")({
    /* jshint -W061 */
    variable_eval: str=> eval(str),
    /* jshint +W061 */
    filesCleaner: require("./gulp_cleanJSHINT.js") });

Object.assign(exports, { javascript });

function javascript(done){
    const folder= app.targets.from;
    src([ `${folder}*.js`, `!${folder}*.sub.js` ])
        .pipe(gulpPlace({ folder, string_wrapper: '"' }))
        .pipe(dest(app.targets.to))
        .on("end", e=> e ? done(e) : jsHint_(folder).then(done));
}
function jsHint_(files_for_lint){
    const { log }= app.targets;
    const [ jshint_cmd, ...jshint_rest ]= scripts.jshint.split(" ");
    return new Promise(function(resolve){
        const log_stream= createWriteStream(log);
        
        const cmd= spawn(jshint_cmd, [...jshint_rest, files_for_lint], {});
        cmd.stdout.pipe(log_stream);
        cmd.stderr.pipe(log_stream);
        cmd.on('close', code=> code ? resolve(new Error(`JSHint error(s), see '${log}'`)) : resolve());
    });
}
