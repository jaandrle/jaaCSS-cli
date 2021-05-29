'use strict';
const gulp= require("gulp");
const { readFileSync }= require("fs");
const { join }= require("path");

const { scripts, version, description }= JSON.parse(readFileSync("package.json"));
const targets= { log: join(__dirname, "gulp", "build.log"), from: "src/", to: "." };
Object.assign(global, { gulp, scripts, app: { version, description, targets } });

const { javascript }= require("./gulp/task-javascript.js");

Object.assign(exports, {
    default: d=> gulp.parallel(javascript)(d)
});