/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Track } from "../src/Track";
import { Album } from "../src/Album";
import { Command } from "../src/Command";
import { CommandFactory } from "../src/CommandFactory";

describe("Command factory", () => {
    var album: Album;
    beforeEach(() => {
        album = new Album("aaaa", "bbbb");
        album.push({
            artist: "aaaa",
            album: "bbbb",
            title: "01 cccc.mp3",
            path: "artist/album/01 track.mp3"
        });
    });
    it("creates command for creating directory", () => {
        var commands = new CommandFactory("out").create([album]);
        chai.expect(commands[0].command).to.equal("mkdir");
    });
    it("creates the correct directory", () => {
        var commands = new CommandFactory("out").create([album]);
        chai.expect(commands[0].target).to.equal("out/aaaa/bbbb");
    });
    it("creates command copying file", () => {
        var commands = new CommandFactory("out").create([album]);
        chai.expect(commands[1].command).to.equal("cp");
    });
    it("copies file with the correct source file", () => {
        var commands = new CommandFactory("out").create([album]);
        chai.expect(commands[1].source).to.equal("artist/album/01 track.mp3");
    });
    it("copies file with the correct target file", () => {
        var commands = new CommandFactory("out").create([album]);
        chai.expect(commands[1].target).to.equal("out/aaaa/bbbb/01 cccc.mp3");
    });
});
