import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {AlbumFixer, AlbumFixerParser} from "../src/AlbumFixerParser";

import * as fs from "fs";

describe("Fixer integration", () => {

        function parse(file: string) : any
        {
                var json = fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + file, "utf8");
                return new AlbumFixerParser().parse(json);
        }

        it("can parse BachJs.json", () =>
        {
                var parsed = parse("BachJs.json");
                expect(parsed.BminorMass.validation[0]).to.equal("skipUniqueTrackNameCheck");
        });

        it("can parse Beethoven.json", () =>
        {
                var parsed = parse("Beethoven.json");
                expect(parsed.PianoConc5.fixAlbumTitle.concerto.num).to.equal(5);
        });

        it("can parse Chopin.json", () =>
        {
                var parsed = parse("Chopin.json");
                expect(parsed.CelloSonata.fixAlbumTitle.sonata.by).to.equal("Rostropovich");
        });

        it("can parse Handel.json", () =>
        {
                var parsed = parse("Handel.json");
                expect(parsed.Fireworks.firstTrackNumber).to.equal(10);
        });

        it("can parse Haydn.json", () =>
        {
                var parsed = parse("Haydn.json");
                expect(parsed["Quartet56 E flat Op71 No3"].fixAlbumTitle.quartet.num).to.equal(56);
        });

        it("can parse Mahler.json", () =>
        {
                var parsed = parse("Mahler.json");
                expect(parsed["Symph3[Chailly]"].fixAlbumTitle.symphony.num).to.equal(3);
        });

        it("can parse Mozart.json", () =>
        {
                var parsed = parse("Mozart.json");
                expect(parsed.AdagioK261.firstTrackNumber).to.equal(10);
        });

        it("can parse Schubert.json", () =>
        {
                var parsed = parse("Schubert.json");
                expect(parsed.Symp10.firstTrackNumber).to.equal(5);
        });

        it("can parse Shostakovich.json", () =>
        {
                var parsed = parse("Shostakovich.json");
                expect(parsed["Lady Macbeth4"].firstTrackNumber).to.equal(8);
        });
});
