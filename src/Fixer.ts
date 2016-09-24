import { Album, AlbumTrack } from "./Album";
import { SpecialHandling, SpecialHandler } from "./SpecialHandling";

export class Fixer
{
    public fix(album: Album, specialHandler: SpecialHandler) : void
    {
        var fixArtist = this.getFixArtistFunction(specialHandler);
        fixArtist(album);

        var fixTrack = this.getFixTrackFunction(specialHandler);
        if (fixTrack)
        {
            album.tracks.forEach((track) => {
                fixTrack(track);
            });
        }
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

    private getFixTrackFunction(specialHandler: SpecialHandler) : (track: AlbumTrack) => void
    {
        return specialHandler && specialHandler.fixTrack;
    }
}
