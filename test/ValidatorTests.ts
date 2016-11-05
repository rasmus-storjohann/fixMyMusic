/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import * as log from "npmlog";
import { Validator } from "../src/Validator";
import { Track } from "../src/Track";
import { Album, AlbumTrack } from "../src/Album";
import { SpecialHandling, Rule } from "../src/SpecialHandling";

var _theValidator : Validator;
var rule: Rule;
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
                title: "01 bbbb"
            },
            {
                artist: artist,
                album: albumTitle,
                path: "cccc",
                title: "02 dddd"
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
        _theValidator.validate(createAlbum(), rule);
    });

    describe("on tracks", () => {
        it("throws on missing track number", () => {
            musicTrack[0].title = "dddd";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), rule);
            }).to.throw(Error, /Failed validation of \'aaaa\': title \'dddd\' should have a two digit prefix/);
        });

        it("throws on too few digits in track number", () => {
            musicTrack[0].title = "1 dddd";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), rule);
            }).to.throw(Error, /Failed validation of \'aaaa\': title \'1 dddd\' should have a two digit prefix/);
        });

        it("throws on too many digits in track number", () => {
            musicTrack[0].title = "111 dddd";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), rule);
            }).to.throw(Error, /Failed validation of \'aaaa\': title \'111 dddd\' should have a two digit prefix/);
        });

        it("throws on tracks out of order", () => {

            musicTrack[0].title = "02 dddd";
            musicTrack[1].title = "01 dddd";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), rule);
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on missing tracks", () => {

            musicTrack[0].title = "02 dddd";
            musicTrack[1].title = "03 dddd";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), rule);
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on duplicate tracks", () => {

            musicTrack[0].title = "01 dddd";
            musicTrack[1].title = "01 eeee";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), rule);
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on very similar track names", () => {
            musicTrack[0].title = "01 1234567890.mp3";
            musicTrack[1].title = "02 1234567890.mp3";

            chai.expect(() => {
                _theValidator.validate(createAlbum(), rule);
            }).to.throw(Error, /bbbb: Album contains redundant track names/);
        });

        // TODO make this shorter and have an option to disable this check on some albums
        it("does not throw similar track names if they're short enough", () => {
            musicTrack[0].title = "01 123456789.mp3";
            musicTrack[1].title = "02 123456789.mp3";

            _theValidator.validate(createAlbum(), rule);
        });
    });
    describe("on albums", () => {
        it("throws on space in artist", () => {
            musicTrack[0].artist = "aaaa bbbb";
            musicTrack[1].artist = "aaaa bbbb";
            chai.expect(() => {
                _theValidator.validate(createAlbum(), rule);
            }).to.throw(Error, /Artist contains a space/);
        });
    });
    describe("overrides", () => {
        describe("skipping number validation", () => {
            it("ignores out of order tracks", ()=> {
                var mockRule = {
                    fixArtist: undefined,
                    fixTrack: undefined,
                    validation : ["skipTrackNumberCheck"]
                };
                musicTrack[0].title = "02 dddd";
                musicTrack[1].title = "01 dddd";

                _theValidator.validate(createAlbum(), mockRule);
            });
            it("ignores track prefix length", ()=> {
                var mockRule = {
                    fixArtist: undefined,
                    fixTrack: undefined,
                    validation : ["skipTrackNumberCheck"]
                };
                musicTrack[0].title = "1 dddd";
                musicTrack[1].title = "2 dddd";

                _theValidator.validate(createAlbum(), mockRule);
            });
        });
        describe("skipping track name uniqueness validation", () => {
            it("ignores out of order tracks", ()=> {
                var mockRule = {
                    fixArtist: undefined,
                    fixTrack: undefined,
                    validation : ["skipUniqueTrackNameCheck"]
                };
                musicTrack[0].title = "01 dddddddddddddddddddddddddddd";
                musicTrack[1].title = "02 dddddddddddddddddddddddddddd";

                _theValidator.validate(createAlbum(), mockRule);
            });
        });
        // add tests confirming that skipping one test does not skip the other
    });
});
