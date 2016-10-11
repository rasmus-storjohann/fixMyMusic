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

        this.fixNumbering(album);
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

    private fixNumbering(album: Album): void
    {
        album.sortTracks();
        var lastDiskNumber = album.tracks[0].disk;
        var lastTrackNumber: number;
        var lastTrackNumberOnLastDisk = 0;
        album.tracks.forEach((track) => {
            var diskNumber = track.disk;
            if (lastDiskNumber && lastDiskNumber != diskNumber)
            {
                lastDiskNumber = diskNumber;
                lastTrackNumberOnLastDisk = lastTrackNumber;
            }
            lastTrackNumber = this.getTrackNumber(track) + lastTrackNumberOnLastDisk;
            this.setTrackNumber(track, lastTrackNumber);
        });
    }

    private getTrackNumber(track: AlbumTrack): number
    {
        var match = /^(\d+)/.exec(track.title);
        if (!match) {
            throw new Error("Could not extract number from track title");
        }
        return parseInt(match[1]);
    }

    private setTrackNumber(track: AlbumTrack, newNumber: number): void
    {
        var match = /^(\d+)(.*)$/.exec(track.title);
        var formattedNumber = "00" + newNumber;
        track.title = formattedNumber.slice(-2) + match[2];
    }
}
