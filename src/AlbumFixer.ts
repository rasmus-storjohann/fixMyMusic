import {Album} from "./Album";
import {AlbumTrack} from "./businessInterfaces/tracks/AlbumTrack";
import {CustomFixer} from "./businessInterfaces/fixers/CustomFixer";
import {ICustomFixerFactory} from "./businessInterfaces/fixers/ICustomFixerFactory";
import {ClassicalWorkName} from "./businessInterfaces/fixers/ClassicalWorkName";
import {AlbumNameFormatter} from "./businessObjects/albums/AlbumNameFormatter";
import * as npmlog from "npmlog";

// TODO rename AlbumFixer and move to business objects albumste
export class AlbumFixer
{
        public constructor(customFixerFactory: ICustomFixerFactory, logger: npmlog.NpmLog)
        {
                this.customFixerFactory = customFixerFactory;
                this.logger = logger;
        }

        private customFixerFactory: ICustomFixerFactory;
        private logger: npmlog.NpmLog;

        public fix(album: Album): void
        {
                this.logger.verbose("Fixer", "Fixing album " + album.artist + ": " + album.title);

                var customFixer = this.customFixerFactory.create(album);

                this.fixTrackTitleSpacing(album);
                this.fixAlbumName(album, customFixer);
                this.fixArtist(album);
                album.sortTracks();

                var fixTracks = customFixer && customFixer.fixTrack;
                if (fixTracks)
                {
                        fixTracks(album, this.logger);
                }

                album.sortTracks();
                this.fixTrackNumbering(album);
        }

        private fixTrackTitleSpacing(album: Album)
        {
                album.tracks.forEach((track) => {
                        track.title = track.title.replace(/_/g, " ");
                        while (/  /.exec(track.title))
                        {
                                track.title = track.title.replace(/  /g, " ");
                        }
                });
        }

        private fixAlbumName(album: Album, customFixer: CustomFixer): void
        {
                var p1: string | undefined = this.buildClassicalWorkName(customFixer.fixAlbumTitle);
                var p2: string | undefined = customFixer.albumName;
                var p3 = p1 || p2;
                if (p3)
                {
                        album.title = p3;
                }
        }

        private buildClassicalWorkName(name?: ClassicalWorkName): string | undefined
        {
                if (!name)
                {
                        return undefined;
                }
                return new AlbumNameFormatter().create(name);
        }

        private fixArtist(album: Album): void
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
