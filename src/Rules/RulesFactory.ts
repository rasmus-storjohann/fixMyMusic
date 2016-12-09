import { Format, cantata, concerto, concerto_grosso, quartet, symphony, sonata } from "../AlbumFormat";

import * as BachJs from "./BachJS";
import * as Beethoven from "./Beethoven";

var rules = {
    "Aaron Copland" : {
        "AppalachianSpring" : {
            fixTrackName: /Appalachian Spring \(Ballet for Martha\): (.*)\.mp3/
        },
        "ClarinetConcerto" : {
            fixAlbumTitle: concerto({for:"Clarinet"}),
            fixTrackName: /Concerto for Clarinet and String Orchestra, [IV]+\. (.*)\.mp3/
        },
        "DancePanels" : {
            firstTrackNumber: 10,
            fixTrackName: /Dance Panels, [IV]+\. (.*)\.mp3/
        },
        "FallRiverLegend" : {
            firstTrackNumber: 12,
            fixTrackName: /Fall River Legend: (.*)\.mp3/
        },
        "FourPieces" : {
            fixAlbumTitle: "Four Pieces",
            fixTrackName: /(.*)\.mp3/,
            validation : ["skipTrackNumberCheck"]
        },
        "MusicForTheTheatre" : {
            firstTrackNumber: 4,
            fixTrackName: /Music for the Theatre: (.*)\.mp3/
        },
        "Symph3" : {
            fixTrackName: /Symphony No. 3: [IV]+\. (.*)\.mp3/
        },
        "Symphonette" : {
            firstTrackNumber: 18,
            fixTrackName: /Latin-American Symphonette: [IV]+\. (.*)\.mp3/
        },
        "TenderLand" : {
            firstTrackNumber: 9,
            fixTrackName: /The Tender Land Suite: (.*)\.mp3/
        }
    },
    "Adams_John" : {
        "Nixon1" : {
            fixTrackName: /Act I Scene \d (.*).mp3/,
            fixNumberPrefixLength: 2
        },
        "Nixon2" : {
            fixTrackName: /Act II Scene \d (.*).mp3/,
            fixNumberPrefixLength: 2
        },
        "Nixon3" : {
            fixTrackName: /Act III Scene \d (.*).mp3/,
            fixNumberPrefixLength: 2
        }
    },
    "Albeniz" : {
        "Cantos de España" : {
            fixTrackName: /Cantos de España: \d+\. (.*)\.mp3/
        },
        "Six Pieces" : {
            firstTrackNumber: 6
        },
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
            fixTrackName: /(.*), op. 39 no. 12.mp3/
        },
        "Sonatine" : {
            firstTrackNumber: 5,
            fixTrackName: /Sonatine, op. 61: [IV]+. (.*).mp3/
        },
        "Grande sonate op33 \"Les quatre âges\"" : {
            fixTrackName: /Grande sonate, op\. 33 \"Les quatre âges\": [IV]+\. (.*)\.mp3/
        }
    },
    "Arild Andersen" : {
        "Sagn" : {
            fixTrackName: /Sagn, (.*).mp3/
        }
    },
    "Bach JS": BachJs.Create(),
    "Barber" : {
        "ViolinConc[Ehnes]" : {
            firstTrackNumber: 4,
            fixTrackName: /- Barber - Concerto for Violin and Orchestra, Op. 14 - [IV]+ - (.*).mp3/
        }
    },
    "Bartok" : {
        "Concerto for Orchestra" : {
            fixTrackName: /- Concerto for orchestra - (.*).mp3/
        },
        "Music for Strings, Percussion and Celesta" : {
            firstTrackNumber: 6,
            fixTrackName: /- Music for Strings, Percussion and Celesta - (.*).mp3/
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
        "Lulu Suite" : {
            firstTrackNumber: 10,
            fixTrackName: /- Lulu Suite, \d+\. (.*)\.mp3/
        },
        "Lulu2" : {
            fixTrackName: /- Lulu Akt II, Szene I+\. (.*)\.mp3/
        },
        "Lulu3" : {
            fixTrackName: /- Lulu Akt III, Szene I+\. (.*)\.mp3/
        },
        "ViolinConcerto" : {
            fixTrackName: /- Violinkonzert [IV]+\. (.*)\.mp3/
        },
        "Three pieces for orchestra" : {
            firstTrackNumber: 7,
            fixTrackName: /- Alban Berg - 3 pieces for orchestra - (.*)\.mp3/
        },
        "Wozzeck1" : {
            fixTrackNameFunc: function(name: string, logger) : string {
                if (name === "- Wozzeck - Act One - Scene 1 - Langsam, Wozzeck, langsam!.mp3") {
                    return "Langsam, Wozzeck, langsam!.mp3";
                }
                var m = /- Scene \d- (.*\.mp3)/.exec(name);
                if (!m) {
                    m = /- (.*\.mp3)/.exec(name);
                }
                return m[1];
            }
        },
        "Wozzeck2" : {
            firstTrackNumber: 8
        }
    },
    "Brahms" : {
        "Drei Gesänge" : {
            fixTrackName: /- Drei Gesänge-I+\. (.*)\.mp3/
        },
        "Fünf Gesänge" : {
            firstTrackNumber: 15,
            fixTrackName: /- Fünf Gesänge-[IV]+\. (.*)\.mp3/
        },
        "In stiller Nacht" : {
            firstTrackNumber: 20,
            fixTrackName: /- (.*)\.mp3/
        },
        "Sieben Lieder" : {
            firstTrackNumber: 8,
            fixTrackName: /- Sieben Lieder-[IV]+\. (.*)\.mp3/
        },
        "Symph 1 c Op.68" : {
            fixAlbumTitle: symphony({ num: 1, minor: "C", op: 68, by: "Karajan"}),
            fixTrackName: /Symphony No. 1 in C minor, Op. 68 [IV]+\. (.*)\.mp3/
        },
        "Symph 2 D Op.73" : {
            fixAlbumTitle: symphony({ num: 2, major: "D", op: 73, by: "Karajan"}),
            fixTrackName: /- Symphony No. 2 in D major, Op. 73 [IV]+\. (.*)\.mp3/
        },
        "Symph 3 F Op.90" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num: 3, major: "F", op: 90, by: "Karajan"}),
            fixTrackName: /Symphony No. 3 in F major, Op. 90 [IV]+\. (.*)\.mp3/
        },
        "Symph 4 e Op.98" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num: 4, minor: "e", op: 98, by: "Karajan"}),
            fixTrackName: /- Symphony No. 4 in E minor, Op. 98 [IV]+\. (.*)\.mp3/
        },
        "Vier Gesänge" : {
            firstTrackNumber: 4,
            fixTrackName: /- Vier Gesänge-[IV]+\. (.*)\.mp3/
        },
        "ViolConc D Op.77" : {
            fixAlbumTitle: concerto({ for:"Violinn", major: "D", op: 77}),
            fixTrackName: /- Konzert für Violine und Orchester D-Dur, Op. 77 [IV]+\. (.*).mp3/
        },
        "ViolSon 1 G Op.78" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ for:"Violin", num: 1, major: "G", op: 78}),
            fixTrackName: /- Sonata for Violin and Piano No. 1 in G major, Op. 78 [IV]+\. (.*)\.mp3/
        },
        "ViolSon 2 A Op.100" : {
            fixAlbumTitle: sonata({ for:"Violin", num: 2, major: "a", op: 100}),
            fixTrackName: /- Sonata for Violin and Piano No. 2 in A major, Op. 100 [IV]+\. (.*)\.mp3/
        },
        "ViolSon 3 d Op.108" : {
           firstTrackNumber: 7,
           fixAlbumTitle: sonata({ for:"Violin", num: 3, minor: "d", op: 108}),
           fixTrackName: /- Sonata for Violin and Piano No. 3 in D minor, Op. 108 [IV]+\. (.*).mp3/
       }
    },
    "Britten" : {
        "The Turn of the Screw 1" : {
            fixTrackNameFunc: function(name: string, logger) : string {
                if (name === "- Act 1- Prologue.mp3") {
                    return "Prologue.mp3";
                }
                if (name === "- Theme - Scene 1 The Journey.mp3") {
                    return "The Journey.mp3";
                }
                var m = /- Variation [IVX]+ - Scene \d+ (.*)\.mp3/.exec(name);
                if (!m) {
                    throw new Error("");
                }
                return m[1];
            }
        },
        "The Turn of the Screw 2" : {
            fixTrackName: /- The Turn of the Screw Act II, Variation [IVX]+ - Act II, Scene \d+ (.*)\.mp3/
        },
        "Violin Concerto" : {
            fixTrackName: /- Violin Concerto Op\.15 \-I+\- (.*)\.mp3/
        },
        "Young Person's Guide to the Orchestra" : {
            firstTrackNumber: 23,
            fixTrackName: /- Young Person's Guide to the Orchestra, Op. 34 [IVX]+\. (.*)\.mp3/
        }
    },
    "Bruch" : {
        "Scottish Fantasy" : {
            firstTrackNumber: 4,
            fixTrackName: /- Scottish Fantasy (.*).mp3/
        },
        "Violin Conc 1" : {
            fixTrackName: /- Concerto No.1 (.*)\.mp3/
        }
    },
    "Frédéric Chopin" : {
        "Ballades & Etudes" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "CelloSonata" : {
            firstTrackNumber: 7,
            fixTrackName: /Cello Sonata in G minor, op. 65: [IV]+\. (.*) \(cello: Mstislav Rostropovich, piano: Martha Argerich\).mp3/
        },
        "Mazurkas" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Misc" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Nocturnes[Pires]" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "PianoConc1" : {
           fixTrackName: /Concerto for Piano and Orchestra no. 1 in E minor, op. 11: [IV]+\. (.*)\.mp3/
       },
       "PianoConc2" : {
           firstTrackNumber: 4,
           fixTrackName: /Concerto for Piano and Orchestra no. 2 in F minor, op. 21: [IV]+\. (.*)\.mp3/
       },
       "PianoTrio" : {
           fixTrackName: /Piano Trio in G minor, op. 8: [IV]+\. (.*) \(Beaux Arts Trio\).mp3/
       },
       "Polonaises" : {
           validation : ["skipUniqueTrackNameCheck"]
       },
       "Preludes, Impromptus & Scherzoz" : {
           validation : ["skipUniqueTrackNameCheck"]
       },
       "Sonata1" : {
           fixTrackName: /Piano Sonata no. 1 in C minor, op. 4: [IV]+\. (.*) \(feat. piano: Lilya Zilberstein\)\.mp3/
       },
       "Sonata2" : {
           firstTrackNumber: 5,
           fixTrackName: /Piano Sonata no. 2 in B-flat minor, op. 35: [IV]+\. (.*) \(feat. piano: Maurizio Pollini\)\.mp3/
       },
       "Sonata3" : {
           firstTrackNumber: 9,
           fixTrackName: /Piano Sonata no. 3 in B minor, op. 58: [IV]+\. (.*) \(feat. piano: Maurizio Pollini\).mp3/
       },
       "Waltzes[Ashkenazy]" : {
           validation : ["skipUniqueTrackNameCheck"]
        },
    },
    "Donizetti" : {
        "Lucia1" : {
            fixTrackName: /Lucia di Lammermoor (.*)\.mp3/
        },
        "Lucia2" : {
            fixTrackName: /Lucia di Lammermoor (.*)\.mp3/
        }
    },
    "Dvorak" : {
        "Symph7" : {
            fixTrackName: /Dvorak- Sym#7- [IV]+\.(.*).mp3/
        }
    },
    "Elgar" : {
        "Cello" : {
            fixAlbumTitle: concerto({ for: "Cello", op:85, minor : "E" }),
            fixTrackName: /- Cello Concerto in E minor, Op. 85 [IV]+\. (.*)\.mp3/
        }
    },
    "Erik Satie" : {
        "3 Gymnopédies etc [Pascal Rogé]" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "E.S.T." : {
        "Tuesday Wonderland" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Furtwangler" : {
        "Adagio" : {
            firstTrackNumber: 5,
            fixTrackName: /- Furtwangler - (Adagio solemne).mp3/
        }
    },
    "George Gershwin" : {
        "PianoConc" : {
            fixTrackName: /- Gershwin - Concerto for Piano and Orchestra in F - [IV]+\. (.*)\.mp3/
        }
    },
    "Glen Gould" : {
        "Byrd-Gibbons-Sweelinck" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Granados" : {
        "Pieces" : {
            firstTrackNumber: 7
        }
    },
    "Grigny" : {
        "Two organ pieces" : {
            firstTrackNumber: 4,
            fixTrackName: /- Grigny - (.*)\.mp3/
        }
    },
    "Mozart" : {
        "Coronation Mass [Markevitch]": {
            firstTrackNumber: 6,
            fixTrackName: /Coronation Mass - (.*).mp3/
        }
    },
    "Arnold Schönberg" : {
        "Erwartung[Boulez]" : {
            fixTrackName: /- Erwartung, Scene \d+ (.*).mp3/
        },
        "Five Piano Pieces Op23" : {
            firstTrackNumber: 4,
            fixTrackName: /Five Piano Pieces, Op. 23 (.*).mp3/
        },
        "Five pieces for orchestra" : {
            fixTrackName: /- Schoenberg - 5 pieces for orchestra Op 16 - (.*)\.mp3/
        },
        "Lied der Waldtaube[Boulez]" : {
            firstTrackNumber: 30,
            fixTrackName: /- (.*) \(Chamber Orchestra version\) .*.mp3/
        },
        "Ode to Napoleon Buonaparte" : {
            firstTrackNumber: 7,
            fixTrackName: /(Ode to Napoleon Buonaparte), Op. 41.mp3/
        },
        "Phantasy[Gould-Menuhin] Op47" : {
            firstTrackNumber: 9,
            fixTrackName: /- Schoenberg Phantasy Op47 - (.*).mp3/
        },
        "Piano Concerto" : {
            fixTrackName: /- Concerto for Piano and Orchestra, Op. 42 (.*).mp3/
        },
        // TODO fix duplication
        "PianoConc Op42" : {
            fixTrackName: /Concerto for Piano and Orchestra, Op. 42 (.*).mp3/
        },
        "Three Piano Pieces Op11" : {
            fixTrackName: /Three Piano Pieces, Op. 11 (.*).mp3/
        },
        "Pierrot Lunaire[Boulez]" : {
            firstTrackNumber: 9,
            fixTrackName: /- Pierrot Lunaire, Part I+ (.*) \(.*\)\.mp3/
        },
        "Six Little Piano Pieces Op19" : {
            firstTrackNumber: 9,
            fixTrackName: /Six Little Piano Pieces, Op. 19 (.*).mp3/
        },
        "Suite for Piano Op25" : {
            firstTrackNumber: 15,
            fixTrackName: /Suite for Piano, Op. 25 (.*).mp3/
        },
        "Three Pieces for Orchestra" : {
            firstTrackNumber: 7,
            fixTrackName: /- Three Pieces for Orchestra, \d. (.*).mp3/
        },
        "Two Piano Pieces Op33" : {
            firstTrackNumber: 20,
            fixTrackName: /Two Piano Pieces, Op. 33- A & B (.*).mp3/
        }
    },
    "Camarón" : {
        "Te Lo Dice Camarón" : {
            fixTrackName: /- Camarón - (.*)\.mp3/
        }
    },
    "Corelli" : {
        "Conc 1 D" : {
            fixAlbumTitle: concerto({num: 1, major:"D", op:[6,1]}),
            fixTrackName: /- Concerto No.1 in D major [IV]+\.(.*)\.mp3/
        },
        "Conc 2 F" : {
            firstTrackNumber: 8,
            fixAlbumTitle: concerto({num: 2, major:"F", op:[6,2]}),
            fixTrackName: /- Concerto No.2 in F -[IV]+- (.*)\.mp3/
        },
        "Conc 3 c" : {
            firstTrackNumber: 12,
            fixAlbumTitle: concerto({num: 3, minor:"C", op:[6,3]}),
            fixTrackName: /- Concerto No.3 in C minor -[IV]+- (.*)\.mp3/
        },
        "Conc 4 D" : {
            firstTrackNumber: 17,
            fixAlbumTitle: concerto({num: 4, major:"D", op:[6,4]}),
            fixTrackName: /- Concerto No.4 in D -[IV]+- (.*).mp3/
        },
        "Conc 5 B flat" : {
            firstTrackNumber: 21,
            fixAlbumTitle: concerto({num: 5, major:"Bb", op:[6,5]}),
            fixTrackName: /- Concerto #5 in B Flat [IV]+\. (.*).mp3/
        },
        "Conc 6 F" : {
            firstTrackNumber: 25,
            fixAlbumTitle: concerto({num: 6, major:"F", op:[6,6]}),
            fixTrackName: /- Concerto No.6 in F -[IV]+- (.*)\.mp3/
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
            fixTrackName: /- CPE Bach - Sonata Wq78 - (.*)\.mp3/
        }
    },
    "Handel" : {
        "ConcertoInC" : {
            fixAlbumTitle: concerto_grosso({major:"C"}),
            fixTrackName: /Concerto Grosso in C - \d+\.? (.*)\.mp3/
        },
        "ConcertoOp3-1" : {
            fixAlbumTitle: concerto_grosso({major:"Bb", op:[3,1]}),
            firstTrackNumber: 9,
            fixTrackName: /Concerto Grosso Op. 3 No.1 in B flat - \d+ (.*)\.mp3/
        },
        "ConcertoOp3-3" : {
            fixAlbumTitle: concerto_grosso({major:"G", op:[3,3]}),
            firstTrackNumber: 5,
            fixTrackName: /Concerto Grosso Op. 3 No.3 in G - \d+ (.*)\.mp3/
        },
        "ConcertoOp3-6" : {
            fixAlbumTitle: concerto_grosso({major:"D", op:[3,6]}),
            firstTrackNumber: 12,
            fixTrackName: /Concerto Grosso Op. 3 No.6 in D - \d+ (.*)\.mp3/
        },
        "ConcertoOp6-1" : {
            fixAlbumTitle: concerto_grosso({major:"G", op:[6,1]}),
            firstTrackNumber: 14,
            fixTrackName: /Concerto Grosso Op. 6 No.1 in G - \d+ (.*)\.mp3/
        },
        "ConcertoOp6-7" : {
            fixAlbumTitle: concerto_grosso({major:"Bb", op:[6,7]}),
            firstTrackNumber: 19,
            fixTrackName: /Concerto Grosso Op. 6 No.7 in B flat - \d+ (.*)\.mp3/
        },
        "ConcertoOp6-9" : {
            fixAlbumTitle: concerto_grosso({major:"F", op:[6,9]}),
            firstTrackNumber: 24,
            fixTrackName: /Concerto Grosso Op. 6 No.9 in F - \d+ (.*)\.mp3/
        },
        "Fireworks" : {
            firstTrackNumber: 10,
            fixTrackName: /Music for the Royal Fireworks - \d+ (.*)\.mp3/
        },
        "HarpConcerto" : {
            fixAlbumTitle: concerto({for:"Harp", major:"Bb", HWV:294}),
            fixTrackName: /- Concerto for Harp in B flat major - HWV 294 - \d - (.*)\.mp3/
        },
        "HornConcerto" : {
            fixAlbumTitle: concerto({num:2, for:"Two Horns", major:"F", HWV:333}),
            firstTrackNumber: 12,
            fixTrackName: /- Concerto a due cori No.2 in F major - HWV 333 - \d - (.*)\.mp3/
        },
        "JudasMaccabeus" : {
            firstTrackNumber: 7,
            fixTrackName: /Judas Maccabeus - \d (.*).mp3/
        },
        "OboeConcerto" : {
            fixAlbumTitle: concerto({num:3, for:"Oboe", minor:"G", HWV:287}),
            firstTrackNumber: 8,
            fixTrackName: /- Concerto for Oboe No.3 in G minor - HWV 287 - \d - (.*).mp3/
        },
        "OrganConcerto" : {
            fixAlbumTitle: concerto({for:"Organ", major:"F", HWV:295, subTitle:"Cuckoo and Nightingale"}),
            firstTrackNumber: 4,
            fixTrackName: /- Concerto for Organ in F major - HWV 295 - Cuckoo and Nightingale - \d - (.*)\.mp3/
        },
        "Sinfonia" : {
            fixTrackName: /Sinfonia in B flat for 2 Violins and Continuo - \d (.*)\.mp3/
        },
        "SonataInA" : {
            fixAlbumTitle: sonata({for:"Flute", minor:"A"}),
            firstTrackNumber: 9,
            fixTrackName: /Sonata in A minor Halle No.1 for Flute - \d (.*)\.mp3/
        },
        "SonataInB" : {
            fixAlbumTitle: sonata({for:"Violin, Oboe, Strings and Continuo", major:"Bb"}),
            firstTrackNumber: 29,
            fixTrackName: /Sonata à 5 in B flat for Violin, Oboe, Strings and Continuo - \d (.*)\.mp3/
        },
        "SonataInD" : {
            fixAlbumTitle: sonata({for:"Recorder and Continuo", minor:"D"}),
            firstTrackNumber: 13,
            fixTrackName: /Sonata in D minor for Recorder and Continuo - \d (.*)\.mp3/
        },
        "SonataInE" : {
            fixAlbumTitle: sonata({for:"Two Flutes", minor:"E"}),
            firstTrackNumber: 20,
            fixTrackName: /Sonata in E minor for 2 Flutes - \d (.*)\.mp3/
        },
        "SonataInF" : {
            fixAlbumTitle: sonata({for:"Oboe and Continuo", minor:"F", op:[1,5]}),
            firstTrackNumber: 4,
            fixTrackName: /Sonata in F, Op. 1 No.5 for Oboe and Continuo - \d (.*)\.mp3/
        },
        "SonataInG" : {
            fixAlbumTitle: sonata({for:"Two Violins and Continuo", major:"G", op:[5,4]}),
            firstTrackNumber: 24,
            fixTrackName: /Sonata in G, Op. 5 No.4 for Two Violins and Continuo - \d (.*).mp3/
        },
        "TheKingShallRejoice" : {
            firstTrackNumber: 15,
            fixTrackName: /The King Shall Rejoice - \d (.*)\.mp3/
        },
        "WaterMusic2" : {
            firstTrackNumber: 19,
            fixTrackName: /Water Music Suite 2 in D - \d (.*).mp3/
        },
        "WaterMusic3" : {
            firstTrackNumber: 3,
            fixTrackName: /Water Music Suite 3 in G - \d (.*).mp3/
        }
    },
    "Haydn":{
        "CelloConc 1 C" : {
            fixTrackName: /- Cello Concerto No. 1 in C major, Hob VIIb 1 [IV]+\. (.*)\.mp3/
        },
        "CelloConc 2 D" : {
            firstTrackNumber: 4,
            fixTrackName: /- Cello Concerto No. 2 in D major, Hob VIIb 2 [IV]+\. (.*)\.mp3/
        },
        "PianoConc 11" : {
            firstTrackNumber: 7,
            fixTrackName: /- Piano Concerto No. 11 in D major, Hob XVIII 11 [IV]+\. (.*)\.mp3/
        },
        "PianoConc 3" : {
            firstTrackNumber: 4,
            fixTrackName: /- Piano Concerto No. 3 in F major, Hob XVIII 3 [IV]+\. (.*)\.mp3/
        },
        "PianoConc 4" : {
            fixTrackName: /- Piano Concerto No. 4 in G major, Hob XVIII 4 [IV]+\. (.*)\.mp3/
        },
        "PianoTrio42 E flat" : {
            firstTrackNumber: 10,
            fixTrackName: /- Piano Trio in E-Flat Major, Hob. XV 30 No.42 \(1795\) - [IV]+\. (.*)\.mp3/
        },
        "PianoTrio43 C" : {
            fixTrackName: /- Piano Trio in C Major, Hob. XV 27 No.43 \(1797\) - [IV]+\. (.*)\.mp3/
        },
        "PianoTrio44 E" : {
           firstTrackNumber: 4,
           fixTrackName: /- Piano Trio in E Major, Hob. XV 28 No.44 \(1797\) - [IV]+\. (.*)\.mp3/
       },
       "PianoTrio45 E flat" : {
            firstTrackNumber: 7,
            fixTrackName: /- Piano Trio in E-Flat Major, Hob. XV 29 No.45 \(1797\) - [IV]+\. (.*)\.mp3/
        },
        "Quartet23 f Op20 No5" : {
            firstTrackNumber: 5,
            fixTrackName: /- Quartet No.23 in F Minor, Op. 20, No.5-(.*)\.mp3/
        },
        "Quartet24 A Op20 No6" : {
            firstTrackNumber: 9,
            fixTrackName: /- Quartet No.24 in A Major, Op. 20, No.6-(.*)\.mp3/
        },
        "Quartet25 C Op20 No2" : {
            firstTrackNumber: 5
        },
        "Quartet26 g Op20 No3" : {
            firstTrackNumber: 9
        },
        "Quartet27 D Op20 No4" : {
            fixTrackName: /- Quartet No.27 in D Major, Op. 20, No.4-(.*)\.mp3/
        },
        "Quartet29 G Op33 No5 'How do you do_'" : {
            fixTrackName: /- String Quartet in G major, Op. 33 No. 5 - (.*)\.mp3/
        },
        "Quartet30 E flat Op33 No2 'Joke'" : {
            firstTrackNumber: 9,
            fixTrackName: /- String Quartet in E-flat major, Op. 33 No. 2 - (.*)\.mp3/
        },
        "Quartet32 C Op33 No3 'Bird'" : {
            firstTrackNumber: 5,
            fixTrackName: /- String Quartet in C major, Op. 33 No. 3 - (.*)\.mp3/
        },
        "Quartet54 B flat Op71 No1" : {
           fixTrackName: /- Op. 71-1 - (.*)\.mp3/
       },
       "Quartet55 D Op71 No2" : {
            firstTrackNumber: 5,
            fixTrackName: /- Op. 71-2 - (.*)\.mp3/
        },
        "Quartet56 E flat Op71 No3" : {
            firstTrackNumber: 9,
            fixTrackName: /- Op. 71-3 - (.*)\.mp3/
        },
        "Sonata 48 in C major, H.XVI_48" : {
            firstTrackNumber: 3,
            fixTrackName: /[IV]+\. (.*)\.mp3/
        },
        "Sonata49 E flat" : {
            firstTrackNumber: 5,
            fixTrackName: /(?:Sonata in E-flat major, H.XVI 49 - )?[IV]+\. (.*)\.mp3/
        },
        "Symph100 G 'Military'" : {
            firstTrackNumber: 9,
            fixTrackName: /Symphony in G, Hob. I 100 Military , [IV]+\. (.*)\.mp3/
        },
        "Symph101 D 'Clock'" : {
            firstTrackNumber: 9,
            fixTrackName: /Symphony in D, Hob. I 101 Clock , [IV]+\. (.*)\.mp3/
        },
        "Symph102 B flat" : {
            firstTrackNumber: 5,
            fixTrackName: /Symphony No. 102 in B flat major, Hob I 102 [IV]+\. (.*)\.mp3/
        },
        "Symph103 E-flat" : {
            firstTrackNumber: 9,
            fixTrackName: /Symphony No. 103 in E flat major, Drumroll , Hob I 103 [IV]+\. (.*)\.mp3/
        },
        "Symph104 D" : {
            firstTrackNumber: 9,
            fixTrackName: /Symphony No. 104 in D major, London , Hob I 104 [IV]+\. (.*)\.mp3/
        },
        "Symph22 E flat 'Philosopher'" : {
            firstTrackNumber: 5,
            fixTrackName: /- [IV]+\. (.*)\.mp3/
        },
        "Symph64 A 'Tempora mutantur'" : {
            firstTrackNumber: 9,
            fixTrackName: /- [IV]+\. (.*)\.mp3/
        },
        "Symph93 D" : {
            fixTrackName: /Symphony in D, Hob. I 93, [IV]+\. (.*)\.mp3/
        },
        "Symph94 G 'Surprise'" : {
           fixTrackName: /Symphony in G, Hob. I 94 Surprise , [IV]+\. (.*)\.mp3/
       },
       "Symph95 c" : {
            fixTrackName: /Symphony No. 95 in C minor, Hob I 95 [IV]+\. (.*)\.mp3/
        },
        "Symph96 D 'Miracle'" : {
            fixTrackName: /Symphony No. 96 in D major, Miracle , Hob I 96 [IV]+\. (.*)\.mp3/
        },
        "Symph97 C" : {
            firstTrackNumber: 5,
            fixTrackName: /Symphony in C, Hob. I 97, [IV]+\. (.*)\.mp3/
        },
        "Symph98 B flat" : {
            firstTrackNumber: 5,
            fixTrackName: /Symphony No. 98 in B flat major, Hob I 98 [IV]+\. (.*)\.mp3/
        },
        "Symph99 E-flat" : {
            firstTrackNumber: 5,
            fixTrackName: /Symphony in E flat, Hob. I 99, [IV]+\. (.*)\.mp3/
        }
    },
    "Ives" : {
        "Hymns" : {
            firstTrackNumber: 5,
            fixTrackName: /- Ives Hymns \d+ (.*)\.mp3/
        },
        "Symphony1" : {
            fixTrackName: /- Ives Symphony No.1 \d+ (.*)\.mp3/
        },
        "Symphony4" : {
            firstTrackNumber: 10,
            fixTrackName: /- Ives Symphony No.4 \d+ (.*)\.mp3/
        }
    },
    "Janáček" : {
        "Jenůfa1" : {
           fixTrackName: /Jenůfa Jednání I\. (.*)\.mp3/
       },
        "Jenůfa Extras" : {
            firstTrackNumber: 14
        }
    }
};

export class RulesFactory
{
    public create()
    {
        return rules;
    };
};
