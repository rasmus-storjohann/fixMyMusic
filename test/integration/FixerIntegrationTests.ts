import {ValidationOption} from "../../src/businessInterfaces/fixers/ValidationOption";
import {FixOptionsForOneAlbum} from "../../src/businessInterfaces/fixers/FixOptionsForOneAlbum";
import {FixOptionsParser} from "../../src/businessObjects/fixers/FixOptionsParser";
import {getIfExistsOrThrow} from "../helpers/getIfExistsOrThrow";
import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as fs from "fs";

describe("Fixer integration", () => {

        function parseComposerJson(file: string): any
        {
                var json = fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + file, "utf8");
                var parser = new FixOptionsParser();
                return parser.parseComposerJsonFile(json);
        }

        it("can parse BachJs.json", () => {
                var parsed = parseComposerJson("BachJs.json");
                expect(parsed.BminorMass.validation[0])
                    .to.equal(ValidationOption.skipUniqueTrackNameCheck);
        });

        it("can parse Beethoven.json", () => {
                var parsed = parseComposerJson("Beethoven.json");
                expect(parsed.PianoConc5.fixAlbumTitle.num).to.equal(5);
        });

        it("can parse Chopin.json", () => {
                var parsed = parseComposerJson("Chopin.json");
                expect(parsed.CelloSonata.fixAlbumTitle.by).to.equal("Rostropovich");
        });

        it("can parse Handel.json", () => {
                var parsed = parseComposerJson("Handel.json");
                expect(parsed.Fireworks.firstTrackNumber).to.equal(10);
        });

        it("can parse Haydn.json", () => {
                var parsed = parseComposerJson("Haydn.json");
                expect(parsed["Quartet56 E flat Op71 No3"].fixAlbumTitle.num).to.equal(56);
        });

        it("can parse Mahler.json", () => {
                var parsed = parseComposerJson("Mahler.json");
                expect(parsed["Symph3[Chailly]"].fixAlbumTitle.num).to.equal(3);
        });

        it("can parse Mozart.json", () => {
                var parsed = parseComposerJson("Mozart.json");
                expect(parsed.AdagioK261.firstTrackNumber).to.equal(10);
        });

        it("can parse Schubert.json", () => {
                var parsed = parseComposerJson("Schubert.json");
                expect(parsed.Symp10.firstTrackNumber).to.equal(5);
        });

        it("can parse Shostakovich.json", () => {
                var parsed = parseComposerJson("Shostakovich.json");
                expect(parsed["Lady Macbeth4"].firstTrackNumber).to.equal(8);
        });

        it("can parse Others.json", () => {
                var file = "Others.json";
                var json = fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + file, "utf8");
                var parsed = new FixOptionsParser().parseGlobalJsonFile(json);

                expect(getIfExistsOrThrow(parsed, [
                        "Carl Nielsen", "Symph 1", "fixAlbumTitle", "num"
                ])).to.equal(1);
        });
});
