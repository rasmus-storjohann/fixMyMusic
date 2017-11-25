"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationOption_1 = require("../../src/businessInterfaces/fixers/ValidationOption");
const parseAlbumFixer_1 = require("../../src/businessObjects/fixers/parseAlbumFixer");
const parseClassicalWorkName_1 = require("../../src/businessObjects/fixers/parseClassicalWorkName");
const mocha_1 = require("mocha");
const chai_1 = require("chai");
mocha_1.describe("Album fixer parser", () => {
    mocha_1.describe("Language assumptions", () => {
        mocha_1.it("Append empty string and compare to test for string", () => {
            var s = "";
            var n = 1;
            var o = {};
            chai_1.expect(s + "" === s).to.be.true;
            chai_1.expect(n + "" === n).to.be.false;
            chai_1.expect(o + "" === o).to.be.false;
        });
        mocha_1.it("Add zero and compare to test for number", () => {
            var s = "";
            var n = 1;
            var o = {};
            chai_1.expect(s + 0 === s).to.be.false;
            chai_1.expect(n + 0 === n).to.be.true;
            chai_1.expect(o + 0 === o).to.be.false;
        });
    });
    mocha_1.it("can parse firstTrackNumber", () => {
        var dto = { firstTrackNumber: 4 };
        var json = JSON.stringify(dto);
        var parsed = parseAlbumFixer_1.parseAlbumFixer(json);
        chai_1.expect(parsed).to.deep.equal(dto);
    });
    // throws if firstTrackNumber is not a number
    mocha_1.it("can parse fixTrackName", () => {
        var dto = { fixTrackName: "foo" };
        var json = JSON.stringify(dto);
        var parsed = parseAlbumFixer_1.parseAlbumFixer(json);
        chai_1.expect(parsed).to.deep.equal({ fixTrackName: /foo/ });
    });
    mocha_1.it("can parse fixAlbumTitle", () => {
        var dto = { fixAlbumTitle: { concerto: {} } };
        var json = JSON.stringify(dto);
        var parsed = parseAlbumFixer_1.parseAlbumFixer(json);
        chai_1.expect(parsed).to.deep.equal({ fixAlbumTitle: { form: "concerto" } });
    });
    mocha_1.it("can parse validation", () => {
        var dto = { validation: ["skipUniqueTrackNameCheck"] };
        var json = JSON.stringify(dto);
        var parsed = parseAlbumFixer_1.parseAlbumFixer(json);
        chai_1.expect(parsed).to.deep.equal({ validation: [ValidationOption_1.ValidationOption.skipUniqueTrackNameCheck] });
    });
});
// TODO move to separate test file
mocha_1.describe("Album name fixer", () => {
    mocha_1.it("can parse form", () => {
        var dto = { concerto: {} };
        var json = JSON.stringify(dto);
        var parsed = parseClassicalWorkName_1.parseClassicalWorkName(json);
        chai_1.expect(parsed).to.deep.equal({ form: "concerto" });
    });
    mocha_1.it("can parse instrument", () => {
        var dto = { concerto: { for: "piano" } };
        var json = JSON.stringify(dto);
        var parsed = parseClassicalWorkName_1.parseClassicalWorkName(json);
        chai_1.expect(parsed).to.deep.equal({ form: "concerto", instrument: "piano" });
    });
    mocha_1.it("can parse subTitle", () => {
        var dto = { concerto: { subTitle: "Eroica" } };
        var json = JSON.stringify(dto);
        var parsed = parseClassicalWorkName_1.parseClassicalWorkName(json);
        chai_1.expect(parsed).to.deep.equal({ form: "concerto", subTitle: "Eroica" });
    });
    mocha_1.it("can parse performer", () => {
        var dto = { concerto: { by: "Brendel" } };
        var json = JSON.stringify(dto);
        var parsed = parseClassicalWorkName_1.parseClassicalWorkName(json);
        chai_1.expect(parsed).to.deep.equal({ form: "concerto", by: "Brendel" });
    });
    mocha_1.it("can parse number", () => {
        var dto = { concerto: { num: 2 } };
        var json = JSON.stringify(dto);
        var parsed = parseClassicalWorkName_1.parseClassicalWorkName(json);
        chai_1.expect(parsed).to.deep.equal({ form: "concerto", num: 2 });
    });
    mocha_1.it("can parse opus number", () => {
        var dto = { concerto: { op: 2 } };
        var json = JSON.stringify(dto);
        var parsed = parseClassicalWorkName_1.parseClassicalWorkName(json);
        chai_1.expect(parsed).to.deep.equal({ form: "concerto", opus: { opus: 2, prefix: "op" } });
    });
    mocha_1.it("can parse opus number and number within the opus", () => {
        var dto = { concerto: { op: [2, 4] } };
        var json = JSON.stringify(dto);
        var parsed = parseClassicalWorkName_1.parseClassicalWorkName(json);
        chai_1.expect(parsed).to.deep.equal({ form: "concerto", opus: { opus: 2, num: 4, prefix: "op" } });
    });
    mocha_1.it("throws on opus number array having less than two elements", () => {
        var dto = { concerto: { op: [1] } };
        var json = JSON.stringify(dto);
        chai_1.expect(() => { parseClassicalWorkName_1.parseClassicalWorkName(json); })
            .to.throw(Error, /invalid opus array, should have two elements/);
    });
    mocha_1.it("throws on opus number array having more than two elements", () => {
        var dto = { concerto: { op: [1, 2, 4] } };
        var json = JSON.stringify(dto);
        chai_1.expect(() => { parseClassicalWorkName_1.parseClassicalWorkName(json); })
            .to.throw(Error, /invalid opus array, should have two elements/);
    });
    mocha_1.it("can parse major key", () => {
        var dto = { concerto: { major: "A" } };
        var json = JSON.stringify(dto);
        var parsed = parseClassicalWorkName_1.parseClassicalWorkName(json);
        chai_1.expect(parsed).to.deep.equal({ form: "concerto", major: "A" });
    });
    mocha_1.it("can parse minor key", () => {
        var dto = { concerto: { minor: "A" } };
        var json = JSON.stringify(dto);
        var parsed = parseClassicalWorkName_1.parseClassicalWorkName(json);
        chai_1.expect(parsed).to.deep.equal({ form: "concerto", minor: "A" });
    });
    mocha_1.it("throws if both minor and major keys are given", () => {
        var dto = { concerto: { major: "A", minor: "A" } };
        var json = JSON.stringify(dto);
        chai_1.expect(() => { parseClassicalWorkName_1.parseClassicalWorkName(json); })
            .to.throw(Error, /major and minor keys given/);
    });
});
