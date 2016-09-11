/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { TrackFactory } from "../src/TrackFactory";

var _theScanner : TrackFactory;
beforeEach(() =>
{
    _theScanner = new TrackFactory();
});

describe("TrackFactory", () => {
    describe("with valid path", () => {
        var _scanned;
        beforeEach(() =>
        {
            var validPath = "root/artist/album/01 track.mp3";
            _scanned = _theScanner.createTrack(validPath);
        });

        it("Gets the artist name from path", () => {
            chai.expect(_scanned.artist).equals("artist");
        });

        it("Gets the album name from path", () => {
            chai.expect(_scanned.album).equals("album");
        });

        it("Gets the track name from path", () => {
            chai.expect(_scanned.title).equals("01 track.mp3");
        });
    });

    describe("with deep path", () => {
        var _scanned;
        beforeEach(() =>
        {
            var deepPath = "the/deep/path/artist/album/01 track.mp3";
            _scanned = _theScanner.createTrack(deepPath);
        });

        it("looks at three last path elements", () => {
            chai.expect(_scanned.artist).equals("artist");
            chai.expect(_scanned.album).equals("album");
            chai.expect(_scanned.title).equals("01 track.mp3");
        });
    });

    describe("with track missing numeric prefix", () => {
        var _scanned;
        beforeEach(() =>
        {
            var pathWithoutNumericPrefix = "root/artist/album/track.mp3";
            _scanned = _theScanner.createTrack(pathWithoutNumericPrefix);
        });

        it("still gets the track name from path", () => {
            chai.expect(_scanned.title).equals("track.mp3");
        });

        it("track number is null", () => {
            chai.expect(_scanned.trackNumber).equals(undefined);
        });
    });

    describe("error handling", () => {
        it("throws on path that is missing required elements", () => {
            var tooShortPath = "album/track.mp3";
            chai.expect(() => {
                _theScanner.createTrack(tooShortPath);
            }).to.throw(Error, /Invalid path to music file/);
        });
    });
});
