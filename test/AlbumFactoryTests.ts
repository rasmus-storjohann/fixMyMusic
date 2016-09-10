/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Track } from "../src/Track";
import { Album } from "../src/Album";
import { AlbumFactory } from "../src/AlbumFactory";
import { Autofixture } from "ts-autofixture";

describe("AlbumFactory", () => {
    var theFactory: AlbumFactory;
    var aTrack, aTrackWithSameArtistAndAlbum: Track;
    beforeEach(() => {
        theFactory = new AlbumFactory();
        aTrack = {
            artist: "aaaa",
            album: "bbbb",
            path: "cccc",
            title: "dddd"
        };
        aTrackWithSameArtistAndAlbum = {
            artist: aTrack.artist,
            album: aTrack.album,
            path: "eeee",
            title: "ffff"
        };
    });

    it("Can add a track to an album", () => {
        var albums = theFactory.create([aTrack]);
        chai.expect(albums).to.have.lengthOf(1);
    });

    it("Album takes the title from the track added", () => {
        var albums = theFactory.create([aTrack]);
        var album = albums[0];
        chai.expect(album.title).to.equal(aTrack.album);
    });

    it("Album takes the artist from the track added", () => {
        var albums = theFactory.create([aTrack]);
        var album = albums[0];
        chai.expect(album.artist).to.equal(aTrack.artist);
    });

    it("Tracks with the same artist and album name are added to the same album", () => {
        var albums = theFactory.create([aTrack, aTrackWithSameArtistAndAlbum]);
        chai.expect(albums).to.have.lengthOf(1);
        chai.expect(albums[0].tracks).to.have.lengthOf(2);
        chai.expect(albums[0].tracks[0].title).to.equal(aTrack.title);
        chai.expect(albums[0].tracks[1].title).to.equal(aTrackWithSameArtistAndAlbum.title);
    });

    it("Tracks with different artist are added to different albums", () => {
    });

    it("Tracks with different album titles are added to different albums", () => {
    });
});
