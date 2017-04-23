import {Track} from "../../businessInterfaces/tracks/Track";
import * as npmlog from "npmlog";

export function mapFilesToTracks(paths: string[], logger: npmlog.NpmLog): Track[]
{
        var result = new Array<Track>();
        paths.forEach((path) => { result.push(createTrack(path)); });
        logger.info("Track factory", "Processed " + result.length + " tracks");
        return result;
}

function createTrack(path: string): Track
{
        var elements = path.split("/");
        var elementCount = elements.length;
        validateElementCount(elementCount, 4, path);

        var artist = elements[elementCount - 3];
        var album = elements[elementCount - 2];
        var title = elements[elementCount - 1];
        var trackNumber: number;
        var disk: number | undefined = undefined;
        var match: RegExpExecArray | null;

        if (match = /disk(\d+)/.exec(elements[elementCount - 2]))
        {
                validateElementCount(elementCount, 5, path);
                artist = elements[elementCount - 4];
                album = elements[elementCount - 3];
                disk = parseInt(match[1]);
        }

        if (match = /^(\d+)[ \.-]*(.*)\.mp3$/.exec(title))
        {
                trackNumber = parseInt(match[1]);
                title = match[2];
        }
        else if (match = /^Disc (\d+) - (\d+)[ -]*(.*)\.mp3$/.exec(title))
        {
                disk = parseInt(match[1]);
                trackNumber = parseInt(match[2]);
                title = match[3];
        }
        else if (match = /^d(\d+)t(\d+)\. (.*)\.mp3$/.exec(title))
        {
                disk = parseInt(match[1]);
                trackNumber = parseInt(match[2]);
                title = match[3];
        }
        else
        {
                throw new Error("Could not parse file names");
        }

        return {
                path : path,
                artist : artist,
                album : album,
                title : title,
                trackNumber : trackNumber,
                disk : disk
        };
}

function validateElementCount(actual: number, expected: number, path: string)
{
        if (actual < expected)
        {
                throw new Error(path + ": Invalid path to music file, at least " +
                                expected + " elements needed");
        }
}
