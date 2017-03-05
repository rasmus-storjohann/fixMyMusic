import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {FixOptions, FixOptionsParser} from "../src/AlbumFixerParser";

import * as fs from "fs";

describe("Fixer integration", () => {

        function parseComposerJson(file: string) : any
        {
                var json = fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + file, "utf8");
                return new FixOptionsParser().parseComposerJsonFile(json);
        }

        it("can parse BachJs.json", () =>
        {
                var parsed = parseComposerJson("BachJs.json");
                expect(parsed.BminorMass.validation[0]).to.equal("skipUniqueTrackNameCheck");
        });

        it("can parse Beethoven.json", () =>
        {
                var parsed = parseComposerJson("Beethoven.json");
                expect(parsed.PianoConc5.fixAlbumTitle.concerto.num).to.equal(5);
        });

        it("can parse Chopin.json", () =>
        {
                var parsed = parseComposerJson("Chopin.json");
                expect(parsed.CelloSonata.fixAlbumTitle.sonata.by).to.equal("Rostropovich");
        });

        it("can parse Handel.json", () =>
        {
                var parsed = parseComposerJson("Handel.json");
                expect(parsed.Fireworks.firstTrackNumber).to.equal(10);
        });

        it("can parse Haydn.json", () =>
        {
                var parsed = parseComposerJson("Haydn.json");
                expect(parsed["Quartet56 E flat Op71 No3"].fixAlbumTitle.quartet.num).to.equal(56);
        });

        it("can parse Mahler.json", () =>
        {
                var parsed = parseComposerJson("Mahler.json");
                expect(parsed["Symph3[Chailly]"].fixAlbumTitle.symphony.num).to.equal(3);
        });

        it("can parse Mozart.json", () =>
        {
                var parsed = parseComposerJson("Mozart.json");
                expect(parsed.AdagioK261.firstTrackNumber).to.equal(10);
        });

        it("can parse Schubert.json", () =>
        {
                var parsed = parseComposerJson("Schubert.json");
                expect(parsed.Symp10.firstTrackNumber).to.equal(5);
        });

        it("can parse Shostakovich.json", () =>
        {
                var parsed = parseComposerJson("Shostakovich.json");
                expect(parsed["Lady Macbeth4"].firstTrackNumber).to.equal(8);
        });

        it("can parse Others.json", () =>
        {
                var file = "Others.json";
                var json = fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + file, "utf8");
                var parsed = new FixOptionsParser().parseGlobalJsonFile(json);

                expect(parsed["Carl Nielsen"]["Symph 1"].fixAlbumTitle.symphony.num).to.equal(1);
        });
});
