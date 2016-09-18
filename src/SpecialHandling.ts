/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";

export interface SpecialHandler
{
    validateTracks?: (album: Album) => void;
}

export class SpecialHandling
{
    private handlers = {
        "Bach_JS": {
            "BminorMass" : {
                validateTracks: this.validateTracksWithSubIndeces
            }
        },
        "Beady_Belle": {
            fixArtist: this.justReplaceSpaceWith_
        }
    };

    public getSpecialHandlers(album: Album)
    {
        return null;
    }

    private justReplaceSpaceWith_(album: Album)
    {
        album.title = album.title.replace(/ /g, '_');
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
