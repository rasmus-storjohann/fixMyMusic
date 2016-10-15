import { Album, AlbumTrack } from "./Album";
import { SpecialHandling, SpecialHandler } from "./SpecialHandling";
import * as npmlog from "npmlog";

export class Fixer
{
    public constructor(logger: npmlog.NpmLog)
    {
        this.logger = logger;
    }

    private logger: npmlog.NpmLog;

    public fix(album: Album, specialHandler: SpecialHandler) : void
    {
        this.logger.silly("Fixer", "Fixing " + album.artist + ": " + album.title);

        var fixArtist = this.getFixArtistFunction(specialHandler);
        fixArtist(album, this.logger);

        var fixTrack = this.getFixTrackFunction(specialHandler);
        if (fixTrack)
        {
            album.tracks.forEach((track) => {
                fixTrack(track, this.logger);
                this.logger.verbose("Fixer", "Fixed title '" + track.title + "'");
            });
        }

        this.fixTrackNumbering(album);
    }

    private getFixArtistFunction(specialHandler: SpecialHandler) : (album: Album, logger: npmlog.NpmLog) => void
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

    private getFixTrackFunction(specialHandler: SpecialHandler) : (track: AlbumTrack, logger: npmlog.NpmLog) => void
    {
        return specialHandler && specialHandler.fixTrack;
    }

    private fixTrackNumbering(album: Album): void
    {
        album.sortTracks();
        var lastDiskNumber = album.tracks[0].disk;
        if (!lastDiskNumber)
        {
            return;
        }
        var trackNumber: number;
        var lastTrackNumberOnLastDisk = 0;
        album.tracks.forEach((track) => {
            var diskNumber = track.disk;
            if (lastDiskNumber != diskNumber)
            {
                lastTrackNumberOnLastDisk = trackNumber;
                lastDiskNumber = diskNumber;
            }
            trackNumber = this.getTrackNumber(track) + lastTrackNumberOnLastDisk;
            this.setTrackNumber(track, trackNumber);
        });
    }

    private getTrackNumber(track: AlbumTrack): number
    {
        var match = /^(\d+)/.exec(track.title);
        if (!match) {
            throw new Error(track.path + ": Could not extract number from track title'" + track.title + "'");
        }
        return parseInt(match[1]);
    }

    private setTrackNumber(track: AlbumTrack, newNumber: number): void
    {
        var match = /^(\d+)(.*)$/.exec(track.title);
        var formattedNumber = "00" + newNumber;
        var newTitle = formattedNumber.slice(-2) + match[2];

        if (track.title != newTitle)
        {
            track.title = newTitle;
            this.logger.verbose("Fixer", track.path + ": Setting track title to '" + newTitle + "'");
        }
    }
}
