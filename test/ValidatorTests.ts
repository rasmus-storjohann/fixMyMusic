/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Validator } from "../src/Validator";

var _theValidator : Validator;
beforeEach(() =>
{
    _theValidator = new Validator();
});

describe("Validator", () => {
    var musicTrack: MusicFile;
    beforeEach(() => {
        musicTrack = {
                path: "aaaa",
                artist: "bbbb",
                album: "cccc",
                track: "dddd",
                trackNumber: 12
            };
    });
    it("accepts a valid track", () => {
        _theValidator.validate(musicTrack);
    });

    it("throws on missing track number", () => {

        musicTrack.trackNumber = null;

        chai.expect(() => {
            _theValidator.validate(musicTrack);
        }).to.throw(Error, /Could not assign a track number/);
    });
});
