'use strict';
const { app, scripts, gulp: { src, dest } }= global; /* exported app */ 
const { createWriteStream }= require("fs");
const { spawn }= require("child_process");
const dos2unix= require("gulp-dos2unix-js");
const jsbeautifier= require("gulp-jsbeautifier");
const gulpPlace= require("gulp-place")({
    /* jshint -W061 */
    variable_eval: str=> eval(str),
    /* jshint +W061 */
    filesCleaner: require("./gulp_cleanJSHINT.js") });

Object.assign(exports, { javascript });

function javascript(){
    const folder= app.targets.from;
    return jsHint_(folder)
    .then(()=> gulpToPromise_(
        src([ `${folder}*.js`, `!${folder}*.sub.js` ])
        .pipe(gulpPlace({ folder, string_wrapper: '"' }))
        .pipe(jsbeautifier({
            indent_size: 2,
            brace_style: "collapse",
            jslint_happy: true,
            preserve_newlines: false,
        }))
        .pipe(dest(app.targets.to))
    ))
    .then(()=> gulpToPromise_(
        src([ app.targets.to ])
        .pipe(dos2unix())
        .pipe(dest(app.targets.to))
    ));
}

function jsHint_(files_for_lint){
    const { log }= app.targets;
    const [ jshint_cmd, ...jshint_rest ]= scripts.jshint.split(" ");
    return new Promise(function(resolve,reject){
        const log_stream= createWriteStream(log);
        
        const cmd= spawn(jshint_cmd, [...jshint_rest, files_for_lint], {});
        cmd.stdout.pipe(log_stream);
        cmd.stderr.pipe(log_stream);
        cmd.on('close', code=> code ? reject(new Error(`JSHint error(s), see '${log}'`)) : resolve());
    });
}
function gulpToPromise_(_gulp){
    return new Promise(function(resolve,reject){
        _gulp.on("end", e=> e ? reject(e) : resolve());
    });
}