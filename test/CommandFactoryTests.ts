/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Track } from "../src/Track";
import { Album } from "../src/Album";
import { Command } from "../src/Command";
import { CommandFactory } from "../src/CommandFactory";

describe("Command factory", () => {
    var album: Album;
    var commands: Command[];
    beforeEach(() => {
        album = new Album("aaaa", "bbbb");
        album.push({
            artist: "aaaa",
            album: "bbbb",
            title: "01 cccc.mp3",
            path: "artist/album/01 track.mp3"
        });
        commands = new CommandFactory("out").create([album]);
    });
    it("creates command for creating directory", () => {
        chai.expect(commands[0].command).to.equal("mkdir");
    });
    it("creates the correct directory", () => {
        chai.expect(commands[0].target).to.equal("out/aaaa/bbbb");
    });
    it("creates command copying file", () => {
        chai.expect(commands[1].command).to.equal("cp");
    });
    it("copies file with the correct source file", () => {
        chai.expect(commands[1].source).to.equal("artist/album/01 track.mp3");
    });
    it("copies file with the correct target file", () => {
        chai.expect(commands[1].target).to.equal("out/aaaa/bbbb/01 cccc.mp3");
    });
    describe("handles multiple albums", () => {
        beforeEach(() => {
            var secondAlbum = new Album("pppp", "qqqq");
            secondAlbum.push({
                artist: "pppp",
                album: "qqqq",
                title: "01 rrrr.mp3",
                path: "artist2/album2/01 track.mp3"
            });
            secondAlbum.push({
                artist: "pppp",
                album: "qqqq",
                title: "02 ssss.mp3",
                path: "artist2/album2/02 track.mp3"
            });
            commands = new CommandFactory("out").create([album, secondAlbum]);
        });
        it("creates two mkdir commands", () => {
            chai.expect(commands[0].command).to.equal("mkdir");
            chai.expect(commands[0].target).to.equal("out/aaaa/bbbb");

            chai.expect(commands[2].command).to.equal("mkdir");
            chai.expect(commands[2].target).to.equal("out/pppp/qqqq");
        });
        it("creates three copy commands", () => {
            chai.expect(commands[1].command).to.equal("cp");
            chai.expect(commands[1].target).to.equal("out/aaaa/bbbb/01 cccc.mp3");

            chai.expect(commands[3].command).to.equal("cp");
            chai.expect(commands[3].target).to.equal("out/pppp/qqqq/01 rrrr.mp3");

            chai.expect(commands[4].command).to.equal("cp");
            chai.expect(commands[4].target).to.equal("out/pppp/qqqq/02 ssss.mp3");
        });
    });
});