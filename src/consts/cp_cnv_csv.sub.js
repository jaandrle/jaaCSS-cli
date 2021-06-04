/**
 * convert properties (defines aliases e.g.: "font-size"→"fontS)
 * @type {object}
 */
const cp= JSON.parse(`{
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
const cnv= JSON.parse(`{
    "font-size":"rem","line-height":"em",
    "margin":"rem","margin-top":"rem","margin-right":"rem","margin-bottom":"rem","margin-left":"rem",
    "padding":"rem","padding-top":"rem","padding-right":"rem","padding-bottom":"rem","padding-left":"rem",
    "width":"%","height":"%","min-width":"%","min-height":"%","max-width":"%","max-height":"%"}`);
/**
 * convert string values (defines aliases e.g.: "flex-end"→"fE")
 * @type {object}
 */
const csv= JSON.parse(`{
    "max-content":"maxC","min-content":"minC","fit-content":"fitC",
    "flex":"f","block":"b","relative":"r","absolute":"a",
    "left":"l","right":"r","center":"c",
    "column nowrap":"cN","column wrap":"cW","row nowrap":"rN","row wrap":"rW","flex-start":"fS","flex-end":"fE","space-between":"sB","space-evenly":"sE",
    "uppercase":"uCase","lowercase":"lCase"}`);

function testMultipleValuesCSV(i, property){
    if(i!==5) return true;
    return property==="position";
}