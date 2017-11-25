"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const formatAlbumName_1 = require("../../src/businessObjects/albums/formatAlbumName");
mocha_1.describe("Album format specification", () => {
    mocha_1.it("can create symphony", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony" });
        chai_1.expect(result).to.equal("Symph");
    });
    mocha_1.it("can create concerto", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "concerto" });
        chai_1.expect(result).to.equal("Conc");
    });
    mocha_1.it("can create concerto grosso", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "grosso" });
        chai_1.expect(result).to.equal("ConcGrosso");
    });
    mocha_1.it("can create suite", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "suite" });
        chai_1.expect(result).to.equal("Suite");
    });
    mocha_1.it("can create trio", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "trio" });
        chai_1.expect(result).to.equal("Trio");
    });
    mocha_1.it("can create quintet", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "quintet" });
        chai_1.expect(result).to.equal("Quintet");
    });
    mocha_1.it("can set number", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony", num: 2 });
        chai_1.expect(result).to.contain("2");
    });
    mocha_1.it("can set key", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony", major: "C" });
        chai_1.expect(result).to.contain("in C");
    });
    mocha_1.it("can set minor mode", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony", minor: "C" });
        chai_1.expect(result).to.contain("in c");
    });
    mocha_1.it("can set opus", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony", opus: { opus: 12, prefix: "op" } });
        chai_1.expect(result).to.contain("Op.12");
    });
    mocha_1.it("can set opus and number", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony", opus: { opus: 12, num: 2, prefix: "op" } });
        chai_1.expect(result).to.contain("Op.12-2");
    });
    mocha_1.it("can set BWV number", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony", opus: { prefix: "BWV.", opus: 12 } });
        chai_1.expect(result).to.contain("BWV.12");
    });
    mocha_1.it("can set K number", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony", opus: { opus: 12, prefix: "K." } });
        chai_1.expect(result).to.contain("K.12");
    });
    mocha_1.it("can set subtitle", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony", subTitle: "Jupiter" });
        chai_1.expect(result).to.contain("\"Jupiter\"");
    });
    mocha_1.it("can set performer", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "symphony", by: "Karajan" });
        chai_1.expect(result).to.contain("[Karajan]");
    });
    mocha_1.it("can set instrument", () => {
        var result = formatAlbumName_1.formatAlbumName({ form: "sonata", instrument: "Cello" });
        chai_1.expect(result).to.contain("Cello");
    });
    mocha_1.describe("can format to string", () => {
        mocha_1.it("with subtitle", () => {
            var result = formatAlbumName_1.formatAlbumName({ form: "symphony",
                num: 3,
                major: "Eb",
                opus: { opus: 55, prefix: "op" },
                subTitle: "Eroica",
                by: "Haitink"
            });
            chai_1.expect(result).to.equal("Symph 3 [Haitink] \"Eroica\" in Eb Op.55");
        });
        mocha_1.it("with instrument", () => {
            var result = formatAlbumName_1.formatAlbumName({ form: "sonata",
                instrument: "Violin", major: "G", opus: { opus: 30, num: 3, prefix: "op" }
            });
            chai_1.expect(result).to.equal("ViolinSonata in G Op.30-3");
        });
        mocha_1.it("with opus and opus number", () => {
            var result = formatAlbumName_1.formatAlbumName({ form: "sonata",
                num: 10, major: "g", opus: { opus: 14, num: 2, prefix: "op" }, by: "Goode" });
            chai_1.expect(result).to.equal("Sonata 10 [Goode] in G Op.14-2");
        });
        mocha_1.it("with BWV number", () => {
            var result = formatAlbumName_1.formatAlbumName({ form: "cantata",
                subTitle: "Der Himmel lacht! die Erde jubilieret",
                opus: { opus: 31,
                    prefix: "BWV." },
                by: "Norrington"
            });
            chai_1.expect(result).to.equal("Cantata [Norrington] \"Der Himmel lacht! die Erde jubilieret\" BWV.31");
        });
        mocha_1.it("with minor key", () => {
            var result = formatAlbumName_1.formatAlbumName({ form: "quartet",
                num: 14, minor: "C#", opus: { opus: 131, prefix: "op" } });
            chai_1.expect(result).to.equal("Quartet 14 in c# Op.131");
        });
    });
});
