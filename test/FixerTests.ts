/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Fixer } from "../src/Fixer";
import { Album } from "../src/Album";
import { Track } from "../src/Track";
import { SpecialHandling } from "../src/SpecialHandling";
import { SpecialHandler } from "../src/SpecialHandler";

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
    describe("artist names", () => {
        var specialHandler: SpecialHandler;
        it("makes no changes to artist names with no spaces", () => {
            album.artist = "a_b_c";
            fixer.fix(album, specialHandler);
            chai.expect(album.artist).to.equal("a_b_c");
        });

        it("drops the 'the' and replaces space with _ in names starting with 'the'", () => {
            album.artist = "The Tragically Hip";
            fixer.fix(album, specialHandler);
            chai.expect(album.artist).to.equal("Tragically_Hip");
        });

        it("swaps first and last name and replaces spaces with _ in names consisting first and last name", () => {
            album.artist = "Jimi Hendrix";
            fixer.fix(album, specialHandler);
            chai.expect(album.artist).to.equal("Hendrix_Jimi");
        });

        it("makes no changes to artist names that don't fit these patterns", () => {
            album.artist = "One Two Three";
            fixer.fix(album, specialHandler);
            chai.expect(album.artist).to.equal("One Two Three");
        });

        describe("special case handling", () => {
            describe("Beady Belle", () => {

                it("leaves the order unchanged", () => {
                    album.artist = "Beady Belle";
                    specialHandler = new SpecialHandling().getSpecialHandlers("Beady Belle", "");
                    fixer.fix(album, specialHandler);
                    chai.expect(album.artist).to.equal("Beady_Belle");
                });
            });
        });
    });
});
