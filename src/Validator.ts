/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";
import { SpecialHandling, Rule } from "./SpecialHandling";
import * as npmlog from "npmlog";

export class Validator
{
    public constructor(logger: npmlog.NpmLog)
    {
        this.logger = logger;
    }

    private logger: npmlog.NpmLog;

    public validate(album: Album, rule: Rule) : void
    {
        var validateTracks = this.getValidateTracksFunction(rule);
        validateTracks(album, this.logger);

        var validateArtist = this.defaultValidateArtist;
        validateArtist(album, this.logger);
    }

    private getValidateTracksFunction(rule: Rule) : (album: Album, logger: npmlog.NpmLog) => void
    {
        if (rule && rule.validateTracks)
        {
            return rule.validateTracks;
        }
        return this.defaultValidateTracks;
    }

    private defaultValidateArtist(album: Album, logger: npmlog.NpmLog) : void
    {
        if (album.artist.indexOf(" ") !== -1)
        {
            throw new Error(album.tracks[0].path + ": Artist contains a space: \"" + album.artist + "\"");
        }
    }

    private defaultValidateTracks(album: Album, logger: npmlog.NpmLog) : void
    {
        var index = 1;
        var numberPrefixLength: number;
        var previousTrackTitle: string;
        //var isTrackNameRedundant = this.isTrackNameRedundant;
        album.tracks.forEach((track) => {
            logger.info("Validate", "[" + album.artist + "][" + album.title + "][" + track.title + "]");
            /*
            if (isTrackNameRedundant(previousTrackTitle, track.title))
            {
                throw new Error(track.title + ": Redundant track name, likely contains work name");
            }
            */
            var trackNumberAsString = /^(\d+)/.exec(track.title);
            if (!trackNumberAsString)
            {
                throw new Error("Failed validation of '" + track.path + "': title '" + track.title + "' has no number");
            }

            var numberPrefix = trackNumberAsString[1];
            if (numberPrefixLength && numberPrefix.length !== numberPrefixLength)
            {
                throw new Error(track.path + ": Inconsistent numbering format");
            }

            numberPrefixLength = numberPrefix.length;

            var trackNumber = parseInt(numberPrefix);
            if (trackNumber != index)
            {
                var suggestedSpecialHandler = "\"" + album.artist + " (as on disk!)\" : {\n" +
                                              "    \"" + album.title + "\" : {\n" +
                                              "        firstTrackNumber: " + trackNumber + ",\n" +
                                              "        fixTrackName: /" + track.title + "/\n" +
                                              "    }\n" +
                                              "}";
                throw new Error(track.title + ": Track number out of order, expected " + index + " but got " + trackNumber +
                                                "\nTemplate for special handler:\n" + suggestedSpecialHandler);
            }
            index++;
            previousTrackTitle = track.title;
        });
    }
    private isTrackNameRedundant(firstTrackName: string, secondTrackName: string) : boolean
    {
        var length = Math.min(firstTrackName.length, secondTrackName.length);
        if (length < 10)
        {
            return false;
        }
        var matches = 0;
        for (var i = 0; i < length; i++)
        {
            if (firstTrackName[i] == secondTrackName[i])
            {
                matches += 1;
            }
        }
        return matches/length > 0.5;
    }
}
