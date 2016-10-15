/// <reference path = "../typings/auto.d.ts" />

import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as parseArguments from 'minimist';
import * as npmlog from "npmlog";
import { getFiles } from "./GetFiles";
import { TrackFactory } from "./TrackFactory";
import { AlbumFactory } from "./AlbumFactory";
import { SpecialHandling } from "./SpecialHandling";
import { Fixer } from "./Fixer";
import { Logger } from "./Logger";
import { Validator } from "./Validator";
import { CommandFactory } from "./CommandFactory";
import { CommandExecutor } from "./CommandExecutor";

export class Application
{
    public static main(argv: string[], logger: npmlog.NpmLog)
    {
        try
        {
            new Application(logger).doIt(argv.splice(2));
        }
        catch (error)
        {
            var message = (<Error>(error)).message;
            logger.error("Root", message);
        }
    }

    constructor(logger: npmlog.NpmLog)
    {
        this.logger = logger;
    }

    public doIt(argv: string[])
    {
        var parsedArguments = parseArguments(argv);
        var fromDirectories = parsedArguments._;
        var dryRun = parsedArguments["dryrun"];
        var toDir = parsedArguments["out"];
        var specialHandling = new SpecialHandling(this.logger);
        var fixer = new Fixer(this.logger);
        var validator = new Validator(this.logger);

        if (!toDir)
        {
            throw new Error("Specify --out argument");
        }

        var files = getFiles(fromDirectories, this.logger);
        var tracks = new TrackFactory(this.logger).create(files);
        var albums = new AlbumFactory(this.logger).create(tracks);

        albums.forEach(album => {
            var specialHandlers = specialHandling.getSpecialHandlers(album.artist, album.title);
            fixer.fix(album, specialHandlers);
            album.sortTracks();
            validator.validate(album, specialHandlers);
        });

        var commands = new CommandFactory(toDir, this.logger).create(albums);

        if (!dryRun)
        {
            new CommandExecutor(this.logger).execute(commands);
        }
    }
    private logger: npmlog.NpmLog;
}
