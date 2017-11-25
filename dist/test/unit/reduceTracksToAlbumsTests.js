"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const log = require("npmlog");
const reduceTracksToAlbums_1 = require("../../src/businessObjects/albums/reduceTracksToAlbums");
mocha_1.describe("Reduce tracks", () => {
    var aTrack;
    var aTrackWithSameArtistAndAlbum;
    var aTrackWithSameAlbum;
    var aTrackWithSameArtist;
    mocha_1.beforeEach(() => {
        log.level = 'silent';
        aTrack = {
            artist: "aaaa",
            album: "bbbb",
            path: "cccc",
            trackNumber: 1,
            title: "dddd"
        };
        aTrackWithSameArtistAndAlbum = {
            artist: aTrack.artist,
            album: aTrack.album,
            path: "eeee",
            trackNumber: 1,
            title: "ffff"
        };
        aTrackWithSameAlbum = {
            artist: "gggg",
            album: aTrack.album,
            path: "hhhh",
            trackNumber: 1,
            title: "iiii"
        };
        aTrackWithSameArtist = {
            artist: aTrack.artist,
            album: "jjjj",
            path: "kkkk",
            trackNumber: 1,
            title: "llll"
        };
    });
    mocha_1.it("Can add a track to an album", () => {
        var albums = reduceTracksToAlbums_1.reduceTracksToAlbums([aTrack], log);
        chai_1.expect(albums).to.have.lengthOf(1);
    });
    mocha_1.it("Sets the album title to the title from the first track added", () => {
        var albums = reduceTracksToAlbums_1.reduceTracksToAlbums([aTrack], log);
        var album = albums[0];
        chai_1.expect(album.title).to.equal(aTrack.album);
    });
    mocha_1.it("Sets the album artist to the artist from the first track added", () => {
        var albums = reduceTracksToAlbums_1.reduceTracksToAlbums([aTrack], log);
        var album = albums[0];
        chai_1.expect(album.artist).to.equal(aTrack.artist);
    });
    mocha_1.it("Add tracks with the same artist and album title name to the same album", () => {
        var albums = reduceTracksToAlbums_1.reduceTracksToAlbums([aTrack, aTrackWithSameArtistAndAlbum], log);
        chai_1.expect(albums).to.have.lengthOf(1);
        chai_1.expect(albums[0].tracks).to.have.lengthOf(2);
        chai_1.expect(albums[0].tracks[0].title).to.equal(aTrack.title);
        chai_1.expect(albums[0].tracks[1].title).to.equal(aTrackWithSameArtistAndAlbum.title);
    });
    mocha_1.it("Adds tracks with different artist to different albums", () => {
        var albums = reduceTracksToAlbums_1.reduceTracksToAlbums([aTrack, aTrackWithSameAlbum], log);
        chai_1.expect(albums).to.have.lengthOf(2);
        chai_1.expect(albums[0].tracks).to.have.lengthOf(1);
        chai_1.expect(albums[1].tracks).to.have.lengthOf(1);
        chai_1.expect(albums[0].tracks[0].title).to.equal(aTrack.title);
        chai_1.expect(albums[1].tracks[0].title).to.equal(aTrackWithSameAlbum.title);
    });
    mocha_1.it("Adds tracks with different album titles to different albums", () => {
        var albums = reduceTracksToAlbums_1.reduceTracksToAlbums([aTrack, aTrackWithSameArtist], log);
        chai_1.expect(albums).to.have.lengthOf(2);
        chai_1.expect(albums[0].tracks).to.have.lengthOf(1);
        chai_1.expect(albums[1].tracks).to.have.lengthOf(1);
        chai_1.expect(albums[0].tracks[0].title).to.equal(aTrack.title);
        chai_1.expect(albums[1].tracks[0].title).to.equal(aTrackWithSameArtist.title);
    });
});
