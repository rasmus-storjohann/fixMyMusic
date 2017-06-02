import {Album} from "../../Album";
import {CustomFixer} from "../../businessInterfaces/fixers/CustomFixer";
import {AlbumTrack} from "../../businessInterfaces/tracks/AlbumTrack";
import {ValidationOption} from "../../businessInterfaces/fixers/ValidationOption";
import {FixOptionsForAll} from "../../businessInterfaces/fixers/FixOptionsForAll";
import {FixOptionsForOneArtist} from "../../businessInterfaces/fixers/FixOptionsForOneArtist";
import {FixOptionsForOneAlbum} from "../../businessInterfaces/fixers/FixOptionsForOneAlbum";
import {ClassicalWorkName} from "../../businessInterfaces/fixers/ClassicalWorkName";
import {NpmLog} from "npmlog";

export class CustomFixerFactory
{
        public constructor(rules: FixOptionsForAll, logger: NpmLog)
        {
                this.logger = logger;
                this.rules = rules;
        }

        private logger: NpmLog;
        private rules: FixOptionsForAll;

        public create(album: Album): CustomFixer
        {
                var artist = album.originalArtist;
                var albumTitle = album.originalTitle;

                this.logger.silly("Custom fixer factory", "called with '" + artist + "' and '" + albumTitle + "'");

                var fixOptionsForArtist = this.rules[artist];
                var fixOptions : FixOptionsForOneAlbum = fixOptionsForArtist && fixOptionsForArtist[albumTitle];

                var albumName = fixOptions && fixOptions.albumName;
                var fixAlbumTitle : ClassicalWorkName | undefined = fixOptions && fixOptions.fixAlbumTitle;
                var validation : ValidationOption[] = fixOptions && fixOptions.validation || [];

                var fixTrack = this.buildCustomTrackFixer(fixOptions);

                return {
                        albumName : albumName,
                        fixAlbumTitle : fixAlbumTitle,
                        fixTrack : fixTrack,
                        validation : validation
                };
        }

        private buildCustomTrackFixer(fixOptions: FixOptionsForOneAlbum)
        {
                if (!fixOptions)
                {
                        this.logger.silly("No custom fixer created");
                        return function(album: Album, logger: NpmLog) {}
                }

                var fixers: ((album: Album, logger: NpmLog) => void)[];
                fixers = [];

                // TODO make one fixer function from either fixTrackNameFunction
                // or fixTrackName or noop
                if (fixOptions.fixTrackNameFunction && fixOptions.fixTrackName)
                {
                        throw new Error("Can't have both kinds of track fixers");
                }

                if (fixOptions.fixTrackNameFunction)
                {
                        this.logger.silly("Found fix track name function");
                        var fixTrackNameFunction = fixOptions.fixTrackNameFunction;
                        var fixTrackName =
                            function(album: Album, logger: NpmLog) {
                                album.tracks.forEach((track) => {
                                        var oldTitle = track.title;
                                        var newTitle = fixTrackNameFunction(oldTitle, logger);
                                        logger.verbose("fixTrackNameFunction", "Renaming '" +
                                                                               oldTitle + "' -> '" +
                                                                               newTitle + "'");
                                        track.title = newTitle;
                                });
                        }

                            fixers.push(fixTrackName);
                }

                if (fixOptions.fixTrackName)
                {
                        this.logger.silly("Found fix track name regexp");
                        var fixTrackNameRegExp = fixOptions.fixTrackName;
                        var fixTrackName = function(album: Album, logger: NpmLog) {
                                album.tracks.forEach((track) => {
                                        var match = fixTrackNameRegExp.exec(track.title);
                                        if (!match)
                                        {
                                                throw new Error(
                                                    "'" + track.path + "': Track name \n'" +
                                                    track.title +
                                                    "' does not match fixer for fixTrackName: \n" +
                                                    fixOptions.fixTrackName);
                                        }
                                        var newTitle = match[1];
                                        logger.silly("SpecialFixTrackName",
                                                     track.title + ": Extracting track name '" +
                                                         newTitle + "'");
                                        track.title = newTitle;
                                });
                        };

                        fixers.push(fixTrackName);
                }

                if (fixOptions.firstTrackNumber)
                {
                        this.logger.silly("Found fix track number");
                        var self = this;
                        var fixTrackNumber = function(album: Album, logger: NpmLog) {
                                var adjustment = 1 - fixOptions.firstTrackNumber;
                                var previousDiskNumber = album.tracks[0].disk;
                                var previousTrackNumber = 0;

                                album.tracks.forEach((track) => {
                                        if (previousDiskNumber !== track.disk)
                                        {
                                                previousDiskNumber = track.disk;
                                                adjustment = previousTrackNumber;
                                        }

                                        track.trackNumber += adjustment;
                                        var expectedTrackNumber = previousTrackNumber + 1;
                                        self.validateTrackNumber(track, expectedTrackNumber,
                                                                 logger);
                                        // TODO have this function quit when the
                                        // disk number changes, then the disk
                                        // number can remain and subsequent call to
                                        // Fixer.fixTrackNumbering() will finish
                                        // up the track numbering
                                        track.disk = undefined;
                                        previousTrackNumber = track.trackNumber;
                                });
                        };

                        fixers.push(fixTrackNumber);
                }

                this.logger.silly("Combining " + fixers.length + " fixers");
                var applyAllFixers = function(
                    album: Album,
                    logger: NpmLog) { fixers.forEach((fixer) => { fixer(album, logger); }); }

                return applyAllFixers;
        }

        private validateTrackNumber(track: AlbumTrack, expectedTrackNumber: number,
                                    logger: NpmLog)
        {
                if (track.trackNumber < 1)
                {
                        throw new Error(track.title +
                                        ": fixing track number gave negative result of " +
                                        track.trackNumber);
                }
                if (track.trackNumber < expectedTrackNumber)
                {
                        throw new Error(track.title + ": duplicate track number " +
                                        expectedTrackNumber);
                }
                if (track.trackNumber > expectedTrackNumber)
                {
                        throw new Error(track.title + ": missing track number " +
                                        expectedTrackNumber);
                }
                this.logger.verbose("SpecialFixTrackNumber",
                                    track.title + ": setting track number to " + track.trackNumber);
        }
}
