"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Album_1 = require("../../src/Album");
class AlbumBuilder {
    constructor() {
        this.tracks = [];
        this.init();
    }
    init() {
        this.artist = "aaaa";
        this.album = "bbbb";
        this.trackNumber = 2;
        this.trackTitle = "dddd";
        this.path = "eeee";
    }
    withArtist(value) {
        this.artist = value;
        return this;
    }
    withAlbum(value) {
        this.album = value;
        return this;
    }
    withTrackNumber(value) {
        this.trackNumber = value;
        return this;
    }
    withDiskNumber(value) {
        this.diskNumber = value;
        return this;
    }
    withTrackTitle(value) {
        this.trackTitle = value;
        return this;
    }
    withPath(value) {
        this.path = value;
        return this;
    }
    next() {
        this.tracks.push({
            artist: this.artist,
            album: this.album,
            trackNumber: this.trackNumber,
            title: this.trackTitle,
            path: this.path,
            disk: this.diskNumber
        });
        this.init();
        return this;
    }
    create() {
        this.next();
        return new Album_1.Album(this.tracks);
    }
}
exports.AlbumBuilder = AlbumBuilder;
