/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Validator } from "../src/Validator";
import { Track } from "../src/Track";
import { Album } from "../src/Album";

var _theValidator : Validator;
var specialHandlers = null;
beforeEach(() =>
{
    _theValidator = new Validator();
});

describe("Validator", () => {
    var musicTrack: Track[];
    beforeEach(() => {
        var artist = "aaaa";
        var albumTitle = "bbbb";
        musicTrack = [{
                artist: artist,
                album: albumTitle,
                path: "aaaa",
                title: "1 bbbb"
            },
            {
                artist: artist,
                album: albumTitle,
                path: "cccc",
                title: "2 dddd"
            }];
    });

    function createAlbum() : Album
    {
        var artist = musicTrack[0].artist;
        var albumTitle = musicTrack[0].album;

        var album = new Album(artist, albumTitle);
        album.push(musicTrack[0]);
        album.push(musicTrack[1]);

        return album;
    }

    function createAlbumWithTrack(artistName: string, albumName: string, tracks) : Album
    {
        var album = new Album(artistName, albumName);

        tracks.forEach(track => {
            album.push({
                path: track.path,
                artist: artistName,
                album: albumName,
                title: track.trackName
            });
        });

        return album;
    }

    it("accepts a valid tracks in correct order", () => {
        _theValidator.validate(createAlbum(), specialHandlers);
    });

    describe("on tracks", () => {
        it("throws on missing track number", () => {
            musicTrack[0].title = "dddd";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), specialHandlers);
            }).to.throw(Error, /Could not assign a track number/);
        });

        it("throws on tracks out of order", () => {

            musicTrack[0].title = "2 dddd";
            musicTrack[1].title = "1 dddd";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), specialHandlers);
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on missing tracks", () => {

            musicTrack[0].title = "2 dddd";
            musicTrack[1].title = "3 dddd";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), specialHandlers);
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on duplicate tracks", () => {

            musicTrack[0].title = "1 dddd";
            musicTrack[1].title = "1 eeee";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), specialHandlers);
            }).to.throw(Error, /Track number out of order/);
        });
    });
    describe("on albums", () => {
        it("throws on space in artist", () => {
            musicTrack[0].artist = "aaaa bbbb";
            musicTrack[1].artist = "aaaa bbbb";
            chai.expect(() => {
                _theValidator.validate(createAlbum(), specialHandlers);
            }).to.throw(Error, /Artist contains a space/);
        });
    });

    describe("special case handling", () => {
        describe("Bach", () => {
            describe("B minor mass", () => {
                it("accepts tracks in the form x-y with x y digits", () => {
                    var tracks = [{ path:"music/Bach JS/BminorMass/1-1 Kyrie eleison.mp3",
                                    trackName: "1-1 Kyrie eleison.mp3"
                                  },
                                  {
                                    path:"music/Bach JS/BminorMass/1-2 Christe eleison.mp3",
                                    trackName: "1-2 Christe eleison.mp3"
                                  }];
                    _theValidator.validate(createAlbumWithTrack("Bach_JS", "BminorMass", tracks), specialHandlers);
                });
                it("rejects missing track", () => {
                    var tracks = [{ path:"music/Bach JS/BminorMass/1-1 Kyrie eleison.mp3",
                                    trackName: "1-1 Kyrie eleison.mp3"
                                  },
                                  {
                                    path:"music/Bach JS/BminorMass/1-2 Christe eleison.mp3",
                                    trackName: "1-3 Christe eleison.mp3"
                                  }];
                    chai.expect(() => {
                        _theValidator.validate(createAlbumWithTrack("Bach_JS", "BminorMass", tracks), specialHandlers);
                    }).to.throw(Error, /Track number out of order/);
                });
            });
        });
    });
});
