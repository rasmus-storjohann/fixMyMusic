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

  * Savers
     Copy the file to destination
     Set mp3 headers
*/

import shelljs = require('shelljs');
import fs = require('fs');
import { Scanner } from "./Scanner";

export class Application
{
    public static main(argv: string[])
    {
        var scanner = new Scanner();
        var fromDir = argv[0];
        var toDir = argv[1];
        var files = shelljs.find(fromDir).filter((fullpath) =>
        {
             return fs.statSync(fullpath).isFile();
        });
        files.forEach((sourceFile) => {
            var scanned =  scanner.scan(sourceFile);
            var targetFolder = [toDir, scanned.artist, scanned.album].join("/");
            var targetFile = [targetFolder, scanned.track].join("/");
            shelljs.mkdir('-p', targetFolder);
            shelljs.cp(sourceFile, targetFile);
        });
    }
}
