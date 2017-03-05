import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as shelljs from 'shelljs';
import * as log from "npmlog";
import {FileFactory} from "../src/FileFactory";

describe("FileFactory", () => {
        beforeEach(() => {
                log.level = 'silent';
                shelljs.rm("-rf", "out");
        });
        it("gets files from a directory", () => {
                shelljs.mkdir("-p", "out/artist/album/");
                shelljs.cp("test.mp3", "out/artist/album/02 track.mp3");
                shelljs.cp("test.mp3", "out/artist/album/03 track.mp3");

                var files = new FileFactory(log).create([ "out" ]);
                expect(files).has.lengthOf(2);
                expect(files[0]).equals("out/artist/album/02 track.mp3");
                expect(files[1]).equals("out/artist/album/03 track.mp3");
        });
        it("ignores non-mp3 files", () => {
                shelljs.mkdir("-p", "out/artist/album/");
                shelljs.cp("test.mp3", "out/artist/album/03 track.foo");

                var files = new FileFactory(log).create([ "out" ]);
                expect(files).is.empty;
        });
        it("gets files from multiple directories", () => {
                shelljs.mkdir("-p", "out/artist1/album/");
                shelljs.cp("test.mp3", "out/artist1/album/03 track.mp3");
                shelljs.mkdir("-p", "out/artist2/album/");
                shelljs.cp("test.mp3", "out/artist2/album/03 track.mp3");

                var files = new FileFactory(log).create([ "out/artist1", "out/artist2" ]);
                expect(files).has.lengthOf(2);
        });
});
