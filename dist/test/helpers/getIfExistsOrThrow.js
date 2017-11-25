"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIfExistsOrThrow(value, names) {
    if (names.length === 0) {
        return value;
    }
    var child = value[names[0]];
    if (!child) {
        throw new Error(names[0] + " is null");
    }
    return getIfExistsOrThrow(child, names.slice(1));
}
exports.getIfExistsOrThrow = getIfExistsOrThrow;
