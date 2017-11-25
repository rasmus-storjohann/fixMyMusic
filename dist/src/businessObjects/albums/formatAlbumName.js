"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatAlbumName(format) {
    var result = "";
    if (format.instrument) {
        result += format.instrument;
    }
    result += buildForm(format.form);
    if (format.num) {
        result += " " + format.num; // TODO this can give a leading space
    }
    if (format.by) {
        result += " [" + format.by + "]";
    }
    if (format.subTitle) {
        result += " \"" + format.subTitle + "\"";
    }
    var key = buildKeyString(format);
    if (key) {
        result += " in " + key;
    }
    if (format.opus) {
        result += " " + buildOpusString(format.opus);
    }
    return result;
}
exports.formatAlbumName = formatAlbumName;
function buildForm(form) {
    switch (form) {
        case "cantata": return "Cantata";
        case "concerto": return "Conc";
        case "grosso": return "ConcGrosso";
        case "quartet": return "Quartet";
        case "quintet": return "Quintet";
        case "sonata": return "Sonata";
        case "suite": return "Suite";
        case "symphony": return "Symph";
        case "trio": return "Trio";
    }
    return form;
}
function buildKeyString(format) {
    var key = format.major || format.minor;
    if (!key) {
        return undefined;
    }
    key = key.toLowerCase();
    if (format.major) {
        return capitalizeFirstLetter(key);
    }
    return key;
}
function capitalizeFirstLetter(key) {
    return key.charAt(0).toUpperCase() + key.slice(1);
}
function buildOpusString(opus) {
    var prefix = opus.prefix;
    if (prefix === "op") {
        prefix = "Op.";
    }
    var result = prefix + opus.opus;
    if (opus.num) {
        result += "-" + opus.num;
    }
    return result;
}
