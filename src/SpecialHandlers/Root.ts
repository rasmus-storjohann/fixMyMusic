import { Format, cantata, quartet, symphony, sonata } from "../AlbumFormat";
import * as BachJs from "./BachJS";
import * as Beethoven from "./Beethoven";

// TODO rename Main

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
            },
            "Lulu Suite" : {
                firstTrackNumber: 10,
                fixTrackName: /(\d+) - _Lulu_ Suite, \d+\. (.*)\.mp3/
            },
            // TODO remove _ in track names
            "Lulu2" : {
                fixTrackName: /(\d+) - Lulu_ Akt II, Szene I+\. (.*)\.mp3/
            },
            "Lulu3" : {
                fixTrackName: /(\d+) - Lulu_ Akt III, Szene I+\. (.*)\.mp3/
            },
            "ViolinConcerto" : {
                fixTrackName: /(\d+) - Violinkonzert_ [IV]+\. (.*)\.mp3/
            },
            "Wozzeck1" : {
                fixTrackNameFunc: function(name: string, logger) : string {
                    if (name === "01 - Wozzeck - Act One - Scene 1 - Langsam, Wozzeck, langsam!.mp3") {
                        return "01 Langsam, Wozzeck, langsam!.mp3";
                    }
                    var m = /(\d+) - Scene \d- (.*\.mp3)/.exec(name);
                    if (!m) {
                        m = /(\d+) - (.*\.mp3)/.exec(name);
                    }
                    return m[1] + " " + m[2];
                }
            }
        },
        "Brahms" : {
            "Drei Gesänge" : {
                fixTrackName: /(\d+) - Drei Gesänge-I+\. (.*)\.mp3/
            },
            "Fünf Gesänge" : {
                firstTrackNumber: 15,
                fixTrackName: /(\d+) - Fünf Gesänge-[IV]+\. (.*)\.mp3/
            },
            "In stiller Nacht" : {
                firstTrackNumber: 20,
                fixTrackName: /(\d+) - (.*)\.mp3/
            },
            "Sieben Lieder" : {
                firstTrackNumber: 8,
                fixTrackName: /(\d+) - Sieben Lieder-[IV]+\. (.*)\.mp3/
            },
            "Symph 1 c Op.68" : {
               fixTrackName: /(\d+) Symphony No. 1 in C minor, Op. 68_ [IV]+\. (.*)\.mp3/
            },
            "Symph 2 D Op.73" : {
                fixTrackName: /(\d+) - Symphony No. 2 in D major, Op. 73_ [IV]+\. (.*)\.mp3/
            },
            "Symph 3 F Op.90" : {
                firstTrackNumber: 5,
                fixTrackName: /(\d+) Symphony No. 3 in F major, Op. 90_ [IV]+\. (.*)\.mp3/
            },
            "Symph 4 e Op.98" : {
                firstTrackNumber: 5,
                fixTrackName: /(\d+) - Symphony No. 4 in E minor, Op. 98_ [IV]+\. (.*)\.mp3/
            },
            "Vier Gesänge" : {
                firstTrackNumber: 4,
                fixTrackName: /(\d+) - Vier Gesänge-[IV]+\. (.*)\.mp3/
            },
            "ViolConc D Op.77" : {
                fixTrackName: /(\d+) - Konzert für Violine und Orchester D-Dur, Op. 77_ [IV]+\. (.*).mp3/
            },
            "ViolSon 1 G Op.78" : {
                firstTrackNumber: 4,
                fixTrackName: /(\d+) - Sonata for Violin and Piano No. 1 in G major, Op. 78_ [IV]+\. (.*)\.mp3/
            },
            "ViolSon 2 A Op.100" : {
                fixTrackName: /(\d+) - Sonata for Violin and Piano No. 2 in A major, Op. 100_ [IV]+\. (.*)\.mp3/
            },
            "ViolSon 3 d Op.108" : {
               firstTrackNumber: 7,
               fixTrackName: /(\d+) - Sonata for Violin and Piano No. 3 in D minor, Op. 108_ [IV]+\. (.*).mp3/
           }
        },
        "Britten" : {
            "The Turn of the Screw 1" : {
                fixTrackNameFunc: function(name: string, logger) : string {
                    if (name === "01 - Act 1- Prologue.mp3") {
                        return "01 Prologue.mp3";
                    }
                    if (name === "02 - Theme - Scene 1_ The Journey.mp3") {
                        return "02 The Journey.mp3";
                    }
                    var m = /(\d+) - Variation [IVX]+ - Scene \d+_ (.*)\.mp3/.exec(name);
                    if (!m) {
                        throw new Error("");
                    }
                    return m[1] + " " + m[2];
                }
            },
            "The Turn of the Screw 2" : {
                fixTrackName: /(\d+) - The Turn of the Screw_ Act II, Variation [IVX]+ - Act II, Scene \d+_ (.*)\.mp3/
            },
            "Violin Concerto" : {
                fixTrackName: /(\d+) - Violin Concerto Op\.15 \-I+\- (.*)\.mp3/
            },
            "Young Person's Guide to the Orchestra" : {
                firstTrackNumber: 23,
                fixTrackName: /(\d+) - Young Person's Guide to the Orchestra, Op. 34_ [IVX]+\. (.*)\.mp3/
            }
        },
        "Bruch" : {
            "Scottish Fantasy" : {
                firstTrackNumber: 4,
                fixTrackName: /(\d+) - Scottish Fantasy (.*).mp3/
            },
            "Violin Conc 1" : {
                fixTrackName: /(\d+) - Concerto No.1 (.*)\.mp3/
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
        },
        "Camarón" : {
            "Te Lo Dice Camarón" : {
                fixTrackName: /(\d+) - Camarón - (.*)\.mp3/
            }
        },
        "Corelli" : {
            "Conc 1 D" : {
                fixTrackName: /(\d+) - Concerto No.1 in D major [IV]+\.(.*)\.mp3/
            },
            "Conc 2 F" : {
                firstTrackNumber: 8,
                fixTrackName: /(\d+) - Concerto No.2 in F -[IV]+- (.*)\.mp3/
            },
            "Conc 3 c" : {
                firstTrackNumber: 12,
                fixTrackName: /(\d+) - Concerto No.3 in C minor -[IV]+- (.*)\.mp3/
            },
            "Conc 4 D" : {
                firstTrackNumber: 17,
                fixTrackName: /(\d+) - Concerto No.4 in D -[IV]+- (.*).mp3/
            },
            "Conc 5 B flat" : {
                firstTrackNumber: 21,
                fixTrackName: /(\d+) - Concerto #5 in B Flat [IV]+\. (.*).mp3/
            },
            "Conc 6 F" : {
                firstTrackNumber: 25,
                fixTrackName: /(\d+) - Concerto No.6 in F -[IV]+- (.*)\.mp3/
            }
        },
        "Couperin" : {
            "Two organ pieces" : {
                firstTrackNumber: 6
            }
        },
        "CPE Bach" : {
            "Sonata Wq78" : {
                firstTrackNumber: 14,
                fixTrackName: /(\d+) - CPE Bach - Sonata Wq78 - (.*).mp3/
            }
        } // Artist
    }  // return
} // Create()
