const XRegExp = require('xregexp');
 function isAlphabetic(char){
    if(XRegExp.match(char,/([A-Z]|[a-z])/) == null)
        return false;
    return true;
}
function isDigit(char){
    if(XRegExp.match(char,/[0-9]/) == null)
        return false;
    return true;
}
function isWhiteSpace(char){
    if(XRegExp.match(char,/\s/)== null)
        return false;
    return true;
}

exports.isAlphabetic = isAlphabetic;
exports.isDigit = isDigit;
exports.isWhiteSpace = isWhiteSpace;
