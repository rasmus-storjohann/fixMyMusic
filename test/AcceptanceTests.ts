/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import * as shelljs from 'shelljs';
import * as fileExists from 'file-exists';
import { Application } from "../src/Application";

class Logger
{
    constructor()
    {
        this.messages = [];
    }
    public log(message: string)
    {
        this.messages.push(message);
    }
    public getMessages() : string[]
    {
        return this.messages;
    }
    private messages: string[];
}

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

describe("Acceptance tests", () => {

    var logger: Logger;
    beforeEach(() => {
        cleanOuputuDirectory();
        logger = new Logger();
    });

    it("Copies correctly named file from source to destination", () => {
        // sanity test for all tests
        chai.expect(fileExists("test.mp3")).is.true;

        createInputDirectoryWithFiles(["01 Track.mp3"]);
        Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], logger);
        chai.expect(fileExists("testOutput/destination/Artist/Album/01 Track.mp3")).is.true;
    });
    // can specify multiple source locations

    it("Fails on file without numeric prefix", () => {
        createInputDirectoryWithFiles(["Track.mp3"]);
        Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], logger);
        chai.expect(logger.getMessages()[0]).match(/Track.mp3: Could not assign a track number/);
    });
});
