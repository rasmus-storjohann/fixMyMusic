/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import * as log from "npmlog";
import { Fixer } from "../src/Fixer";
import { Album } from "../src/Album";
import { Track } from "../src/Track";
import { sonata } from "../src/AlbumFormat";
import { Rule } from "../src/Rule";
import { CustomFixerFactory } from "../src/CustomFixerFactory";

var fixer: Fixer;
var album: Album;
beforeEach(() => {
    log.level = 'silent';
    fixer = new Fixer(log);
    album = new Album("aaaa", "bbbb");
    album.push({
        path: "cccc",
        artist: "aaaa",
        album: "bbbb",
        trackNumber: 1,
        title: "dddd"
    });
});

describe("Fixer", () => {
    describe("track names", () => {
        var rule: Rule;
        var artist: string;
        var albumTitle: string;
        var album: Album;
        function trackWithName(title: string) : Track
        {
            return { artist: artist, album: albumTitle, trackNumber: 1, title: title, path: "cccc" };
        }
        beforeEach(() => {
            artist = "the artist";
            albumTitle = "the album";
            album = new Album(artist, albumTitle);
        });
        it("puts 0 prefix on one digit track numbers", () => {
            album.push(trackWithName("1 track.mp3"));
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].title).to.equal("01 track.mp3");
        });
        it("strips trailing dot from track numbers", () => {
            album.push(trackWithName("01. track.mp3"));
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].title).to.equal("01 track.mp3");
        });
        it("replaces underscore with space in track names", () => {
            album.push(trackWithName("01. track_one.mp3"));
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].title).to.equal("01 track one.mp3");
        });
        it("replaces repeated space with one space in track names", () => {
            album.push(trackWithName("01. track     one.mp3"));
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].title).to.equal("01 track one.mp3");
        });
        it("replaces repeated space/underscores with one space in track names", () => {
            album.push(trackWithName("01. track _ one.mp3"));
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].title).to.equal("01 track one.mp3");
        });

        it("assigns track numbers based on the disk number", () => {
            album.push({ artist: artist, album: albumTitle, trackNumber: 1, title: "aaaa.mp2", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, trackNumber: 1, title: "aaaa.mp2", disk: 3, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, trackNumber: 2, title: "aaaa.mp2", disk: 3, path: "cccc" });

            fixer.fix(album, undefined, rule);

            chai.expect(album.tracks[0].trackNumber).to.equal(1);
            chai.expect(album.tracks[1].trackNumber).to.equal(2);
            chai.expect(album.tracks[2].trackNumber).to.equal(3);
        });

        it("first track number of next disk is computed from last track number on current disk", () => {
            album.push({ artist: artist, album: albumTitle, trackNumber: 2, title: "second track from disk two.mp3", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, trackNumber: 1, title: "track from disk three.mp3", disk: 3, path: "cccc" });
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].trackNumber).to.equal(2);
            chai.expect(album.tracks[1].trackNumber).to.equal(3);
        });

        it("index of tracks on next disk is offset by the number of tracks on the first disk", () => {
            album.push({ artist: artist, album: albumTitle, trackNumber: 2, title: "track from disk two.mp3", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, trackNumber: 2, title: "track from disk three.mp3", disk: 3, path: "cccc" });
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].trackNumber).to.equal(2);
            chai.expect(album.tracks[1].trackNumber).to.equal(4);
        });

        it("index tracks spanning three disks", () => {
            album.push({ artist: artist, album: albumTitle, trackNumber: 3, title: "track from disk two.mp3", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, trackNumber: 2, title: "track from disk three.mp3", disk: 3, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, trackNumber: 3, title: "track from disk four.mp3", disk: 4, path: "cccc" });
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].trackNumber).to.equal(3);
            chai.expect(album.tracks[1].trackNumber).to.equal(5);
            chai.expect(album.tracks[2].trackNumber).to.equal(8);
        });

        it("can fix numbers when the tracks are larger than 9", () => {
            album.push({ artist: artist, album: albumTitle, trackNumber: 12, title: "track from disk two.mp2", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, trackNumber:  1, title: "track from disk three.mp2", disk: 3, path: "cccc" });
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].trackNumber).to.equal(12);
            chai.expect(album.tracks[1].trackNumber).to.equal(13);
        });
        // TODO throw if some but not all tracks in a work has a disk id
    });

    describe("artist names", () => {
        var rule: Rule;
        it("makes no changes to artist names with no spaces", () => {
            album.artist = "a_b_c";
            fixer.fix(album, undefined, rule);
            chai.expect(album.artist).to.equal("a_b_c");
        });

        it("drops the 'the' and replaces space with _ in names starting with 'the'", () => {
            album.artist = "The Tragically Hip";
            fixer.fix(album, undefined, rule);
            chai.expect(album.artist).to.equal("Tragically_Hip");
        });

        it("swaps first and last name and replaces spaces with _ in names consisting first and last name", () => {
            album.artist = "Jimi Hendrix";
            fixer.fix(album, undefined, rule);
            chai.expect(album.artist).to.equal("Hendrix_Jimi");
        });

        it("makes no changes to artist names that don't fit these patterns", () => {
            album.artist = "One Two Three";
            fixer.fix(album, undefined, rule);
            chai.expect(album.artist).to.equal("One Two Three");
        });

        describe("special case handling", () => {
            it("fixes artist name", () => {
                album.artist = "Beady Belle";
                var mockRule = {
                    "Beady Belle":{
                        artistName: "Beady_Belle"
                    }
                };
                var customFixer = new CustomFixerFactory(mockRule, log);
                var artistName = customFixer.getArtistName(album.artist);
                fixer.fix(album, artistName, undefined);
                chai.expect(album.artist).to.equal("Beady_Belle");
            });
            it("fixes track names from regular expression", () => {
                album.tracks[0].title = "15 Variationen mit Fuge Es-dur op.35 'Eroica' - Introduzione col Basso del Tema. Allegretto vivace.mp3";
                var mockRule = {
                    "Beethoven": {
                        "Eroica Variations E# op.35 [Gilels]": {
                            fixTrackName: /^15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*).mp3$/
                        }
                    }
                };
                var customFixer = new CustomFixerFactory(mockRule, log).create("Beethoven", "Eroica Variations E# op.35 [Gilels]");
                fixer.fix(album, undefined, customFixer);
                chai.expect(album.tracks[0].title).to.equal("Introduzione col Basso del Tema. Allegretto vivace");
            });
            it("fixes track names from function", () => {
                album.tracks[0].title = "original title";
                var mockRule = {
                    "someArtist": {
                        "someAlbum": {
                            fixTrackNameFunc: function(title: string): string {
                                return "fixed title.mp3";
                            }
                        }
                    }
                };
                var customFixer = new CustomFixerFactory(mockRule, log).create("someArtist", "someAlbum");
                fixer.fix(album, undefined, customFixer);
                chai.expect(album.tracks[0].title).to.equal("fixed title.mp3");
            });
            it("fixes album names from string", () => {
                var mockRule = {
                    "someArtist": {
                        "someAlbum": {
                            fixAlbumTitle: "fixed album name"
                        }
                    }
                };
                var customFixer = new CustomFixerFactory(mockRule, log).create("someArtist", "someAlbum");
                fixer.fix(album, undefined, customFixer);
                chai.expect(album.title).to.equal("fixed album name");
            });

            it("fixes album names from function", () => {
                var mockRule = {
                    "someArtist": {
                        "someAlbum": {
                            fixAlbumTitle: sonata( { num : 10 } )
                        }
                    }
                };
                var customFixer = new CustomFixerFactory(mockRule, log).create("someArtist", "someAlbum");
                fixer.fix(album, undefined, customFixer);
                chai.expect(album.title).to.equal("Sonata 10");
            });
        });
    });
});
