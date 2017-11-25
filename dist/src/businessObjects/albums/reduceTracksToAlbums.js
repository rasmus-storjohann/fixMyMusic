"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Album_1 = require("../../Album");
function reduceTracksToAlbums(tracks, logger) {
    return tracks.sort(sortTracksByArtistAndAlbum)
        .reduce(groupByArtistAndAlbum(), [])
        .map(trackGroup => new Album_1.Album(trackGroup));
}
exports.reduceTracksToAlbums = reduceTracksToAlbums;
function sortTracksByArtistAndAlbum(first, second) {
    if (first.artist == second.artist) {
        if (first.album == second.album) {
            return 0;
        }
        return first.album < second.album ? -1 : 1;
    }
    return first.artist < second.artist ? -1 : 1;
}
function groupByArtistAndAlbum() {
    let firstTrackInAlbum = undefined;
    function isCurrentAlbum(track) {
        if (!firstTrackInAlbum) {
            return false;
        }
        return firstTrackInAlbum.artist === track.artist &&
            firstTrackInAlbum.album === track.album;
    }
    function reducer(accumulator, track, index, array) {
        if (!isCurrentAlbum(track)) {
            firstTrackInAlbum = track;
            accumulator.push([]);
        }
        accumulator[accumulator.length - 1].push(track);
        return accumulator;
    }
    return reducer;
}
