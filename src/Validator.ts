/// <reference path = "../typings/auto.d.ts" />

import { Album } from "./Album";
import { AlbumTrack } from "./AlbumTrack";
import { ICustomFixerFactory } from "./ICustomFixerFactory";
import * as npmlog from "npmlog";

export class Validator
{
    public constructor(customFixerFactory: ICustomFixerFactory, logger: npmlog.NpmLog)
    {
        this.customFixerFactory = customFixerFactory;
        this.logger = logger;
    }

    private customFixerFactory: ICustomFixerFactory;
    private logger: npmlog.NpmLog;

    public validate(album: Album) : void
    {
        var rule = this.customFixerFactory.create(album);
        var validationOptions = (rule && rule.validation) || [];

        album.sortTracks();
        this.validateTracks(album, validationOptions);
        this.validateTrackUniqueness(album, validationOptions);
        this.defaultValidateArtist(album);
    }

    private validateTracks(album: Album, validationOptions: string[]) : void
    {
        if (validationOptions.indexOf("skipTrackNumberCheck") >= 0) {
            this.logger.info("Validate", "Skipping track number check for ", "[" + album.artist + "][" + album.title + "]");
            return;
        }

        var index = 1;
        var numberPrefixLength: number;
        album.tracks.forEach((track) => {
            this.logger.info("Validate", "[" + album.artist + "][" + album.title + "][" + track.trackNumber + " " + track.title + "]");

            if (track.trackNumber != index)
            {
                var trackNumber = track.trackNumber || "<undefined>"
                var suggestedSpecialHandler = "\"" + album.artist + " (as on disk!)\" : {\n" +
                                              "    \"" + album.title + "\" : {\n" +
                                              "        firstTrackNumber: " + trackNumber + ",\n" +
                                              "        fixTrackName: /(\\d+) " + track.title + "(.*)\\.mp3/\n" +
                                              "    }\n" +
                                              "}";
                throw new Error(track.title + ": Track number out of order, expected " + index + " but got " + trackNumber +
                                                "\nTemplate for special handler:\n" + suggestedSpecialHandler);
            }
            index++;
        });
    }

    private defaultValidateArtist(album: Album) : void
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
                                              "        fixTrackName: /(\\d+) " + track.title + "(.*)\\.mp3/\n" +
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
