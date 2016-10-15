/// <reference path = "../typings/auto.d.ts" />

import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as npmlog from "npmlog";

function log(path: string, isIncluded: boolean, logger: npmlog.NpmLog)
{
    if (isIncluded)
    {
        logger.silly("GetFiles", "Included " + path);
    }
    else
    {
        logger.verbose("GetFiles", "Excluded " + path);
    }
}

export function getFiles(directories: string[], logger: npmlog.NpmLog) : string[]
{
    var result = shelljs.find(directories).filter((path) =>
    {
        var isIncluded = /mp3$/.exec(path) && fs.statSync(path).isFile();
        log(path, isIncluded, logger);
        return isIncluded;
    });

    logger.info("Found " + result.length + " files");

    return result;
}
