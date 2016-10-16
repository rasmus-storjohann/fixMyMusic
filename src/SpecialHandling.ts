/// <reference path = "../typings/auto.d.ts" />

import { Album, AlbumTrack } from "./Album";
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
                fixTrackName: /(\d+) - Cello Suite No. 4 in E-flat major, BWV 1010_ [IVab]+\. (.*).mp3/
            },
            "CelloSuite5" : {
                firstTrackNumber: 15,
                fixTrackName: /(\d+) - Cello Suite No. 5 in C minor, BWV 1011_ [IVab]+\. (.*).mp3/
            },
            "CelloSuite6" : {
                firstTrackNumber: 15,
                fixTrackName: /(\d+) - Cello Suite No. 6 in D major, BWV 1012_ [IVab]+\. (.*).mp3/
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
            },
            "PianoConc1 BVW1052" : {
                fixTrackName: /(\d+) - Piano Concerto No.1 in D minor, BWV 1052 - \d+. (.*).mp3/
            },
            "PianoConc2 BVW1053" : {
                firstTrackNumber: 4,
                fixTrackName: /(\d+) - Piano Concerto No.2 in E major, BWV 1053 - \d+. (.*)\.mp3/
            },
            "PianoConc3 BWV1054" : {
                firstTrackNumber: 7,
                fixTrackName: /(\d+) - Piano Concerto No.3 in D major, BWV 1054 - \d+. (.*).mp3/
            },
            "PianoConc5 BWV1056" : {
                firstTrackNumber: 4,
                fixTrackName: /(\d+) - Piano Concerto No.5 in F minor, BWV 1056 - \d+. (.*).mp3/
            },
            "PianoConc7 BWV1058" : {
                firstTrackNumber: 7,
                fixTrackName: /(\d+) - Piano Concerto No.7 in G minor, BWV 1058 - \d+. (.*).mp3/
            },
            "PianoWorks[Gould]" : {
                firstTrackNumber: 8
            },
            "PianoPartita1 BWV825" : {
                fixTrackName: /(\d+) - Partita No.1 in G major, BWV 825_ [IV]+\. (.*).mp3/
            },
            "PianoPartita2 BWV826" : {
                firstTrackNumber: 7,
                fixTrackName: /(\d+) - Partita No.2 in C minor, BWV 826_ [IV]+. (.*).mp3/
            },
            "PianoPartita3 BWV827" : {
                firstTrackNumber: 13,
                fixTrackName: /(\d+) - Partita No.3 in C minor, BWV 827_ [IV]+. (.*).mp3/
            },
            "PianoPartita4 BWV828" : {
                firstTrackNumber: 20,
                fixTrackName: /(\d+) - Partita No.4 in D [Mm]ajor, BWV 828[_,\.] [IV]+. (.*).mp3/
            },
            "PianoPartita5 BWV829" : {
               firstTrackNumber: 27,
               fixTrackName: /(\d+) - Partita No.5 in G major, BWV 829[_\.] [IV]+\. (.*)\.mp3/
           },
           "ViolinConc[Stern] BWV 1042" : {
              firstTrackNumber: 4,
              fixTrackName: /(\d+) - Concerto for Violin and Orchestra in E major, BWV 1042_ [IV]+. (.*).mp3/
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
                    throw new Error(track.title + ": Track name does not match fixer for fixTrackName");
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
