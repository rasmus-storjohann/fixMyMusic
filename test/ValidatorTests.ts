/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Validator } from "../src/Validator";
import { MusicFile } from "../src/MusicFile";

var _theValidator : Validator;
beforeEach(() =>
{
    _theValidator = new Validator();
});

function trackNameWithPrefix(prefix: string) : string
{
    return prefix + " dddd";
}

describe("Validator", () => {
    var musicTrack: MusicFile[];
    beforeEach(() => {
        musicTrack = [{
                path: "aaaa",
                artist: "bbbb",
                album: "cccc",
                track: trackNameWithPrefix("1")
            },
            {
                path: "aaaa",
                artist: "bbbb",
                album: "cccc",
                track: trackNameWithPrefix("2")
            }];
    });
    it("accepts a valid tracks in correct order", () => {
        _theValidator.validateAlbum(musicTrack);
    });

    it("throws on missing track number", () => {
        musicTrack[0].track = trackNameWithPrefix("bla");

        chai.expect(() => {
            _theValidator.validateAlbum(musicTrack);
        }).to.throw(Error, /Could not assign a track number/);
    });

    it("throws on tracks out of order", () => {

        musicTrack[0].track = trackNameWithPrefix("2");
        musicTrack[1].track = trackNameWithPrefix("1");

        chai.expect(() => {
            _theValidator.validateAlbum(musicTrack);
        }).to.throw(Error, /Track number out of order/);
    });

    it("throws on missing tracks", () => {

        musicTrack[0].track = trackNameWithPrefix("2");
        musicTrack[1].track = trackNameWithPrefix("3");

        chai.expect(() => {
            _theValidator.validateAlbum(musicTrack);
        }).to.throw(Error, /Track number out of order/);
    });

    it("throws on duplicate tracks", () => {

        musicTrack[0].track = trackNameWithPrefix("1");
        musicTrack[1].track = trackNameWithPrefix("1");

        chai.expect(() => {
            _theValidator.validateAlbum(musicTrack);
        }).to.throw(Error, /Track number out of order/);
    });
});
