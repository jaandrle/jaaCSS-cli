# jaaCSS-cli
***Warning: WIP and for now mainly experiment***

## Overview
This is command line (terminal) tool for managing functional (atomic) CSS clases.
You can “connect” the script with CSS/SASS file by `node jaaCSS.js -I file_path` (on unix-like systems works without 'node ').

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

## CLI help
```
  jaaCSS@1.2.1
  EXPERIMENT – Helper for managing functional CSS classes
  Usage: jaaCSS --[cmd] [param]
    …cmd: help, init, html, interactive, eval
    …param: Based on cmd

  Help:
    Commands:
      --help|-h
        Shows this text
      --init css_like_file
        Creates inital file structure with `jaaCSS` section
        The section is separated by comments `/* jaaCSS:start/end */`
        This command/step can be ommited,
        the `-I` will do it itself, if the section doesn’t exists.
      --html html_like_file
        [WIP] Show classes from HTML
      --interactive|-I css_like_file
        Interactive shell for manipulating with `jaaCSS` section.
        With prefixes +/- you can add/remove styles from file (e.g. `+ fontS__1`).
        With prefix '?' you can filter existing rules.
        Using 'q' quits shell and program.
        Without prefixes it works as `--eval`.
      --eval value_c
        Just console log conversion
    Params:
      css_like_file
        CSS (like) file
      html_like_file
        HTML (like) file
      value_c
        The value part for evaluing in the form:
          - `property: value;` …or
          - `property__value`
```