/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { symphony, num } from "../src/AlbumFormat";

interface IExample {
    fn : (...args : any[]) => any;
}

var x : IExample = {
    fn: function(...args : any[]) {
        for (var i = 0, arg; arg = args[i]; i++) {
            console.log(arg);
        }
    }
}

x.fn(1);
x.fn(1, 2);
x.fn("cat", "dog", "mouse");

describe("Album format specification", () => {
    it("can create symphony", () => {
        var result = symphony();
        chai.expect(result.form).to.equal("Symph");
    });

    it("can set symphony number", () => {
        var result = symphony(num(2));
        chai.expect(result.num).to.equal("2");
    });
});
