/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";

export class SpecialHandling
{
    private handlers = {
        "JS Bach": {
            "BminorMass" : {
                validateTracks: this.validateTracksWithSubIndeces
            }
        },
        "Beady Belle": {
            fixArtist: this.justReplaceSpaceWith_
        }
    };

    public getSpecialHandlers(artist: string, albumTitle: string)
    {
        var artistHandlers = this.handlers[artist];
        var albumHandlers = artistHandlers && artistHandlers[albumTitle];

        return {
            fixArtist : artistHandlers && artistHandlers.fixArtist,
            validateTracks : albumHandlers && albumHandlers.validateTracks
        };
    }

    private justReplaceSpaceWith_(album: Album)
    {
        album.artist = album.artist.replace(/ /g, '_');
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
