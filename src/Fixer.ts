import { Album } from "./Album";
import { AlbumTrack } from "./AlbumTrack";
import { CustomFixer } from "./CustomFixer";
import { ICustomFixerFactory } from "./ICustomFixerFactory";
import * as npmlog from "npmlog";

export class Fixer
{
    public constructor(customFixerFactory: ICustomFixerFactory, logger: npmlog.NpmLog)
    {
        this.customFixerFactory = customFixerFactory;
        this.logger = logger;
    }

    private customFixerFactory: ICustomFixerFactory;
    private logger: npmlog.NpmLog;

    public fix(album: Album) : void
    {
        this.logger.verbose("Fixer", "Fixing album " + album.artist + ": " + album.title);

        var customFixer = this.customFixerFactory.create(album);

        this.fixTrackTitleSpacing(album);
        this.fixAlbumName(album, customFixer);
        this.fixArtist(album);

        var fixTracks = customFixer && customFixer.fixTrack;
        if (fixTracks)
        {
            fixTracks(album, this.logger);
        }

        this.fixTrackNumbering(album);
    }

    private fixTrackTitleSpacing(album: Album)
    {
        album.tracks.forEach((track) => {
            track.title = track.title.replace(/_/g, " ");
            while (/  /.exec(track.title)) {
                track.title = track.title.replace(/  /g, " ");
            }
        });
    }

    private fixAlbumName(album: Album, customFixer: CustomFixer) : void
    {
        var title = customFixer && customFixer.fixAlbumTitle;
        if (title)
        {
            album.title = title.toString();
        }
    }

    private fixArtist(album: Album) : void
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
