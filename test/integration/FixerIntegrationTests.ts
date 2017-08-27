import {ValidationOption} from "../../src/businessInterfaces/fixers/ValidationOption";
import {FixOptionsForOneAlbum} from "../../src/businessInterfaces/fixers/FixOptionsForOneAlbum";
import {parseFixers} from "../../src/businessObjects/fixers/parseFixers";
import {parseArtistFixer} from "../../src/businessObjects/fixers/parseArtistFixer";
import {getIfExistsOrThrow} from "../helpers/getIfExistsOrThrow";
import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as fs from "fs";

describe("Fixer integration", () => {

        function parseArtistJson(file: string): any
        {
                var json = fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + file, "utf8");
                return parseArtistFixer(json);
        }

        it("can parse BachJs.json", () => {
                var parsed = parseArtistJson("JS Bach.json");
                expect(parsed.BminorMass.validation[0])
                    .to.equal(ValidationOption.skipUniqueTrackNameCheck);
        });

        it("can parse Beethoven.json", () => {
                var parsed = parseArtistJson("Beethoven.json");
                expect(parsed.PianoConc5.fixAlbumTitle.num).to.equal(5);
        });

        it("can parse Chopin.json", () => {
                var parsed = parseArtistJson("Frédéric Chopin.json");
                expect(parsed.CelloSonata.fixAlbumTitle.by).to.equal("Rostropovich");
        });

        it("can parse Handel.json", () => {
                var parsed = parseArtistJson("Handel.json");
                expect(parsed.Fireworks.firstTrackNumber).to.equal(10);
        });

        it("can parse Haydn.json", () => {
                var parsed = parseArtistJson("Haydn.json");
                expect(parsed["Quartet56 E flat Op71 No3"].fixAlbumTitle.num).to.equal(56);
        });

        it("can parse Mahler.json", () => {
                var parsed = parseArtistJson("Mahler.json");
                expect(parsed["Symph3[Chailly]"].fixAlbumTitle.num).to.equal(3);
        });

        it("can parse Mozart.json", () => {
                var parsed = parseArtistJson("Mozart.json");
                expect(parsed.AdagioK261.firstTrackNumber).to.equal(10);
        });

        it("can parse Schubert.json", () => {
                var parsed = parseArtistJson("Schubert.json");
                expect(parsed.Symp10.firstTrackNumber).to.equal(5);
        });

        it("can parse Shostakovich.json", () => {
                var parsed = parseArtistJson("Shostakovich.json");
                expect(parsed["Lady Macbeth4"].firstTrackNumber).to.equal(8);
        });

        it("can parse Others.json", () => {
                var file = "Others.json";
                var json = fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + file, "utf8");
                var parsed = parseFixers(json);

                expect(getIfExistsOrThrow(parsed, [
                        "Carl Nielsen", "Symph 1", "fixAlbumTitle", "num"
                ])).to.equal(1);
        });
});
