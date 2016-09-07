import { Track } from "./Track";

export class TrackFactory
{
    public scanFiles(paths: string[]) : Track[]
    {
        var result: Track[];
        result = [];
        paths.forEach((path) => {
            result.push(this.create(path));
        });
        return result;
    }
    public create(pathToMusicFile: string) : Track
    {
        var elements = pathToMusicFile.split("/");
        var count = elements.length;
        if (count < 3)
        {
            throw new Error(pathToMusicFile + ": Invalid path to music file");
        }
        var artist = elements[count - 3];
        var album = elements[count - 2];
        var track = elements[count - 1];
        var match = /((\d+)?[^\/]+\.mp3)/.exec(track);
        if (!match)
        {
            throw new Error(pathToMusicFile + ": Invalid music file name");
        }
        return {
            path: pathToMusicFile,
            artist: artist,
            album: album,
            track: track
        };
    }
};
