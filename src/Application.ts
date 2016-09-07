/// <reference path = "../typings/auto.d.ts" />

import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as parseArguments from 'minimist';
import { TrackFactory } from "./TrackFactory";
import { Validator } from "./Validator";

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
        var scanner = new TrackFactory();
        var validator = new Validator();

        var fromDir = parsedArguments._;
        var toDir = parsedArguments["out"];
        if (!toDir)
        {
            throw new Error("Specify --out argument");
        }
        var files = shelljs.find(fromDir).filter((fullpath) =>
        {
             return fs.statSync(fullpath).isFile();
        });
        var scannedFiles = scanner.scanFiles(files);
        validator.validateAlbum(scannedFiles);
        scannedFiles.forEach((scanned) => {
            var targetFolder = [toDir, scanned.artist, scanned.album].join("/");
            var targetFile = [targetFolder, scanned.track].join("/");
            this.logger.log("Creating..." + targetFile);
            shelljs.mkdir('-p', targetFolder);
            shelljs.cp(scanned.path, targetFile);
        });
    }
    private logger;
}
