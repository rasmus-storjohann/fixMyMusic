"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildClassicalWorkName_1 = require("./details/buildClassicalWorkName");
function parseClassicalWorkName(json) {
    var from = JSON.parse(json);
    return buildClassicalWorkName_1.buildClassicalWorkName(from);
}
exports.parseClassicalWorkName = parseClassicalWorkName;
