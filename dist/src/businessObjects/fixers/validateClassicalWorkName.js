"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateClassicalWorkName(name) {
    removeUndefinedFields(name);
    validateMajorMinor(name);
    return name;
}
exports.validateClassicalWorkName = validateClassicalWorkName;
// TODO does this remove elements that are falsy, such as "", false, 0?
function removeUndefinedFields(anObject) {
    Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
}
function validateMajorMinor(name) {
    if (name.major && name.minor) {
        throw new Error("major and minor keys given");
    }
}
