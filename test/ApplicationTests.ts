/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Application } from "../src/Application";

var _theApplication : Application;
beforeEach(() =>
{
    _theApplication = new Application(console);
});

describe("Application", () => {
    it("throws if out argument is not given", () => {
        var validName = "root/Artist/Album/01 Track.mp3";
        chai.expect(() => {
            _theApplication.doIt([validName]);
        }).to.throw(Error, /Specify --out argument/);
    });

    // it("throws if input file is invalid", () => {
    //     var invalidPathWithSpaceInArtistName = "root/Artist Name/Album/01 Track.mp3";
    //     chai.expect(() => {
    //         _theApplication.doIt(["--out", "out", invalidPathWithSpaceInArtistName]);
    //     }).to.throw(Error, /Bla/);
    // });
});
