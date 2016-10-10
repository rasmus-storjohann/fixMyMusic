/// <reference path = "../typings/auto.d.ts" />
import { Track } from "./Track";

export class TrackFactory
{
    public create(paths: string[]) : Track[]
    {
        var result = new Array<Track>();
        paths.forEach((path) => {
            result.push(this.createTrack(path));
        });
        return result;
    }
    public createTrack(path: string) : Track
    {
        var elements = path.split("/");
        var count = elements.length;
        var containsDiskId = /disk(\d+)/.exec(elements[count - 2]);
        if (containsDiskId)
        {
            if (count < 4)
            {
                throw new Error(path + ": Invalid path to music file");
            }
            return {
                path: path,
                artist: elements[count - 4],
                album: elements[count - 3],
                title: elements[count - 1],
                disk: parseInt(containsDiskId[1])
            };
        }
        if (count < 3)
        {
            throw new Error(path + ": Invalid path to music file");
        }
        return {
            path: path,
            artist: elements[count - 3],
            album: elements[count - 2],
            title: elements[count - 1]
        };
    }
};
