import {Album} from "./Album";
import {AlbumTrack} from "./AlbumTrack";
import {CustomFixer} from "./CustomFixer";
import * as npmlog from "npmlog";

export class CustomFixerFactory
{
        public constructor(rules, logger: npmlog.NpmLog)
        {
                this.logger = logger;
                this.rules = this.validate(rules);
        }

        private validate(allRules)
        {
                for (var artist in allRules)
                {
                        if (allRules.hasOwnProperty(artist))
                        {
                                var rulesForArtist = allRules[artist];
                                for (var album in rulesForArtist)
                                {
                                        if (rulesForArtist.hasOwnProperty(
                                                album))
                                        {
                                                var rulesForAlbum =
                                                    rulesForArtist[album];
                                                for (var rule in rulesForAlbum)
                                                {
                                                        if (rulesForAlbum
                                                                .hasOwnProperty(
                                                                    rule))
                                                        {
                                                                this.validateRule(
                                                                    rule,
                                                                    artist,
                                                                    album);
                                                        }
                                                }
                                        }
                                }
                        }
                }
                return allRules;
        }

        private validateRule(ruleName: string, artist: string, album: string)
        {
                var validRules = [
                        "fixAlbumTitle", "fixTrackName", "fixTrackNameFunc",
                        "firstTrackNumber", "validation"
                ];

                if (validRules.indexOf(ruleName) === -1)
                {
                        throw new Error(ruleName +
                                        ": Invalid custom rule for [" + artist +
                                        "][" + album + "]");
                }
        }

        private logger: npmlog.NpmLog;
        private rules;

        public create(album: Album): CustomFixer
        {
                var artist = album.originalArtist;
                var albumTitle = album.originalTitle;

                this.logger.silly("Custom fixer factory", "called with " +
                                                              artist + " and " +
                                                              albumTitle);

                var artistRules = this.rules[artist];
                var albumRules = artistRules && artistRules[albumTitle];

                var fixAlbumTitle = albumRules && albumRules.fixAlbumTitle;
                var validation = this.validateValidationOptions(albumRules);

                var fixTrack = this.buildCustomTrackFixer(albumRules);

                return {
                        fixAlbumTitle : fixAlbumTitle,
                        fixTrack : fixTrack,
                        validation : validation
                };
        }

        private validateValidationOptions(albumRules)
        {
                var result = albumRules && albumRules.validation;

                if (result)
                {
                        result.forEach((value) => {
                                if (value !== "skipTrackNumberCheck" &&
                                    value !== "skipUniqueTrackNameCheck")
                                {
                                        throw new Error(
                                            value +
                                            ": Invalid validation option");
                                }
                        });
                }

                return result;
        }

        private buildCustomTrackFixer(specification)
        {
                if (!specification)
                {
                        return function(album: Album, logger: npmlog.NpmLog) {}
                }

                var fixers: ((album: Album, logger: npmlog.NpmLog) => void)[];
                fixers = [];

                if (specification.fixTrackNameFunc &&
                    specification.fixTrackName)
                {
                        throw new Error(
                            "Can't have both kinds of track fixers");
                }

                if (specification.fixTrackNameFunc)
                {
                        var fixTrackName =
                            function(album: Album, logger: npmlog.NpmLog) {
                                album.tracks.forEach((track) => {
                                        var oldTitle = track.title;
                                        var newTitle =
                                            specification.fixTrackNameFunc(
                                                oldTitle, logger);
                                        logger.verbose("fixTrackNameFunc",
                                                       "Changing old title '" +
                                                           oldTitle + "' to '" +
                                                           newTitle + "'");
                                        track.title = newTitle;
                                });
                        }

                            fixers.push(fixTrackName);
                }

                if (specification.fixTrackName)
                {
                        var fixTrackName = function(album: Album,
                                                    logger: npmlog.NpmLog) {
                                album.tracks.forEach((track) => {
                                        var match =
                                            specification.fixTrackName.exec(
                                                track.title);
                                        if (!match)
                                        {
                                                throw new Error(
                                                    "'" + track.path +
                                                    "': Track name \n'" +
                                                    track.title +
                                                    "' does not match fixer for fixTrackName: \n" +
                                                    specification.fixTrackName);
                                        }
                                        var newTitle = match[1];
                                        logger.silly(
                                            "SpecialFixTrackName",
                                            track.title +
                                                ": Extracting track name '" +
                                                newTitle + "'");
                                        track.title = newTitle;
                                });
                        };

                        fixers.push(fixTrackName);
                }

                if (specification.firstTrackNumber)
                {
                        var self = this;
                        var fixTrackNumber = function(album: Album,
                                                      logger: npmlog.NpmLog) {
                                var adjustment =
                                    1 - specification.firstTrackNumber;
                                var previousDiskNumber = album.tracks[0].disk;
                                var previousTrackNumber = 0;

                                album.tracks.forEach((track) => {
                                        if (previousDiskNumber !== track.disk)
                                        {
                                                previousDiskNumber = track.disk;
                                                adjustment =
                                                    previousTrackNumber;
                                        }

                                        track.trackNumber += adjustment;
                                        var expectedTrackNumber =
                                            previousTrackNumber + 1;
                                        self.validateTrackNumber(
                                            track, expectedTrackNumber, logger);
                                        // TODO have this function quit when the
                                        // disk number changes,
                                        // then the disk number can remain and
                                        // subsequent call to
                                        // Fixer.fixTrackNumbering() will finish
                                        // up the track numbering
                                        track.disk = undefined;
                                        previousTrackNumber = track.trackNumber;
                                });
                        };

                        fixers.push(fixTrackNumber);
                }

                var applyAllFixers =
                    function(album: Album, logger: npmlog.NpmLog) {
                        fixers.forEach((fixer) => { fixer(album, logger); });
                }

                return applyAllFixers;
        }

        private validateTrackNumber(track: AlbumTrack,
                                    expectedTrackNumber: number,
                                    logger: npmlog.NpmLog)
        {
                if (track.trackNumber < 1)
                {
                        throw new Error(
                            track.title +
                            ": fixing track number gave negative result of " +
                            track.trackNumber);
                }
                if (track.trackNumber < expectedTrackNumber)
                {
                        throw new Error(track.title +
                                        ": duplicate track number " +
                                        expectedTrackNumber);
                }
                if (track.trackNumber > expectedTrackNumber)
                {
                        throw new Error(track.title +
                                        ": missing track number " +
                                        expectedTrackNumber);
                }
                this.logger.verbose("SpecialFixTrackNumber",
                                    track.title + ": setting track number to " +
                                        track.trackNumber);
        }
}
