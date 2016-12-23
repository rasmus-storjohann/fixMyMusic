/// <reference path = "../typings/auto.d.ts" />

import { Album } from "./Album";
import { AlbumTrack } from "./AlbumTrack";
import { CustomFixer } from "./CustomFixer";
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
        for (var artist in allRules) {
            if (allRules.hasOwnProperty(artist)) {
                var rulesForArtist = allRules[artist];
                for (var album in rulesForArtist) {
                    if (rulesForArtist.hasOwnProperty(album) && album !== "artistName") {
                        var rulesForAlbum = rulesForArtist[album];
                        for (var rule in rulesForAlbum) {
                            if (rulesForAlbum.hasOwnProperty(rule)) {
                                this.validateRule(rule, artist, album);
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
        var validRules = [ "fixAlbumTitle", "fixTrackName", "fixTrackNameFunc", "firstTrackNumber", "validation" ];

        if (validRules.indexOf(ruleName) === -1) {
            throw new Error(ruleName + ": Invalid custom rule for [" + artist + "][" + album + "]");
        }
    }

    private logger: npmlog.NpmLog;
    private rules;

    public create(album: Album) : CustomFixer
    {
        var artist = album.originalArtist;
        var albumTitle = album.originalTitle;

        this.logger.silly("Custom fixer factory", "called with " + artist + " and " + albumTitle);

        var artistRules = this.rules[artist];
        var albumRules = artistRules && artistRules[albumTitle];

        var fixArtist = artistRules && artistRules.fixArtist;
        var fixAlbumTitle = albumRules && albumRules.fixAlbumTitle;
        var validation = this.validateValidationOptions(albumRules);

        var fixTrack = this.buildCustomTrackFixer(albumRules);

        return {
            fixArtist: fixArtist,
            fixAlbumTitle: fixAlbumTitle,
            fixTrack: fixTrack,
            validation: validation
        };
    }

    private validateValidationOptions(albumRules)
    {
        var result = albumRules && albumRules.validation;

        if (result)
        {
            result.forEach((value) => {
                if (value !== "skipTrackNumberCheck" && value !== "skipUniqueTrackNameCheck")
                {
                    throw new Error(value + ": Invalid validation option");
                }
            });
        }

        return result;
    }

    private buildCustomTrackFixer(specification)
    {
        if (!specification)
        {
            return function(track: AlbumTrack, logger: npmlog.NpmLog)
            {
            }
        }

        var fixers = [];

        if (specification.fixTrackNameFunc && specification.fixTrackName)
        {
            throw new Error("Can't have both kinds of track fixers");
        }

        if (specification.fixTrackNameFunc)
        {
            var fixTrackName = function(track: AlbumTrack, logger: npmlog.NpmLog)
            {
                var oldTitle = track.title;
                var newTitle = specification.fixTrackNameFunc(oldTitle, logger);
                logger.verbose("fixTrackNameFunc", "Changing old title '" + oldTitle + "' to '" + newTitle + "'");
                track.title = newTitle;
            }

            fixers.push(fixTrackName);
        }

        if (specification.fixTrackName)
        {
            var fixTrackName = function(track: AlbumTrack, logger: npmlog.NpmLog)
            {
                var match = specification.fixTrackName.exec(track.title);
                if (!match)
                {
                    throw new Error("'" + track.path + "': Track name '" + track.title + "' does not match fixer for fixTrackName: " + specification.fixTrackName);
                }
                var newTitle = match[1];
                logger.silly("SpecialFixTrackName", track.title  + ": Extracting track name '" + newTitle + "'");
                track.title = newTitle;
            };

            fixers.push(fixTrackName);
        }

        if (specification.firstTrackNumber)
        {
            var fixTrackNumber = function(track: AlbumTrack, logger: npmlog.NpmLog)
            {
                var trackNumber = track.trackNumber + 1 - specification.firstTrackNumber;
                if (trackNumber != track.trackNumber)
                {
                    if (trackNumber <= 0)
                    {
                        throw new Error(track.title + ": fixing track number gave negative result of " + trackNumber);
                    }
                    track.trackNumber = trackNumber;
                    logger.verbose("SpecialFixTrackNumber", track.path  + ": Fixed track number to " + trackNumber)
                }
            };

            fixers.push(fixTrackNumber);
        }

        var applyAllFixers = function(track: AlbumTrack, logger: npmlog.NpmLog)
        {
            fixers.forEach((fixer) => {
                fixer(track, logger);
            });
        }

        return applyAllFixers;
    }

    // TODO this does not belong in this file
    public getArtistName(artist: string) : string
    {
        var artistRules = this.rules[artist];

        if (artistRules && artistRules.artistName)
        {
            return artistRules.artistName;
        }
    }
}
