import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {Album} from "../../src/Album";
import {Track} from "../../src/businessInterfaces/tracks/Track";

describe("Album", () => {
        describe("Constructor", () => {
                it("Sets artist", () => {
                        var album = new Album("artist", "");
                        expect(album.artist).to.equal("artist");
                });
                it("Sets album title", () => {
                        var album = new Album("", "title");
                        expect(album.title).to.equal("title");
                });
        });
        describe("adding elements", () => {
                it("can add element with matching artist and title", () => {
                        var album = new Album("artist", "title");
                        var track = {
                                path : "aaaa",
                                artist : "artist",
                                album : "title",
                                trackNumber : 1,
                                title : "track"
                        };
                        album.push(track);
                        expect(album.tracks[0].title).to.equal("track");
                });
                it("throws when adding track with wrong artist", () => {
                        var album = new Album("artist", "title");
                        var trackWithBadArtist = {
                                path : "aaaa",
                                artist : "badArtist",
                                album : "title",
                                trackNumber : 1,
                                title : "track"
                        };

                        expect(() => {
                                album.push(trackWithBadArtist);
                        }).to.throw(Error, /Music track cannot be added to this album/);
                });
                it("throws when adding track with wrong album title", () => {
                        var album = new Album("artist", "title");
                        var trackWithBadTitle = {
                                path : "aaaa",
                                artist : "artist",
                                album : "badTitle",
                                trackNumber : 1,
                                title : "track"
                        };

                        expect(() => {
                                album.push(trackWithBadTitle);
                        }).to.throw(Error, /Music track cannot be added to this album/);
                });
        });
        describe("sorting tracks", () => {
                it("Sorts the tracks by track number", () => {
                        var album = new Album("artist", "album");

                        album.push({
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 2,
                                title : "aaaa.mp3"
                        });
                        album.push({
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 1,
                                title : "aaaa.mp3"
                        });

                        album.sortTracks();

                        expect(album.tracks).to.have.lengthOf(2);
                        expect(album.tracks[0].trackNumber).to.equal(1);
                        expect(album.tracks[1].trackNumber).to.equal(2);
                });

                it("sorts the tracks by disk id", () => {
                        var album = new Album("artist", "album");

                        album.push({
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 1,
                                title : "aaaa.mp3",
                                disk : 2
                        });
                        album.push({
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 1,
                                title : "aaaa.mp3",
                                disk : 1
                        });

                        album.sortTracks();

                        expect(album.tracks[0].disk).to.equal(1);
                        expect(album.tracks[1].disk).to.equal(2);
                });

                it("sorts by disk id then by track number", () => {
                        var album = new Album("artist", "album");

                        album.push({
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 1,
                                title : "aaaa.mp3",
                                disk : 2
                        });
                        album.push({
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 2,
                                title : "aaaa.mp3",
                                disk : 1
                        });
                        album.push({
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 3,
                                title : "aaaa.mp3",
                                disk : 1
                        });

                        album.sortTracks();

                        expect(album.tracks[0].trackNumber).to.equal(2);
                        expect(album.tracks[1].trackNumber).to.equal(3);
                        expect(album.tracks[2].trackNumber).to.equal(1);
                });
        });
});
