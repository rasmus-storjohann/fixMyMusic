"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClassicalWorkName_1 = require("./../../../businessInterfaces/fixers/ClassicalWorkName");
const Details = require("./parserDetails");
function buildClassicalWorkName(json) {
    // TODO throw if more than one elements in keys
    // TODO throw if opus has the wrong number of elements
    // TODO support different opus prefixes
    // TODO throw if major and minor are both given
    var form = Object.keys(json)[0];
    var body = json[form];
    var instrument = Details.toString(body, "for");
    var num = Details.toNumber(body, "num");
    var opus = parseOpus(body);
    var subTitle = Details.toString(body, "subTitle");
    var performer = Details.toString(body, "by");
    var major = Details.toString(body, "major");
    var minor = Details.toString(body, "minor");
    var result = new ClassicalWorkName_1.ClassicalWorkName(form, instrument, num, opus, subTitle, performer, major, minor);
    return validateClassicalWorkName(result);
}
exports.buildClassicalWorkName = buildClassicalWorkName;
function validateClassicalWorkName(name) {
    removeUndefinedFields(name);
    validateMajorMinor(name);
    return name;
}
function validateMajorMinor(name) {
    if (name.major && name.minor) {
        throw new Error("major and minor keys given");
    }
}
function parseOpus(from) {
    var validPrefixes = ["op", "K", "R", "BWV", "HWV"];
    for (let prefix of validPrefixes) {
        var opus = from[prefix];
        if (Array.isArray(opus)) {
            validateLengthIsTwo(opus);
            return {
                opus: opus[0],
                num: opus[1],
                prefix: prefix
            };
        }
        else if (Details.isNumber(opus)) {
            return {
                opus: opus,
                prefix: prefix
            };
        }
    }
    return undefined;
}
function removeUndefinedFields(anObject) {
    Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
}
function validateLengthIsTwo(item) {
    if (item.length !== 2) {
        throw new Error("invalid opus array, should have two elements");
    }
}
