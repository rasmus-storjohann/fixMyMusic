"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FixOptionsForOneArtist_1 = require("./../../businessInterfaces/fixers/FixOptionsForOneArtist");
const buildAlbumFixer_1 = require("./details/buildAlbumFixer");
function parseArtistFixer(json) {
    var result = new FixOptionsForOneArtist_1.FixOptionsForOneArtist();
    var parsed = JSON.parse(json);
    for (var album in parsed) {
        if (parsed.hasOwnProperty(album)) {
            result[album] = buildAlbumFixer_1.buildAlbumFixer(parsed[album]);
        }
    }
    return result;
}
exports.parseArtistFixer = parseArtistFixer;
