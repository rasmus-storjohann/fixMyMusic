/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { symphony, by, num, opus, opus_number, major, minor, called } from "../src/AlbumFormat";

describe("Album format specification", () => {
    //fixName: Sonata(Nr(8), Minor("C"), Op(13), Called("Patetique"), With("Gould")),

    it("can create symphony", () => {
        var result = symphony([]);
        chai.expect(result.form).to.equal("Symph");
    });

    it("can set number", () => {
        var result = symphony([num(2)]);
        chai.expect(result.num).to.equal("2");
    });

    it("can set key", () => {
        var result = symphony([major("C")]);
        chai.expect(result.key).to.equal("C");
    });

    it("can set major mode", () => {
        var result = symphony([major("C")]);
        chai.expect(result.mode).to.equal("major");
    });

    it("can set minor mode", () => {
        var result = symphony([minor("C")]);
        chai.expect(result.mode).to.equal("minor");
    });

    it("can set opus", () => {
        var result = symphony([opus(12)]);
        chai.expect(result.opus).to.equal("12");
    });

    it("can set opus and number", () => {
        var result = symphony([opus_number(12, 2)]);
        chai.expect(result.opus_number).to.equal("2");
    });

    it("can set nick name", () => {
        var result = symphony([called("Jupiter")]);
        chai.expect(result.called).to.equal("Jupiter");
    });

    it("can set nick performer", () => {
        var result = symphony([by("Karajan")]);
        chai.expect(result.performer).to.equal("Karajan");
    });
});
