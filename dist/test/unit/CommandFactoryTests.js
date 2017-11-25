"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const log = require("npmlog");
const Album_1 = require("../../src/Album");
const createCommands_1 = require("../../src/businessObjects/commands/createCommands");
const getIfExistsOrThrow_1 = require("../helpers/getIfExistsOrThrow");
mocha_1.describe("Command factory", () => {
    var album;
    var commands;
    mocha_1.beforeEach(() => {
        log.level = 'silent';
        album = new Album_1.Album([{
                artist: "aaaa",
                album: "bbbb",
                trackNumber: 1,
                title: "cccc",
                path: "artist/album/01 track.mp3"
            }]);
        commands = createCommands_1.createCommands([album], "out", log);
    });
    mocha_1.describe("Create directory", () => {
        mocha_1.it("creates command for creating directory", () => { chai_1.expect(commands[0].command).to.equal("mkdir"); });
        mocha_1.it("creates the correct directory", () => { chai_1.expect(commands[0].target).to.equal("out/aaaa/bbbb"); });
    });
    mocha_1.describe("Copy file", () => {
        mocha_1.it("creates command copying file", () => { chai_1.expect(commands[1].command).to.equal("cp"); });
        mocha_1.it("copies file with the correct source file", () => { chai_1.expect(commands[1].source).to.equal("artist/album/01 track.mp3"); });
        mocha_1.it("copies file with the correct target file", () => { chai_1.expect(commands[1].target).to.equal("out/aaaa/bbbb/01 cccc.mp3"); });
    });
    mocha_1.describe("Tag file", () => {
        mocha_1.it("creates command tagging file", () => {
            chai_1.expect(getIfExistsOrThrow_1.getIfExistsOrThrow(commands, ["2", "command"])).to.equal("tag");
        });
        mocha_1.it("tags the output file", () => {
            chai_1.expect(getIfExistsOrThrow_1.getIfExistsOrThrow(commands, ["2", "target"]))
                .to.equal("out/aaaa/bbbb/01 cccc.mp3");
        });
        mocha_1.it("tags with artist", () => {
            chai_1.expect(getIfExistsOrThrow_1.getIfExistsOrThrow(commands, ["2", "tags", "artist"]))
                .to.equal("aaaa");
        });
        mocha_1.it("tags with album name", () => {
            chai_1.expect(getIfExistsOrThrow_1.getIfExistsOrThrow(commands, ["2", "tags", "album"]))
                .to.equal("bbbb");
        });
        mocha_1.it("tags with track name without file extension", () => {
            chai_1.expect(getIfExistsOrThrow_1.getIfExistsOrThrow(commands, ["2", "tags", "track"]))
                .to.equal("01 cccc");
        });
    });
    mocha_1.describe("handles multiple albums", () => {
        mocha_1.beforeEach(() => {
            var secondAlbum = new Album_1.Album([{
                    artist: "pppp",
                    album: "qqqq",
                    trackNumber: 1,
                    title: "rrrr",
                    path: "artist2/album2/01 track.mp3"
                },
                {
                    artist: "pppp",
                    album: "qqqq",
                    trackNumber: 2,
                    title: "ssss",
                    path: "artist2/album2/02 track.mp3"
                }]);
            commands = createCommands_1.createCommands([album, secondAlbum], "out", log);
        });
        mocha_1.it("creates two mkdir commands", () => {
            chai_1.expect(commands[0].command).to.equal("mkdir");
            chai_1.expect(commands[0].target).to.equal("out/aaaa/bbbb");
            chai_1.expect(commands[3].command).to.equal("mkdir");
            chai_1.expect(commands[3].target).to.equal("out/pppp/qqqq");
        });
        mocha_1.it("creates three copy commands", () => {
            chai_1.expect(commands[1].command).to.equal("cp");
            chai_1.expect(commands[1].target).to.equal("out/aaaa/bbbb/01 cccc.mp3");
            chai_1.expect(commands[4].command).to.equal("cp");
            chai_1.expect(commands[4].target).to.equal("out/pppp/qqqq/01 rrrr.mp3");
            chai_1.expect(commands[6].command).to.equal("cp");
            chai_1.expect(commands[6].target).to.equal("out/pppp/qqqq/02 ssss.mp3");
        });
    });
});
