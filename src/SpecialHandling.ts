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
                fixTrack: this.buildFixTrack({
                    firstTrackNumber: 9,
                    nameFilter: /^(\d+)\. 15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*).mp3$/
                })
            }
        }
    };

    private buildFixTrack(specification)
    {
        var fixers = [];

        if (specification.nameFilter) {

            var fixTrackName = function(track: AlbumTrack) {
                var match = specification.nameFilter.exec(track.title);
                if (!match) {
                    throw new Error(track.title + ": Track name does not match fixer for nameFilter");
                }
                track.title = match[1] + " " + match[2];
            };

            fixers.push(fixTrackName);
        }

        if (specification.firstTrackNumber) {
            var fixTrackNumber = function(track: AlbumTrack) {
                var match = /^(\d+)(.*)$/.exec(track.title);
                if (!match) {
                    throw new Error(track.title + ": Track name does not have expected number prefix");
                }
                var trackNumber = parseInt(match[1]);
                trackNumber = trackNumber + 1 - specification.firstTrackNumber;
                var numberAsString = ("0" + trackNumber).substr(-2);
                track.title = numberAsString + match[2];
            };

            fixers.push(fixTrackNumber);
        }

        var applyAllFixers = function(track: AlbumTrack) {
            fixers.forEach((fixer) => {
                fixer(track);
            });
        }

        return applyAllFixers;
    }

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
