/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Scanner } from "../src/Scanner";

describe("Scanner", () => {
    var validPath = "root/artist/album/01 track.mp3";

    var _scanned;
    beforeEach(() =>
    {
        var scanner = new Scanner();
        _scanned = scanner.scan(validPath);
    });

    it("Gets the artist name from path", () => {
        chai.expect(_scanned.artist).equals("artist");
    });

    it("Gets the album name from path", () => {
        chai.expect(_scanned.album).equals("album");
    });

    it("Gets the track name from path", () => {
        chai.expect(_scanned.track).equals("01 track");
    });
});
