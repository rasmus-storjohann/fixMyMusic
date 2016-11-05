import * as BachJs from "./BachJS";
import * as Beethoven from "./Beethoven";

export function Create()
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
        "Bach JS": BachJs.Create(),
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
        "Beethoven": Beethoven.Create(),
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
