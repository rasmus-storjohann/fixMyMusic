import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {Fixer} from "../src/Fixer";
import {Album} from "../src/Album";
import {AlbumTrack} from "../src/AlbumTrack";
import {Track} from "../src/Track";
import {sonata} from "../src/AlbumFormat";
import {CustomFixer} from "../src/CustomFixer";
import * as npmlog from "npmlog";

var fixer: Fixer;
var album: Album;

beforeEach(() => {
        npmlog.level = "silent";

        var mockCustomFixerFactory = {
                create : function(album: Album) : CustomFixer {
                        var fixAlbumTitle = "";
                        var validation = [];
                        var fixTrack = function(album: Album, logger: npmlog.NpmLog) {};
                        return {
                                fixAlbumTitle : fixAlbumTitle,
                                validation : validation,
                                fixTrack : fixTrack
                        };
                }
        };

        fixer = new Fixer(mockCustomFixerFactory, npmlog);
        album = new Album("aaaa", "bbbb");
        album.push(
            {path : "cccc", artist : "aaaa", album : "bbbb", trackNumber : 1, title : "dddd"});
});

describe("Fixer", () => {
        describe("track names", () => {
                var artist: string;
                var albumTitle: string;
                var album: Album;
                function trackWithName(title: string): Track
                {
                        return {
                                artist : artist,
                                album : albumTitle,
                                trackNumber : 1,
                                title : title,
                                path : "cccc"
                        };
                }
                beforeEach(() => {
                        artist = "the artist";
                        albumTitle = "the album";
                        album = new Album(artist, albumTitle);
                });
                it("replaces underscore with space in track names", () => {
                        album.push(trackWithName("track_one.mp3"));
                        fixer.fix(album);
                        expect(album.tracks[0].title).to.equal("track one.mp3");
                });
                it("replaces repeated space with one space in track names", () => {
                        album.push(trackWithName("track     one.mp3"));
                        fixer.fix(album);
                        expect(album.tracks[0].title).to.equal("track one.mp3");
                });
                it("replaces repeated space/underscores with one space in track names", () => {
                        album.push(trackWithName("track _ one.mp3"));
                        fixer.fix(album);
                        expect(album.tracks[0].title).to.equal("track one.mp3");
                });

                it("assigns track numbers based on the disk number", () => {
                        album.push({
                                artist : artist,
                                album : albumTitle,
                                trackNumber : 1,
                                title : "aaaa.mp2",
                                disk : 2,
                                path : "cccc"
                        });
                        album.push({
                                artist : artist,
                                album : albumTitle,
                                trackNumber : 1,
                                title : "aaaa.mp2",
                                disk : 3,
                                path : "cccc"
                        });
                        album.push({
                                artist : artist,
                                album : albumTitle,
                                trackNumber : 2,
                                title : "aaaa.mp2",
                                disk : 3,
                                path : "cccc"
                        });

                        fixer.fix(album);

                        expect(album.tracks[0].trackNumber).to.equal(1);
                        expect(album.tracks[1].trackNumber).to.equal(2);
                        expect(album.tracks[2].trackNumber).to.equal(3);
                });

                it("first track number of next disk is computed from last track number on current disk",
                   () => {
                           album.push({
                                   artist : artist,
                                   album : albumTitle,
                                   trackNumber : 2,
                                   title : "second track from disk two.mp3",
                                   disk : 2,
                                   path : "cccc"
                           });
                           album.push({
                                   artist : artist,
                                   album : albumTitle,
                                   trackNumber : 1,
                                   title : "track from disk three.mp3",
                                   disk : 3,
                                   path : "cccc"
                           });
                           fixer.fix(album);
                           expect(album.tracks[0].trackNumber).to.equal(2);
                           expect(album.tracks[1].trackNumber).to.equal(3);
                   });

                it("index of tracks on next disk is offset by the number of tracks on the first disk",
                   () => {
                           album.push({
                                   artist : artist,
                                   album : albumTitle,
                                   trackNumber : 2,
                                   title : "track from disk two.mp3",
                                   disk : 2,
                                   path : "cccc"
                           });
                           album.push({
                                   artist : artist,
                                   album : albumTitle,
                                   trackNumber : 2,
                                   title : "track from disk three.mp3",
                                   disk : 3,
                                   path : "cccc"
                           });
                           fixer.fix(album);
                           expect(album.tracks[0].trackNumber).to.equal(2);
                           expect(album.tracks[1].trackNumber).to.equal(4);
                   });

                it("index tracks spanning three disks", () => {
                        album.push({
                                artist : artist,
                                album : albumTitle,
                                trackNumber : 3,
                                title : "track from disk two.mp3",
                                disk : 2,
                                path : "cccc"
                        });
                        album.push({
                                artist : artist,
                                album : albumTitle,
                                trackNumber : 2,
                                title : "track from disk three.mp3",
                                disk : 3,
                                path : "cccc"
                        });
                        album.push({
                                artist : artist,
                                album : albumTitle,
                                trackNumber : 3,
                                title : "track from disk four.mp3",
                                disk : 4,
                                path : "cccc"
                        });
                        fixer.fix(album);
                        expect(album.tracks[0].trackNumber).to.equal(3);
                        expect(album.tracks[1].trackNumber).to.equal(5);
                        expect(album.tracks[2].trackNumber).to.equal(8);
                });

                it("can fix numbers when the tracks are larger than 9", () => {
                        album.push({
                                artist : artist,
                                album : albumTitle,
                                trackNumber : 12,
                                title : "track from disk two.mp2",
                                disk : 2,
                                path : "cccc"
                        });
                        album.push({
                                artist : artist,
                                album : albumTitle,
                                trackNumber : 1,
                                title : "track from disk three.mp2",
                                disk : 3,
                                path : "cccc"
                        });
                        fixer.fix(album);
                        expect(album.tracks[0].trackNumber).to.equal(12);
                        expect(album.tracks[1].trackNumber).to.equal(13);
                });
                // TODO throw if some but not all tracks in a work has a disk id
        });

        describe("artist names", () => {
                it("makes no changes to artist names with no spaces", () => {
                        album.artist = "a_b_c";
                        fixer.fix(album);
                        expect(album.artist).to.equal("a_b_c");
                });

                it("drops the 'the' and replaces space with _ in names starting with 'the'", () => {
                        album.artist = "The Tragically Hip";
                        fixer.fix(album);
                        expect(album.artist).to.equal("Tragically_Hip");
                });

                it("swaps first and last name and replaces spaces with _ in names consisting first and last name",
                   () => {
                           album.artist = "Jimi Hendrix";
                           fixer.fix(album);
                           expect(album.artist).to.equal("Hendrix_Jimi");
                   });

                it("makes no changes to artist names that don't fit these patterns", () => {
                        album.artist = "One Two Three";
                        fixer.fix(album);
                        expect(album.artist).to.equal("One Two Three");
                });

                describe("with custom fixer", () => {

                        it("can set album name", () => {
                                var mockCustomFixerFactory = {
                                        create : function(album: Album) : CustomFixer {
                                                var fixAlbumTitle = "fixed album name";
                                                var validation = [];
                                                var fixTrack = function(album: Album,
                                                                        logger: npmlog.NpmLog) {};
                                                return {
                                                        fixAlbumTitle : fixAlbumTitle,
                                                        validation : validation,
                                                        fixTrack : fixTrack
                                                };
                                        }
                                }

                                                             album.title = "original album name";
                                new Fixer(mockCustomFixerFactory, npmlog).fix(album);
                                expect(album.title).to.equal("fixed album name");
                        });

                        it("can set the track name", () => {
                                var mockCustomFixerFactory = {
                                        create : function(album: Album) : CustomFixer {
                                                var fixAlbumTitle = "";
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

                                                             album.tracks[0]
                                                                 .title = "Original track.mp3";
                                new Fixer(mockCustomFixerFactory, npmlog).fix(album);
                                expect(album.tracks[0].title).to.equal("Fixed track.mp3");
                        });
                });
        });
});
