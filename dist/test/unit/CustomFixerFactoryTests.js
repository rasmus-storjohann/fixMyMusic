"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const npmlog = require("npmlog");
const CustomFixerFactory_1 = require("../../src/businessObjects/fixers/CustomFixerFactory");
const Album_1 = require("../../src/Album");
const FixOptionsForOneArtist_1 = require("../../src/businessInterfaces/fixers/FixOptionsForOneArtist");
const ValidationOption_1 = require("../../src/businessInterfaces/fixers/ValidationOption");
const formatAlbumName_1 = require("../../src/businessObjects/albums/formatAlbumName");
mocha_1.beforeEach(() => { npmlog.level = "silent"; });
mocha_1.describe("CustomFixerFactory", () => {
    function buildFixer(artis, album, rules) {
        var theFactory = new CustomFixerFactory_1.CustomFixerFactory(rules, npmlog);
        var theAlbum = new Album_1.Album([{
                path: "",
                artist: artis,
                album: album,
                title: "This is the track title",
                trackNumber: 1
            }]);
        return theFactory.create(theAlbum);
    }
    mocha_1.describe("builds fixer attributes", () => {
        mocha_1.it("with fixAlbumTitle as string", () => {
            var rules = {
                "artist name": {
                    "the original album name": { fixAlbumTitle: "the fixed album name" }
                }
            };
            var customFixer = buildFixer("artist name", "the original album name", rules);
            chai_1.expect(customFixer.fixAlbumTitle).to.equal("the fixed album name");
        });
        mocha_1.it("with fixAlbumTitle as a spec", () => {
            var rules = {
                "artist name": {
                    "the original album name": {
                        fixAlbumTitle: {
                            form: "cantata",
                            opus: {
                                opus: 131,
                                prefix: "BWV"
                            }
                        }
                    }
                }
            };
            var customFixer = buildFixer("artist name", "the original album name", rules);
            if (!customFixer.fixAlbumTitle) {
                throw new Error("test fails");
            }
            chai_1.expect(formatAlbumName_1.formatAlbumName(customFixer.fixAlbumTitle)).to.equal("Cantata BWV131");
        });
        mocha_1.describe("with valid validation options as strings", () => {
            mocha_1.it("skipUniqueTrackNameCheck", () => {
                var rules = {
                    "artist name": {
                        "album name": {
                            validation: [ValidationOption_1.ValidationOption.skipUniqueTrackNameCheck]
                        }
                    }
                };
                var customFixer = buildFixer("artist name", "album name", rules);
                chai_1.expect(customFixer.validation).to.have.length(1);
                chai_1.expect(customFixer.validation)
                    .to.contain(ValidationOption_1.ValidationOption.skipUniqueTrackNameCheck);
            });
            mocha_1.it("skipTrackNumberCheck", () => {
                var rules = {
                    "artist name": {
                        "album name": {
                            validation: [ValidationOption_1.ValidationOption.skipTrackNumberCheck]
                        }
                    }
                };
                var customFixer = buildFixer("artist name", "album name", rules);
                chai_1.expect(customFixer.validation).to.have.length(1);
                chai_1.expect(customFixer.validation)
                    .to.contain(ValidationOption_1.ValidationOption.skipTrackNumberCheck);
            });
            mocha_1.it("supports multiple flags", () => {
                var rules = {
                    "artist name": {
                        "album name": {
                            validation: [
                                ValidationOption_1.ValidationOption.skipUniqueTrackNameCheck,
                                ValidationOption_1.ValidationOption.skipTrackNumberCheck
                            ]
                        }
                    }
                };
                var customFixer = buildFixer("artist name", "album name", rules);
                chai_1.expect(customFixer.validation).to.have.length(2);
                chai_1.expect(customFixer.validation)
                    .to.contain(ValidationOption_1.ValidationOption.skipUniqueTrackNameCheck);
                chai_1.expect(customFixer.validation)
                    .to.contain(ValidationOption_1.ValidationOption.skipTrackNumberCheck);
            });
        });
    });
    mocha_1.describe("builds track fixing function", () => {
        function fixTracks(theAlbum, rules) {
            var theFactory = new CustomFixerFactory_1.CustomFixerFactory(rules, npmlog);
            var fixer = theFactory.create(theAlbum);
            fixer.fixTrack(theAlbum, npmlog);
        }
        mocha_1.it("does nothing by default", () => {
            var rules = {};
            var theAlbum = new Album_1.Album([{
                    path: "",
                    artist: "artis",
                    album: "album",
                    title: "track title",
                    trackNumber: 1
                }]);
            fixTracks(theAlbum, rules);
            chai_1.expect(theAlbum.tracks[0].title).to.equal("track title");
            chai_1.expect(theAlbum.tracks[0].trackNumber).to.equal(1);
        });
        mocha_1.it("returns fix track name function if specified", () => {
            var fixTrackNameFunction = function (name, logger) {
                return "fixed track title";
            };
            var optionsForAlbum = {
                fixTrackNameFunction: fixTrackNameFunction
            };
            var optionsForArtist = new FixOptionsForOneArtist_1.FixOptionsForOneArtist();
            optionsForArtist.setValue("the album name", optionsForAlbum);
            var rules = {
                "artist name": optionsForArtist
            };
            var theAlbum = new Album_1.Album([{
                    path: "",
                    artist: "artist name",
                    album: "the album name",
                    title: "This is the track title",
                    trackNumber: 1
                }]);
            fixTracks(theAlbum, rules);
            chai_1.expect(theAlbum.tracks[0].title).to.equal("fixed track title");
        });
        mocha_1.it("returns function applying regular expression if specified", () => {
            var rules = {
                "artist name": { "the album name": { fixTrackName: /This is the (.*)/ } }
            };
            var theAlbum = new Album_1.Album([{
                    path: "",
                    artist: "artist name",
                    album: "the album name",
                    title: "This is the track title",
                    trackNumber: 1
                }]);
            fixTracks(theAlbum, rules);
            chai_1.expect(theAlbum.tracks[0].title).to.equal("track title");
        });
        mocha_1.it("composes fixer functions", () => {
            var rules = {
                "artist name": {
                    "the album name": {
                        fixTrackName: /This is the (.*)/,
                        firstTrackNumber: 2
                    }
                }
            };
            var theAlbum = new Album_1.Album([{
                    path: "",
                    artist: "artist name",
                    album: "the album name",
                    title: "This is the track title",
                    trackNumber: 2
                }]);
            fixTracks(theAlbum, rules);
            chai_1.expect(theAlbum.tracks[0].title).to.equal("track title");
            chai_1.expect(theAlbum.tracks[0].trackNumber).to.equal(1);
        });
        mocha_1.describe("with firstTrackNumber option", () => {
            mocha_1.it("adjusts the track number", () => {
                var rules = {
                    "artist name": { "the album name": { firstTrackNumber: 2 } }
                };
                var theAlbum = new Album_1.Album([{
                        path: "",
                        artist: "artist name",
                        album: "the album name",
                        title: "",
                        trackNumber: 2
                    }]);
                fixTracks(theAlbum, rules);
                chai_1.expect(theAlbum.tracks[0].trackNumber).to.equal(1);
            });
            mocha_1.it("throws if the adjusted track number is less than one", () => {
                var rules = {
                    "artist name": { "the album name": { firstTrackNumber: 2 } }
                };
                var theAlbum = new Album_1.Album([{
                        path: "",
                        artist: "artist name",
                        album: "the album name",
                        title: "",
                        trackNumber: 1
                    }]);
                chai_1.expect(() => {
                    fixTracks(theAlbum, rules);
                }).to.throw(Error, /fixing track number gave negative result/);
            });
            mocha_1.it("throws on missing track", () => {
                var rules = {
                    "artist name": { "the album name": { firstTrackNumber: 2 } }
                };
                var track1 = {
                    path: "",
                    artist: "artist name",
                    album: "the album name",
                    title: "",
                    trackNumber: 2
                };
                var track2 = {
                    path: "",
                    artist: "artist name",
                    album: "the album name",
                    title: "",
                    trackNumber: 4
                };
                var theAlbum = new Album_1.Album([track1, track2]);
                chai_1.expect(() => {
                    fixTracks(theAlbum, rules);
                }).to.throw(Error, /missing track/);
            });
            mocha_1.it("throws on duplicate track", () => {
                var rules = {
                    "artist name": { "the album name": { firstTrackNumber: 2 } }
                };
                var track1 = {
                    path: "",
                    artist: "artist name",
                    album: "the album name",
                    title: "",
                    trackNumber: 2
                };
                var track2 = {
                    path: "",
                    artist: "artist name",
                    album: "the album name",
                    title: "",
                    trackNumber: 2
                };
                var theAlbum = new Album_1.Album([track1, track2]);
                chai_1.expect(() => {
                    fixTracks(theAlbum, rules);
                }).to.throw(Error, /duplicate track number/);
            });
            mocha_1.it("handles multiple disks", () => {
                var rules = {
                    "artist name": { "the album name": { firstTrackNumber: 2 } }
                };
                var track1 = {
                    path: "",
                    artist: "artist name",
                    album: "the album name",
                    title: "",
                    trackNumber: 2,
                    disk: 3
                };
                var track2 = {
                    path: "",
                    artist: "artist name",
                    album: "the album name",
                    title: "",
                    trackNumber: 1,
                    disk: 4
                };
                var theAlbum = new Album_1.Album([track1, track2]);
                fixTracks(theAlbum, rules);
                chai_1.expect(theAlbum.tracks[0].trackNumber).to.equal(1);
                chai_1.expect(theAlbum.tracks[1].trackNumber).to.equal(2);
            });
        });
    });
});
