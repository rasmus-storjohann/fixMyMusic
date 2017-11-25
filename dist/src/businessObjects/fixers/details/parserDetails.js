"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toString(from, field) {
    return isString(from[field]) ? from[field] + "" : undefined;
}
exports.toString = toString;
function isString(s) { return s && s + "" === s; }
exports.isString = isString;
function toNumber(from, field) {
    return isNumber(from[field]) ? from[field] + 0 : undefined;
}
exports.toNumber = toNumber;
function isNumber(n) { return n && n + 0 === n; }
exports.isNumber = isNumber;
