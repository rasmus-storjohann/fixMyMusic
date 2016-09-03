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

export class Application
{
    public static main(argv: string[])
    {
        var fromDir = argv[0];
        var toDir = argv[1];
        var files = shelljs.find(fromDir).filter((fullpath) =>
        {
             return fs.statSync(fullpath).isFile();
        });
        files.forEach((sourceFile) => {
            var match = /\/([^\/]+)\/([^\/]+)\/([^\/]+.mp3)/.exec(sourceFile);
            if (match)
            {
                var artist = match[1];
                var album = match[2];
                var track = match[3];
                var targetFolder = [toDir, artist, album].join("/");
                var targetFile = [targetFolder, track].join("/");
                console.log(targetFile);
                shelljs.mkdir('-p', targetFolder);
                shelljs.cp(sourceFile, targetFile);
            }
        });
    }
}
