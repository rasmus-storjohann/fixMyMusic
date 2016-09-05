import { MusicFile } from "./MusicFile";

export class Scanner
{
    public scanFiles(paths: string[]) : MusicFile[]
    {
        var result: MusicFile[];
        result = [];
        paths.forEach((path) => {
            result.push(this.scan(path));
        });
        return result;
    }
    public scan(pathToMusicFile: string) : MusicFile
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
        var trackNumber = match[2] && parseInt(match[2]);
        return {
            path: pathToMusicFile,
            artist: artist,
            album: album,
            track: track,
            trackNumber: trackNumber
        };
    }
};
