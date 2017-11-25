"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildAlbumFixer_1 = require("./details/buildAlbumFixer");
function parseAlbumFixer(json) {
    var parsed = JSON.parse(json);
    return buildAlbumFixer_1.buildAlbumFixer(parsed);
}
exports.parseAlbumFixer = parseAlbumFixer;
