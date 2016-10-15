/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";
import { SpecialHandling, SpecialHandler } from "./SpecialHandling";
import * as npmlog from "npmlog";

export class Validator
{
    public constructor(logger: npmlog.NpmLog)
    {
        this.logger = logger;
    }

    private logger: npmlog.NpmLog;

    public validate(album: Album, specialHandler: SpecialHandler) : void
    {
        var validateTracks = this.getValidateTracksFunction(specialHandler);
        validateTracks(album, this.logger);

        var validateArtist = this.defaultValidateArtist;
        validateArtist(album, this.logger);
    }

    private getValidateTracksFunction(specialHandler: SpecialHandler) : (album: Album, logger: npmlog.NpmLog) => void
    {
        if (specialHandler && specialHandler.validateTracks)
        {
            return specialHandler.validateTracks;
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
        logger.info("Validate", "Album '" + album.artist + "': '" + album.title + "'");

        album.tracks.forEach((track) => {

            logger.info("Validate", "Track '" + track.title + "'");
            var trackNumberAsString = /^(\d+)/.exec(track.title);
            var id = "[" + album.artist + "][" + album.title + "][" + track.title + "]";
            if (!trackNumberAsString)
            {
                var message = "Failed validation of '" + track.path + "': title '" + track.title + "' has no number";
                logger.error("Validation", message);
                throw new Error(message);
            }
            var numberPrefix = trackNumberAsString[1];
            if (numberPrefixLength && numberPrefix.length !== numberPrefixLength)
            {
                throw new Error(album.tracks[0].path + ": Inconsistent numbering format");
            }
            numberPrefixLength = numberPrefix.length;
            var trackNumber = parseInt(numberPrefix);
            if (trackNumber != index)
            {
                var suggestedSpecialHandler = "\"" + album.artist + "\" : {\n" +
                                              "    \"" + album.title + "\" : {\n" +
                                              "        firstTrackNumber: " + trackNumber + ",\n" +
                                              "        fixTrackName: /" + track.title + "/\n" +
                                              "    }\n" +
                                              "}";
                throw new Error(id + ": Track number out of order, expected " + index + " but got " + trackNumber +
                                                "\nTemplate for special handler:\n" + suggestedSpecialHandler);
            }
            index++;
        });
    }
}
