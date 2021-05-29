function isFileExtEq(file, target= "scss"){
    return file.slice(-target.length-1)==="."+target;
}