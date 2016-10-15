/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import * as log from "npmlog";
import { Application } from "../src/Application";

class Logger
{
    constructor()
    {
        this.messages = [];
    }
    public log(message: string)
    {
        this.messages.push(message);
    }
    public getMessages() : string[]
    {
        return this.messages;
    }
    private messages: string[];
}

var application : Application;
beforeEach(() =>
{
    log.level = 'silent';
    application = new Application(log);
});

describe("Application", () => {
    it("throws if out argument is not given", () => {
        var validName = "root/Artist/Album/01 Track.mp3";
        chai.expect(() => {
            application.doIt([validName]);
        }).to.throw(Error, /Specify --out argument/);
    });

    // it("throws if input file is invalid", () => {
    //     var invalidPathWithSpaceInArtistName = "root/Artist Name/Album/01 Track.mp3";
    //     chai.expect(() => {
    //         application.doIt(["--out", "out", invalidPathWithSpaceInArtistName]);
    //     }).to.throw(Error, /Bla/);
    // });
});
