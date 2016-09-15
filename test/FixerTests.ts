/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Fixer } from "../src/Fixer";
import { Album, AlbumTrack } from "../src/Album";

var fixer: Fixer;
var album: Album;
beforeEach(() => {
    fixer = new Fixer();
    album = {
        artist: "aaaa",
        title: "bbbb",
        tracks: [
            {
                path: "cccc",
                title: "dddd"
            }
        ]
    };
});

describe("Fixer", () => {
    describe("for album names", () => {
        it("makes no changes to artist names with no spaces", () => {
            album.artist = "a_b_c";
            fixer.fix([album]);
            chai.expect(album.artist).to.equal("a_b_c");
        });
        it("drops the 'the' and replaces space with _ in names starting with 'the'", () => {
            album.artist = "The Tragically Hip";
            fixer.fix([album]);
            chai.expect(album.artist).to.equal("Tragically_Hip");
        });
    });
});
