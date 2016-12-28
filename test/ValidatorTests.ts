/// <reference path = "../typings/auto.d.ts" />

import { Validator } from "../src/Validator";
import { Track } from "../src/Track";
import { Album } from "../src/Album";
import { AlbumTrack } from "../src/AlbumTrack";
import { CustomFixer } from "../src/CustomFixer";
import * as npmlog from "npmlog";
import * as chai from "chai";

var _theValidator : Validator;
beforeEach(() =>
{
    npmlog.level = "silent";

    var customFixerFactory = {
        create: function(album: Album) : CustomFixer
        {
            var fixAlbumTitle = "";
            var validation = [];
            var fixTrack = function(track: AlbumTrack, logger: npmlog.NpmLog) {}
            return {
                fixAlbumTitle: fixAlbumTitle,
                validation: validation,
                fixTrack: fixTrack
            };
        },
        getArtistName: function(artist: string) : string { return ""; }
    };

    _theValidator = new Validator(customFixerFactory, npmlog);
});

describe("Validator", () => {
    var musicTrack: Track[];
    beforeEach(() => {
        var artist = "aaaa";
        var albumTitle = "bbbb";
        musicTrack = [{
                artist: artist,
                album: albumTitle,
                path: "aaaa",
                trackNumber: 1,
                title: "bbbb"
            },
            {
                artist: artist,
                album: albumTitle,
                path: "cccc",
                trackNumber: 2,
                title: "dddd"
            }];
    });

    function createAlbum() : Album
    {
        var artist = musicTrack[0].artist;
        var albumTitle = musicTrack[0].album;

        var album = new Album(artist, albumTitle);
        album.push(musicTrack[0]);
        album.push(musicTrack[1]);

        return album;
    }

    it("accepts a valid tracks in correct order", () => {
        _theValidator.validate(createAlbum());
    });

    describe("on tracks", () => {
        it("throws on missing track number", () => {
            musicTrack[0].trackNumber = undefined;

            chai.expect(() => {
                _theValidator.validate(createAlbum());
            }).to.throw(Error, /Track number out of order, expected 1 but got <undefined>/);
        });

        it("throws on tracks out of order", () => {
            musicTrack[0].trackNumber = 2;
            musicTrack[1].trackNumber = 1;

            chai.expect(() => {
                _theValidator.validate(createAlbum());
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on missing tracks", () => {
            musicTrack[0].trackNumber = 2;
            musicTrack[1].trackNumber = 3;

            chai.expect(() => {
                _theValidator.validate(createAlbum());
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on duplicate tracks", () => {
            musicTrack[0].trackNumber = 1;
            musicTrack[1].trackNumber = 1;

            chai.expect(() => {
                _theValidator.validate(createAlbum());
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on similar track names", () => {
            musicTrack[0].title = "12345678901 bla.mp3";
            musicTrack[1].title = "12345678901 foo.mp3";

            chai.expect(() => {
                _theValidator.validate(createAlbum());
            }).to.throw(Error, /bbbb: Album contains redundant track names/);
        });

        it("does not throw similar track names if they're short enough", () => {
            musicTrack[0].title = "1234567890 bla.mp3";
            musicTrack[1].title = "1234567890 foo.mp3";

            _theValidator.validate(createAlbum());
        });
    });

    it("throws on space in artist", () => {
        musicTrack[0].artist = "aaaa bbbb";
        musicTrack[1].artist = "aaaa bbbb";

        chai.expect(() => {
            _theValidator.validate(createAlbum());
        }).to.throw(Error, /Artist contains a space/);
    });

    describe("with custom fixers", () => {
        it("can ignore out of order tracks", ()=> {
            var mockCustomFixerFactory = {
                create: function(album: Album) : CustomFixer
                {
                    var fixAlbumTitle = "";
                    var validation = ["skipTrackNumberCheck"];
                    var fixTrack = function(track: AlbumTrack, logger: npmlog.NpmLog) {}
                    return {
                        fixAlbumTitle: fixAlbumTitle,
                        validation: validation,
                        fixTrack: fixTrack
                    };
                },
                getArtistName: function(artist: string) { return ""; }
            };
            musicTrack[0].trackNumber = 2;
            musicTrack[1].trackNumber = 1;

            new Validator(mockCustomFixerFactory, npmlog).validate(createAlbum());
        });
        it("can ignores similar track names", ()=> {
            var customFixerFactory = {
                create: function(album: Album) : CustomFixer
                {
                    var fixAlbumTitle = "fixed album name";
                    var validation = ["skipUniqueTrackNameCheck"];
                    var fixTrack = function(track: AlbumTrack, logger: npmlog.NpmLog) {}
                    return {
                        fixAlbumTitle: fixAlbumTitle,
                        validation: validation,
                        fixTrack: fixTrack
                    };
                },
                getArtistName: function(artist: string) { return "Fixed_name"; }
            };
            musicTrack[0].title = "12345678901234567890.mp3";
            musicTrack[1].title = "12345678901234567890.mp3";

            new Validator(customFixerFactory, npmlog).validate(createAlbum());
        });
        // add tests confirming that skipping one test does not skip the other
    });
});
