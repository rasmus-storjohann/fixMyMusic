import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as shelljs from "shelljs";
import * as fileExists from "file-exists";
import * as log from "npmlog";
import {Application} from "../../src/Application";

beforeEach(() => {
        log.level = "silent";
        shelljs.rm("-rf", "testOutput/destination");
        shelljs.mkdir("-p", "testOutput/destination");
});

describe("Fix track name functions", () => {

        beforeEach(() => {
                log.level = "silent";
                shelljs.rm("-rf", "testOutput");
        });

        describe("Bach", () => {
                describe("Fantasias", () => {
                        beforeEach(() => {
                                log.level = "silent";
                                var sourceDir = "testOutput/source/JS Bach/Fantasias, Preludes and Fugues [Herrick]/";
                                shelljs.mkdir("-p", sourceDir);
                                shelljs.cp("test.mp3", sourceDir + "Disc 1 - 01 - Fantasia and Fugue in G minor, BWV 542: I. Fantasia.mp3");
                                shelljs.cp("test.mp3", sourceDir + "Disc 1 - 02 - Fantasia and Fugue in G minor, BWV 542: II. Fugue.mp3");
                                shelljs.cp("test.mp3", sourceDir + "Disc 1 - 03 - Fantasia in C minor, BWV 562.mp3");
                        });

                        it("does not change 'Fantasia in C minor, BWV 562'", () => {
                                Application.main([ "ignored", "ignored", "testOutput/source", "--out", "testOutput/destination" ], log);
                        });
                });
        });
});
