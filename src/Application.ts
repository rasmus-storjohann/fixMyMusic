/// <reference path = "../typings/auto.d.ts" />

import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as parseArguments from 'minimist';
import { getFiles } from "./GetFiles";
import { TrackFactory } from "./TrackFactory";
import { AlbumFactory } from "./AlbumFactory";
import { SpecialHandling } from "./SpecialHandling";
import { Fixer } from "./Fixer";
import { Validator } from "./Validator";
import { CommandFactory } from "./CommandFactory";
import { CommandExecutor } from "./CommandExecutor";

export class Application
{
    public static main(argv: string[], logger: any)
    {
        try
        {
            new Application(logger).doIt(argv.splice(2));
        }
        catch (error)
        {
            logger.log(error);
        }
    }
    constructor(logger)
    {
        this.logger = logger;
    }
    public doIt(argv: string[])
    {
        var parsedArguments = parseArguments(argv);
        var fromDirectories = parsedArguments._;
        var dryRun = parsedArguments["dryrun"];
        var toDir = parsedArguments["out"];
        var specialHandling = new SpecialHandling();
        var fixer = new Fixer();
        var validator = new Validator();

        if (!toDir)
        {
            throw new Error("Specify --out argument");
        }

        var files = getFiles(fromDirectories);
        this.logger.log("Read " + files.length + " files");

        var tracks = new TrackFactory().create(files);
        this.logger.log("Processed " + tracks.length + " tracks");

        var albums = new AlbumFactory().create(tracks);
        this.logger.log("Assembled " + albums.length + " albums");

        albums.forEach(album => {
            var specialHandlers = specialHandling.getSpecialHandlers(album.artist, album.title);
            fixer.fix(album, specialHandlers);
            validator.validate(album, specialHandlers);
        });

        var commands = new CommandFactory(toDir).create(albums);
        this.logger.log("Prepared " + commands.length + " commands");

        if (!dryRun)
        {
            new CommandExecutor().execute(commands);
        }
    }
    private logger;
}
