export class Scanner
{
    public scan(pathToMusicFile: string)
    {
        var match = /\/([^\/]+)\/([^\/]+)\/(\d+[^\/]+.mp3)/.exec(pathToMusicFile);
        var artist = match[1];
        var album = match[2];
        var track = match[3];
        return {
            artist: artist
        };
    }
};
