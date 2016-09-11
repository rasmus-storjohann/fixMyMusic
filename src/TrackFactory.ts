import { Track } from "./Track";

export class TrackFactory
{
    public create(paths: string[]) : Track[]
    {
        var result: Track[];
        result = [];
        paths.forEach((path) => {
            result.push(this.createTrack(path));
        });
        return result;
    }
    public createTrack(pathToMusicFile: string) : Track
    {
        var elements = pathToMusicFile.split("/");
        var count = elements.length;
        if (count < 3)
        {
            throw new Error(pathToMusicFile + ": Invalid path to music file");
        }
        var artist = elements[count - 3];
        var album = elements[count - 2];
        var title = elements[count - 1];
        var match = /((\d+)?[^\/]+\.mp3)/.exec(title);
        if (!match)
        {
            throw new Error(pathToMusicFile + ": Invalid music file name");
        }
        return {
            path: pathToMusicFile,
            artist: artist,
            album: album,
            title: title
        };
    }
};
