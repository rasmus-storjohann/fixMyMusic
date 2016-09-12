/// <reference path = "../typings/auto.d.ts" />

import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as parseArguments from 'minimist';
import { getFiles } from "./GetFiles";
import { TrackFactory } from "./TrackFactory";
import { AlbumFactory } from "./AlbumFactory";
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

        if (!toDir)
        {
            throw new Error("Specify --out argument");
        }

        var files = getFiles(fromDirectories);
        var tracks = new TrackFactory().create(files);
        var albums = new AlbumFactory().create(tracks);
        new Validator().validate(albums);
        var commands = new CommandFactory(toDir).create(albums);

        if (!dryRun)
        {
            new CommandExecutor().execute(commands);
        }
    }
    private logger;
}
