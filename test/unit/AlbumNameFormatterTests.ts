import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {AlbumNameFormatter} from "../../src/businessObjects/AlbumNameFormatter";

describe("Album format specification", () => {

        var formatter: AlbumNameFormatter;
        beforeEach(() => {
                formatter = new AlbumNameFormatter();
        });

        it("can create symphony", () => {
                var result = formatter.create({form: "symphony"});
                expect(result).to.equal("Symph");
        });

        it("can create concerto", () => {
                var result = formatter.create({form: "concerto"});
                expect(result).to.equal("Conc");
        });

        it("can create concerto grosso", () => {
                var result = formatter.create({form: "grosso"});
                expect(result).to.equal("ConcGrosso");
        });

        it("can create suite", () => {
                var result = formatter.create({form: "suite"});
                expect(result).to.equal("Suite");
        });

        it("can create trio", () => {
                var result = formatter.create({form: "trio"});
                expect(result).to.equal("Trio");
        });

        it("can create quintet", () => {
                var result = formatter.create({form: "quintet"});
                expect(result).to.equal("Quintet");
        });

        it("can set number", () => {
                var result = formatter.create({form: "symphony", num: 2});
                expect(result).to.contain("2");
        });

        it("can set key", () => {
                var result = formatter.create({form: "symphony", major : "C"});
                expect(result).to.contain("in C");
        });

        it("can set minor mode", () => {
                var result = formatter.create({form: "symphony", minor : "C"});
                expect(result).to.contain("in c");
        });

        it("can set opus", () => {
                var result = formatter.create({form: "symphony", opus: { opus: 12, prefix: "op" }});
                expect(result).to.contain("Op.12");
        });

        it("can set opus and number", () => {
                var result = formatter.create({form: "symphony", opus: { opus: 12, num: 2, prefix: "op" }});
                expect(result).to.contain("Op.12-2");
        });

        it("can set BWV number", () => {
                var result = formatter.create({form: "symphony", opus : { prefix:"BWV.", opus: 12}});
                expect(result).to.contain("BWV.12");
        });

        it("can set K number", () => {
                var result = formatter.create({form: "symphony", opus : { opus: 12, prefix: "K."}});
                expect(result).to.contain("K.12");
        });

        it("can set subtitle", () => {
                var result = formatter.create({form: "symphony", subTitle : "Jupiter"});
                expect(result).to.contain("\"Jupiter\"");
        });

        it("can set performer", () => {
                var result = formatter.create({form: "symphony", by : "Karajan"});
                expect(result).to.contain("[Karajan]");
        });

        it("can set instrument", () => {
                var result = formatter.create({form: "sonata", instrument: "Cello"});
                expect(result).to.contain("Cello");
        });

        describe("can format to string", () => {
                it("with subtitle", () => {
                        var result = formatter.create({form: "symphony",
                                             num : 3,
                                             major : "Eb",
                                             opus : { opus: 55, prefix: "op" },
                                             subTitle : "Eroica",
                                             by : "Haitink"
                                     });
                        expect(result).to.equal("Symph 3 [Haitink] \"Eroica\" in Eb Op.55");
                });

                it("with instrument", () => {
                        var result = formatter.create({form: "sonata",
                        instrument : "Violin", major : "G", opus: { opus: 30, num: 3, prefix: "op"}
                                     });
                        expect(result).to.equal("ViolinSonata in G Op.30-3");
                });

                it("with opus and opus number", () => {
                        var result = formatter.create({form: "sonata",
                        num : 10, major : "g", opus : { opus: 14, num: 2, prefix: "op"}, by : "Goode"});
                        expect(result).to.equal("Sonata 10 [Goode] in G Op.14-2");
                });

                it("with BWV number", () => {
                        var result = formatter.create({form: "cantata",
                                             subTitle : "Der Himmel lacht! die Erde jubilieret",
                                             opus : { opus: 31,
                                             prefix:"BWV."},
                                             by : "Norrington"
                                     });
                        expect(result).to.equal(
                            "Cantata [Norrington] \"Der Himmel lacht! die Erde jubilieret\" BWV.31");
                });

                it("with minor key", () => {
                        var result = formatter.create({form: "quartet",
                        num : 14, minor : "C#", opus : { opus: 131, prefix: "op"}});
                        expect(result).to.equal("Quartet 14 in c# Op.131");
                });
        });
});
