"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const Album_1 = require("../../src/Album");
mocha_1.describe("Album", () => {
    mocha_1.describe("Constructor", () => {
        mocha_1.it("Sets artist", () => {
            var album = new Album_1.Album([{
                    path: "aaaa",
                    artist: "artist",
                    album: "title",
                    trackNumber: 1,
                    title: "track"
                }]);
            chai_1.expect(album.artist).to.equal("artist");
        });
        mocha_1.it("Sets album title", () => {
            var album = new Album_1.Album([{
                    path: "aaaa",
                    artist: "artist",
                    album: "title",
                    trackNumber: 1,
                    title: "track"
                }]);
            chai_1.expect(album.title).to.equal("title");
        });
    });
    mocha_1.describe("adding elements", () => {
        mocha_1.it("can add element with matching artist and title", () => {
            var album = new Album_1.Album([{
                    path: "aaaa",
                    artist: "artist",
                    album: "title",
                    trackNumber: 1,
                    title: "track"
                }]);
            chai_1.expect(album.tracks[0].title).to.equal("track");
        });
        mocha_1.it("throws when adding track with wrong artist", () => {
            chai_1.expect(() => {
                new Album_1.Album([{
                        path: "aaaa",
                        artist: "badArtist",
                        album: "title",
                        trackNumber: 1,
                        title: "track"
                    },
                    {
                        path: "aaaa",
                        artist: "artist",
                        album: "title",
                        trackNumber: 1,
                        title: "track"
                    }]);
            }).to.throw(Error, /cannot be added to this album with artist/);
        });
        mocha_1.it("throws when adding track with wrong album title", () => {
            chai_1.expect(() => {
                new Album_1.Album([{
                        path: "aaaa",
                        artist: "artist",
                        album: "title",
                        trackNumber: 1,
                        title: "track"
                    },
                    {
                        path: "aaaa",
                        artist: "artist",
                        album: "badTitle",
                        trackNumber: 1,
                        title: "track"
                    }]);
            }).to.throw(Error, /cannot be added to this album with title/);
        });
    });
    mocha_1.describe("sorting tracks", () => {
        mocha_1.it("Sorts the tracks by track number", () => {
            var album = new Album_1.Album([{
                    path: "",
                    artist: "artist",
                    album: "album",
                    trackNumber: 2,
                    title: "aaaa.mp3"
                },
                {
                    path: "",
                    artist: "artist",
                    album: "album",
                    trackNumber: 1,
                    title: "aaaa.mp3"
                }]);
            album.sortTracks();
            chai_1.expect(album.tracks).to.have.lengthOf(2);
            chai_1.expect(album.tracks[0].trackNumber).to.equal(1);
            chai_1.expect(album.tracks[1].trackNumber).to.equal(2);
        });
        mocha_1.it("sorts the tracks by disk id", () => {
            var album = new Album_1.Album([{
                    path: "",
                    artist: "artist",
                    album: "album",
                    trackNumber: 1,
                    title: "aaaa.mp3",
                    disk: 2
                },
                {
                    path: "",
                    artist: "artist",
                    album: "album",
                    trackNumber: 1,
                    title: "aaaa.mp3",
                    disk: 1
                }]);
            album.sortTracks();
            chai_1.expect(album.tracks[0].disk).to.equal(1);
            chai_1.expect(album.tracks[1].disk).to.equal(2);
        });
        mocha_1.it("sorts by disk id then by track number", () => {
            var album = new Album_1.Album([{
                    path: "",
                    artist: "artist",
                    album: "album",
                    trackNumber: 1,
                    title: "aaaa.mp3",
                    disk: 2
                },
                {
                    path: "",
                    artist: "artist",
                    album: "album",
                    trackNumber: 2,
                    title: "aaaa.mp3",
                    disk: 1
                },
                {
                    path: "",
                    artist: "artist",
                    album: "album",
                    trackNumber: 3,
                    title: "aaaa.mp3",
                    disk: 1
                }]);
            album.sortTracks();
            chai_1.expect(album.tracks[0].trackNumber).to.equal(2);
            chai_1.expect(album.tracks[1].trackNumber).to.equal(3);
            chai_1.expect(album.tracks[2].trackNumber).to.equal(1);
        });
    });
});
