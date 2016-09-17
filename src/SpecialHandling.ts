/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";

export interface SpecialHandler
{
    validateTracks?: (album: Album) => void;
}

export class SpecialHandling
{
    private handlers = {
        "Bach_JS" : {
            "BminorMass" : {
                validateTracks : this.validateTracksWithSubIndeces
            }
        }
    };

    public albumSpecialHandlers(artistName: string, albumTitle: string)
    {
        var handlersForArtist = this.handlers[artistName];
        if (handlersForArtist)
        {
            var handlersForAlbum = handlersForArtist[albumTitle];
            if (handlersForAlbum)
            {
                return handlersForAlbum;
            }
        }
        return null;
    }
    private validateTracksWithSubIndeces(album: Album)
    {
        var index = 1;
        var subIndex = 1;
        album.tracks.forEach((track) => {
            var numbers = /^(\d+)\-(\d+)/.exec(track.title);
            if (!numbers)
            {
                throw new Error(track.path + ": Could not assign a track number");
            }
            var parsedIndex = parseInt(numbers[1]);
            var parsedSubIndex = parseInt(numbers[2]);

            if (parsedIndex === index && parsedSubIndex === subIndex)
            {
                subIndex++;
            }
            else if (parsedIndex === index + 1 && parsedSubIndex === 1)
            {
                index++;
                subIndex = 2;
            }
            else
            {
                var id = "[{album.artist}][{album.title}][{track.title}]";
                throw new Error(id + ": Track number out of order, expected " + index + "-" + subIndex);
            }
        });
    }
}
