gulp_place("utils/log.sub.js", "file_once");/* global log */
gulp_place("./showHTML.sub.js", "file_once"); /* global showHTML */
gulp_place("./fileDataCSS.sub.js", "file_once"); /* global fileDataCSS */

function compareFiles(file_css, file_other){
    const classes_other= showHTML({ param: file_other });
    const classes_css= fileDataCSS(file_css)[2].map(l=> /\.([^ \{]+) *\{/.exec(l)[1]);
    const classes_together= new Set([ ...classes_css, ...classes_other ]);
    classes_together.forEach(function(c){
        const status= compareNth(c);
        if(status==="=") return false;
        log(1, c+": "+status);
    });
    function compareNth(c){
        const in_css= classes_css.indexOf(c)!==-1;
        const in_other= classes_other.indexOf(c)!==-1;
        return in_css&&in_other ? "=" : ( in_css ? ">" : "<" );
    }
}