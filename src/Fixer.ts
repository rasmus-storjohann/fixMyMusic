import { Album } from "./Album";
import { SpecialHandling } from "./SpecialHandling";

export class Fixer
{
    private specialHandling: SpecialHandling;

    constructor()
    {
        this.specialHandling = new SpecialHandling();
    }

    public fix(albums: Album[]) : void
    {
        albums.forEach((album) => {
            var fixAlbum = this.getFixAlbum(album);
            fixAlbum(album);
        });
    }

    private getFixAlbum(album: Album)
    {
        var specialFixAlbum = this.getAlbmuSpecialHandlerIfExists(album, (specialHandlers) => {
            return specialHandlers.fixAlbum;
        });
        return specialFixAlbum || this.defaultFixAlbum;
    }

    private getAlbmuSpecialHandlerIfExists(album: Album, selectHandler)
    {
        var handlers = this.specialHandling.albumSpecialHandlers(album.artist, album.title);
        if (handlers)
        {
            return selectHandler(handlers);
        }
        return null;
    }

    private defaultFixAlbum(album: Album): void
    {
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
    }
}
