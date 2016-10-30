/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";
import * as Root from "./SpecialHandlers/Root";
import * as npmlog from "npmlog";

export interface Rule
{
    validateTracks: (album: Album, logger: npmlog.NpmLog) => void;
    fixArtist: (album: Album, logger: npmlog.NpmLog) => void;
    fixTrack: (track: AlbumTrack, logger: npmlog.NpmLog) => void;
}

export class SpecialHandling
{
    public constructor(rules, logger: npmlog.NpmLog)
    {
        this.logger = logger;
        this.rules = rules;
    }

    private logger: npmlog.NpmLog;
    private rules;

    private buildFixTrack(specification)
    {
        if (!specification)
        {
            return function(track: AlbumTrack, logger: npmlog.NpmLog) {
            }
        }

        var fixers = [];

        if (specification.fixTrackNameFunc && specification.fixTrackName) {
            throw new Error("Can't have both kinds of track fixers");
        }

        if (specification.fixTrackNameFunc) {

            var fixTrackName = function(track: AlbumTrack, logger: npmlog.NpmLog) {

                var oldTitle = track.title;
                var newTitle = specification.fixTrackNameFunc(oldTitle, logger);
                logger.verbose("fixTrackNameFunc", "Changing old title '" + oldTitle + "' to '" + newTitle + "'");
                track.title = newTitle;

            }

            fixers.push(fixTrackName);
        }

        if (specification.fixTrackName) {

            var fixTrackName = function(track: AlbumTrack, logger: npmlog.NpmLog) {
                var match = specification.fixTrackName.exec(track.title);
                if (!match) {
                    throw new Error("'" + track.title + "': Track name does not match fixer for fixTrackName: /" + specification.fixTrackName + "/");
                }
                var newTitle = match[1] + " " + match[2];
                logger.silly("SpecialFixTrackName", track.title  + ": Extracting track name '" + newTitle + "'");
                track.title = newTitle;
            };

            fixers.push(fixTrackName);
        }

        if (specification.firstTrackNumber) {
            var fixTrackNumber = function(track: AlbumTrack, logger: npmlog.NpmLog) {
                var match = /^(\d+)(.*)$/.exec(track.title);
                if (!match) {
                    throw new Error(track.title + ": Track name does not have expected number prefix");
                }
                var trackNumber = parseInt(match[1]);
                logger.silly("SpecialFixTrackNumber", track.title  + ": Adjusting current track number of " + trackNumber + " with first track number " + specification.firstTrackNumber);
                trackNumber = trackNumber + 1 - specification.firstTrackNumber;
                if (trackNumber <= 0)
                {
                    throw new Error(track.title + ": fixing track number gave negative result of " + trackNumber);
                }
                var numberAsString = ("0" + trackNumber).substr(-2);
                var newTitle = numberAsString + match[2];
                if (track.title != newTitle)
                {
                    track.title = newTitle;
                    logger.verbose("SpecialFixTrackNumber", track.path  + ": Fixed track number to '" + track.title + "'")
                }
            };

            fixers.push(fixTrackNumber);
        }

        var applyAllFixers = function(track: AlbumTrack, logger: npmlog.NpmLog) {
            fixers.forEach((fixer) => {
                fixer(track, logger);
            });
        }

        return applyAllFixers;
    }

    public getArtistName(artist: string) : string
    {
        var artistHandlers = this.rules[artist];

        if (artistHandlers && artistHandlers.artistName)
        {
            return artistHandlers.artistName;
        }
    }

    public getSpecialHandlers(artist: string, albumTitle: string)
    {
        var artistHandlers = this.rules[artist];
        var albumHandlers = artistHandlers && artistHandlers[albumTitle];

        return {
            fixArtist : artistHandlers && artistHandlers.fixArtist,
            fixTrack: this.buildFixTrack(albumHandlers),
            validateTracks : albumHandlers && albumHandlers.validateTracks
        };
    }
}
