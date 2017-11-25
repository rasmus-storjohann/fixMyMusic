"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const npmlog = require("npmlog");
const AlbumFixer_1 = require("../../src/AlbumFixer");
const AlbumBuilder_1 = require("../helpers/AlbumBuilder");
var fixer;
mocha_1.beforeEach(() => {
    npmlog.level = "silent";
    var mockCustomFixerFactory = {
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
    fixer = new AlbumFixer_1.AlbumFixer(mockCustomFixerFactory, npmlog);
});
mocha_1.describe("AlbumFixer", () => {
    mocha_1.describe("track names", () => {
        mocha_1.it("replaces underscore with space in track names", () => {
            var album = new AlbumBuilder_1.AlbumBuilder().withTrackTitle("track_one.mp3").create();
            fixer.fix(album);
            chai_1.expect(album.tracks[0].title).to.equal("track one.mp3");
        });
        mocha_1.it("replaces repeated space with one space in track names", () => {
            var album = new AlbumBuilder_1.AlbumBuilder().withTrackTitle("track     one.mp3").create();
            fixer.fix(album);
            chai_1.expect(album.tracks[0].title).to.equal("track one.mp3");
        });
        mocha_1.it("replaces repeated space/underscores with one space in track names", () => {
            var album = new AlbumBuilder_1.AlbumBuilder().withTrackTitle("track _ one.mp3").create();
            fixer.fix(album);
            chai_1.expect(album.tracks[0].title).to.equal("track one.mp3");
        });
        mocha_1.it("assigns track numbers based on the disk number", () => {
            var album = new AlbumBuilder_1.AlbumBuilder()
                .withDiskNumber(2).withTrackNumber(1).next()
                .withDiskNumber(3).withTrackNumber(1).next()
                .withDiskNumber(3).withTrackNumber(2).create();
            fixer.fix(album);
            chai_1.expect(album.tracks[0].trackNumber).to.equal(1);
            chai_1.expect(album.tracks[1].trackNumber).to.equal(2);
            chai_1.expect(album.tracks[2].trackNumber).to.equal(3);
        });
        mocha_1.it("first track number of next disk is computed from last track number on current disk", () => {
            var album = new AlbumBuilder_1.AlbumBuilder()
                .withDiskNumber(2).withTrackNumber(2).next()
                .withDiskNumber(3).withTrackNumber(1).create();
            fixer.fix(album);
            chai_1.expect(album.tracks[0].trackNumber).to.equal(2);
            chai_1.expect(album.tracks[1].trackNumber).to.equal(3);
        });
        mocha_1.it("index of tracks on next disk is offset by the number of tracks on the first disk", () => {
            var album = new AlbumBuilder_1.AlbumBuilder()
                .withDiskNumber(2).withTrackNumber(2).next()
                .withDiskNumber(3).withTrackNumber(2).create();
            fixer.fix(album);
            chai_1.expect(album.tracks[0].trackNumber).to.equal(2);
            chai_1.expect(album.tracks[1].trackNumber).to.equal(4);
        });
        mocha_1.it("index tracks spanning three disks", () => {
            var album = new AlbumBuilder_1.AlbumBuilder()
                .withDiskNumber(2).withTrackNumber(3).next()
                .withDiskNumber(3).withTrackNumber(2).next()
                .withDiskNumber(4).withTrackNumber(3).create();
            fixer.fix(album);
            chai_1.expect(album.tracks[0].trackNumber).to.equal(3);
            chai_1.expect(album.tracks[1].trackNumber).to.equal(5);
            chai_1.expect(album.tracks[2].trackNumber).to.equal(8);
        });
        mocha_1.it("can fix numbers when the tracks are larger than 9", () => {
            var album = new AlbumBuilder_1.AlbumBuilder()
                .withDiskNumber(2).withTrackNumber(12).next()
                .withDiskNumber(3).withTrackNumber(1).create();
            fixer.fix(album);
            chai_1.expect(album.tracks[0].trackNumber).to.equal(12);
            chai_1.expect(album.tracks[1].trackNumber).to.equal(13);
        });
        // TODO throw if some but not all tracks in a work has a disk id
    });
    mocha_1.describe("artist names", () => {
        mocha_1.it("makes no changes to artist names with no spaces", () => {
            var album = new AlbumBuilder_1.AlbumBuilder().withArtist("a_b_c").create();
            fixer.fix(album);
            chai_1.expect(album.artist).to.equal("a_b_c");
        });
        mocha_1.it("drops the 'the' and replaces space with _ in names starting with 'the'", () => {
            var album = new AlbumBuilder_1.AlbumBuilder().withArtist("The Tragically Hip").create();
            fixer.fix(album);
            chai_1.expect(album.artist).to.equal("Tragically_Hip");
        });
        mocha_1.it("swaps first and last name and replaces spaces with _ in names consisting first and last name", () => {
            var album = new AlbumBuilder_1.AlbumBuilder().withArtist("Jimi Hendrix").create();
            fixer.fix(album);
            chai_1.expect(album.artist).to.equal("Hendrix_Jimi");
        });
        mocha_1.it("makes no changes to artist names that don't fit these patterns", () => {
            var album = new AlbumBuilder_1.AlbumBuilder().withArtist("One Two Three").create();
            fixer.fix(album);
            chai_1.expect(album.artist).to.equal("One Two Three");
        });
        mocha_1.describe("with custom fixer", () => {
            mocha_1.it("can set album name", () => {
                var mockCustomFixerFactory = {
                    create: function (album) {
                        var albumName = "fixed album name";
                        var validation = [];
                        var fixTrack = function (album, logger) { };
                        return {
                            albumName: albumName,
                            validation: validation,
                            fixTrack: fixTrack
                        };
                    }
                };
                var album = new AlbumBuilder_1.AlbumBuilder().withAlbum("original album name").create();
                new AlbumFixer_1.AlbumFixer(mockCustomFixerFactory, npmlog).fix(album);
                chai_1.expect(album.title).to.equal("fixed album name");
            });
            mocha_1.it("can set the track name", () => {
                var mockCustomFixerFactory = {
                    create: function (album) {
                        var fixAlbumTitle = undefined;
                        var validation = [];
                        var fixTrack = function (album, logger) {
                            album.tracks[0].title = "Fixed track.mp3";
                        };
                        return {
                            fixAlbumTitle: fixAlbumTitle,
                            validation: validation,
                            fixTrack: fixTrack
                        };
                    }
                };
                var album = new AlbumBuilder_1.AlbumBuilder().withTrackTitle("Original track.mp3").create();
                new AlbumFixer_1.AlbumFixer(mockCustomFixerFactory, npmlog).fix(album);
                chai_1.expect(album.tracks[0].title).to.equal("Fixed track.mp3");
            });
        });
    });
});
