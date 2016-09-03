import { MusicFile } from "./MusicFile";

export class Scanner
{
    public scan(pathToMusicFile: string) : MusicFile
    {
        var match = /\/([^\/]+)\/([^\/]+)\/((\d+)?[^\/]+\.mp3)/.exec(pathToMusicFile);

        if (!match)
        {
            throw new Error(pathToMusicFile + ": Invalid path to music file");
        }
        var artist = match[1];
        var album = match[2];
        var track = match[3];
        var trackNumber = match[4] && parseInt(match[4]);
        return {
            path: pathToMusicFile,
            artist: artist,
            album: album,
            track: track,
            trackNumber: trackNumber
        };
    }
};
