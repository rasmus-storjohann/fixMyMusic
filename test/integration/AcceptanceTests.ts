import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as shelljs from "shelljs";
import * as fileExists from "file-exists";
import * as log from "npmlog";
import {Application} from "../../src/Application";
import {TrackTestHelper} from "./TrackTestHelper";

beforeEach(() => {
        log.level = "silent";
        shelljs.rm("-rf", "testOutput/destination");
        shelljs.mkdir("-p", "testOutput/destination");
});

describe("Acceptance tests", () => {

        beforeEach(() => {
                log.level = "silent";
                shelljs.rm("-rf", "testOutput");
        });

        it("Has test prerequisites", () => { expect(fileExists("test.mp3")).is.true; });

        it("Copies file from source to destination", () => {

                new TrackTestHelper("testOutput/source/artist/album/").create("01 first track.mp3");

                Application.main(
                    [
                      "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
                    ],
                    log);

                expect(fileExists("testOutput/destination/artist/album/01 first track.mp3"))
                    .is.true;
        });

        it("Applies album fix rule for classical work", () => {
                var trackHelper = new TrackTestHelper("testOutput/source/Aaron Copland/Symph3/");
                trackHelper.create("Disc 1 - 04 - Symphony No. 3: IV. Molto deliberato.mp3");
                trackHelper.create("Disc 1 - 03 - Symphony No. 3: III. Andantino quasi allegretto.mp3");
                trackHelper.create("Disc 1 - 01 - Symphony No. 3: I. Molto moderato, with simple expression.mp3");
                trackHelper.create("Disc 1 - 02 - Symphony No. 3: II. Allegro molto.mp3");

                Application.main(
                    [
                      "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
                    ],
                    log);

                expect(fileExists("testOutput/destination/Copland_Aaron/Symph 3/01 Molto moderato, with simple expression.mp3"))
                    .is.true;
                expect(fileExists("testOutput/destination/Copland_Aaron/Symph 3/02 Allegro molto.mp3"))
                    .is.true;
                expect(fileExists("testOutput/destination/Copland_Aaron/Symph 3/03 Andantino quasi allegretto.mp3"))
                    .is.true;
                expect(fileExists("testOutput/destination/Copland_Aaron/Symph 3/04 Molto deliberato.mp3"))
                    .is.true;
        });

        it("With --dry-run does not copy file", () => {
                new TrackTestHelper("testOutput/source/artist/album/").create("01 first track.mp3");

                Application.main(
                    [
                      "ignored", "ignored", "testOutput/source", "--dry-run", "--out",
                      "testOutput/destination", "--verb", "silent"
                    ],
                    log);

                expect(fileExists("testOutput/destination/artist/album/01 first track.mp3"))
                    .is.false;
        });

        describe("with special characters in filenames", () => {
                it("supports []", () => {
                        new TrackTestHelper("testOutput/source/artist/album/").create("01 [abc].mp3");

                        Application.main(
                            [
                              "ignored", "ignored", "testOutput/source", "--out",
                              "testOutput/destination", "--verb", "silent"
                            ],
                            log);

                        expect(fileExists("testOutput/destination/artist/album/01 [abc].mp3"))
                            .is.true;
                });
                it("supports *", () => {
                        new TrackTestHelper("testOutput/source/artist/album/").create("01 abc*efg.mp3");

                        Application.main(
                            [
                              "ignored", "ignored", "testOutput/source", "--out",
                              "testOutput/destination", "--verb", "silent"
                            ],
                            log);

                        expect(fileExists("testOutput/destination/artist/album/01 abc*efg.mp3"))
                            .is.true;
                });
                it("supports ()", () => {
                        new TrackTestHelper("testOutput/source/artist/album/").create("01 (efg).mp3");

                        Application.main(
                            [
                              "ignored", "ignored", "testOutput/source", "--out",
                              "testOutput/destination", "--verb", "silent"
                            ],
                            log);

                        expect(fileExists("testOutput/destination/artist/album/01 (efg).mp3"))
                            .is.true;
                });
                it("supports \"", () => {
                        new TrackTestHelper("testOutput/source/artist/album/").create("01 \"efg\".mp3");

                        Application.main(
                            [
                              "ignored", "ignored", "testOutput/source", "--out",
                              "testOutput/destination", "--verb", "silent"
                            ],
                            log);

                        expect(fileExists("testOutput/destination/artist/album/01 \"efg\".mp3"))
                            .is.true;
                });
                it("supports '", () => {
                        new TrackTestHelper("testOutput/source/artist/album/").create("01 'efg'.mp3");

                        Application.main(
                            [
                              "ignored", "ignored", "testOutput/source", "--out",
                              "testOutput/destination", "--verb", "silent"
                            ],
                            log);

                        expect(fileExists("testOutput/destination/artist/album/01 'efg'.mp3"))
                            .is.true;
                });
        });

        it("Copies file with disk id in path from source to destination", () => {
                var trackHelper = new TrackTestHelper("testOutput/source/artist/album");
                trackHelper.at("disk1").create("/01 first track.mp3");
                trackHelper.at("disk2").create("/01 second track.mp3");

                Application.main(
                    [
                      "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
                    ],
                    log);

                expect(fileExists("testOutput/destination/artist/album/01 first track.mp3"))
                    .is.true;
                expect(fileExists("testOutput/destination/artist/album/02 second track.mp3"))
                    .is.true;
        });

        it("Supports validation directive to ignore track numbers", () => {
                var trackHelper = new TrackTestHelper("testOutput/source/Aaron Copland/FourPieces");
                trackHelper.create("Disc 1 - 05 - Grohg - Cortège macabre.mp3");
                trackHelper.create("Disc 1 - 06 - Letter From Home.mp3");
                trackHelper.create("Disc 1 - 07 - John Henry.mp3");
                trackHelper.create("Disc 2 - 09 - Quiet City.mp3");

                Application.main(
                    [
                      "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
                    ],
                    log);

                expect(
                    fileExists(
                        "testOutput/destination/Copland_Aaron/Four Pieces/01 Grohg - Cortège macabre.mp3"))
                    .is.true;
                expect(
                    fileExists(
                        "testOutput/destination/Copland_Aaron/Four Pieces/02 Letter From Home.mp3"))
                    .is.true;
                expect(fileExists(
                           "testOutput/destination/Copland_Aaron/Four Pieces/03 John Henry.mp3"))
                    .is.true;
                expect(fileExists(
                           "testOutput/destination/Copland_Aaron/Four Pieces/04 Quiet City.mp3"))
                    .is.true;
        });

        it("supports disk starting at track number above one and spanning disks", () => {
                var trackHelper = new TrackTestHelper("testOutput/source/Janáček/Jenůfa2");
                trackHelper.create("Disc 1 - 9 - Jenůfa_ Jednání II. Úvod.mp3");
                trackHelper.create("Disc 1 - 10 - Jenůfa_ Jednání II. _Nechám ještě dveře otevřeny_ (Kostelnička).mp3");
                trackHelper.create("Disc 1 - 11 - Jenůfa_ Jednání II. _Ba zabedněna ta tvoje okenička už přes dvacet neděl_ (Kostelnička).mp3");
                trackHelper.create("Disc 1 - 12 - Jenůfa_ Jednání II. _Tetko Kostelničko, poslala jste cedulku_ (Števa).mp3");
                trackHelper.create("Disc 1 - 13 - Jenůfa_ Jednání II. _Ale viděl jsem vcházet šohaje_ (Laca).mp3");
                trackHelper.create("Disc 2 - 1 - Jenůfa_ Jednání II. _Co chvíla... co chvíla_ (Kostelnička).mp3");
                trackHelper.create("Disc 2 - 2 - Jenůfa_ Jednání II. _Mamičko, mám těžkou hlavu_ (Jenůfa).mp3");
                trackHelper.create("Disc 2 - 3 - Jenůfa_ Jednání II. _Kdo to je__ (Jenůfa).mp3");
                trackHelper.create("Disc 2 - 4 - Jenůfa_ Jednání II. _Tot' zrovna jde!_ (Kostelnička).mp3");

                Application.main(
                    [
                      "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
                    ],
                    log);

                expect(fileExists("testOutput/destination/Janáček/Jenůfa2/01 Úvod.mp3")).is.true;
                expect(
                    fileExists(
                        "testOutput/destination/Janáček/Jenůfa2/02 Nechám ještě dveře otevřeny (Kostelnička).mp3"))
                    .is.true;
                expect(
                    fileExists(
                        "testOutput/destination/Janáček/Jenůfa2/03 Ba zabedněna ta tvoje okenička už přes dvacet neděl (Kostelnička).mp3"))
                    .is.true;
                expect(
                    fileExists(
                        "testOutput/destination/Janáček/Jenůfa2/04 Tetko Kostelničko, poslala jste cedulku (Števa).mp3"))
                    .is.true;
                expect(
                    fileExists(
                        "testOutput/destination/Janáček/Jenůfa2/05 Ale viděl jsem vcházet šohaje (Laca).mp3"))
                    .is.true;
                expect(
                    fileExists(
                        "testOutput/destination/Janáček/Jenůfa2/06 Co chvíla... co chvíla (Kostelnička).mp3"))
                    .is.true;
                expect(
                    fileExists(
                        "testOutput/destination/Janáček/Jenůfa2/07 Mamičko, mám těžkou hlavu (Jenůfa).mp3"))
                    .is.true;
                expect(
                    fileExists("testOutput/destination/Janáček/Jenůfa2/08 Kdo to je (Jenůfa).mp3"))
                    .is.true;
                expect(
                    fileExists(
                        "testOutput/destination/Janáček/Jenůfa2/09 Tot' zrovna jde! (Kostelnička).mp3"))
                    .is.true;
        });

        it("sets mp3 tags", () => {
                new TrackTestHelper("testOutput/source/dummy artist/dummy album").create("01 dummy track.mp3");

                Application.main(
                    [
                      "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent"
                    ],
                    log);

                var mp3infoCommand = [
                        "mp3info",
                        "\"testOutput/destination/artist_dummy/dummy album/01 dummy track.mp3\"",
                        "-p \"artist='%a' album='%l' track='%t'\n\""
                ].join(" ");

                shelljs.exec(mp3infoCommand, function(code, stdout, stderr) {
                        var expected =
                            "artist='artist_dummy' album='dummy album' track='01 dummy track'\n";
                        expect(stdout).to.equal(expected);
                });
        });
});
