/// <reference path = "../typings/auto.d.ts" />

/*
 * Scanner
    Grab files from a directory,
    for each, get the artist, album, track, checksum, mp3 headers

  * Fixers
     Apply series of plugins to improve quality of the metadata
        Fix track to have numeric prefix
        Fix artist to have no spaces

  * Validators
     Apply series of plugins to validate quality of metadata
        Fix track to have numeric prefix
        Fix artist to have no spaces
        No non-ascii characters in name
*/

import shelljs = require('shelljs');
import fs = require('fs');
import parseArguments = require('minimist');
import { Scanner } from "./Scanner";
import { Validator } from "./Validator";

export class Application
{
    public static main(argv: string[], logger: any)
    {
        try
        {
            new Application().doIt(argv.splice(2));
        }
        catch (error)
        {
            logger.log(error);
        }
    }
    public doIt(argv: string[])
    {
        var parsedArguments = parseArguments(argv);
        var scanner = new Scanner();
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
            shelljs.mkdir('-p', targetFolder);
            shelljs.cp(scanned.path, targetFile);
        });
    }
}
