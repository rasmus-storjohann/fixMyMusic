/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";
import * as Root from "./SpecialHandlers/Root";
import * as npmlog from "npmlog";

export interface SpecialHandler
{
    validateTracks: (album: Album, logger: npmlog.NpmLog) => void;
    fixArtist: (album: Album, logger: npmlog.NpmLog) => void;
    fixTrack: (track: AlbumTrack, logger: npmlog.NpmLog) => void;
}

export class SpecialHandling
{
    public constructor(specialHandlers, logger: npmlog.NpmLog)
    {
        this.logger = logger;
        this.handlers = specialHandlers;
    }

    private logger: npmlog.NpmLog;
    private handlers;

    private buildFixTrack(specification)
    {
        if (!specification)
        {
            return function(track: AlbumTrack, logger: npmlog.NpmLog) {
            }
        }

        var fixers = [];

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

        // TODO remove this
        if (specification.fixNumberPrefixLength) {
            var fixTrackNumber = function(track: AlbumTrack, logger: npmlog.NpmLog) {
                var match = /^(\d+)(.*)$/.exec(track.title);
                if (!match) {
                    throw new Error(track.title + ": Track name does not have expected number prefix");
                }
                var numberAsString = match[1];
                if (numberAsString.length > specification.fixNumberPrefixLength) {
                    throw new Error(track.title + ": Track number is too long for the fix number prefix argument");
                }
                while (numberAsString.length < specification.fixNumberPrefixLength) {
                    numberAsString = "0" + numberAsString;
                }
                track.title = numberAsString + match[2];
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

    public getSpecialHandlers(artist: string, albumTitle: string)
    {
        var artistHandlers = this.handlers[artist];
        var albumHandlers = artistHandlers && artistHandlers[albumTitle];

        return {
            fixArtist : artistHandlers && artistHandlers.fixArtist,
            fixTrack: this.buildFixTrack(albumHandlers),
            validateTracks : albumHandlers && albumHandlers.validateTracks
        };
    }

    private keepArtistNameInCurrentOrder(album: Album)
    {
        album.artist = album.artist.replace(/ /g, '_');
    }
}
