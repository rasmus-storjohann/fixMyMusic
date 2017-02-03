import { Track } from "./Track";
import * as npmlog from "npmlog";

export class TrackFactory
{
    public constructor(logger: npmlog.NpmLog)
    {
        this.logger = logger;
    }

    private logger: npmlog.NpmLog;

    public create(paths: string[]) : Track[]
    {
        var result = new Array<Track>();
        paths.forEach((path) => {
            result.push(this.createTrack(path));
        });
        this.logger.info("Track factory", "Processed " + result.length + " tracks");
        return result;
    }

    public createTrack(path: string) : Track
    {
        var elements = path.split("/");
        var elementCount = elements.length;
        this.validateElementCount(elementCount, 4, path);

        var artist = elements[elementCount - 3];
        var album = elements[elementCount - 2];
        var title = elements[elementCount - 1];
        var trackNumber: number;
        var disk: number;
        var match: RegExpExecArray;

        if (match = /disk(\d+)/.exec(elements[elementCount - 2]))
        {
            this.validateElementCount(elementCount, 5, path);
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

        return {
            path: path,
            artist: artist,
            album: album,
            title: title,
            trackNumber: trackNumber,
            disk: disk
        };
    }

    private validateElementCount(actual: number, expected: number, path: string)
    {
        if (actual < expected)
        {
            throw new Error(path + ": Invalid path to music file, at least " + expected + " elements needed");
        }
    }
};
