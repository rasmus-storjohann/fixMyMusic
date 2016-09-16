/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Fixer } from "../src/Fixer";
import { Album } from "../src/Album";
import { Track } from "../src/Track";

var fixer: Fixer;
var album: Album;
beforeEach(() => {
    fixer = new Fixer();
    album = new Album("aaaa", "bbbb");
    album.push({
        path: "cccc",
        artist: "aaaa",
        album: "bbbb",
        title: "dddd"
    });
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

        it("swaps first and last name and replaces spaces with _ in names consisting first and last name", () => {
            album.artist = "Jimi Hendrix";
            fixer.fix([album]);
            chai.expect(album.artist).to.equal("Hendrix_Jimi");
        });

        it("makes no changes to artist names that don't fit these patterns", () => {
            album.artist = "One Two Three";
            fixer.fix([album]);
            chai.expect(album.artist).to.equal("One Two Three");
        });
    });
});
