import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {Album} from "../../src/Album";
import {Track} from "../../src/businessInterfaces/tracks/Track";

describe("Album", () => {
        describe("Constructor", () => {
                it("Sets artist", () => {
                        var album = new Album([{
                                path : "aaaa",
                                artist : "artist",
                                album : "title",
                                trackNumber : 1,
                                title : "track"
                        }]);
                        expect(album.artist).to.equal("artist");
                });
                it("Sets album title", () => {
                        var album = new Album([{
                                path : "aaaa",
                                artist : "artist",
                                album : "title",
                                trackNumber : 1,
                                title : "track"
                        }]);
                        expect(album.title).to.equal("title");
                });
        });
        describe("adding elements", () => {
                it("can add element with matching artist and title", () => {
                        var album = new Album([{
                                path : "aaaa",
                                artist : "artist",
                                album : "title",
                                trackNumber : 1,
                                title : "track"
                        }]);
                        expect(album.tracks[0].title).to.equal("track");
                });
                it("throws when adding track with wrong artist", () => {
                        expect(() => {
                                new Album([{
                                        path : "aaaa",
                                        artist : "badArtist",
                                        album : "title",
                                        trackNumber : 1,
                                        title : "track"
                                },
                                {
                                        path : "aaaa",
                                        artist : "artist",
                                        album : "title",
                                        trackNumber : 1,
                                        title : "track"
                                }]);
                        }).to.throw(Error, /cannot be added to this album with artist/);
                });
                it("throws when adding track with wrong album title", () => {
                        expect(() => {
                                new Album([{
                                        path : "aaaa",
                                        artist : "artist",
                                        album : "title",
                                        trackNumber : 1,
                                        title : "track"
                                },
                                {
                                        path : "aaaa",
                                        artist : "artist",
                                        album : "badTitle",
                                        trackNumber : 1,
                                        title : "track"
                                }]);
                        }).to.throw(Error, /cannot be added to this album with title/);
                });
        });
        describe("sorting tracks", () => {
                it("Sorts the tracks by track number", () => {
                        var album = new Album([{
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 2,
                                title : "aaaa.mp3"
                        },
                        {
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 1,
                                title : "aaaa.mp3"
                        }]);

                        album.sortTracks();

                        expect(album.tracks).to.have.lengthOf(2);
                        expect(album.tracks[0].trackNumber).to.equal(1);
                        expect(album.tracks[1].trackNumber).to.equal(2);
                });

                it("sorts the tracks by disk id", () => {
                        var album = new Album([{
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 1,
                                title : "aaaa.mp3",
                                disk : 2
                        },
                        {
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 1,
                                title : "aaaa.mp3",
                                disk : 1
                        }]);

                        album.sortTracks();

                        expect(album.tracks[0].disk).to.equal(1);
                        expect(album.tracks[1].disk).to.equal(2);
                });

                it("sorts by disk id then by track number", () => {
                        var album = new Album([{
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 1,
                                title : "aaaa.mp3",
                                disk : 2
                        },
                        {
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 2,
                                title : "aaaa.mp3",
                                disk : 1
                        },
                        {
                                path : "",
                                artist : "artist",
                                album : "album",
                                trackNumber : 3,
                                title : "aaaa.mp3",
                                disk : 1
                        }]);

                        album.sortTracks();

                        expect(album.tracks[0].trackNumber).to.equal(2);
                        expect(album.tracks[1].trackNumber).to.equal(3);
                        expect(album.tracks[2].trackNumber).to.equal(1);
                });
        });
});
