/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import * as shelljs from "shelljs";
import * as fileExists from "file-exists";
import * as log from "npmlog";
import { Application } from "../src/Application";

beforeEach(() => {
    log.level = "silent";
    shelljs.rm("-rf", "testOutput/destination");
    shelljs.mkdir("-p", "testOutput/destination");
});

describe("Acceptance tests", () => {

    beforeEach(() => {
        log.level = "silent";
        shelljs.chmod("a+w", "-R", "testOutput");
        shelljs.rm("-rf", "testOutput");
    });

    it("Has test prerequisites", () => {
        chai.expect(fileExists("test.mp3")).is.true;
    });

    it("Copies file from source to destination", () => {
        shelljs.mkdir("-p", "testOutput/source/artist/album/");
        shelljs.cp("test.mp3", "testOutput/source/artist/album/01 first track.mp3");

        log.level = "silent";
        Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], log);

        chai.expect(fileExists("testOutput/destination/artist/album/01 first track.mp3")).is.true;
    });

    it("With --dry-run does not copy file", () => {
        shelljs.mkdir("-p", "testOutput/source/artist/album/");
        shelljs.cp("test.mp3", "testOutput/source/artist/album/01 first track.mp3");

        log.level = "silent";
        Application.main(["ignored", "ignored", "testOutput/source", "--dry-run", "--out", "testOutput/destination"], log);

        chai.expect(fileExists("testOutput/destination/artist/album/01 first track.mp3")).is.false;
    });

    describe("with special characters in filenames", () => {
        it("supports []", () => {
            shelljs.mkdir("-p", "testOutput/source/artist/album/");
            shelljs.cp("test.mp3", "testOutput/source/artist/album/01 [abc].mp3");

            log.level = "silent";
            Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], log);

            chai.expect(fileExists("testOutput/destination/artist/album/01 [abc].mp3")).is.true;
        });
        it("supports *", () => {
            shelljs.mkdir("-p", "testOutput/source/artist/album/");
            shelljs.cp("test.mp3", "testOutput/source/artist/album/01 abc*efg.mp3");

            log.level = "silent";
            Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], log);

            chai.expect(fileExists("testOutput/destination/artist/album/01 abc*efg.mp3")).is.true;
        });
        it("supports ()", () => {
            shelljs.mkdir("-p", "testOutput/source/artist/album/");
            shelljs.cp("test.mp3", "testOutput/source/artist/album/01 (efg).mp3");

            log.level = "silent";
            Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], log);

            chai.expect(fileExists("testOutput/destination/artist/album/01 (efg).mp3")).is.true;
        });
        it("supports \"", () => {
            shelljs.mkdir("-p", "testOutput/source/artist/album/");
            shelljs.cp("test.mp3", "testOutput/source/artist/album/01 \"efg\".mp3");

            log.level = "silent";
            Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], log);

            chai.expect(fileExists("testOutput/destination/artist/album/01 \"efg\".mp3")).is.true;
        });
        it("supports '", () => {
            shelljs.mkdir("-p", "testOutput/source/artist/album/");
            shelljs.cp("test.mp3", "testOutput/source/artist/album/01 'efg'.mp3");

            log.level = "silent";
            Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], log);

            chai.expect(fileExists("testOutput/destination/artist/album/01 'efg'.mp3")).is.true;
        });
    });

    it("Copies file with disk id in path from source to destination", () => {
        shelljs.mkdir("-p", "testOutput/source/artist/album/disk1");
        shelljs.mkdir("-p", "testOutput/source/artist/album/disk2");
        shelljs.cp("test.mp3", "testOutput/source/artist/album/disk1/01 first track.mp3");
        shelljs.cp("test.mp3", "testOutput/source/artist/album/disk2/01 second track.mp3");

        Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], log);

        chai.expect(fileExists("testOutput/destination/artist/album/01 first track.mp3")).is.true;
        chai.expect(fileExists("testOutput/destination/artist/album/02 second track.mp3")).is.true;
    });

    it("Supports validation directive to ignore track numbers", () => {
        shelljs.mkdir("-p", "testOutput/source/Aaron Copland/FourPieces");
        shelljs.cp("test.mp3", "testOutput/source/Aaron Copland/FourPieces/Disc 1 - 05 - Grohg - Cortège macabre.mp3");
        shelljs.cp("test.mp3", "testOutput/source/Aaron Copland/FourPieces/Disc 1 - 06 - Letter From Home.mp3");
        shelljs.cp("test.mp3", "testOutput/source/Aaron Copland/FourPieces/Disc 1 - 07 - John Henry.mp3");
        shelljs.cp("test.mp3", "testOutput/source/Aaron Copland/FourPieces/Disc 2 - 09 - Quiet City.mp3");

        Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], log);

        chai.expect(fileExists("testOutput/destination/Copland_Aaron/Four Pieces/01 Grohg - Cortège macabre.mp3")).is.true;
        chai.expect(fileExists("testOutput/destination/Copland_Aaron/Four Pieces/02 Letter From Home.mp3")).is.true;
        chai.expect(fileExists("testOutput/destination/Copland_Aaron/Four Pieces/03 John Henry.mp3")).is.true;
        chai.expect(fileExists("testOutput/destination/Copland_Aaron/Four Pieces/04 Quiet City.mp3")).is.true;
    });

    // TODO throws if the first track of the second disk is missing

    describe("Sets mp3 tags", () => {
        shelljs.mkdir("-p", "testOutput/source/dummy artist/dummy album");
        shelljs.cp("test.mp3", "testOutput/source/dummy artist/dummy album/01 dummy track.mp3");

        Application.main(["ignored", "ignored", "testOutput/source", "--out", "testOutput/destination"], log);

        var mp3infoCommand = [ "mp3info",
                               "\"testOutput/destination/artist_dummy/dummy album/01 dummy track.mp3\"",
                               "-p \"artist='%a' album='%l' track='%t'\n\""
                             ].join(" ");

        shelljs.exec(mp3infoCommand, function(code, stdout, stderr) {
            var expected = "artist='artist_dummy' album='dummy album' track='01 dummy track'\n";
            chai.expect(stdout).to.equal(expected);
        });
    });
});
