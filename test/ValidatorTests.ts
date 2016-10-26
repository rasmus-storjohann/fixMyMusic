/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import * as log from "npmlog";
import { Validator } from "../src/Validator";
import { Track } from "../src/Track";
import { Album, AlbumTrack } from "../src/Album";
import { SpecialHandling, SpecialHandler } from "../src/SpecialHandling";

var _theValidator : Validator;
var specialHandlers: SpecialHandler;
beforeEach(() =>
{
    log.level = 'silent';
    _theValidator = new Validator(log);
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

    function createAlbumWithTrack(artistName: string, albumName: string, tracks: AlbumTrack[]) : Album
    {
        var album = new Album(artistName, albumName);

        tracks.forEach(track => {
            album.push({
                path: track.path,
                artist: artistName,
                album: albumName,
                title: track.title
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
            }).to.throw(Error, /Failed validation of \'aaaa\': title \'dddd\' has no number/);
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

        it("throws on inconsistent length of numeric prefix to track names", () => {

            musicTrack[0].title = "1 dddd";
            musicTrack[1].title = "02 eeee";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), specialHandlers);
            }).to.throw(Error, /Inconsistent numbering format/);
        });

        it("throws on very similar track names", () => {
            musicTrack[0].title = "01 The name of the work and then the ... first track name.mp3";
            musicTrack[1].title = "02 The name of the work and then the ... second track name.mp3";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), specialHandlers);
            }).to.throw(Error, /Redundant track names/);
        });

        it("does not throw on short, similar track names", () => {
            musicTrack[0].title = "01 allegro.mp3";
            musicTrack[1].title = "02 allegro.mp3";

            _theValidator.validate(createAlbum(), specialHandlers);
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
    });
});
