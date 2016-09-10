/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Track } from "../src/Track";
import { Album } from "../src/Album";
import { AlbumFactory } from "../src/AlbumFactory";
import { Autofixture } from "ts-autofixture";

describe("AlbumFactory", () => {
    var theFactory: AlbumFactory;
    var aTrack: Track;
    beforeEach(() => {
        theFactory = new AlbumFactory();
        aTrack = {
            path: "aaaa",
            artist: "bbbb",
            album: "cccc",
            track: "dddd"
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

    it("Album takes the title from the track added", () => {
        var albums = theFactory.create([aTrack]);
        var album = albums[0];
        chai.expect(album.artist).to.equal(aTrack.artist);
    });

    it("Tracks with the same artist and album name are added to the same album", () => {
    });

    it("Tracks with different artist are added to different albums", () => {
    });

    it("Tracks with different album titles are added to different albums", () => {
    });
});
