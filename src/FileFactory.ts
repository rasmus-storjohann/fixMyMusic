/// <reference path = "../typings/auto.d.ts" />

import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as npmlog from "npmlog";


export class FileFactory
{
    public constructor(logger: npmlog.NpmLog)
    {
        this.logger = logger;
    }

    private logger: npmlog.NpmLog;

    private log(path: string, isIncluded: boolean, logger: npmlog.NpmLog)
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

    public create(directories: string[]) : string[]
    {
        var result = shelljs.find(directories).filter((path) =>
        {
            var isIncluded = /mp3$/.exec(path) && fs.statSync(path).isFile();
            this.log(path, isIncluded, this.logger);
            return isIncluded;
        });

        this.logger.info("Found " + result.length + " files");

        return result;
    }
}