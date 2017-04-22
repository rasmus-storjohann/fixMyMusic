import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as shelljs from "shelljs";
import * as log from "npmlog";
import * as fileExists from "file-exists";
import {Application} from "../../src/Application";
import {TrackTestHelper} from "./TrackTestHelper";

beforeEach(() => {
        log.level = "silent";
        shelljs.rm("-rf", "testOutput/destination");
        shelljs.mkdir("-p", "testOutput/destination");
});

describe("Fix track name functions for", () => {

        beforeEach(() => {
                shelljs.rm("-rf", "testOutput");
        });

        describe("Bach: ", () => {
                describe("Fantasias", () => {

                        var album = "Fantasias, Preludes and Fugues [Herrick]";
                        var outputHelper = new TrackTestHelper("testOutput/destination/Bach_JS/" + album);

                        beforeEach(() => {

                                var sourceDir = "testOutput/source/JS Bach/" + album + "/";

                                var helper = new TrackTestHelper(sourceDir);

                                helper.create("Disc 1 - 01 - Fantasia and Fugue in G minor, BWV 542: I. Fantasia.mp3");
                                helper.create("Disc 1 - 02 - Fantasia and Fugue in G minor, BWV 542: II. Fugue.mp3");
                                helper.create("Disc 1 - 03 - Fantasia in C minor, BWV 562.mp3");
                                helper.create("Disc 1 - 04 - Prelude and Fugue in A minor, BWV 543: I. Prelude.mp3");
                                helper.create("Disc 1 - 05 - Prelude and Fugue in A minor, BWV 543: II. Fugue.mp3");

                                Application.main([ "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent" ], log);
                        });


                        it("does not change 'Fantasia in C minor, BWV 562'", () => {
                                expect(outputHelper.exists("03 Fantasia in C minor, BWV 562.mp3")).is.true;
                        });

                        it("changes 'Fantasia and Fugue in G minor, BWV 542: I. Fantasia' to 'BWV542 in g: Fantasia'", () => {
                                expect(outputHelper.exists("01 BWV542 in g: Fantasia.mp3")).is.true;
                        });

                        it("changes 'Prelude and Fugue in A minor, BWV 543: II. Prelude.mp3' to '04 BWV543 in a: Prelude'", () => {
                                expect(outputHelper.exists("04 BWV543 in a: Prelude.mp3")).is.true;
                        });

                        it("changes 'Prelude and Fugue in A minor, BWV 543: II. Fugue.mp3' to 'BWV543 in a: Fugue'", () => {
                                expect(outputHelper.exists("05 BWV543 in a: Fugue.mp3")).is.true;
                        });
                });
                describe("Goldberg for strings", () => {

                        var album = "Goldberg-Strings";
                        var outputHelper = new TrackTestHelper("testOutput/destination/Bach_JS/" + album);

                        beforeEach(() => {
                                var sourceDir = "testOutput/source/JS Bach/" + album + "/";
                                var helper = new TrackTestHelper(sourceDir);

                                helper.create("01 - J.S. Bach Goldberg-Variationen, BWV 988 - Aria.mp3");
                                helper.create("02 - J.S. Bach Goldberg-Variationen, BWV 988 - Variatio 1¡E2¡E3.mp3");

                                Application.main([ "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent" ], log);
                        });

                        it("changes 'J.S. Bach Goldberg-Variationen, BWV 988 - Aria' to 'Aria'", () => {
                                expect(outputHelper.exists("01 Aria.mp3")).is.true;
                        });

                        it("changes 'J.S. Bach Goldberg-Variationen, BWV 988 - Variatio 1¡E2¡E3' to 'Variations 1-3'", () => {
                                expect(outputHelper.exists("02 Variations 1-3.mp3")).is.true;
                        });
                });

                describe("Inventions", () => {

                        var album = "Inventions[Gould]";

                        beforeEach(() => {
                                var sourceDir = "testOutput/source/JS Bach/" + album + "/";
                                var helper = new TrackTestHelper(sourceDir);

                                helper.create("Disc 2 - 03 - 2-Part Invention No. 1 in C major, BWV 772.mp3");
                                helper.create("Disc 2 - 04 - 3-Part Invention No. 1 in C major, BWV 787.mp3");
                                helper.create("Disc 2 - 05 - 2-Part Invention No. 2 in C minor, BWV 773.mp3");
                                helper.create("Disc 2 - 06 - 3-Part Invention No. 2 in C minor, BWV 788.mp3");

                                Application.main([ "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent" ], log);
                        });

                        it("Maps 2/3 part, key, BWV number", () => {
                                var outputHelper = new TrackTestHelper("testOutput/destination/Bach_JS/" + album);

                                expect(outputHelper.exists("01 2-Part Invention 1 C BWV772.mp3")).is.true;
                                expect(outputHelper.exists("02 3-Part Invention 1 C BWV787.mp3")).is.true;
                                expect(outputHelper.exists("03 2-Part Invention 2 c BWV773.mp3")).is.true;
                                expect(outputHelper.exists("04 3-Part Invention 2 c BWV788.mp3")).is.true;
                        });
                });

                describe("St. John's Passion", () => {

                        var album = "St. John Passion";

                        beforeEach(() => {
                                var sourceDir = "testOutput/source/JS Bach/" + album + "/";
                                var helper = new TrackTestHelper(sourceDir);

                                helper.create("Disc 1 - 01 - Johannes-Passion, BWV 245: Teil I. Verrat und Gefangennahme: Chor \"Herr, unser Herrscher\".mp3");
                                helper.create("Disc 1 - 02 - Johannes-Passion, BWV 245: Teil I. Verrat und Gefangennahme: \"Jesus ging mit seinen Jüngern über den Bach Kidron\" (Evangelista, Jesus) - Chor \"Jesum von Nazareth!\" - \"Jesus spricht zu ihnen\" (Evangelista, Jesus) - Chor \"Jesum von Nazar.mp3");

                                Application.main([ "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent" ], log);
                        });

                        it("extracts the track name", () => {
                                var outputHelper = new TrackTestHelper("testOutput/destination/Bach_JS/" + album);

                                expect(outputHelper.exists("01 Verrat und Gefangennahme: Chor \"Herr, unser Herrscher\".mp3")).is.true;
                                expect(outputHelper.exists("02 Verrat und Gefangennahme: \"Jesus ging mit seinen Jüngern über den Bach Kidron\" (Evangelista, Jesus) - Chor \"Jesum von Nazareth!\" - \"Jesus spricht zu ihnen\" (Evangelista, Jesus) - Chor \"Jesum von Nazar.mp3")).is.true;
                        });
                });

                describe("Welltempered Clavier Book 1 with Till Fellner", () => {

                        var album = "WellTemp1 [Fellner]";

                        beforeEach(() => {
                                var sourceDir = "testOutput/source/JS Bach/" + album + "/disk1/";
                                var helper = new TrackTestHelper(sourceDir);

                                helper.create("01 - Präludium I in C-Dur, BWV 846.mp3");
                                helper.create("02 - Fuge I in C-Dur, BWV 846.mp3");

                                Application.main([ "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent" ], log);
                        });

                        it("extracts the track name", () => {
                                var outputHelper = new TrackTestHelper("testOutput/destination/Bach_JS/" + album);

                                expect(outputHelper.exists("01 Prelude in C.mp3")).is.true;
                                expect(outputHelper.exists("02 Fuge in C.mp3")).is.true;
                        });
                });

                describe("Welltempered Clavier Book 1 with Glen Gould", () => {

                        var album = "WellTemp1 [Gould]";

                        beforeEach(() => {
                                var sourceDir = "testOutput/source/JS Bach/" + album + "/";
                                var helper = new TrackTestHelper(sourceDir);

                                helper.create("Disc 1 - 01 - Prelude and Fugue no. 1 in C major, BWV 846: I. Praeludium.mp3");
                                helper.create("Disc 1 - 02 - Prelude and Fugue no. 1 in C major, BWV 846: II. Fuga.mp3");

                                Application.main([ "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent" ], log);
                        });

                        it("extracts the track name", () => {
                                var outputHelper = new TrackTestHelper("testOutput/destination/Bach_JS/" + album);

                                expect(outputHelper.exists("01 Prelude in C.mp3")).is.true;
                                expect(outputHelper.exists("02 Fuge in C.mp3")).is.true;
                        });
                });

                describe("Welltempered Clavier Book 2 with Glen Gould", () => {

                        var album = "WellTemp2 [Gould]";

                        beforeEach(() => {
                                var sourceDir = "testOutput/source/JS Bach/" + album + "/disk1/";
                                var helper = new TrackTestHelper(sourceDir);

                                helper.create("01 - Prelude and Fugue No.1 in C major - Prelude.mp3");
                                helper.create("02 - Prelude and Fugue No.1 in C major - Fugue.mp3");
                                helper.create("03 - Prelude & Fugue No.2 In C Minor Prelude.mp3");
                                helper.create("04 - Prelude & Fugue No.2 In C Minor Fugue.mp3");
                                helper.create("05 - Prelude & Fugue No.3 In C Sharp Major Prelude.mp3");
                                helper.create("06 - Prelude & Fugue No.3 In C Sharp Major Fugue.mp3");
                                helper.create("07 - Prelude & Fugue No.4 In C Sharp Minor Prelude.mp3");
                                helper.create("08 - Prelude & Fugue No.4 In C Sharp Minor Fugue.mp3");
                                helper.create("09 - Prelude and Fugue No.5 in D major - Prelude.mp3");
                                helper.create("10 - Prelude and Fugue No.5 in D major - Fugue.mp3");


                                Application.main([ "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination", "--verb", "silent" ], log);
                        });

                        it("handles first format", () => {
                                var outputHelper = new TrackTestHelper("testOutput/destination/Bach_JS/" + album);

                                expect(outputHelper.exists("01 Prelude in C.mp3")).is.true;
                                expect(outputHelper.exists("02 Fuge in C.mp3")).is.true;

                                expect(outputHelper.exists("03 Prelude in c.mp3")).is.true;
                                expect(outputHelper.exists("04 Fuge in c.mp3")).is.true;

                                expect(outputHelper.exists("09 Prelude in D.mp3")).is.true;
                                expect(outputHelper.exists("10 Fuge in D.mp3")).is.true;
                        });
                });
        });
});
