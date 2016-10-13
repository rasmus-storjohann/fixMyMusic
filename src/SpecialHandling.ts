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
        "Adams_John" : {
            "Nixon1" : {
                fixTrackName: /Disc 1 - (\d+) - Act I Scene \d_ (.*).mp3/,
                fixNumberPrefixLength: 2
            },
            "Nixon2" : {
                fixTrackName: /Disc 2 - (\d+) - Act II Scene \d_ (.*).mp3/,
                fixNumberPrefixLength: 2
            },
            "Nixon3" : {
                fixTrackName: /Disc 3 - (\d+) - Act III Scene \d_ (.*).mp3/,
                fixNumberPrefixLength: 2
            }
        },
        "Albeniz" : {
            "Six pieces" : {
                firstTrackNumber: 6
            },
            "Suite Espanola" : {
                firstTrackNumber: 2,
                fixTrackName: /(\d+) Albeniz - Suite Espanola Opus 47 - (.*).mp3/
            }
        },
        "Alkan": {
            "Sonatine, Op. 61": {
                fixTrackName: /^\d+ Sonatine, Op. 61 (\d+)\. (.*).mp3$/
            }
        },
        "Bach JS": {
            "Brandenburg 1 [Pinnock]" : {
                fixTrackName: /Disc 1 - (\d+) - Concerto No\. 1 in F major, BWV 1046_ [IV]+\. (.*).mp3/
            },
            "Brandenburg 2 [Pinnock]" : {
                firstTrackNumber: 5,
                fixTrackName: /Disc 1 - (\d+) - Concerto No\. 2 in F major, BWV 1047_ [IV]+\. (.*).mp3/
            },
            "Brandenburg 3 [Karajan]" : {
                firstTrackNumber: 5,
                fixTrackName: /(\d+) - Brandenburg Concerto No\. 3 in G major, BWV 1048_ [IV]+\. (.*).mp3/
            },
            "Brandenburg 3 [Pinnock]" : {
                firstTrackNumber: 8,
                fixTrackName: /Disc 1 - (\d+) - Concerto No\. 3 in G major, BWV 1048_ [IV]+\. (.*).mp3/
            },
            "Brandenburg 4 [Karajan]" : {
                firstTrackNumber: 8,
                fixTrackName: /(\d+) - Brandenburg Concerto No\. 4 in G major, BWV 1049_ [IV]+\. (.*).mp3/
            },
            "Brandenburg 4 [Pinnock]" : {
                firstTrackNumber: 11,
                fixTrackName: /Disc 1 - (\d+) - Concerto No\. 4 in G major, BWV 1049_ [IV]+\. (.*).mp3/
            },
            "Brandenburg 5 [Karajan]" : {
                firstTrackNumber: 4,
                fixTrackName: /(\d+) - Concerto No. 5 in D Major_ l+\. (.*).mp3/
            },
            "Brandenburg 5 [Pinnock]" : {
                fixTrackName: /Disc 2 - (\d+) - Concerto No. 5, BWV 1050_ [IV]+\. (.*).mp3/
            },
            "Brandenburg 6 [Karajan]" : {
                firstTrackNumber: 7,
                fixTrackName: /(\d+) - Concerto No. 6 in B Flat Major_ l+\. (.*).mp3/
            },
            "Brandenburg 6 [Pinnock]" : {
                firstTrackNumber: 4,
                fixTrackName: /Disc 2 - (\d+) - Concerto No. 6, BWV 1051_ [IV]+\. (.*).mp3/
            },
            "Cantata BWV 51 Jauchzet" : {
                firstTrackNumber: 8,
                fixTrackName: /(\d+) - Cantata, BWV 51 - \d+\. (.*).mp3/
            },
            "Cantata Ein feste Burg" : {
                firstTrackNumber: 8,
                fixTrackName: /(\d+) - Cantata No. 80_ [IV]+\. (.*).mp3/
            },
            "Cantata Jesu meine Freunde BWV 227 " : {
                firstTrackNumber: 11,
                fixTrackName: /(\d+) - Jesu, meine Freunde, BW 227_ [IVX]+\.(.*).mp3/
            },
            "CelloSuite1" : {
                fixTrackName: /(\d+) - Cello Suite No. 1 in G major, BWV 1007_ [IVab]+\. (.*)\.mp3/
            },
            "CelloSuite2" : {
                fixTrackName: /(\d+) - Cello Suite No. 2 in D minor, BWV 1008_ [IVab]+\. (.*).mp3/
            },
            "CelloSuite3" : {
                firstTrackNumber: 8,
                fixTrackName: /(\d+) - Cello Suite No. 3 in C major, BWV 1009_ [IVab]+\. (.*).mp3/
            },
            "CelloSuite4" : {
                firstTrackNumber: 8,
                fixTrackName: /(\d)+ - Cello Suite No. 4 in E-flat major, BWV 1010_ [IVab]+\. (.*).mp3/
            },
            "Conc2Violins[Stern] BWV1043" : {
                firstTrackNumber: 7,
                fixTrackName: /(\d+) - Concerto for Two Violins and Orchestra in D minor, BWV 1043_ [IV]+. (.*).mp3/
            },
            "ConcOboeViolin[Stern] BWV 1060" : {
                firstTrackNumber: 10,
                fixTrackName: /(\d+) - Concerto for Oboe, Violin and Orchestra in C minor, BWV 1060_ [IV]+. (.*).mp3/
            },
            "Opfer" : {
                firstTrackNumber: 4,
                fixTrackName: /(\d+) - Musikalisches Opfer, BWV 1079_ (.*).mp3/
            },
            "Orchestral Suite 2 [Karajan]" : {
                firstTrackNumber: 11,
                fixTrackName: /(\d+) - Suite for Orchestra No. 2 in B minor, BWV 1067_ [IV]+. (.*).mp3/
            },
            "Orchestral Suite 3 [Karajan]" : {
                firstTrackNumber: 10,
                fixTrackName: /(\d+) - Orchestral Suite No. 3 in D Major_ [lV]+. (.*).mp3/
            },
            "Ouverture 1 [Pinnock]" : {
                firstTrackNumber: 7,
                fixTrackName: /Disc 2 - (\d+) - Ouverture No. 1, BWV 1066_ [IV]+\. (.*)\.mp3/
            },
            "Ouverture 2 [Pinnock]" : {
                fixTrackName: /Disc 3 - (\d+) - Ouverture No. 2, BWV 1067_ [IV]+\. (.*)\.mp3/
            },
            "Ouverture 3 [Pinnock]" : {
                firstTrackNumber: 8,
                fixTrackName: /Disc 3 - (\d+) - Ouverture No. 3, BWV 1068_ [IV]+\. (.*)\.mp3/
            },
            "Ouverture 4 [Pinnock]" : {
                firstTrackNumber: 13,
                fixTrackName: /Disc 3 - (\d+) - Ouverture No. 4, BWV 1069_ [IV]+\. (.*)\.mp3/
            }
        },
        "Beady Belle": {
            fixArtist: this.keepArtistNameInCurrentOrder
        },
        "Beethoven": {
            "Eroica Variations E# op.35 [Gilels]": {
                firstTrackNumber: 9,
                fixTrackName: /^(\d+)\. 15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*).mp3$/
            },
            "Mass in C Major" : {
                fixTrackName: /(\d+) Mass in C Major - (.*).mp3/
            },
            "Quintet Eb Op16 [Richter]" : {
                fixTrackName: /\d+ Quintet in E flat, Op. 16 - (\d+)\. (.*).mp3/
            },
            "ViolinSon 9 Kreutzer" : {
                firstTrackNumber: 5,
                fixTrackName: /^(\d+) Violinsonate No.9 A-dur op. 47 'Kreutzer' - (.*).mp3$/
            },
            "ViolinSon 10" : {
                firstTrackNumber: 8,
                fixTrackName: /^(\d+) Violinsonate No.10 G-dur op. 96 - (.*).mp3$/
            }
        },
        "Berg" : {
            "Wozzeck2" : {
                firstTrackNumber: 8
            }
        },
        "Mozart" : {
            "Coronation Mass [Markevitch]": {
                fixTrack: this.buildFixTrack({
                    firstTrackNumber: 6,
                    fixTrackName: /(\d+) Coronation Mass - (.*).mp3/
                })
            },
        }
    };

    private buildFixTrack(specification)
    {
        if (!specification)
        {
            return function(track: AlbumTrack) {
            }
        }

        var fixers = [];

        if (specification.fixTrackName) {
            var fixTrackName = function(track: AlbumTrack) {
                var match = specification.fixTrackName.exec(track.title);
                if (!match) {
                    throw new Error(track.title + ": Track name does not match fixer for fixTrackName");
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

        if (specification.fixNumberPrefixLength) {
            var fixTrackNumber = function(track: AlbumTrack) {
                var match = /^(\d+)(.*)$/.exec(track.title);
                if (!match) {
                    throw new Error(track.title + ": Track name does not have expected number prefix");
                }
                var numberAsString = match[1];
                if (numberAsString.length > specification.fixNumberPrefixLength) {
                    throw new Error(track.title + ": Track number is too long for the fix number prefix argument");
                }
                while (numberAsString.length < specification.fixNumberPrefixLength) {
                    numberAsString = "0" + numberAsString;
                }
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
            fixTrack: this.buildFixTrack(albumHandlers),
            validateTracks : albumHandlers && albumHandlers.validateTracks
        };
    }

    private keepArtistNameInCurrentOrder(album: Album)
    {
        album.artist = album.artist.replace(/ /g, '_');
    }
}
