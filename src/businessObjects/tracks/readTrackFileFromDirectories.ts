import * as shelljs from "shelljs";
import * as fileExists from "file-exists";
import {NpmLog} from "npmlog";

export function readTrackFileFromDirectories(directories: string[], logger: NpmLog): string[]
{
        return findFilesInDirectories(directories).filter(fileIsMp3).map(logAllElements(logger));
}

function findFilesInDirectories(directories: string[]) : string[]
{
        return shelljs.find(directories);
}

function fileIsMp3(fileName: string) : boolean
{
        return fileExists(fileName) && /mp3$/.test(fileName);
}

function logAllElements(logger: NpmLog) : (string) => string
{
        return function(fileName: string) : string
        {
                logger.silly("Read", fileName);
                return fileName;
        }
}
