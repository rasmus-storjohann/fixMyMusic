import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {cantata,
        concerto,
        concerto_grosso,
        quartet,
        symphony,
        sonata,
        suite,
        trio,
        quintet} from "../../src/AlbumFormat";
import {fooToString} from "../../src/AlbumFormat";

describe("Album format specification", () => {

        it("can create symphony", () => {
                var result = fooToString({form: "symphony"});
                expect(result).to.equal("symphony");
        });

        it("can create concerto", () => {
                var result = concerto();
                expect(result.form).to.equal("Conc");
        });

        it("can create concerto grosso", () => {
                var result = concerto_grosso();
                expect(result.form).to.equal("ConcGrosso");
        });

        it("can create suite", () => {
                var result = suite();
                expect(result.form).to.equal("Suite");
        });

        it("can create trio", () => {
                var result = trio();
                expect(result.form).to.equal("Trio");
        });

        it("can create quintet", () => {
                var result = quintet();
                expect(result.form).to.equal("Quintet");
        });

        it("can set number", () => {
                var result = symphony({num : 2});
                expect(result.num).to.equal(2);
        });

        it("can set key", () => {
                var result = symphony({major : "C"});
                expect(result.key).to.equal("C");
        });

        it("can set major mode", () => {
                var result = symphony({major : "C"});
                expect(result.mode).to.equal("major");
        });

        it("can set minor mode", () => {
                var result = symphony({minor : "C"});
                expect(result.mode).to.equal("minor");
        });

        it("can set opus", () => {
                var result = symphony({op : 12});
                expect(result.opus).to.equal(12);
        });

        it("opus prefix defaults to Op.", () => {
                var result = symphony({op : 12});
                expect(result.opus_prefix).to.equal("Op.");
        });

        it("can set opus and number", () => {
                var result = symphony({op : [ 12, 2 ]});
                expect(result.opus).to.equal(12);
                expect(result.opus_number).to.equal(2);
        });

        it("can set BWV number", () => {
                var result = symphony({BWV : 12});
                expect(result.opus).to.equal(12);
                expect(result.opus_prefix).to.equal("BWV.");
        });

        it("can set K number", () => {
                var result = symphony({K : 12});
                expect(result.opus).to.equal(12);
                expect(result.opus_prefix).to.equal("K.");
        });

        it("can set subtitle", () => {
                var result = symphony({subTitle : "Jupiter"});
                expect(result.subTitle).to.equal("Jupiter");
        });

        it("can set performer", () => {
                var result = symphony({by : "Karajan"});
                expect(result.performer).to.equal("Karajan");
        });

        it("can set instrument", () => {
                var result = sonata({ for: "Cello"
                });
                expect(result.instrument).to.equal("Cello");
        });

        describe("can format to string", () => {
                it("with subtitle", () => {
                        var result = symphony({
                                             num : 3,
                                             major : "Eb",
                                             op : 55,
                                             subTitle : "Eroica",
                                             by : "Haitink"
                                     }).toString();
                        expect(result).to.equal("Symph 3 [Haitink] \"Eroica\" in Eb Op.55");
                });

                it("with instrument", () => {
                        var result = sonata({ for : "Violin", major : "G", op: [30,3]
                                     }).toString();
                        expect(result).to.equal("ViolinSonata in G Op.30-3");
                });

                it("with opus and opus number", () => {
                        var result = sonata({num : 10, major : "g", op : [ 14, 2 ], by : "Goode"})
                                         .toString();
                        expect(result).to.equal("Sonata 10 [Goode] in G Op.14-2");
                });

                it("with BWV number", () => {
                        var result = cantata({
                                             subTitle : "Der Himmel lacht! die Erde jubilieret",
                                             BWV : 31,
                                             by : "Norrington"
                                     }).toString();
                        expect(result).to.equal(
                            "Cantata [Norrington] \"Der Himmel lacht! die Erde jubilieret\" BWV.31");
                });

                it("with minor key", () => {
                        var result = quartet({num : 14, minor : "C#", op : 131}).toString();
                        expect(result).to.equal("Quartet 14 in c# Op.131");
                });
        });
});
