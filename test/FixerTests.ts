/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Fixer } from "../src/Fixer";
import { Album } from "../src/Album";
import { Track } from "../src/Track";
import { SpecialHandling, SpecialHandler } from "../src/SpecialHandling";

var fixer: Fixer;
var album: Album;
beforeEach(() => {
    fixer = new Fixer();
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
        it("assigns track numbers based on the disk number", () => {
            var specialHandler: SpecialHandler;
            var artist = "the artist";
            var albumTitle = "the album";
            var album = new Album(artist, albumTitle);
            album.push({ artist: artist, album: albumTitle, title: "01 track from disk two.mp2", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "01 track from disk three.mp2", disk: 3, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "02 second track from disk three.mp2", disk: 3, path: "cccc" });

            fixer.fix(album, specialHandler);

            chai.expect(album.tracks[0].title).to.equal("01 track from disk two.mp2");
            chai.expect(album.tracks[1].title).to.equal("02 track from disk three.mp2");
            chai.expect(album.tracks[2].title).to.equal("03 second track from disk three.mp2");
        });
        it("first track number of next disk is computed from last track number on current disk", () => {
            var specialHandler: SpecialHandler;
            var artist = "the artist";
            var albumTitle = "the album";
            var album = new Album(artist, albumTitle);
            album.push({ artist: artist, album: albumTitle, title: "02 second track from disk two.mp3", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "01 track from disk three.mp3", disk: 3, path: "cccc" });

            fixer.fix(album, specialHandler);

            chai.expect(album.tracks[0].title).to.equal("02 second track from disk two.mp3");
            chai.expect(album.tracks[1].title).to.equal("03 track from disk three.mp3");
        });

        it("index of tracks on next disk is offset by the number of tracks on the first disk", () => {
            var specialHandler: SpecialHandler;
            var artist = "the artist";
            var albumTitle = "the album";
            var album = new Album(artist, albumTitle);
            album.push({ artist: artist, album: albumTitle, title: "02 track from disk two.mp3", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "02 track from disk three.mp3", disk: 3, path: "cccc" });

            fixer.fix(album, specialHandler);

            chai.expect(album.tracks[0].title).to.equal("02 track from disk two.mp3");
            chai.expect(album.tracks[1].title).to.equal("04 track from disk three.mp3");
        });

        it("index tracks spanning three disks", () => {
            var specialHandler: SpecialHandler;
            var artist = "the artist";
            var albumTitle = "the album";
            var album = new Album(artist, albumTitle);
            album.push({ artist: artist, album: albumTitle, title: "03 track from disk two.mp3", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "02 track from disk three.mp3", disk: 3, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "03 track from disk four.mp3", disk: 4, path: "cccc" });

            fixer.fix(album, specialHandler);

            chai.expect(album.tracks[0].title).to.equal("03 track from disk two.mp3");
            chai.expect(album.tracks[1].title).to.equal("05 track from disk three.mp3");
            chai.expect(album.tracks[2].title).to.equal("08 track from disk four.mp3");
        });

        it("can fix numbers when the tracks are larger than 9", () => {
            var specialHandler: SpecialHandler;
            var artist = "the artist";
            var albumTitle = "the album";
            var album = new Album(artist, albumTitle);
            album.push({ artist: artist, album: albumTitle, title: "12 track from disk two.mp2", disk: 2, path: "cccc" });
            album.push({ artist: artist, album: albumTitle, title: "01 track from disk three.mp2", disk: 3, path: "cccc" });

            fixer.fix(album, specialHandler);

            chai.expect(album.tracks[0].title).to.equal("12 track from disk two.mp2");
            chai.expect(album.tracks[1].title).to.equal("13 track from disk three.mp2");
        });
        // TODO throw if some but not all tracks in a work has a disk id
    });

    describe("artist names", () => {
        var specialHandler: SpecialHandler;
        it("makes no changes to artist names with no spaces", () => {
            album.artist = "a_b_c";
            fixer.fix(album, specialHandler);
            chai.expect(album.artist).to.equal("a_b_c");
        });

        it("drops the 'the' and replaces space with _ in names starting with 'the'", () => {
            album.artist = "The Tragically Hip";
            fixer.fix(album, specialHandler);
            chai.expect(album.artist).to.equal("Tragically_Hip");
        });

        it("swaps first and last name and replaces spaces with _ in names consisting first and last name", () => {
            album.artist = "Jimi Hendrix";
            fixer.fix(album, specialHandler);
            chai.expect(album.artist).to.equal("Hendrix_Jimi");
        });

        it("makes no changes to artist names that don't fit these patterns", () => {
            album.artist = "One Two Three";
            fixer.fix(album, specialHandler);
            chai.expect(album.artist).to.equal("One Two Three");
        });

        describe("special case handling", () => {
            describe("John Adams", () => {
                it("Converts one digit track number to two digit", () => {
                    album.tracks[0].title = "Disc 1 - 3 - Act I Scene 1_ The people are the heroes now (Chorus).mp3";
                    specialHandler = new SpecialHandling().getSpecialHandlers("Adams_John", "Nixon1");
                    fixer.fix(album, specialHandler);
                    chai.expect(album.tracks[0].title).to.equal("03 The people are the heroes now (Chorus)");
                });
            });
            it("Doesn't switch the name Beady Belle", () => {
                album.artist = "Beady Belle";
                specialHandler = new SpecialHandling().getSpecialHandlers("Beady Belle", "");
                fixer.fix(album, specialHandler);
                chai.expect(album.artist).to.equal("Beady_Belle");
            });
            describe("Beethoven", () => {
                it("fixes track names on Eroica Variations E# op.35 [Gilels]", () => {
                    album.tracks[0].title = "09. 15 Variationen mit Fuge Es-dur op.35 'Eroica' - Introduzione col Basso del Tema. Allegretto vivace.mp3";
                    specialHandler = new SpecialHandling().getSpecialHandlers("Beethoven", "Eroica Variations E# op.35 [Gilels]");
                    fixer.fix(album, specialHandler);
                    chai.expect(album.tracks[0].title).to.equal("01 Introduzione col Basso del Tema. Allegretto vivace");
                });
                it("fixes track names on Quintet Eb Op16 [Richter]", () => {
                    album.tracks[0].title = "05 Quintet in E flat, Op. 16 - 1. Grave - Allegro ma non troppo.mp3";
                    specialHandler = new SpecialHandling().getSpecialHandlers("Beethoven", "Quintet Eb Op16 [Richter]");
                    fixer.fix(album, specialHandler);
                    chai.expect(album.tracks[0].title).to.equal("01 Grave - Allegro ma non troppo");
                });
            });
        });
    });
});
