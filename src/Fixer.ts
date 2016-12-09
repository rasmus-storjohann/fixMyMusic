import { Album } from "./Album";
import { AlbumTrack } from "./AlbumTrack";
import { Rule } from "./Rule";
import { IRuleFactory } from "./IRuleFactory";
import * as npmlog from "npmlog";

export class Fixer
{
    public constructor(customFixerFactory: IRuleFactory, logger: npmlog.NpmLog)
    {
        this.customFixerFactory = customFixerFactory;
        this.logger = logger;
    }

    private customFixerFactory: IRuleFactory;
    private logger: npmlog.NpmLog;

    public fix(album: Album) : void
    {
        this.logger.verbose("Fixer", "Fixing album " + album.artist + ": " + album.title);

        var rule = this.customFixerFactory.create(album.artist, album.title);
        var artistName = this.customFixerFactory.getArtistName(album.artist);

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
            track.trackNumber += lastTrackNumberOnLastDisk;
            trackNumber = track.trackNumber;
        });
    }
}
