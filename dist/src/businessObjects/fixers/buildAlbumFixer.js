"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationOption_1 = require("./../../businessInterfaces/fixers/ValidationOption");
const buildClassicalWorkName_1 = require("./buildClassicalWorkName");
const Details = require("./parserDetails");
function buildAlbumFixer(from) {
    var firstTrackNumber = Details.toNumber(from, "firstTrackNumber");
    var fixTrackName = toRegExp(from, "fixTrackName");
    var classicalWorkName = toClassicalWorkName(from, "fixAlbumTitle");
    var albumName = Details.toString(from, "albumTitle");
    var validation = toValidationOptions(from, "validation");
    var fixTrackNameFunction = undefined;
    var options = {
        firstTrackNumber: firstTrackNumber,
        fixTrackName: fixTrackName,
        fixTrackNameFunction: fixTrackNameFunction,
        albumName: albumName,
        fixAlbumTitle: classicalWorkName,
        validation: validation
    };
    return stripUndefinedFieldsFromFixOptionsForOneAlbum(options);
}
exports.buildAlbumFixer = buildAlbumFixer;
function stripUndefinedFieldsFromFixOptionsForOneAlbum(options) {
    Object.keys(options).forEach((key) => (options[key] == null) && delete options[key]);
    return options;
}
function toRegExp(from, field) {
    return Details.isString(from[field]) ? new RegExp(from[field]) : undefined;
}
function toValidationOptions(from, field) {
    if (!isStringArray(from[field])) {
        return undefined;
    }
    return from[field].map(element => {
        switch (element) {
            case "skipUniqueTrackNameCheck":
                return ValidationOption_1.ValidationOption.skipUniqueTrackNameCheck;
            case "skipTrackNumberCheck":
                return ValidationOption_1.ValidationOption.skipTrackNumberCheck;
            default:
                throw new Error(element + ": Unknown validation option");
        }
    });
}
function toStringArray(from, field) {
    return isStringArray(from[field]) ? from[field] : undefined;
}
function isStringArray(s) {
    return s && s.length && s.every(item => Details.isString(item));
}
function toClassicalWorkName(from, field) {
    return from[field] ? buildClassicalWorkName_1.buildClassicalWorkName(from[field]) : undefined;
}
