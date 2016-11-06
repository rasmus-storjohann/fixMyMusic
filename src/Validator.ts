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
        var validationOptions = (rule && rule.validation) || [];

        this.validateTracks(album, validationOptions, this.logger);

        this.validateTrackUniqueness(album, validationOptions);

        this.defaultValidateArtist(album, this.logger);
    }

    private validateTracks(album: Album, validationOptions: string[], logger: npmlog.NpmLog) : void
    {
        if (validationOptions.indexOf("skipTrackNumberCheck") >= 0) {
            logger.info("Validate", "Skipping track number check for ", "[" + album.artist + "][" + album.title + "]");
            return;
        }

        var index = 1;
        var numberPrefixLength: number;
        album.tracks.forEach((track) => {
            this.logger.info("Validate", "[" + album.artist + "][" + album.title + "][" + track.title + "]");

            var match = /^(\d\d) /.exec(track.title);
            if (!match)
            {
                throw new Error("Failed validation of '" + track.path + "': title '" + track.title + "' should have a two digit prefix");
            }

            var trackNumber = parseInt(match[1]);
            if (trackNumber != index)
            {
                var suggestedSpecialHandler = "\"" + album.artist + " (as on disk!)\" : {\n" +
                                              "    \"" + album.title + "\" : {\n" +
                                              "        firstTrackNumber: " + trackNumber + ",\n" +
                                              "        fixTrackName: /(\\d+) " + track.title + "/\n" +
                                              "    }\n" +
                                              "}";
                throw new Error(track.title + ": Track number out of order, expected " + index + " but got " + trackNumber +
                                                "\nTemplate for special handler:\n" + suggestedSpecialHandler);
            }
            index++;
        });
    }

    private defaultValidateArtist(album: Album, logger: npmlog.NpmLog) : void
    {
        if (album.artist.indexOf(" ") !== -1)
        {
            throw new Error(album.tracks[0].path + ": Artist contains a space: \"" + album.artist + "\"");
        }
    }

    private validateTrackUniqueness(album: Album, validationOptions: string[])
    {
        if (validationOptions.indexOf("skipUniqueTrackNameCheck") >= 0) {
            this.logger.info("Validate", "Skipping track name uniqueness check for ", "[" + album.artist + "][" + album.title + "]");
            return;
        }

        var firstTrackName: string;
        album.tracks.forEach((track) => {
            if (firstTrackName && this.isTrackNameRedundant(firstTrackName, track.title)) {
                var suggestedSpecialHandler = "\"" + album.artist + " (as on disk!)\" : {\n" +
                                              "    \"" + album.title + "\" : {\n" +
                                              "        fixTrackName: /(\\d+) " + track.title + "/\n" +
                                              "    }\n" +
                                              "}";

                throw new Error(album.title + ": Album contains redundant track names '" + track.title + "'" +
                                              "\nTemplate for special handler:\n" + suggestedSpecialHandler);
            }
            if (!firstTrackName) {
                firstTrackName = track.title;
            }
        });
    }

    private isTrackNameRedundant(firstTrackName: string, secondTrackName: string) : boolean
    {
        var length = Math.min(firstTrackName.length, secondTrackName.length);
        var matches = 0;
        for (var i = 0; i < length; i++) {
            if (firstTrackName[i] == secondTrackName[i]) {
                matches += 1;
            }
        }
        return matches > 15;
    }
}
