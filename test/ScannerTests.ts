/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Scanner } from "../src/Scanner";

describe("Scanner", () => {
    var _scanner: Scanner;
    beforeEach(() =>
    {
        _scanner = new Scanner();
    });

    it("Gets the artist name from path", () => {
        var scanned = _scanner.scan("root/artist/album/01 track.mp3");
        chai.expect(scanned.artist).equals("artist");
    });
});
