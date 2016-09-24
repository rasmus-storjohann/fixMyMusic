/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";

export interface SpecialHandler
{
    validateTracks: (album: Album) => void;
    fixArtist: (album: Album) => void;
    fixTrack: (track: AlbumTrack) => void;
}

export class SpecialHandling
{
    private handlers = {
        "JS Bach": {
            "BminorMass" : {
                validateTracks: this.validateTracksWithSubIndeces
            }
        },
        "Beady Belle": {
            fixArtist: this.keepArtistNameInCurrentOrder
        },
        "Beethoven": {
            "Eroica Variations E# op.35 [Gilels]": {
                fixTrack: function(track: AlbumTrack): void
                {
                    var match = /^(\d+)\. 15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*).mp3$/.exec(track.title);
                    if (!match) {
                        throw new Error("");
                    }
                    var trackNumber = parseInt(match[1]);
                    trackNumber = trackNumber - 8;
                    var numberAsString = ("0" + trackNumber).substr(-2);
                    track.title = numberAsString + " " + match[2];
                }
            }
        }
    };

    public getSpecialHandlers(artist: string, albumTitle: string)
    {
        var artistHandlers = this.handlers[artist];
        var albumHandlers = artistHandlers && artistHandlers[albumTitle];

        return {
            fixArtist : artistHandlers && artistHandlers.fixArtist,
            fixTrack: albumHandlers && albumHandlers.fixTrack,
            validateTracks : albumHandlers && albumHandlers.validateTracks
        };
    }

    private keepArtistNameInCurrentOrder(album: Album)
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
