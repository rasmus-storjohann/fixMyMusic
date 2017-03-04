import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {AlbumFixer, AlbumFixerParser} from "../src/AlbumFixerParser";

import * as fs from "fs";

describe("Fixer integration", () => {
        // Beethoven.json  Chopin.json  Handel.json  Haydn.json  Mahler.json  Mozart.json  Others.json  Schubert.json  Shostakovich.json

        it("can parse BachJs.json", () => {
                var json = fs.readFileSync(
                    "/home/rasmus/Music/bin/src/fixers/BachJs.json", "utf8");

                var parsed = new AlbumFixerParser().parse(json);

                expect(parsed.BminorMass.validation[0]).to.equal("skipUniqueTrackNameCheck");
        });

        it("can parse Beethoven.json", () => {
                var json = fs.readFileSync(
                    "/home/rasmus/Music/bin/src/fixers/Beethoven.json", "utf8");

                var parsed = new AlbumFixerParser().parse(json);

                expect(parsed.PianoConc5.fixAlbumTitle.form).to.equal(5);
        });

        it("can parse Mozart.json", () => {
                var json = fs.readFileSync(
                    "/home/rasmus/Music/bin/src/fixers/Mozart.json", "utf8");

                var parsed = new AlbumFixerParser().parse(json);

                expect(parsed.AdagioK261.firstTrackNumber).to.equal(10);
        });
});
