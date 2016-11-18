import { Album, AlbumTrack } from "./Album";
import { SpecialHandling, Rule } from "./SpecialHandling";
import * as npmlog from "npmlog";

export class Fixer
{
    public constructor(logger: npmlog.NpmLog)
    {
        this.logger = logger;
    }

    private logger: npmlog.NpmLog;

    public fix(album: Album, artistName: string, rule: Rule) : void
    {
        this.logger.verbose("Fixer", "Fixing album " + album.artist + ": " + album.title);

        this.fixTrackPrefix(album);
        this.fixAlbumName(album, rule);
        this.fixArtist(album, artistName);

        var fixTrack = this.getFixTrackFunction(rule);
        if (fixTrack)
        {
            album.tracks.forEach((track) => {
                fixTrack(track, this.logger);
                this.logger.verbose("Fixer", "Fixed title '" + track.title + "'");
            });
        }

        this.fixTrackNumbering(album);
    }

    private fixTrackPrefix(album: Album)
    {
        album.tracks.forEach((track) => {
            track.title = track.title.replace(/_/g, " ");
            while (/  /.exec(track.title)) {
                track.title = track.title.replace(/  /g, " ");
            }
            if (/^\d[^\d]/.exec(track.title))
            {
                track.title = "0" + track.title;
            }
            var matchesTrackNumberWithDot = /^(\d+)\.(.*)$/;
            var match = matchesTrackNumberWithDot.exec(track.title)
            if (match)
            {
                track.title = match[1] + match[2];
            }
        });
    }

    private fixAlbumName(album: Album, rule: Rule) : void
    {
        var title = rule && rule.fixAlbumTitle;
        if (title)
        {
            album.title = title.toString();
        }
    }

    private fixArtist(album: Album, artistName: string) : void
    {
        if (artistName)
        {
            album.artist = artistName;
            this.logger.verbose("Fixer", "Fixed artist name '" + artistName + "'");
        }
        else
        {
            this.defaultFixArtist(album);
        }
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

    private getFixTrackFunction(rule: Rule) : (track: AlbumTrack, logger: npmlog.NpmLog) => void
    {
        return rule && rule.fixTrack;
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
