/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";
import { SpecialHandling, SpecialHandler } from "./SpecialHandling";

export class Validator
{
    public validate(album: Album, specialHandler: SpecialHandler) : void
    {
        var validateTracks = this.getValidateTracksFunction(specialHandler);
        validateTracks(album);

        var validateArtist = this.defaultValidateArtist;
        validateArtist(album);
    }

    private getValidateTracksFunction(specialHandler: SpecialHandler) : (album: Album) => void
    {
        if (specialHandler && specialHandler.validateTracks)
        {
            return specialHandler.validateTracks;
        }
        return this.defaultValidateTracks;
    }

    private defaultValidateArtist(album: Album) : void
    {
        if (album.artist.indexOf(" ") !== -1)
        {
            throw new Error(album.tracks[0].path + ": Artist contains a space: \"" + album.artist + "\"");
        }
    }

    private defaultValidateTracks(album: Album) : void
    {
        var index = 1;
        var numberPrefixLength: number;
        album.tracks.forEach((track) => {
            var trackNumberAsString = /^(\d+)/.exec(track.title);
            var id = "[" + album.artist + "][" + album.title + "][" + track.title + "]";
            if (!trackNumberAsString)
            {
                throw new Error(album.tracks[0].path + ": Failed validation, could not assign a track number");
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
