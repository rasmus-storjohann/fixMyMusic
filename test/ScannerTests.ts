/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Scanner } from "../src/Scanner";

var _theScanner : Scanner;
beforeEach(() =>
{
    _theScanner = new Scanner();
});

describe("Scanner", () => {
    describe("with valid path", () => {
        var _scanned;
        beforeEach(() =>
        {
            var validPath = "root/artist/album/01 track.mp3";
            _scanned = _theScanner.scan(validPath);
        });

        it("Gets the artist name from path", () => {
            chai.expect(_scanned.artist).equals("artist");
        });

        it("Gets the album name from path", () => {
            chai.expect(_scanned.album).equals("album");
        });

        it("Gets the track name from path", () => {
            chai.expect(_scanned.track).equals("01 track.mp3");
        });

        it("Gets the track number from path", () => {
            chai.expect(_scanned.trackNumber).equals(1);
        });
    });

    describe("with deep path", () => {
        var _scanned;
        beforeEach(() =>
        {
            var deepPath = "the/deep/path/artist/album/01 track.mp3";
            _scanned = _theScanner.scan(deepPath);
        });

        it("looks at three last path elements", () => {
            chai.expect(_scanned.artist).equals("artist");
            chai.expect(_scanned.album).equals("album");
            chai.expect(_scanned.track).equals("01 track.mp3");
        });
    });

    describe("with track missing numeric prefix", () => {
        var _scanned;
        beforeEach(() =>
        {
            var pathWithoutNumericPrefix = "root/artist/album/track.mp3";
            _scanned = _theScanner.scan(pathWithoutNumericPrefix);
        });
        it("gets the track name from path", () => {
            chai.expect(_scanned.track).equals("track.mp3");
        });
        it("track number is null", () => {
            chai.expect(_scanned.trackNumber).equals(undefined);
        });
    });
});
