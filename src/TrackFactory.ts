/// <reference path = "../typings/auto.d.ts" />
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
        var disk: number;

        var match = /disk(\d+)/.exec(album);
        if (match)
        {
            this.validateElementCount(elementCount, 5, path);
            artist = elements[elementCount - 4];
            album = elements[elementCount - 3];
            disk = parseInt(match[1]);
        }

        match = /Disc (\d+) - (\d+) - (.*)/.exec(title);
        if (match)
        {
            disk = parseInt(match[1]);
            title = match[2] + " " + match[3];
        }

        return {
            path: path,
            artist: artist,
            album: album,
            title: title,
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
