/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";
import * as BachJs from "./SpecialHandlers/BachJS";
import * as npmlog from "npmlog";

export interface SpecialHandler
{
    validateTracks: (album: Album, logger: npmlog.NpmLog) => void;
    fixArtist: (album: Album, logger: npmlog.NpmLog) => void;
    fixTrack: (track: AlbumTrack, logger: npmlog.NpmLog) => void;
}

export class SpecialHandling
{
    public constructor(logger: npmlog.NpmLog)
    {
        this.logger = logger;
    }

    private logger: npmlog.NpmLog;

    private handlers = {
        "Adams_John" : {
            "Nixon1" : {
                fixTrackName: /(\d+) Act I Scene \d_ (.*).mp3/,
                fixNumberPrefixLength: 2
            },
            "Nixon2" : {
                fixTrackName: /(\d+) Act II Scene \d_ (.*).mp3/,
                fixNumberPrefixLength: 2
            },
            "Nixon3" : {
                fixTrackName: /(\d+) Act III Scene \d_ (.*).mp3/,
                fixNumberPrefixLength: 2
            }
        },
        "Albeniz" : {
            "Cordoba" : {
                firstTrackNumber: 6
            },
            "Six pieces" : {
                firstTrackNumber: 6
            },
            "Suite Espanola" : {
                firstTrackNumber: 2
            }
        },
        "Alkan": {
            "Sonatine, Op. 61": {
                fixTrackName: /^\d+ Sonatine, Op. 61 (\d+)\. (.*).mp3$/
            },
            "Barcarolle" : {
                firstTrackNumber: 9
            },
            "Le festin d'Esope" : {
                firstTrackNumber: 10,
                fixTrackName: /(\d+) (.*), op. 39 no. 12.mp3/
            },
            "Sonatine" : {
                firstTrackNumber: 5,
                fixTrackName: /(\d+) Sonatine, op. 61: [IV]+. (.*).mp3/
            }
        },
        "Bach JS": BachJs.SpecialHandlers(),
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
        },
        "Arnold Schönberg" : {
            "Five Piano Pieces Op23" : {
                firstTrackNumber: 4,
                fixTrackName: /(\d+) Five Piano Pieces, Op. 23_ (.*).mp3/
            },
            "Lied der Waldtaube[Boulez]" : {
                firstTrackNumber: 30,
                fixTrackName: /(\d+) - (.*) \(Chamber Orchestra version\) .*.mp3/
            },
            "Ode to Napoleon Buonaparte" : {
                firstTrackNumber: 7,
                fixTrackName: /(\d+) (Ode to Napoleon Buonaparte), Op. 41.mp3/
            },
            "Phantasy for Violin and Piano Accompaniment" : {
                firstTrackNumber: 5,
                fixTrackName: /(\d+) Phantasy for Violin and Piano Accompaniment, Op. 47_ (.*)\.mp3/
            },
            "Pierrot Lunaire[Boulez]" : {
                firstTrackNumber: 9,
                fixTrackName: /(\d+) - Pierrot Lunaire, Part I+_ (.*) \(.*\)\.mp3/
            },
            "Six Little Piano Pieces Op19" : {
                firstTrackNumber: 9,
                fixTrackName: /(\d+) Six Little Piano Pieces, Op. 19_ (.*).mp3/
            },
            "Suite for Piano Op25" : {
                firstTrackNumber: 15,
                fixTrackName: /(\d+) Suite for Piano, Op. 25_ (.*).mp3/
            },
            "Three Pieces for Orchestra" : {
                firstTrackNumber: 7,
                fixTrackName: /(\d+) - Three Pieces for Orchestra, \d. (.*).mp3/
            },
            "Two Piano Pieces Op33" : {
                firstTrackNumber: 20,
                fixTrackName: /(\d+) Two Piano Pieces, Op. 33- A & B_ (.*).mp3/
            }
        }
    };

    private buildFixTrack(specification)
    {
        if (!specification)
        {
            return function(track: AlbumTrack, logger: npmlog.NpmLog) {
            }
        }

        var fixers = [];

        if (specification.fixTrackName) {
            var fixTrackName = function(track: AlbumTrack, logger: npmlog.NpmLog) {
                var match = specification.fixTrackName.exec(track.title);
                if (!match) {
                    throw new Error("'" + track.title + "': Track name does not match fixer for fixTrackName: /" + specification.fixTrackName + "/");
                }
                var newTitle = match[1] + " " + match[2];
                logger.silly("SpecialFixTrackName", track.title  + ": Extracting track name '" + newTitle + "'");
                track.title = newTitle;
            };

            fixers.push(fixTrackName);
        }

        if (specification.firstTrackNumber) {
            var fixTrackNumber = function(track: AlbumTrack, logger: npmlog.NpmLog) {
                var match = /^(\d+)(.*)$/.exec(track.title);
                if (!match) {
                    throw new Error(track.title + ": Track name does not have expected number prefix");
                }
                var trackNumber = parseInt(match[1]);
                logger.silly("SpecialFixTrackNumber", track.title  + ": Adjusting current track number of " + trackNumber + " with first track number " + specification.firstTrackNumber);
                trackNumber = trackNumber + 1 - specification.firstTrackNumber;
                if (trackNumber <= 0)
                {
                    throw new Error(track.title + ": fixing track number gave negative result of " + trackNumber);
                }
                var numberAsString = ("0" + trackNumber).substr(-2);
                var newTitle = numberAsString + match[2];
                if (track.title != newTitle)
                {
                    track.title = newTitle;
                    logger.verbose("SpecialFixTrackNumber", track.path  + ": Fixed track number to '" + track.title + "'")
                }
            };

            fixers.push(fixTrackNumber);
        }

        if (specification.fixNumberPrefixLength) {
            var fixTrackNumber = function(track: AlbumTrack, logger: npmlog.NpmLog) {
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

        var applyAllFixers = function(track: AlbumTrack, logger: npmlog.NpmLog) {
            fixers.forEach((fixer) => {
                fixer(track, logger);
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
