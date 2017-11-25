"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const mapFilesToTracks_1 = require("../../src/businessObjects/tracks/mapFilesToTracks");
const npmlog = require("npmlog");
mocha_1.beforeEach(() => {
    npmlog.level = 'silent';
});
mocha_1.describe("TrackFactory", () => {
    function mapToTracks(path) {
        let paths = [path];
        let files = mapFilesToTracks_1.mapFilesToTracks(paths, npmlog);
        return files[0];
    }
    mocha_1.describe("with valid path", () => {
        var _track;
        mocha_1.beforeEach(() => {
            var validPath = "root/artist/album/01 track.mp3";
            _track = mapToTracks(validPath);
        });
        mocha_1.it("Gets the artist name from path", () => { chai_1.expect(_track.artist).equals("artist"); });
        mocha_1.it("Gets the album name from path", () => { chai_1.expect(_track.album).equals("album"); });
        mocha_1.it("Gets the track number from the path", () => { chai_1.expect(_track.trackNumber).equals(1); });
        mocha_1.it("Gets the track name from path", () => { chai_1.expect(_track.title).equals("track"); });
    });
    mocha_1.describe("with path containing disk id", () => {
        var _track;
        mocha_1.beforeEach(() => {
            var deepPath = "root/artist/album/disk02/01 track.mp3";
            _track = mapToTracks(deepPath);
        });
        mocha_1.it("Gets the artist name from path", () => { chai_1.expect(_track.artist).equals("artist"); });
        mocha_1.it("Gets the album name from path", () => { chai_1.expect(_track.album).equals("album"); });
        mocha_1.it("Gets the disk id from the path", () => { chai_1.expect(_track.disk).equals(2); });
        mocha_1.it("Gets the track number from the path", () => { chai_1.expect(_track.trackNumber).equals(1); });
        mocha_1.it("Gets the track name from path", () => { chai_1.expect(_track.title).equals("track"); });
    });
    mocha_1.describe("with track name containing disk id", () => {
        var _track;
        mocha_1.beforeEach(() => {
            var path = "root/artist/album/Disc 2 - 01 - track.mp3";
            _track = mapToTracks(path);
        });
        mocha_1.it("Gets the artist name from path", () => { chai_1.expect(_track.artist).equals("artist"); });
        mocha_1.it("Gets the album name from path", () => { chai_1.expect(_track.album).equals("album"); });
        mocha_1.it("Gets the disk id from the path", () => { chai_1.expect(_track.disk).equals(2); });
        mocha_1.it("Gets the track number from path", () => { chai_1.expect(_track.trackNumber).equals(1); });
        mocha_1.it("Gets the track name from path", () => { chai_1.expect(_track.title).equals("track"); });
    });
    mocha_1.describe("with track name containing disk id in d1t01 format", () => {
        var _track;
        mocha_1.beforeEach(() => {
            var path = "root/artist/album/d2t01. track.mp3";
            _track = mapToTracks(path);
        });
        mocha_1.it("Gets the artist name from path", () => { chai_1.expect(_track.artist).equals("artist"); });
        mocha_1.it("Gets the album name from path", () => { chai_1.expect(_track.album).equals("album"); });
        mocha_1.it("Gets the disk id from the path", () => { chai_1.expect(_track.disk).equals(2); });
        mocha_1.it("Gets the track number from path", () => { chai_1.expect(_track.trackNumber).equals(1); });
        mocha_1.it("Gets the track name from path", () => { chai_1.expect(_track.title).equals("track"); });
    });
    mocha_1.describe("with track number", () => {
        mocha_1.it("of just one digit", () => {
            let track = mapToTracks("root/artist/album/1 track.mp3");
            chai_1.expect(track.trackNumber).equals(1);
            chai_1.expect(track.title).equals("track");
        });
        mocha_1.it("with trailing dot", () => {
            let track = mapToTracks("root/artist/album/1. track.mp3");
            chai_1.expect(track.trackNumber).equals(1);
            chai_1.expect(track.title).equals("track");
        });
    });
    mocha_1.describe("with deep path", () => {
        var _track;
        mocha_1.beforeEach(() => {
            var deepPath = "the/deep/path/artist/album/01 track.mp3";
            _track = mapToTracks(deepPath);
        });
        mocha_1.it("looks at three last path elements", () => {
            chai_1.expect(_track.artist).equals("artist");
            chai_1.expect(_track.album).equals("album");
            chai_1.expect(_track.trackNumber).equals(1);
            chai_1.expect(_track.title).equals("track");
        });
    });
    mocha_1.it("throws on track missing numeric prefix", () => {
        var pathWithoutNumericPrefix = "root/artist/album/track.mp3";
        chai_1.expect(() => {
            mapToTracks(pathWithoutNumericPrefix);
        }).to.throw(Error, /Could not parse file names/);
    });
    mocha_1.describe("error handling", () => {
        mocha_1.it("throws on path that is missing required elements", () => {
            var tooShortPath = "album/track.mp3";
            chai_1.expect(() => {
                mapToTracks(tooShortPath);
            }).to.throw(Error, /Invalid path to music file/);
        });
    });
});
