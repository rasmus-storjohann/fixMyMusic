import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as log from "npmlog";
import {Track} from "../../src/businessInterfaces/tracks/Track";
import {Album} from "../../src/Album";
import {Command, Mp3Tags} from "../../src/businessInterfaces/commands/Command";
import {createCommands} from "../../src/businessObjects/commands/createCommands";
import {getIfExistsOrThrow} from "../helpers/getIfExistsOrThrow";

describe("Command factory", () => {
        var album: Album;
        var commands: Command[];
        beforeEach(() => {
                log.level = 'silent';
                album = new Album([{
                        artist : "aaaa",
                        album : "bbbb",
                        trackNumber : 1,
                        title : "cccc",
                        path : "artist/album/01 track.mp3"
                }]);
                commands = createCommands([ album ], "out", log);
        });
        describe("Create directory", () => {
                it("creates command for creating directory",
                   () => { expect(commands[0].command).to.equal("mkdir"); });
                it("creates the correct directory",
                   () => { expect(commands[0].target).to.equal("out/aaaa/bbbb"); });
        });
        describe("Copy file", () => {
                it("creates command copying file",
                   () => { expect(commands[1].command).to.equal("cp"); });
                it("copies file with the correct source file",
                   () => { expect(commands[1].source).to.equal("artist/album/01 track.mp3"); });
                it("copies file with the correct target file",
                   () => { expect(commands[1].target).to.equal("out/aaaa/bbbb/01 cccc.mp3"); });
        });
        describe("Tag file", () => {
                it("creates command tagging file", () => {
                        expect(getIfExistsOrThrow(commands, [ "2", "command" ])).to.equal("tag");
                });
                it("tags the output file", () => {
                        expect(getIfExistsOrThrow(commands, [ "2", "target" ]))
                            .to.equal("out/aaaa/bbbb/01 cccc.mp3");
                });
                it("tags with artist", () => {
                        expect(getIfExistsOrThrow(commands, [ "2", "tags", "artist" ]))
                            .to.equal("aaaa");
                });
                it("tags with album name", () => {
                        expect(getIfExistsOrThrow(commands, [ "2", "tags", "album" ]))
                            .to.equal("bbbb");
                });
                it("tags with track name without file extension", () => {
                        expect(getIfExistsOrThrow(commands, [ "2", "tags", "track" ]))
                            .to.equal("01 cccc");
                });
        });
        describe("handles multiple albums", () => {
                beforeEach(() => {
                        var secondAlbum = new Album([{
                                artist : "pppp",
                                album : "qqqq",
                                trackNumber : 1,
                                title : "rrrr",
                                path : "artist2/album2/01 track.mp3"
                        },
                        {
                                artist : "pppp",
                                album : "qqqq",
                                trackNumber : 2,
                                title : "ssss",
                                path : "artist2/album2/02 track.mp3"
                        }]);
                        commands = createCommands([ album, secondAlbum ], "out", log);
                });
                it("creates two mkdir commands", () => {
                        expect(commands[0].command).to.equal("mkdir");
                        expect(commands[0].target).to.equal("out/aaaa/bbbb");

                        expect(commands[3].command).to.equal("mkdir");
                        expect(commands[3].target).to.equal("out/pppp/qqqq");
                });
                it("creates three copy commands", () => {
                        expect(commands[1].command).to.equal("cp");
                        expect(commands[1].target).to.equal("out/aaaa/bbbb/01 cccc.mp3");

                        expect(commands[4].command).to.equal("cp");
                        expect(commands[4].target).to.equal("out/pppp/qqqq/01 rrrr.mp3");

                        expect(commands[6].command).to.equal("cp");
                        expect(commands[6].target).to.equal("out/pppp/qqqq/02 ssss.mp3");
                });
        });
});
