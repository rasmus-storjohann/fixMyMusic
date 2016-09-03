export class Scanner
{
    public scan(pathToMusicFile: string)
    {
        var match = /\/([^\/]+)\/([^\/]+)\/((\d+)?[^\/]+)\.mp3/.exec(pathToMusicFile);
        var artist = match[1];
        var album = match[2];
        var track = match[3];
        var trackNumber = match[4] && parseInt(match[4]);
        return {
            artist: artist,
            album: album,
            track: track,
            trackNumber: trackNumber
        };
    }
};
