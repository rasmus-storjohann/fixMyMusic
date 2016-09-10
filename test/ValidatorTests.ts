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
        musicTrack = [{
                path: "aaaa",
                artist: "bbbb",
                album: "cccc",
                title: "1 dddd"
            },
            {
                path: "aaaa",
                artist: "bbbb",
                album: "cccc",
                title: "2 dddd"
            }];
    });
    describe("on tracks", () => {
        it("accepts a valid tracks in correct order", () => {
            _theValidator.validateTracks(musicTrack);
        });

        it("throws on missing track number", () => {
            musicTrack[0].title = "dddd";

            chai.expect(() => {
                _theValidator.validateTracks(musicTrack);
            }).to.throw(Error, /Could not assign a track number/);
        });

        it("throws on tracks out of order", () => {

            musicTrack[0].title = "2 dddd";
            musicTrack[1].title = "1 dddd";

            chai.expect(() => {
                _theValidator.validateTracks(musicTrack);
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on missing tracks", () => {

            musicTrack[0].title = "2 dddd";
            musicTrack[1].title = "3 dddd";

            chai.expect(() => {
                _theValidator.validateTracks(musicTrack);
            }).to.throw(Error, /Track number out of order/);
        });

        it("throws on duplicate tracks", () => {

            musicTrack[0].title = "1 dddd";
            musicTrack[1].title = "1 eeee";

            chai.expect(() => {
                _theValidator.validateTracks(musicTrack);
            }).to.throw(Error, /Track number out of order/);
        });
    });
    describe("on albums", () => {
        it ("accepts a valid album", () => {
            var album = new Album("aaaa", "bbbb");
            _theValidator.validateAlbum(album);
        });
    });
});
