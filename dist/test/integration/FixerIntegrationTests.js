"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationOption_1 = require("../../src/businessInterfaces/fixers/ValidationOption");
const parseFixers_1 = require("../../src/businessObjects/fixers/parseFixers");
const parseArtistFixer_1 = require("../../src/businessObjects/fixers/parseArtistFixer");
const getIfExistsOrThrow_1 = require("../helpers/getIfExistsOrThrow");
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const fs = require("fs");
mocha_1.describe("Fixer integration", () => {
    function parseArtistJson(file) {
        var json = fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + file, "utf8");
        return parseArtistFixer_1.parseArtistFixer(json);
    }
    mocha_1.it("can parse BachJs.json", () => {
        var parsed = parseArtistJson("JS Bach.json");
        chai_1.expect(parsed.BminorMass.validation[0])
            .to.equal(ValidationOption_1.ValidationOption.skipUniqueTrackNameCheck);
    });
    mocha_1.it("can parse Beethoven.json", () => {
        var parsed = parseArtistJson("Beethoven.json");
        chai_1.expect(parsed.PianoConc5.fixAlbumTitle.num).to.equal(5);
    });
    mocha_1.it("can parse Chopin.json", () => {
        var parsed = parseArtistJson("Frédéric Chopin.json");
        chai_1.expect(parsed.CelloSonata.fixAlbumTitle.by).to.equal("Rostropovich");
    });
    mocha_1.it("can parse Handel.json", () => {
        var parsed = parseArtistJson("Handel.json");
        chai_1.expect(parsed.Fireworks.firstTrackNumber).to.equal(10);
    });
    mocha_1.it("can parse Haydn.json", () => {
        var parsed = parseArtistJson("Haydn.json");
        chai_1.expect(parsed["Quartet56 E flat Op71 No3"].fixAlbumTitle.num).to.equal(56);
    });
    mocha_1.it("can parse Mahler.json", () => {
        var parsed = parseArtistJson("Mahler.json");
        chai_1.expect(parsed["Symph3[Chailly]"].fixAlbumTitle.num).to.equal(3);
    });
    mocha_1.it("can parse Mozart.json", () => {
        var parsed = parseArtistJson("Mozart.json");
        chai_1.expect(parsed.AdagioK261.firstTrackNumber).to.equal(10);
    });
    mocha_1.it("can parse Schubert.json", () => {
        var parsed = parseArtistJson("Schubert.json");
        chai_1.expect(parsed.Symp10.firstTrackNumber).to.equal(5);
    });
    mocha_1.it("can parse Shostakovich.json", () => {
        var parsed = parseArtistJson("Shostakovich.json");
        chai_1.expect(parsed["Lady Macbeth4"].firstTrackNumber).to.equal(8);
    });
    mocha_1.it("can parse Others.json", () => {
        var file = "Others.json";
        var json = fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + file, "utf8");
        var parsed = parseFixers_1.parseFixers(json);
        chai_1.expect(getIfExistsOrThrow_1.getIfExistsOrThrow(parsed, [
            "Carl Nielsen", "Symph 1", "fixAlbumTitle", "num"
        ])).to.equal(1);
    });
});
