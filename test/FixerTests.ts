/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import * as log from "npmlog";
import { Fixer } from "../src/Fixer";
import { Album } from "../src/Album";
import { Track } from "../src/Track";
import { sonata } from "../src/AlbumFormat";
import { SpecialHandling, Rule } from "../src/SpecialHandling";

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
        title: "01 dddd"
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
            return { artist: artist, album: albumTitle, title: title, path: "cccc" };
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
            album.push({ artist: artist, album: albumTitle, title: "01 track from disk two.mp2", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "01 track from disk three.mp2", disk: 3, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "02 second track from disk three.mp2", disk: 3, path: "cccc" });

            fixer.fix(album, undefined, rule);

            chai.expect(album.tracks[0].title).to.equal("01 track from disk two.mp2");
            chai.expect(album.tracks[1].title).to.equal("02 track from disk three.mp2");
            chai.expect(album.tracks[2].title).to.equal("03 second track from disk three.mp2");
        });

        it("first track number of next disk is computed from last track number on current disk", () => {
            album.push({ artist: artist, album: albumTitle, title: "02 second track from disk two.mp3", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "01 track from disk three.mp3", disk: 3, path: "cccc" });
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].title).to.equal("02 second track from disk two.mp3");
            chai.expect(album.tracks[1].title).to.equal("03 track from disk three.mp3");
        });

        it("index of tracks on next disk is offset by the number of tracks on the first disk", () => {
            album.push({ artist: artist, album: albumTitle, title: "02 track from disk two.mp3", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "02 track from disk three.mp3", disk: 3, path: "cccc" });
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].title).to.equal("02 track from disk two.mp3");
            chai.expect(album.tracks[1].title).to.equal("04 track from disk three.mp3");
        });

        it("index tracks spanning three disks", () => {
            album.push({ artist: artist, album: albumTitle, title: "03 track from disk two.mp3", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "02 track from disk three.mp3", disk: 3, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "03 track from disk four.mp3", disk: 4, path: "cccc" });
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].title).to.equal("03 track from disk two.mp3");
            chai.expect(album.tracks[1].title).to.equal("05 track from disk three.mp3");
            chai.expect(album.tracks[2].title).to.equal("08 track from disk four.mp3");
        });

        it("can fix numbers when the tracks are larger than 9", () => {
            album.push({ artist: artist, album: albumTitle, title: "12 track from disk two.mp2", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "01 track from disk three.mp2", disk: 3, path: "cccc" });
            fixer.fix(album, undefined, rule);
            chai.expect(album.tracks[0].title).to.equal("12 track from disk two.mp2");
            chai.expect(album.tracks[1].title).to.equal("13 track from disk three.mp2");
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

        it("converts one digit track number to two digit", () => {
            album.tracks[0].title = "3 Act I Scene 1  The people are the heroes now (Chorus).mp3";
            var mockRule = {
                "Adams_John":{
                    "Nixon1":{
                        fixTrackName: /(\d+) Act I Scene \d (.*).mp3/,
                    }
                }
            };
            var specialHandling = new SpecialHandling(mockRule, log).getSpecialHandlers("Adams_John", "Nixon1");
            fixer.fix(album, undefined, specialHandling);
            chai.expect(album.tracks[0].title).to.equal("03 The people are the heroes now (Chorus)");
        });

        describe("special case handling", () => {
            it("fixes artist name", () => {
                album.artist = "Beady Belle";
                var mockRule = {
                    "Beady Belle":{
                        artistName: "Beady_Belle"
                    }
                };
                var specialHandling = new SpecialHandling(mockRule, log);
                var artistName = specialHandling.getArtistName(album.artist);
                fixer.fix(album, artistName, undefined);
                chai.expect(album.artist).to.equal("Beady_Belle");
            });
            it("fixes track names from regular expression", () => {
                album.tracks[0].title = "09 15 Variationen mit Fuge Es-dur op.35 'Eroica' - Introduzione col Basso del Tema. Allegretto vivace.mp3";
                var mockRule = {
                    "Beethoven": {
                        "Eroica Variations E# op.35 [Gilels]": {
                            firstTrackNumber: 9,
                            fixTrackName: /^(\d+) 15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*).mp3$/
                        }
                    }
                };
                var specialHandling = new SpecialHandling(mockRule, log).getSpecialHandlers("Beethoven", "Eroica Variations E# op.35 [Gilels]");
                fixer.fix(album, undefined, specialHandling);
                chai.expect(album.tracks[0].title).to.equal("01 Introduzione col Basso del Tema. Allegretto vivace");
            });
            it("fixes track names from function", () => {
                album.tracks[0].title = "09 original title";
                var mockRule = {
                    "someArtist": {
                        "someAlbum": {
                            firstTrackNumber: 9,
                            fixTrackNameFunc: function(title: string): string {
                                return "09 fixed title.mp3";
                            }
                        }
                    }
                };
                var specialHandling = new SpecialHandling(mockRule, log).getSpecialHandlers("someArtist", "someAlbum");
                fixer.fix(album, undefined, specialHandling);
                chai.expect(album.tracks[0].title).to.equal("01 fixed title.mp3");
            });
            it("fixes album names from string", () => {
                var mockRule = {
                    "someArtist": {
                        "someAlbum": {
                            fixAlbumTitle: "fixed album name"
                        }
                    }
                };
                var specialHandling = new SpecialHandling(mockRule, log).getSpecialHandlers("someArtist", "someAlbum");
                fixer.fix(album, undefined, specialHandling);
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
                var specialHandling = new SpecialHandling(mockRule, log).getSpecialHandlers("someArtist", "someAlbum");
                fixer.fix(album, undefined, specialHandling);
                chai.expect(album.title).to.equal("Sonata 10");
            });
        });
    });
});
