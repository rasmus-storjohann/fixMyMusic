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
        var withDiskIdInFolder = /\/([^\/]+)\/([^\/]+)\/disk(\d+)\/([^\/]+)$/;
        var match = withDiskIdInFolder.exec(path);
        if (match)
        {
            return {
                path: path,
                artist: match[1],
                album: match[2],
                title: match[4],
                disk: parseInt(match[3])
            };
        }

        var withDiskIdInTrackName = /\/([^\/]+)\/([^\/]+)\/Disc (\d+) - (\d+) - (.*)$/;
        match = withDiskIdInTrackName.exec(path);
        if (match)
        {
            return {
                path: path,
                artist: match[1],
                album: match[2],
                title: match[4] + " " + match[5],
                disk: parseInt(match[3])
            };
        }

        var withoutDiskId = /\/([^\/]+)\/([^\/]+)\/([^\/]+)$/;
        match = withoutDiskId.exec(path);
        if (match)
        {
            return {
                path: path,
                artist: match[1],
                album: match[2],
                title: match[3]
            };
        }

        throw new Error(path + ": Invalid path to music file");
    }
};
