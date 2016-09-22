import { Album } from "./Album";
import { SpecialHandling } from "./SpecialHandling";

export class Fixer
{
    private specialHandling: SpecialHandling;

    constructor()
    {
        this.specialHandling = new SpecialHandling();
    }

    public fix(album: Album, specialHandlers) : void
    {
        var specialFixArtist = specialHandlers && specialHandlers.fixArtist;
        var fixArtist = specialFixArtist || this.defaultFixArtist;

        fixArtist(album);
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
