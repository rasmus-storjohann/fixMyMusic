import { Album } from "./Album";

export class Fixer
{
    public fix(albums: Album[]) : void
    {
        albums.forEach(album => {
            var artist = album.artist;
            var match = /^The (.*)/.exec(artist);
            if (match)
            {
                artist = match[1];
            }
            album.artist = artist.replace(/ /g, '_');
        });
    }
}
