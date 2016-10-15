/// <reference path = "../typings/auto.d.ts" />

import * as shelljs from 'shelljs';
import * as log from "npmlog";
import * as chai from "chai";
import { getFiles } from "../src/GetFiles";

describe("GetFiles", () => {
    beforeEach(() => {
        log.level = 'silent';
        shelljs.rm("-rf", "out");
    });
    it("gets files from a directory", () => {
        shelljs.mkdir("-p", "out/artist/album/");
        shelljs.cp("test.mp3", "out/artist/album/02 track.mp3");
        shelljs.cp("test.mp3", "out/artist/album/03 track.mp3");

        var files = getFiles(["out"], log);
        chai.expect(files).has.lengthOf(2);
        chai.expect(files[0]).equals("out/artist/album/02 track.mp3");
        chai.expect(files[1]).equals("out/artist/album/03 track.mp3");
    });
    it("ignores non-mp3 files", () => {
        shelljs.mkdir("-p", "out/artist/album/");
        shelljs.cp("test.mp3", "out/artist/album/03 track.foo");

        var files = getFiles(["out"], log);
        chai.expect(files).is.empty;
    });
    it("gets files from multiple directories", () => {
        shelljs.mkdir("-p", "out/artist1/album/");
        shelljs.cp("test.mp3", "out/artist1/album/03 track.mp3");
        shelljs.mkdir("-p", "out/artist2/album/");
        shelljs.cp("test.mp3", "out/artist2/album/03 track.mp3");

        var files = getFiles(["out/artist1", "out/artist2"], log);
        chai.expect(files).has.lengthOf(2);
    });
});
