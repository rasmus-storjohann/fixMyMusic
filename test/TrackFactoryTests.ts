/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import * as log from "npmlog";
import { Track } from "../src/Track";
import { TrackFactory } from "../src/TrackFactory";

var _theTrackFactory : TrackFactory;
beforeEach(() =>
{
    log.level = 'silent';
    _theTrackFactory = new TrackFactory(log);
});

describe("TrackFactory", () => {
    describe("with valid path", () => {
        var _track: Track;
        beforeEach(() =>
        {
            var validPath = "root/artist/album/01 track.mp3";
            _track = _theTrackFactory.createTrack(validPath);
        });

        it("Gets the artist name from path", () => {
            chai.expect(_track.artist).equals("artist");
        });

        it("Gets the album name from path", () => {
            chai.expect(_track.album).equals("album");
        });

        it("Gets the track name from path", () => {
            chai.expect(_track.title).equals("01 track.mp3");
        });
    });

    describe("with path containing disk id", () => {
        var _track: Track;
        beforeEach(() =>
        {
            var deepPath = "root/artist/album/disk02/01 track.mp3";
            _track = _theTrackFactory.createTrack(deepPath);
        });
        it("Gets the artist name from path", () => {
            chai.expect(_track.artist).equals("artist");
        });

        it("Gets the album name from path", () => {
            chai.expect(_track.album).equals("album");
        });

        it("Gets the disk id from the path", () => {
            chai.expect(_track.disk).equals(2);
        });

        it("Gets the track name from path", () => {
            chai.expect(_track.title).equals("01 track.mp3");
        });
    });

    describe("with track name containing disk id", () => {
        var _track: Track;
        beforeEach(() =>
        {
            var path = "root/artist/album/Disc 2 - 01 - track.mp3";
            _track = _theTrackFactory.createTrack(path);
        });
        it("Gets the artist name from path", () => {
            chai.expect(_track.artist).equals("artist");
        });

        it("Gets the album name from path", () => {
            chai.expect(_track.album).equals("album");
        });

        it("Gets the disk id from the path", () => {
            chai.expect(_track.disk).equals(2);
        });

        it("Gets the track name from path", () => {
            chai.expect(_track.title).equals("01 track.mp3");
        });
    });

    describe("with deep path", () => {
        var _track: Track;
        beforeEach(() =>
        {
            var deepPath = "the/deep/path/artist/album/01 track.mp3";
            _track = _theTrackFactory.createTrack(deepPath);
        });

        it("looks at three last path elements", () => {
            chai.expect(_track.artist).equals("artist");
            chai.expect(_track.album).equals("album");
            chai.expect(_track.title).equals("01 track.mp3");
        });
    });

    describe("with track missing numeric prefix", () => {
        var _track: Track;
        beforeEach(() =>
        {
            var pathWithoutNumericPrefix = "root/artist/album/track.mp3";
            _track = _theTrackFactory.createTrack(pathWithoutNumericPrefix);
        });

        it("still gets the track name from path", () => {
            chai.expect(_track.title).equals("track.mp3");
        });
    });

    describe("error handling", () => {
        it("throws on path that is missing required elements", () => {
            var tooShortPath = "album/track.mp3";
            chai.expect(() => {
                _theTrackFactory.createTrack(tooShortPath);
            }).to.throw(Error, /Invalid path to music file/);
        });
    });
});
