import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as npmlog from "npmlog";
import {AlbumFixer} from "../../src/AlbumFixer";
import {Album} from "../../src/Album";
import {AlbumTrack} from "../../src/businessInterfaces/tracks/AlbumTrack";
import {Track} from "../../src/businessInterfaces/tracks/Track";
import {CustomFixer} from "../../src/businessInterfaces/fixers/CustomFixer";
import {AlbumBuilder} from "../helpers/AlbumBuilder";

var fixer: AlbumFixer;

beforeEach(() => {
        npmlog.level = "silent";

        var mockCustomFixerFactory = {
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
        fixer = new AlbumFixer(mockCustomFixerFactory, npmlog);
});

describe("AlbumFixer", () => {
        describe("track names", () => {

                it("replaces underscore with space in track names", () => {
                        var album = new AlbumBuilder().withTrackTitle("track_one.mp3").create();
                        fixer.fix(album);
                        expect(album.tracks[0].title).to.equal("track one.mp3");
                });

                it("replaces repeated space with one space in track names", () => {
                        var album = new AlbumBuilder().withTrackTitle("track     one.mp3").create();
                        fixer.fix(album);
                        expect(album.tracks[0].title).to.equal("track one.mp3");
                });

                it("replaces repeated space/underscores with one space in track names", () => {
                        var album = new AlbumBuilder().withTrackTitle("track _ one.mp3").create();
                        fixer.fix(album);
                        expect(album.tracks[0].title).to.equal("track one.mp3");
                });

                it("assigns track numbers based on the disk number", () => {
                        var album = new AlbumBuilder()
                                .withDiskNumber(2).withTrackNumber(1).next()
                                .withDiskNumber(3).withTrackNumber(1).next()
                                .withDiskNumber(3).withTrackNumber(2).create();

                        fixer.fix(album);

                        expect(album.tracks[0].trackNumber).to.equal(1);
                        expect(album.tracks[1].trackNumber).to.equal(2);
                        expect(album.tracks[2].trackNumber).to.equal(3);
                });

                it("first track number of next disk is computed from last track number on current disk", () => {
                        var album = new AlbumBuilder()
                                .withDiskNumber(2).withTrackNumber(2).next()
                                .withDiskNumber(3).withTrackNumber(1).create();

                           fixer.fix(album);

                           expect(album.tracks[0].trackNumber).to.equal(2);
                           expect(album.tracks[1].trackNumber).to.equal(3);
                   });

                it("index of tracks on next disk is offset by the number of tracks on the first disk",
                   () => {
                           var album = new AlbumBuilder()
                                   .withDiskNumber(2).withTrackNumber(2).next()
                                   .withDiskNumber(3).withTrackNumber(2).create();

                           fixer.fix(album);

                           expect(album.tracks[0].trackNumber).to.equal(2);
                           expect(album.tracks[1].trackNumber).to.equal(4);
                   });

                it("index tracks spanning three disks", () => {
                        var album = new AlbumBuilder()
                                .withDiskNumber(2).withTrackNumber(3).next()
                                .withDiskNumber(3).withTrackNumber(2).next()
                                .withDiskNumber(4).withTrackNumber(3).create();

                        fixer.fix(album);

                        expect(album.tracks[0].trackNumber).to.equal(3);
                        expect(album.tracks[1].trackNumber).to.equal(5);
                        expect(album.tracks[2].trackNumber).to.equal(8);
                });

                it("can fix numbers when the tracks are larger than 9", () => {
                        var album = new AlbumBuilder()
                                .withDiskNumber(2).withTrackNumber(12).next()
                                .withDiskNumber(3).withTrackNumber(1).create();

                        fixer.fix(album);

                        expect(album.tracks[0].trackNumber).to.equal(12);
                        expect(album.tracks[1].trackNumber).to.equal(13);
                });
                // TODO throw if some but not all tracks in a work has a disk id
        });

        describe("artist names", () => {
                it("makes no changes to artist names with no spaces", () => {
                        var album = new AlbumBuilder().withArtist("a_b_c").create();
                        fixer.fix(album);
                        expect(album.artist).to.equal("a_b_c");
                });

                it("drops the 'the' and replaces space with _ in names starting with 'the'", () => {
                        var album = new AlbumBuilder().withArtist("The Tragically Hip").create();
                        fixer.fix(album);
                        expect(album.artist).to.equal("Tragically_Hip");
                });

                it("swaps first and last name and replaces spaces with _ in names consisting first and last name",
                   () => {
                           var album = new AlbumBuilder().withArtist("Jimi Hendrix").create();
                           fixer.fix(album);
                           expect(album.artist).to.equal("Hendrix_Jimi");
                   });

                it("makes no changes to artist names that don't fit these patterns", () => {
                        var album = new AlbumBuilder().withArtist("One Two Three").create();
                        fixer.fix(album);
                        expect(album.artist).to.equal("One Two Three");
                });

                describe("with custom fixer", () => {

                        it("can set album name", () => {
                                var mockCustomFixerFactory = {
                                        create : function(album: Album) : CustomFixer {
                                                var albumName = "fixed album name";
                                                var validation = [];
                                                var fixTrack = function(album: Album,
                                                                        logger: npmlog.NpmLog) {};
                                                return {
                                                        albumName : albumName,
                                                        validation : validation,
                                                        fixTrack : fixTrack
                                                };
                                        }
                                }

                                var album = new AlbumBuilder().withAlbum("original album name").create();
                                new AlbumFixer(mockCustomFixerFactory, npmlog).fix(album);
                                expect(album.title).to.equal("fixed album name");
                        });

                        it("can set the track name", () => {
                                var mockCustomFixerFactory = {
                                        create : function(album: Album) : CustomFixer {
                                                var fixAlbumTitle = undefined;
                                                var validation = [];
                                                var fixTrack = function(album: Album,
                                                                        logger: npmlog.NpmLog) {
                                                        album.tracks[0].title = "Fixed track.mp3";
                                                };
                                                return {
                                                        fixAlbumTitle : fixAlbumTitle,
                                                        validation : validation,
                                                        fixTrack : fixTrack
                                                };
                                        }
                                }
                                var album = new AlbumBuilder().withTrackTitle("Original track.mp3").create();
                                new AlbumFixer(mockCustomFixerFactory, npmlog).fix(album);
                                expect(album.tracks[0].title).to.equal("Fixed track.mp3");
                        });
                });
        });
});
