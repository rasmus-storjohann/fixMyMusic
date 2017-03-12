import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as log from "npmlog";
import {Track} from "../../src/businessInterfaces/tracks/Track";
import {TrackFactory} from "../../src/TrackFactory";

var _theTrackFactory: TrackFactory;
beforeEach(() => {
        log.level = 'silent';
        _theTrackFactory = new TrackFactory(log);
});

describe("TrackFactory", () => {
        describe("with valid path", () => {
                var _track: Track;
                beforeEach(() => {
                        var validPath = "root/artist/album/01 track.mp3";
                        _track = _theTrackFactory.createTrack(validPath);
                });

                it("Gets the artist name from path",
                   () => { expect(_track.artist).equals("artist"); });

                it("Gets the album name from path",
                   () => { expect(_track.album).equals("album"); });

                it("Gets the track number from the path",
                   () => { expect(_track.trackNumber).equals(1); });

                it("Gets the track name from path",
                   () => { expect(_track.title).equals("track"); });
        });

        describe("with path containing disk id", () => {
                var _track: Track;
                beforeEach(() => {
                        var deepPath = "root/artist/album/disk02/01 track.mp3";
                        _track = _theTrackFactory.createTrack(deepPath);
                });
                it("Gets the artist name from path",
                   () => { expect(_track.artist).equals("artist"); });

                it("Gets the album name from path",
                   () => { expect(_track.album).equals("album"); });

                it("Gets the disk id from the path", () => { expect(_track.disk).equals(2); });

                it("Gets the track number from the path",
                   () => { expect(_track.trackNumber).equals(1); });

                it("Gets the track name from path",
                   () => { expect(_track.title).equals("track"); });
        });

        describe("with track name containing disk id", () => {
                var _track: Track;
                beforeEach(() => {
                        var path = "root/artist/album/Disc 2 - 01 - track.mp3";
                        _track = _theTrackFactory.createTrack(path);
                });
                it("Gets the artist name from path",
                   () => { expect(_track.artist).equals("artist"); });

                it("Gets the album name from path",
                   () => { expect(_track.album).equals("album"); });

                it("Gets the disk id from the path", () => { expect(_track.disk).equals(2); });

                it("Gets the track number from path",
                   () => { expect(_track.trackNumber).equals(1); });

                it("Gets the track name from path",
                   () => { expect(_track.title).equals("track"); });
        });

        describe("with track name containing disk id in d1t01 format", () => {
                var _track: Track;
                beforeEach(() => {
                        var path = "root/artist/album/d2t01. track.mp3";
                        _track = _theTrackFactory.createTrack(path);
                });
                it("Gets the artist name from path",
                   () => { expect(_track.artist).equals("artist"); });

                it("Gets the album name from path",
                   () => { expect(_track.album).equals("album"); });

                it("Gets the disk id from the path", () => { expect(_track.disk).equals(2); });

                it("Gets the track number from path",
                   () => { expect(_track.trackNumber).equals(1); });

                it("Gets the track name from path",
                   () => { expect(_track.title).equals("track"); });
        });

        describe("with track number", () => {
                it("of just one digit", () => {
                        var track = _theTrackFactory.createTrack("root/artist/album/1 track.mp3");
                        expect(track.trackNumber).equals(1);
                        expect(track.title).equals("track");
                });

                it("with trailing dot", () => {
                        var track = _theTrackFactory.createTrack("root/artist/album/1. track.mp3");
                        expect(track.trackNumber).equals(1);
                        expect(track.title).equals("track");
                });
        });

        describe("with deep path", () => {
                var _track: Track;
                beforeEach(() => {
                        var deepPath = "the/deep/path/artist/album/01 track.mp3";
                        _track = _theTrackFactory.createTrack(deepPath);
                });

                it("looks at three last path elements", () => {
                        expect(_track.artist).equals("artist");
                        expect(_track.album).equals("album");
                        expect(_track.trackNumber).equals(1);
                        expect(_track.title).equals("track");
                });
        });

        it("throws on track missing numeric prefix", () => {
                var pathWithoutNumericPrefix = "root/artist/album/track.mp3";
                expect(() => {
                        _theTrackFactory.createTrack(pathWithoutNumericPrefix);
                }).to.throw(Error, /Could not parse file names/);
        });

        describe("error handling", () => {
                it("throws on path that is missing required elements", () => {
                        var tooShortPath = "album/track.mp3";
                        expect(() => {
                                _theTrackFactory.createTrack(tooShortPath);
                        }).to.throw(Error, /Invalid path to music file/);
                });
        });
});
