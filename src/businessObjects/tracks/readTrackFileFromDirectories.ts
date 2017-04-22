import * as shelljs from "shelljs";
import * as fileExists from "file-exists";
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

export function readTrackFileFromDirectories(directories: string[], logger: npmlog.NpmLog): string[]
{
        var result = shelljs
                .find(directories)
                .filter((path) => {
                        var isIncluded = fileExists(path) && /mp3$/.test(path);
                        log(path, isIncluded, logger);
                        return isIncluded;
                });

        logger.info("Found " + result.length + " files");

        return result;
}
