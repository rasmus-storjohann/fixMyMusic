import { Album } from "./Album";
import { SpecialHandling } from "./SpecialHandling";
import { SpecialHandler } from "./SpecialHandler";

export class Fixer
{
    public fix(album: Album, specialHandler: SpecialHandler) : void
    {
        var fixArtist = this.getFixArtistFunction(specialHandler);
        fixArtist(album);
    }

    private getFixArtistFunction(specialHandler: SpecialHandler) : (album: Album) => void
    {
        if (specialHandler && specialHandler.fixArtist)
        {
            return specialHandler.fixArtist;
        }
        return this.defaultFixArtist;
    }

    private defaultFixArtist(album: Album): void
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
