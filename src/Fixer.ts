import { Album } from "./Album";

export class Fixer
{
    public fix(albums: Album[]) : void
    {
        albums.forEach(album => {
            var artist = album.artist;
            var hasThePrefix = /^The (.*)/.exec(artist);
            var hasTwoNames = /^([^ ]+) ([^ ]+)$/.exec(artist);
            if (hasThePrefix)
            {
                artist = hasThePrefix[1].replace(/ /g, '_');
            }
            else if (hasTwoNames)
            {
                artist = hasTwoNames[2] + "_" + hasTwoNames[1];
            }
            album.artist = artist;
        });
    }
}
