/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Validator } from "../src/Validator";
import { Track } from "../src/Track";

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
    var musicTrack: Track[];
    beforeEach(() => {
        musicTrack = [{
                path: "aaaa",
                artist: "bbbb",
                album: "cccc",
                title: trackNameWithPrefix("1")
            },
            {
                path: "aaaa",
                artist: "bbbb",
                album: "cccc",
                title: trackNameWithPrefix("2")
            }];
    });
    it("accepts a valid tracks in correct order", () => {
        _theValidator.validateTracks(musicTrack);
    });

    it("throws on missing track number", () => {
        musicTrack[0].title = trackNameWithPrefix("bla");

        chai.expect(() => {
            _theValidator.validateTracks(musicTrack);
        }).to.throw(Error, /Could not assign a track number/);
    });

    it("throws on tracks out of order", () => {

        musicTrack[0].title = trackNameWithPrefix("2");
        musicTrack[1].title = trackNameWithPrefix("1");

        chai.expect(() => {
            _theValidator.validateTracks(musicTrack);
        }).to.throw(Error, /Track number out of order/);
    });

    it("throws on missing tracks", () => {

        musicTrack[0].title = trackNameWithPrefix("2");
        musicTrack[1].title = trackNameWithPrefix("3");

        chai.expect(() => {
            _theValidator.validateTracks(musicTrack);
        }).to.throw(Error, /Track number out of order/);
    });

    it("throws on duplicate tracks", () => {

        musicTrack[0].title = trackNameWithPrefix("1");
        musicTrack[1].title = trackNameWithPrefix("1");

        chai.expect(() => {
            _theValidator.validateTracks(musicTrack);
        }).to.throw(Error, /Track number out of order/);
    });
});
