"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const shelljs = require("shelljs");
const log = require("npmlog");
const readTrackFileFromDirectories_1 = require("../../src/businessObjects/tracks/readTrackFileFromDirectories");
mocha_1.describe("FileFactory", () => {
    mocha_1.beforeEach(() => {
        log.level = 'silent';
        shelljs.rm("-rf", "out");
    });
    mocha_1.it("gets files from a directory", () => {
        shelljs.mkdir("-p", "out/artist/album/");
        shelljs.cp("test.mp3", "out/artist/album/02 track.mp3");
        shelljs.cp("test.mp3", "out/artist/album/03 track.mp3");
        var files = readTrackFileFromDirectories_1.readTrackFileFromDirectories(["out"], log);
        chai_1.expect(files).has.lengthOf(2);
        chai_1.expect(files[0]).equals("out/artist/album/02 track.mp3");
        chai_1.expect(files[1]).equals("out/artist/album/03 track.mp3");
    });
    mocha_1.it("ignores non-mp3 files", () => {
        shelljs.mkdir("-p", "out/artist/album/");
        shelljs.cp("test.mp3", "out/artist/album/03 track.foo");
        var files = readTrackFileFromDirectories_1.readTrackFileFromDirectories(["out"], log);
        chai_1.expect(files).is.empty;
    });
    mocha_1.it("gets files from multiple directories", () => {
        shelljs.mkdir("-p", "out/artist1/album/");
        shelljs.cp("test.mp3", "out/artist1/album/03 track.mp3");
        shelljs.mkdir("-p", "out/artist2/album/");
        shelljs.cp("test.mp3", "out/artist2/album/03 track.mp3");
        var files = readTrackFileFromDirectories_1.readTrackFileFromDirectories(["out/artist1", "out/artist2"], log);
        chai_1.expect(files).has.lengthOf(2);
    });
});
