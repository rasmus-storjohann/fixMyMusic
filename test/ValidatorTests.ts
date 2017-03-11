import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {Validator} from "../src/Validator";
import {Track} from "../src/businessInterfaces/tracks/Track";
import {AlbumTrack} from "../src/businessInterfaces/tracks/AlbumTrack";
import {Album} from "../src/Album";
import {ValidationOption} from "../src/businessInterfaces/fixers/ValidationOption";
import {CustomFixer} from "../src/CustomFixer";
import * as npmlog from "npmlog";

var _theValidator: Validator;
beforeEach(() => {
        npmlog.level = "silent";

        var customFixerFactory = {
                create : function(album: Album) : CustomFixer {
                        var fixAlbumTitle = undefined;
                        var validation = [];
                        var fixTrack = function(album: Album, logger: npmlog.NpmLog) {};
                        return {
                                fixAlbumTitle : fixAlbumTitle,
                                validation : validation,
                                fixTrack : fixTrack
                        };
                }
        };

        _theValidator = new Validator(customFixerFactory, npmlog);
});

describe("Validator", () => {
        var musicTrack: Track[];
        beforeEach(() => {
                var artist = "aaaa";
                var albumTitle = "bbbb";
                musicTrack = [
                        {
                          artist : artist,
                          album : albumTitle,
                          path : "aaaa",
                          trackNumber : 1,
                          title : "bbbb"
                        },
                        {
                          artist : artist,
                          album : albumTitle,
                          path : "cccc",
                          trackNumber : 2,
                          title : "dddd"
                        }
                ];
        });

        function createAlbum(): Album
        {
                var artist = musicTrack[0].artist;
                var albumTitle = musicTrack[0].album;

                var album = new Album(artist, albumTitle);
                album.push(musicTrack[0]);
                album.push(musicTrack[1]);

                return album;
        }

        it("accepts a valid tracks in correct order",
           () => { _theValidator.validate(createAlbum()); });

        describe("on tracks", () => {
                it("accepts tracks out of order", () => {
                        musicTrack[0].trackNumber = 2;
                        musicTrack[1].trackNumber = 1;

                        _theValidator.validate(createAlbum());
                });

                it("throws on missing tracks", () => {
                        musicTrack[0].trackNumber = 2;
                        musicTrack[1].trackNumber = 3;

                        expect(() => {
                                _theValidator.validate(createAlbum());
                        }).to.throw(Error, /Track number out of order/);
                });

                it("throws on duplicate tracks", () => {
                        musicTrack[0].trackNumber = 1;
                        musicTrack[1].trackNumber = 1;

                        expect(() => {
                                _theValidator.validate(createAlbum());
                        }).to.throw(Error, /Track number out of order/);
                });

                it("throws on similar track names", () => {
                        musicTrack[0].title = "12345678901 bla.mp3";
                        musicTrack[1].title = "12345678901 foo.mp3";

                        expect(() => {
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

                expect(() => {
                        _theValidator.validate(createAlbum());
                }).to.throw(Error, /Artist contains a space/);
        });

        describe("with custom fixers", () => {
                it("can ignore out of order tracks", () => {
                        var mockCustomFixerFactory = {
                                create : function(album: Album) : CustomFixer {
                                        var fixAlbumTitle = undefined;
                                        var validation = [ ValidationOption.skipTrackNumberCheck ];
                                        var fixTrack = function(album: Album,
                                                                logger: npmlog.NpmLog) {};
                                        return {
                                                fixAlbumTitle : fixAlbumTitle,
                                                validation : validation,
                                                fixTrack : fixTrack
                                        };
                                }
                        };
                        musicTrack[0].trackNumber = 2;
                        musicTrack[1].trackNumber = 1;

                        new Validator(mockCustomFixerFactory, npmlog).validate(createAlbum());
                });
                it("can ignores similar track names", () => {
                        var customFixerFactory = {
                                create : function(album: Album) : CustomFixer {
                                        var albumName = "fixed album name";
                                        var validation =
                                            [ ValidationOption.skipUniqueTrackNameCheck ];
                                        var fixTrack = function(album: Album,
                                                                logger: npmlog.NpmLog) {};
                                        return {
                                                albumName : albumName,
                                                validation : validation,
                                                fixTrack : fixTrack
                                        };
                                }
                        };
                        musicTrack[0].title = "12345678901234567890.mp3";
                        musicTrack[1].title = "12345678901234567890.mp3";

                        new Validator(customFixerFactory, npmlog).validate(createAlbum());
                });
                // add tests confirming that skipping one test does not skip the
                // other
        });
});
