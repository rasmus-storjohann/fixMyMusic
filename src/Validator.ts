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

    public validate(albums: Album[]) : void
    {
        albums.forEach((album) => {
            var validateTracks = this.defaultValidateTracks;
            var validateAlbum = this.defaultvalidateAlbum;

            var specialHandlers = this.specialHandling.GetSpecialHandlers(album.artist, album.title);
            if (specialHandlers)
            {
                if (specialHandlers.validateTracks)
                {
                    validateTracks = specialHandlers.validateTracks;
                }
                if (specialHandlers.validateAlbum)
                {
                    validateAlbum = specialHandlers.validateAlbum;
                }
            }

            validateAlbum(album);
            validateTracks(album);
        });
    }

    private defaultvalidateAlbum(album: Album) : void
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
            if (!trackNumberAsString)
            {
                throw new Error(track.path + ": Could not assign a track number");
            }
            var trackNumber = parseInt(trackNumberAsString[1]);
            if (trackNumber != index)
            {
                throw new Error(track.path + ": Track number out of order, expected " + index);
            }
            index++;
        });
    }
}
