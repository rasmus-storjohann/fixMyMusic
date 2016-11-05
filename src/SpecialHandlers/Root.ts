import * as BachJs from "./BachJS";

export function SpecialHandlers()
{
    return {
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
            },
            "Grande sonate op33 \"Les quatre âges\"" : {
                fixTrackName: /(\d+) Grande sonate, op\. 33 \"Les quatre âges\": [IV]+\. (.*)\.mp3/
            }
        },
        "Arild Andersen" : {
            "Sagn" : {
                fixTrackName: /(\d+) Sagn, (.*).mp3/
            }
        },
        "Bach JS": BachJs.SpecialHandlers(),
        "Bartok" : {
            "Concerto for Orchestra" : {
                fixTrackName: /(\d+) - Concerto for orchestra - (.*).mp3/
            },
            "Music for Strings, Percussion and Celesta" : {
                firstTrackNumber: 6,
                fixTrackName: /(\d+) - Music for Strings, Percussion and Celesta - (.*).mp3/
            }
        },
        "Beady Belle": {
            artistName: "Beady_Belle"
        },
        "Beatles" : {
            "Sgt. Pepper" : {
                validation : ["skipUniqueTrackNameCheck"]
            }
        },
        "Beethoven": {
            "Eroica Variations E# op.35 [Gilels]": {
                firstTrackNumber: 9,
                fixTrackName: /^(\d+)\. 15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*).mp3$/
            },
            "Mass in C Major" : {
                fixTrackName: /(\d+) Mass in C Major - (.*).mp3/
            },
            "CelloSonata1" : {
                fixTrackName: /(\d+) Sonata for Cello and Piano No. 1 in F major, Op. 5 No. 1: [IV]+\. (.*)\.mp3/
            },
            "CelloSonata2" : {
                firstTrackNumber: 3,
                fixTrackName: /(\d+) Sonata for Cello and Piano No. 2 in G minor, Op. 5 No. 2: [IV]+\. (.*)\.mp3/
            },
            "CelloSonata3" : {
                firstTrackNumber: 5,
                fixTrackName: /(\d+) Sonata for Cello and Piano No. 3 in A major, Op. 69: [IV]+\. (.*)\.mp3/
            },
            "CelloSonata4" : {
                fixTrackName: /(\d+) Cello Sonata 4 Op 102 No 1 - \d - (.*).mp3/
            },
            "CelloSonata5" : {
                firstTrackNumber: 3,
                fixTrackName: /(\d+) Cello Sonata 5 Op 102 No 2 - \d - (.*).mp3/
            },
            "Chorphantasie" : {
                // TODO check tracks on this, finale is not the last track!
                firstTrackNumber: 4,
                fixTrackName: /(\d+) .*(Adagio|Finale|Allegro).mp3/
            },
            "Diabelli[Demidenko]" : {
                firstTrackNumber: 3,
                fixTrackNameFunc: function(name: string, logger) : string {
                    var m = /(\d+) - Track \d+.mp3/.exec(name);
                    if (m) {
                        if (m[1] === "03") {
                            return "03 Theme.mp3";
                        }
                        return m[1] + " Variation.mp3"
                    }
                    throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
                },
            },
            "GroßeFuge[Lindsay]" : {
                firstTrackNumber: 6
            },
            // amadeus quartet?
            "GrosseFuge" : {
                firstTrackNumber: 7
            },
            "Leonore Overture no. 2" : {
                firstTrackNumber: 5
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
                firstTrackNumber: 6,
                fixTrackName: /(\d+) Coronation Mass - (.*).mp3/
            }
        },
        "Arnold Schönberg" : {
            "Erwartung[Boulez]" : {
                fixTrackName: /(\d+) - Erwartung, Scene \d+_ (.*).mp3/
            },
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
            "Phantasy[Gould-Menuhin] Op47" : {
                firstTrackNumber: 9,
                fixTrackName: /(\d+) - Schoenberg Phantasy Op47 - (.*).mp3/
            },
            "Piano Concerto" : {
                fixTrackName: /(\d+) - Concerto for Piano and Orchestra, Op. 42_ (.*).mp3/
            },
            // TODO fix duplication
            "PianoConc Op42" : {
                fixTrackName: /(\d+) Concerto for Piano and Orchestra, Op. 42_ (.*).mp3/
            },
            "Three Piano Pieces Op11" : {
                fixTrackName: /(\d+) Three Piano Pieces, Op. 11_ (.*).mp3/
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
    }
}
