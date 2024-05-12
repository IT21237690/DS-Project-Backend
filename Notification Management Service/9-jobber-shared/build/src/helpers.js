"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDataURL = exports.isEmail = exports.toUpperCase = exports.lowerCase = exports.firstLetterUppercase = void 0;
function firstLetterUppercase(str) {
    var valueString = str.toLowerCase();
    return valueString
        .split(' ')
        .map(function (value) {
        return "".concat(value.charAt(0).toUpperCase()).concat(value.slice(1).toLowerCase());
    })
        .join(' ');
}
exports.firstLetterUppercase = firstLetterUppercase;
function lowerCase(str) {
    return str.toLowerCase();
}
exports.lowerCase = lowerCase;
var toUpperCase = function (str) {
    return str ? str.toUpperCase() : str;
};
exports.toUpperCase = toUpperCase;
function isEmail(email) {
    var regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return regexExp.test(email);
}
exports.isEmail = isEmail;
function isDataURL(value) {
    var dataUrlRegex = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\\/?%\s]*)\s*$/i;
    return dataUrlRegex.test(value);
}
exports.isDataURL = isDataURL;
//# sourceMappingURL=helpers.js.map