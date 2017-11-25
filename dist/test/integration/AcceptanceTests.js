"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const shelljs = require("shelljs");
const fileExists = require("file-exists");
const log = require("npmlog");
const Application_1 = require("../../src/Application");
const TrackTestHelper_1 = require("./TrackTestHelper");
mocha_1.beforeEach(() => {
    log.level = "silent";
    shelljs.rm("-rf", "testOutput/destination");
    shelljs.mkdir("-p", "testOutput/destination");
});
mocha_1.describe("Acceptance tests", () => {
    mocha_1.beforeEach(() => {
        log.level = "silent";
        shelljs.rm("-rf", "testOutput");
    });
    mocha_1.it("Has test prerequisites", () => { chai_1.expect(fileExists("test.mp3")).is.true; });
    mocha_1.it("Copies file from source to destination", () => {
        new TrackTestHelper_1.TrackTestHelper("testOutput/source/artist/album/").create("01 first track.mp3");
        Application_1.Application.main([
            "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
        ]);
        chai_1.expect(fileExists("testOutput/destination/artist/album/01 first track.mp3"))
            .is.true;
    });
    mocha_1.it("Applies album fix rule for classical work", () => {
        var trackHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/source/Aaron Copland/Symph3/");
        trackHelper.create("Disc 1 - 04 - Symphony No. 3: IV. Molto deliberato.mp3");
        trackHelper.create("Disc 1 - 03 - Symphony No. 3: III. Andantino quasi allegretto.mp3");
        trackHelper.create("Disc 1 - 01 - Symphony No. 3: I. Molto moderato, with simple expression.mp3");
        trackHelper.create("Disc 1 - 02 - Symphony No. 3: II. Allegro molto.mp3");
        Application_1.Application.main([
            "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
        ]);
        var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/Copland_Aaron/Symph 3");
        chai_1.expect(outputHelper.exists("01 Molto moderato, with simple expression.mp3")).is.true;
        chai_1.expect(outputHelper.exists("02 Allegro molto.mp3")).is.true;
        chai_1.expect(outputHelper.exists("03 Andantino quasi allegretto.mp3")).is.true;
        chai_1.expect(outputHelper.exists("04 Molto deliberato.mp3")).is.true;
    });
    mocha_1.it("With --dry-run does not copy file", () => {
        new TrackTestHelper_1.TrackTestHelper("testOutput/source/artist/album/").create("01 first track.mp3");
        Application_1.Application.main([
            "ignored", "ignored", "testOutput/source", "--dry-run", "--out",
            "testOutput/destination", "--verb", "silent"
        ]);
        var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/artist/album/");
        chai_1.expect(outputHelper.exists("01 first track.mp3")).is.false;
    });
    mocha_1.describe("with special characters in filenames", () => {
        mocha_1.it("supports []", () => {
            new TrackTestHelper_1.TrackTestHelper("testOutput/source/artist/album/").create("01 [abc].mp3");
            Application_1.Application.main([
                "ignored", "ignored", "testOutput/source", "--out",
                "testOutput/destination", "--verb", "silent"
            ]);
            var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/artist/album");
            chai_1.expect(outputHelper.exists("01 [abc].mp3")).is.true;
        });
        mocha_1.it("supports *", () => {
            new TrackTestHelper_1.TrackTestHelper("testOutput/source/artist/album/").create("01 abc*efg.mp3");
            Application_1.Application.main([
                "ignored", "ignored", "testOutput/source", "--out",
                "testOutput/destination", "--verb", "silent"
            ]);
            var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/artist/album");
            chai_1.expect(outputHelper.exists("01 abc*efg.mp3")).is.true;
        });
        mocha_1.it("supports ()", () => {
            new TrackTestHelper_1.TrackTestHelper("testOutput/source/artist/album/").create("01 (efg).mp3");
            Application_1.Application.main([
                "ignored", "ignored", "testOutput/source", "--out",
                "testOutput/destination", "--verb", "silent"
            ]);
            var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/artist/album");
            chai_1.expect(outputHelper.exists("01 (efg).mp3")).is.true;
        });
        mocha_1.it("supports \"", () => {
            new TrackTestHelper_1.TrackTestHelper("testOutput/source/artist/album/").create("01 \"efg\".mp3");
            Application_1.Application.main([
                "ignored", "ignored", "testOutput/source", "--out",
                "testOutput/destination", "--verb", "silent"
            ]);
            var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/artist/album");
            chai_1.expect(outputHelper.exists("01 \"efg\".mp3")).is.true;
        });
        mocha_1.it("supports '", () => {
            new TrackTestHelper_1.TrackTestHelper("testOutput/source/artist/album/").create("01 'efg'.mp3");
            Application_1.Application.main([
                "ignored", "ignored", "testOutput/source", "--out",
                "testOutput/destination", "--verb", "silent"
            ]);
            var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/artist/album");
            chai_1.expect(outputHelper.exists("01 'efg'.mp3")).is.true;
        });
    });
    mocha_1.it("Copies file with disk id in path from source to destination", () => {
        var trackHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/source/artist/album");
        trackHelper.at("disk1").create("/01 first track.mp3");
        trackHelper.at("disk2").create("/01 second track.mp3");
        Application_1.Application.main([
            "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
        ]);
        var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/artist/album");
        chai_1.expect(outputHelper.exists("01 first track.mp3")).is.true;
        chai_1.expect(outputHelper.exists("02 second track.mp3")).is.true;
    });
    mocha_1.it("Supports validation directive to ignore track numbers", () => {
        var trackHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/source/Aaron Copland/FourPieces");
        trackHelper.create("Disc 1 - 05 - Grohg - Cortège macabre.mp3");
        trackHelper.create("Disc 1 - 06 - Letter From Home.mp3");
        trackHelper.create("Disc 1 - 07 - John Henry.mp3");
        trackHelper.create("Disc 2 - 09 - Quiet City.mp3");
        Application_1.Application.main([
            "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
        ]);
        var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/Copland_Aaron/Four Pieces");
        chai_1.expect(outputHelper.exists("01 Grohg - Cortège macabre.mp3")).is.true;
        chai_1.expect(outputHelper.exists("02 Letter From Home.mp3")).is.true;
        chai_1.expect(outputHelper.exists("03 John Henry.mp3")).is.true;
        chai_1.expect(outputHelper.exists("04 Quiet City.mp3")).is.true;
    });
    mocha_1.it("supports disk starting at track number above one and spanning disks", () => {
        var trackHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/source/Janáček/Jenůfa2");
        trackHelper.create("Disc 1 - 9 - Jenůfa_ Jednání II. Úvod.mp3");
        trackHelper.create("Disc 1 - 10 - Jenůfa_ Jednání II. _Nechám ještě dveře otevřeny_ (Kostelnička).mp3");
        trackHelper.create("Disc 1 - 11 - Jenůfa_ Jednání II. _Ba zabedněna ta tvoje okenička už přes dvacet neděl_ (Kostelnička).mp3");
        trackHelper.create("Disc 1 - 12 - Jenůfa_ Jednání II. _Tetko Kostelničko, poslala jste cedulku_ (Števa).mp3");
        trackHelper.create("Disc 1 - 13 - Jenůfa_ Jednání II. _Ale viděl jsem vcházet šohaje_ (Laca).mp3");
        trackHelper.create("Disc 2 - 1 - Jenůfa_ Jednání II. _Co chvíla... co chvíla_ (Kostelnička).mp3");
        trackHelper.create("Disc 2 - 2 - Jenůfa_ Jednání II. _Mamičko, mám těžkou hlavu_ (Jenůfa).mp3");
        trackHelper.create("Disc 2 - 3 - Jenůfa_ Jednání II. _Kdo to je__ (Jenůfa).mp3");
        trackHelper.create("Disc 2 - 4 - Jenůfa_ Jednání II. _Tot' zrovna jde!_ (Kostelnička).mp3");
        Application_1.Application.main([
            "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
        ]);
        var outputHelper = new TrackTestHelper_1.TrackTestHelper("testOutput/destination/Janáček/Jenůfa2");
        chai_1.expect(outputHelper.exists("01 Úvod.mp3")).is.true;
        chai_1.expect(outputHelper.exists("02 Nechám ještě dveře otevřeny (Kostelnička).mp3")).is.true;
        chai_1.expect(outputHelper.exists("03 Ba zabedněna ta tvoje okenička už přes dvacet neděl (Kostelnička).mp3")).is.true;
        chai_1.expect(outputHelper.exists("04 Tetko Kostelničko, poslala jste cedulku (Števa).mp3")).is.true;
        chai_1.expect(outputHelper.exists("05 Ale viděl jsem vcházet šohaje (Laca).mp3")).is.true;
        chai_1.expect(outputHelper.exists("06 Co chvíla... co chvíla (Kostelnička).mp3")).is.true;
        chai_1.expect(outputHelper.exists("07 Mamičko, mám těžkou hlavu (Jenůfa).mp3")).is.true;
        chai_1.expect(outputHelper.exists("08 Kdo to je (Jenůfa).mp3")).is.true;
        chai_1.expect(outputHelper.exists("09 Tot' zrovna jde! (Kostelnička).mp3")).is.true;
    });
    mocha_1.it("sets mp3 tags", () => {
        new TrackTestHelper_1.TrackTestHelper("testOutput/source/dummy artist/dummy album").create("01 dummy track.mp3");
        Application_1.Application.main([
            "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
        ]);
        var mp3infoCommand = [
            "mp3info",
            "\"testOutput/destination/artist_dummy/dummy album/01 dummy track.mp3\"",
            "-p \"artist='%a' album='%l' track='%t'\n\""
        ].join(" ");
        shelljs.exec(mp3infoCommand, function (code, stdout, stderr) {
            var expected = "artist='artist_dummy' album='dummy album' track='01 dummy track'\n";
            chai_1.expect(stdout).to.equal(expected);
        });
    });
});
