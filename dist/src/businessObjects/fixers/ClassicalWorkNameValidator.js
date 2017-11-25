"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassicalWorkNameValidator {
    validate(name) {
        this.removeUndefinedFields(name);
        this.validateMajorMinor(name);
        return name;
    }
    // TODO does this remove elements that are falsy, such as "", false, 0?
    removeUndefinedFields(anObject) {
        Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
    }
    validateMajorMinor(name) {
        if (name.major && name.minor) {
            throw new Error("major and minor keys given");
        }
    }
}
exports.ClassicalWorkNameValidator = ClassicalWorkNameValidator;
