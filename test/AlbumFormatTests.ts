/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { cantata, quartet, symphony, sonata } from "../src/AlbumFormat";

describe("Album format specification", () => {

    it("can create symphony", () => {
        var result = symphony();
        chai.expect(result.form).to.equal("Symph");
    });

    it("can set number", () => {
        var result = symphony( { num : 2 } );
        chai.expect(result.num).to.equal(2);
    });

    it("can set key", () => {
        var result = symphony( { major : "C" } );
        chai.expect(result.key).to.equal("C");
    });

    it("can set major mode", () => {
        var result = symphony( { major : "C" } );
        chai.expect(result.mode).to.equal("major");
    });

    it("can set minor mode", () => {
        var result = symphony( { minor : "C" } );
        chai.expect(result.mode).to.equal("minor");
    });

    it("can set opus", () => {
        var result = symphony( { op : 12 } );
        chai.expect(result.opus).to.equal(12);
    });

    it("opus prefix defaults to Op.", () => {
        var result = symphony( { op : 12 } );
        chai.expect(result.opus_prefix).to.equal("Op.");
    });

    it("can set opus and number", () => {
        var result = symphony( { op : [12, 2] } );
        chai.expect(result.opus).to.equal(12);
        chai.expect(result.opus_number).to.equal(2);
    });

    it("can set BWV number", () => {
        var result = symphony( { BWV : 12 } );
        chai.expect(result.opus).to.equal(12);
        chai.expect(result.opus_prefix).to.equal("BWV ");
    });


    it("can set subtitle", () => {
        var result = symphony( { subTitle: "Jupiter" } );
        chai.expect(result.subTitle).to.equal("Jupiter");
    });

    it("can set performer", () => {
        var result = symphony( { by: "Karajan" } );
        chai.expect(result.performer).to.equal("Karajan");
    });

    describe("can format to string", () => {
        it("with subtitle", () => {
            var result = symphony( { num : 3, major : "Eb", op: 55, subTitle: "Eroica", by: "Haitink" } ).toString();
            chai.expect(result).to.equal("Symph 3 [Haitink] in Eb \"Eroica\" Op.55");
        });

        it("with opus and opus number", () => {
            var result = sonata( { num : 10, major : "g", op : [14, 2], by: "Goode" } ).toString();
            chai.expect(result).to.equal("Sonata 10 [Goode] in G Op.14 Nr.2");
        });

        it("with BWV number", () => {
            var result = cantata( { subTitle: "Der Himmel lacht! die Erde jubilieret", BWV : 31, by: "Norrington" } ).toString();
            chai.expect(result).to.equal("Cantata [Norrington] \"Der Himmel lacht! die Erde jubilieret\" BWV 31");
        });

        it("with minor key", () => {
            var result = quartet( { num : 14, minor : "C#", op : 131 } ).toString();
            chai.expect(result).to.equal("Quartet 14 in c# Op.131");
        });
    });
});
