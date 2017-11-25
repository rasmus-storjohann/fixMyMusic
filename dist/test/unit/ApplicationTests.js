"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const Application_1 = require("../../src/Application");
class Logger {
    constructor() { this.messages = []; }
    log(message) { this.messages.push(message); }
    getMessages() { return this.messages; }
}
var application;
mocha_1.beforeEach(() => {
    application = new Application_1.Application();
});
mocha_1.describe("Application", () => {
    mocha_1.it("throws if out argument is not given", () => {
        var validName = "root/Artist/Album/01 Track.mp3";
        chai_1.expect(() => {
            application.execute([validName]);
        }).to.throw(Error, /Specify --out argument/);
    });
    // it("throws if input file is invalid", () => {
    //     var invalidPathWithSpaceInArtistName = "root/Artist Name/Album/01
    //     Track.mp3";
    //     expect(() => {
    //         application.doIt(["--out", "out",
    //         invalidPathWithSpaceInArtistName]);
    //     }).to.throw(Error, /Bla/);
    // });
});
