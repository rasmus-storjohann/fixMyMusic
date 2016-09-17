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
            var validateTracks = this.getValidateTracks(album);
            var validateAlbum = this.getValidateAlbum(album);

            validateAlbum(album);
            validateTracks(album);
        });
    }

    private getValidateAlbum(album: Album)
    {
        var specialValidateAlbum = this.getAlbmuSpecialHandlerIfExists(album, (specialHandlers) => {
            return specialHandlers.validateAlbum;
        });
        return specialValidateAlbum || this.defaultvalidateAlbum;
    }

    private getValidateTracks(album: Album)
    {
        var specialValidateTracks = this.getAlbmuSpecialHandlerIfExists(album, (specialHandlers) => {
            return specialHandlers.validateTracks;
        });
        return specialValidateTracks || this.defaultValidateTracks;
    }

    private getAlbmuSpecialHandlerIfExists(album: Album, selectHandler)
    {
        var handlers = this.specialHandling.albumSpecialHandlers(album.artist, album.title);
        if (handlers)
        {
            return selectHandler(handlers);
        }
        return null;
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
