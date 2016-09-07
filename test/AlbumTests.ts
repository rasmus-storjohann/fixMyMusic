/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Album } from "../src/Album";
import { Track } from "../src/Track";

describe("Album", () => {
    describe("Constructor", () => {
        it("Sets artist", () => {
            var album = new Album("artist", "");
            chai.expect(album.artist).to.equal("artist");
        });
        it("Sets album title", () => {
            var album = new Album("", "title");
            chai.expect(album.title).to.equal("title");
        });
    });
    describe("adding elements", () => {
        it("can add element with matching artist and title", () => {
            var album = new Album("artist", "title");
            var track = {
                    path: "aaaa",
                    artist: "artist",
                    album: "title",
                    track: "1 track"
                };
            album.push(track);
            chai.expect(album.tracks[0].artist).to.equal("artist");
        });
        it("throws when adding track with wrong artist", () => {
            var album = new Album("artist", "title");
            var trackWithBadArtist = {
                    path: "aaaa",
                    artist: "badArtist",
                    album: "title",
                    track: "1 track"
                };

            chai.expect(() => {
                album.push(trackWithBadArtist);
            }).to.throw(Error, /Music track cannot be added to this album/);
        });
        it("throws when adding track with wrong album title", () => {
            var album = new Album("artist", "title");
            var trackWithBadTitle = {
                    path: "aaaa",
                    artist: "artist",
                    album: "badTitle",
                    track: "1 track"
                };

            chai.expect(() => {
                album.push(trackWithBadTitle);
            }).to.throw(Error, /Music track cannot be added to this album/);
        });
    });
});
