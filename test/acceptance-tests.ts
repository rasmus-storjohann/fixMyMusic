/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import shelljs = require('shelljs');
import fileExists = require('file-exists');
import { Application } from "../src/Application";

describe("Acceptance tests", () => {

    beforeEach(() => {
        shelljs.rm('-rf', "testOutput/source");
        shelljs.mkdir('-p', "testOutput/source/Artist/Album");
        shelljs.cp("testOutput/test.mp3", "testOutput/source/Artist/Album/01 Track.mp3");
    });

    beforeEach(() => {
        shelljs.rm('-rf', "testOutput/destination");
        shelljs.mkdir('-p', "testOutput/destination");
    });

    it("Copies correctly named file from source to destination", () => {
        Application.main(["testOutput/source", "testOutput/destination"]);

        chai.expect(fileExists("testOutput/destination/Artist/Album/01 Track.mp3")).is.true;
    });
});
