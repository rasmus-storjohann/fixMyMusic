/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Validator } from "../src/Validator";
import { Track } from "../src/Track";
import { Album } from "../src/Album";

var _theValidator : Validator;
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

    describe("on tracks", () => {
        it("accepts a valid tracks in correct order", () => {
            _theValidator.validateAlbum(createAlbum());
        });

        it("throws on missing track number", () => {
            musicTrack[0].title = "dddd";

            chai.expect(() => {
                _theValidator.validateAlbum(createAlbum());
            }).to.throw(Error, /Could not assign a track number/);
        });

        it("throws on tracks out of order", () => {

            musicTrack[0].title = "2 dddd";
            musicTrack[1].title = "1 dddd";

            chai.expect(() => {
                _theValidator.validateAlbum(createAlbum());
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on missing tracks", () => {

            musicTrack[0].title = "2 dddd";
            musicTrack[1].title = "3 dddd";

            chai.expect(() => {
                _theValidator.validateAlbum(createAlbum());
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on duplicate tracks", () => {

            musicTrack[0].title = "1 dddd";
            musicTrack[1].title = "1 eeee";

            chai.expect(() => {
                _theValidator.validateAlbum(createAlbum());
            }).to.throw(Error, /Track number out of order/);
        });
    });
});
