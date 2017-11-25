"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FixOptionsForOneArtist_1 = require("./../../businessInterfaces/fixers/FixOptionsForOneArtist");
const buildAlbumFixer_1 = require("./details/buildAlbumFixer");
// TODO parser should throw on both albumName and fixAlbumTitle being defined
function parseFixers(json) {
    var result = {};
    var parsed = JSON.parse(json);
    for (var artist in parsed) {
        if (parsed.hasOwnProperty(artist)) {
            result[artist] = new FixOptionsForOneArtist_1.FixOptionsForOneArtist();
            for (var album in parsed[artist]) {
                if (parsed[artist].hasOwnProperty(album)) {
                    result[artist][album] = buildAlbumFixer_1.buildAlbumFixer(parsed[artist][album]);
                }
            }
        }
    }
    return result;
}
exports.parseFixers = parseFixers;
