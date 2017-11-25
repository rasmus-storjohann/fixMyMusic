"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const npmlog = require("npmlog");
const AlbumValidator_1 = require("../../src/businessObjects/albums/AlbumValidator");
const Album_1 = require("../../src/Album");
const ValidationOption_1 = require("../../src/businessInterfaces/fixers/ValidationOption");
var _theValidator;
mocha_1.beforeEach(() => {
    npmlog.level = "silent";
    var customFixerFactory = {
        create: function (album) {
            var fixAlbumTitle = undefined;
            var validation = [];
            var fixTrack = function (album, logger) { };
            return {
                fixAlbumTitle: fixAlbumTitle,
                validation: validation,
                fixTrack: fixTrack
            };
        }
    };
    _theValidator = new AlbumValidator_1.AlbumValidator(customFixerFactory, npmlog);
});
mocha_1.describe("Validator", () => {
    var musicTrack;
    mocha_1.beforeEach(() => {
        var artist = "aaaa";
        var albumTitle = "bbbb";
        musicTrack = [
            {
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
            }
        ];
    });
    function createAlbum() {
        var artist = musicTrack[0].artist;
        var albumTitle = musicTrack[0].album;
        var album = new Album_1.Album(musicTrack);
        return album;
    }
    mocha_1.it("accepts a valid tracks in correct order", () => { _theValidator.validate(createAlbum()); });
    mocha_1.describe("on tracks", () => {
        mocha_1.it("accepts tracks out of order", () => {
            musicTrack[0].trackNumber = 2;
            musicTrack[1].trackNumber = 1;
            _theValidator.validate(createAlbum());
        });
        mocha_1.it("throws on missing tracks", () => {
            musicTrack[0].trackNumber = 2;
            musicTrack[1].trackNumber = 3;
            chai_1.expect(() => {
                _theValidator.validate(createAlbum());
            }).to.throw(Error, /Track number out of order/);
        });
        mocha_1.it("throws on duplicate tracks", () => {
            musicTrack[0].trackNumber = 1;
            musicTrack[1].trackNumber = 1;
            chai_1.expect(() => {
                _theValidator.validate(createAlbum());
            }).to.throw(Error, /Track number out of order/);
        });
        mocha_1.it("throws on similar track names", () => {
            musicTrack[0].title = "12345678901 bla.mp3";
            musicTrack[1].title = "12345678901 foo.mp3";
            chai_1.expect(() => {
                _theValidator.validate(createAlbum());
            }).to.throw(Error, /bbbb: Album contains redundant track names/);
        });
        mocha_1.it("does not throw similar track names if they're short enough", () => {
            musicTrack[0].title = "1234567890 bla.mp3";
            musicTrack[1].title = "1234567890 foo.mp3";
            _theValidator.validate(createAlbum());
        });
    });
    mocha_1.it("throws on space in artist", () => {
        musicTrack[0].artist = "aaaa bbbb";
        musicTrack[1].artist = "aaaa bbbb";
        chai_1.expect(() => {
            _theValidator.validate(createAlbum());
        }).to.throw(Error, /Artist contains a space/);
    });
    mocha_1.describe("with custom fixers", () => {
        mocha_1.it("can ignore out of order tracks", () => {
            var mockCustomFixerFactory = {
                create: function (album) {
                    var fixAlbumTitle = undefined;
                    var validation = [ValidationOption_1.ValidationOption.skipTrackNumberCheck];
                    var fixTrack = function (album, logger) { };
                    return {
                        fixAlbumTitle: fixAlbumTitle,
                        validation: validation,
                        fixTrack: fixTrack
                    };
                }
            };
            musicTrack[0].trackNumber = 2;
            musicTrack[1].trackNumber = 1;
            new AlbumValidator_1.AlbumValidator(mockCustomFixerFactory, npmlog).validate(createAlbum());
        });
        mocha_1.it("can ignores similar track names", () => {
            var customFixerFactory = {
                create: function (album) {
                    var albumName = "fixed album name";
                    var validation = [ValidationOption_1.ValidationOption.skipUniqueTrackNameCheck];
                    var fixTrack = function (album, logger) { };
                    return {
                        albumName: albumName,
                        validation: validation,
                        fixTrack: fixTrack
                    };
                }
            };
            musicTrack[0].title = "12345678901234567890.mp3";
            musicTrack[1].title = "12345678901234567890.mp3";
            new AlbumValidator_1.AlbumValidator(customFixerFactory, npmlog).validate(createAlbum());
        });
        // add tests confirming that skipping one test does not skip the
        // other
    });
});
