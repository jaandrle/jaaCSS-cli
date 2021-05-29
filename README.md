# jaaCSS-cli
***Warning: WIP and for now mainly experiment***

## Overview
This is command line (terminal) tool for managing functional (atomic) CSS clases.
You can „connect” the script with CSS/SASS file by `node jaaCSS.js -I file_path` (on unix-like systems works without 'node ').

It opens interactive promt with typical usage:
```terminal
? marginR
+ marginR__2
? fontS__1
- fontS__1
+ fontS__1d5
```
…in you web page, you wanted some right margin – so, you ask for already used margins, yet you decide to use new one. Analogously for font size.

More info for now only in source code [./src](./src).

## Example files
Modified files should look like:
- [./examples/example.css](./examples/example.css)
- [./examples/example.scss](./examples/example.css)