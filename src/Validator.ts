/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";
import { SpecialHandling } from "./SpecialHandling";

export class Validator
{
    private specialHandling: SpecialHandling;

    constructor()
    {
        this.specialHandling = new SpecialHandling();
    }

    public validate(album: Album, specialHandlers) : void
    {
        var specialvalidateTracks = specialHandlers && specialHandlers.validateTracks;
        var validateTracks = specialvalidateTracks || this.defaultValidateTracks;
        validateTracks(album);

        var validateAlbum = this.defaultValidateAlbum;
        validateAlbum(album);
    }

    private defaultValidateAlbum(album: Album) : void
    {
        if (album.artist.indexOf(" ") !== -1)
        {
            throw new Error(album.artist + ": Artist contains a space");
        }
    }

    private defaultValidateTracks(album: Album) : void
    {
        var index = 1;
        album.tracks.forEach((track) => {
            var trackNumberAsString = /^(\d+)/.exec(track.title);
            var id = "[" + album.artist + "][" + album.title + "][" + track.title + "]";
            if (!trackNumberAsString)
            {
                throw new Error(id + ": Could not assign a track number");
            }
            var trackNumber = parseInt(trackNumberAsString[1]);
            if (trackNumber != index)
            {
                throw new Error(id + ": Track number out of order, expected " + index);
            }
            index++;
        });
    }
}
