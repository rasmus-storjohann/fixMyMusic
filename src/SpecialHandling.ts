/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";
import * as Root from "./SpecialHandlers/Root";
import * as npmlog from "npmlog";

export interface Rule
{
    fixArtist: (album: Album, logger: npmlog.NpmLog) => void;
    fixAlbumTitle?: string;
    fixTrack: (track: AlbumTrack, logger: npmlog.NpmLog) => void;
    validation: string[];
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
                    throw new Error("'" + track.path + "': Track name '" + track.title + "' does not match fixer for fixTrackName: " + specification.fixTrackName);
                }
                var newTitle = match[1];
                logger.silly("SpecialFixTrackName", track.title  + ": Extracting track name '" + newTitle + "'");
                track.title = newTitle;
            };

            fixers.push(fixTrackName);
        }

        if (specification.firstTrackNumber) {
            var fixTrackNumber = function(track: AlbumTrack, logger: npmlog.NpmLog) {
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

    public getSpecialHandlers(artist: string, albumTitle: string) : Rule
    {
        var artistHandlers = this.rules[artist];
        var albumHandlers = artistHandlers && artistHandlers[albumTitle];

        return {
            fixArtist : artistHandlers && artistHandlers.fixArtist,
            fixAlbumTitle: albumHandlers && albumHandlers.fixAlbumTitle,
            fixTrack: this.buildFixTrack(albumHandlers),
            validation: albumHandlers && albumHandlers.validation
        };
    }
}
