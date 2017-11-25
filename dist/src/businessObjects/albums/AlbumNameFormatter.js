"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AlbumNameFormatter {
    create(format) {
        var result = "";
        if (format.instrument) {
            result += format.instrument;
        }
        result += this.buildForm(format.form);
        if (format.num) {
            result += " " + format.num; // TODO this can give a leading space
        }
        if (format.by) {
            result += " [" + format.by + "]";
        }
        if (format.subTitle) {
            result += " \"" + format.subTitle + "\"";
        }
        var key = this.buildKeyString(format);
        if (key) {
            result += " in " + key;
        }
        if (format.opus) {
            result += " " + this.buildOpusString(format.opus);
        }
        return result;
    }
    buildForm(form) {
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
    buildKeyString(format) {
        var key = format.major || format.minor;
        if (!key) {
            return undefined;
        }
        key = key.toLowerCase();
        if (format.major) {
            return this.capitalizeFirstLetter(key);
        }
        return key;
    }
    capitalizeFirstLetter(key) {
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
    buildOpusString(opus) {
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
}
exports.AlbumNameFormatter = AlbumNameFormatter;
