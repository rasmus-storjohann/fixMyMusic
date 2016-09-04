/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import shelljs = require('shelljs');
import fileExists = require('file-exists');
import { Application } from "../src/Application";

var createInputDirectoryWithFiles = function(fileNames: string[])
{
    shelljs.rm('-rf', "testOutput/source");
    shelljs.mkdir('-p', "testOutput/source/Artist/Album");
    fileNames.forEach((fileName) => {
        shelljs.cp("testOutput/test.mp3", "testOutput/source/Artist/Album/" + fileName);
    });
}

var cleanOuputuDirectory = function()
{
    shelljs.rm('-rf', "testOutput/destination");
    shelljs.mkdir('-p', "testOutput/destination");
}

describe("Acceptance tests", () => {

    beforeEach(() => {
        cleanOuputuDirectory();
    });

    it("Copies correctly named file from source to destination", () => {

        createInputDirectoryWithFiles(["01 Track.mp3"]);

        Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"]);

        chai.expect(fileExists("testOutput/destination/Artist/Album/01 Track.mp3")).is.true;
    });

    it("Fails on file without numeric prefix", () => {
        createInputDirectoryWithFiles(["Track.mp3"]);

        chai.expect(() => {
            Application.main(["testOutput/source", "--out", "testOutput/destination"]);
        }).to.throw(Error, /Could not assign a track number/);
    });
});
