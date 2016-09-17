/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";

export interface SpecialHandler
{
    validateTracks?: (album: Album) => void;
}

export class SpecialHandling
{
    private configuration = {
        "Bach_JS" : {
            "BminorMass" : {
                validateTracks : function(album: Album) : void
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
                            throw new Error(track.path + ": Track number out of order, expected " + index);
                        }
                    });
                }
            }
        }
    };

    public GetSpecialHandlers(artistName: string, albumTitle: string)
    {
        var artist = this.configuration[artistName];
        if (artist)
        {
            var album = artist[albumTitle];
            if (album)
            {
                return album;
            }
        }
        return null;
    }
}
