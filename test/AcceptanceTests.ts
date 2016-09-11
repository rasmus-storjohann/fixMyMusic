/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import * as shelljs from 'shelljs';
import * as fileExists from 'file-exists';
import { Application } from "../src/Application";

var createInputDirectoryWithFiles = function(fileNames: string[])
{
    shelljs.rm('-rf', "testOutput/source");
    shelljs.mkdir('-p', "testOutput/source/Artist/Album");
    fileNames.forEach((fileName) => {
        shelljs.cp("test.mp3", "testOutput/source/Artist/Album/" + fileName);
    });
}

var cleanOuputuDirectory = function()
{
    shelljs.rm('-rf', "testOutput/destination");
    shelljs.mkdir('-p', "testOutput/destination");
}

beforeEach(() => {
    cleanOuputuDirectory();
});

describe("Acceptance tests", () => {

    it("Has test prerequisites", () => {
        chai.expect(fileExists("test.mp3")).is.true;
    });

    it("Copies file from source to destination", () => {
        createInputDirectoryWithFiles(["01 Track.mp3"]);
        Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], console);
        chai.expect(fileExists("testOutput/destination/Artist/Album/01 Track.mp3")).is.true;
    });
});
