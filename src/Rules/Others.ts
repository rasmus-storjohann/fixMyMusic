import { Format, cantata, concerto, concerto_grosso, quartet, symphony, sonata, trio } from "../AlbumFormat";

export var rules = {
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
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
            fixTrackName: /Act I Scene \d (.*).mp3/
        },
        "Nixon2" : {
            fixTrackName: /Act II Scene \d (.*).mp3/
        },
        "Nixon3" : {
            fixTrackName: /Act III Scene \d (.*).mp3/
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
    "Arnold Schönberg" : {
        "Erwartung[Boulez]" : {
            fixTrackName: /Erwartung, Scene \d+ (.*).mp3/
        },
        "Five Piano Pieces Op23" : {
            firstTrackNumber: 4,
            fixTrackName: /Five Piano Pieces, Op. 23 (.*).mp3/
        },
        "Five pieces for orchestra" : {
            fixTrackName: /Schoenberg - 5 pieces for orchestra Op 16 - (.*)\.mp3/
        },
        "Lied der Waldtaube[Boulez]" : {
            firstTrackNumber: 30,
            fixTrackName: /(.*) \(Chamber Orchestra version\) .*.mp3/
        },
        "Ode to Napoleon Buonaparte" : {
            firstTrackNumber: 7,
            fixTrackName: /(Ode to Napoleon Buonaparte), Op. 41.mp3/
        },
        "Phantasy[Gould-Menuhin] Op47" : {
            firstTrackNumber: 9,
            fixTrackName: /Schoenberg Phantasy Op47 - (.*).mp3/
        },
        "Piano Concerto" : {
            fixTrackName: /Concerto for Piano and Orchestra, Op. 42 (.*).mp3/
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
            fixTrackName: /Pierrot Lunaire, Part I+ (.*) \(.*\)\.mp3/
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
            fixTrackName: /Three Pieces for Orchestra, \d. (.*).mp3/
        },
        "Two Piano Pieces Op33" : {
            firstTrackNumber: 20,
            fixTrackName: /Two Piano Pieces, Op. 33- A & B (.*).mp3/
        }
    },
    // BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
    "Barber" : {
        "ViolinConc[Ehnes]" : {
            firstTrackNumber: 4,
            fixTrackName: /Barber - Concerto for Violin and Orchestra, Op. 14 - [IV]+ - (.*).mp3/
        }
    },
    "Bartok" : {
        "Concerto for Orchestra" : {
            fixTrackName: /Concerto for orchestra - (.*).mp3/
        },
        "Music for Strings, Percussion and Celesta" : {
            firstTrackNumber: 6,
            fixTrackName: /Music for Strings, Percussion and Celesta - (.*).mp3/
        }
    },
    "Beatles" : {
        "Sgt. Pepper" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Berg" : {
        "Lulu Suite" : {
            firstTrackNumber: 10,
            fixTrackName: /Lulu Suite, \d+\. (.*)\.mp3/
        },
        "Lulu2" : {
            fixTrackName: /Lulu Akt II, Szene I+\. (.*)\.mp3/
        },
        "Lulu3" : {
            fixTrackName: /Lulu Akt III, Szene I+\. (.*)\.mp3/
        },
        "ViolinConcerto" : {
            fixTrackName: /Violinkonzert [IV]+\. (.*)\.mp3/
        },
        "Three pieces for orchestra" : {
            firstTrackNumber: 7,
            fixTrackName: /Alban Berg - 3 pieces for orchestra - (.*)\.mp3/
        },
        "Wozzeck1" : {
            fixTrackNameFunc: function(name: string, logger) : string {
                if (name === "Wozzeck - Act One - Scene 1 - Langsam, Wozzeck, langsam!.mp3") {
                    return "Langsam, Wozzeck, langsam!.mp3";
                }
                var m = /Scene \d- (.*\.mp3)/.exec(name);
                if (!m) {
                    m = /(.*\.mp3)/.exec(name);
                }
                return m[1];
            }
        },
        "Wozzeck2" : {
            firstTrackNumber: 8
        }
    },
    "Billy Joel" : {
        "Piano Man: The Very Best of Billy Joel" : {
            fixTrackName: /Billy Joel - (.*)\.mp3/
        }
    },
    "Bizet" : {
        "CarmenSuite" : {
            fixTrackName: /Carmen Suite No. \d+: (.*)\.mp3/
        }
    },
    "Brahms" : {
        "Drei Gesänge" : {
            fixTrackName: /Drei Gesänge-I+\. (.*)\.mp3/
        },
        "Fünf Gesänge" : {
            firstTrackNumber: 15,
            fixTrackName: /Fünf Gesänge-[IV]+\. (.*)\.mp3/
        },
        "In stiller Nacht" : {
            firstTrackNumber: 20,
            fixTrackName: /(.*)\.mp3/
        },
        "Sieben Lieder" : {
            firstTrackNumber: 8,
            fixTrackName: /Sieben Lieder-[IV]+\. (.*)\.mp3/
        },
        "Symph 1 c Op.68" : {
            fixAlbumTitle: symphony({ num: 1, minor: "C", op: 68, by: "Karajan"}),
            fixTrackName: /Symphony No. 1 in C minor, Op. 68 [IV]+\. (.*)\.mp3/
        },
        "Symph 2 D Op.73" : {
            fixAlbumTitle: symphony({ num: 2, major: "D", op: 73, by: "Karajan"}),
            fixTrackName: /Symphony No. 2 in D major, Op. 73 [IV]+\. (.*)\.mp3/
        },
        "Symph 3 F Op.90" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num: 3, major: "F", op: 90, by: "Karajan"}),
            fixTrackName: /Symphony No. 3 in F major, Op. 90 [IV]+\. (.*)\.mp3/
        },
        "Symph 4 e Op.98" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num: 4, minor: "e", op: 98, by: "Karajan"}),
            fixTrackName: /Symphony No. 4 in E minor, Op. 98 [IV]+\. (.*)\.mp3/
        },
        "Vier Gesänge" : {
            firstTrackNumber: 4,
            fixTrackName: /Vier Gesänge-[IV]+\. (.*)\.mp3/
        },
        "ViolConc D Op.77" : {
            fixAlbumTitle: concerto({ for:"Violinn", major: "D", op: 77}),
            fixTrackName: /Konzert für Violine und Orchester D-Dur, Op. 77 [IV]+\. (.*).mp3/
        },
        "ViolSon 1 G Op.78" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ for:"Violin", num: 1, major: "G", op: 78}),
            fixTrackName: /Sonata for Violin and Piano No. 1 in G major, Op. 78 [IV]+\. (.*)\.mp3/
        },
        "ViolSon 2 A Op.100" : {
            fixAlbumTitle: sonata({ for:"Violin", num: 2, major: "a", op: 100}),
            fixTrackName: /Sonata for Violin and Piano No. 2 in A major, Op. 100 [IV]+\. (.*)\.mp3/
        },
        "ViolSon 3 d Op.108" : {
           firstTrackNumber: 7,
           fixAlbumTitle: sonata({ for:"Violin", num: 3, minor: "d", op: 108}),
           fixTrackName: /Sonata for Violin and Piano No. 3 in D minor, Op. 108 [IV]+\. (.*).mp3/
       }
    },
    "Britten" : {
        "The Turn of the Screw 1" : {
            fixTrackNameFunc: function(name: string, logger) : string {
                if (name === "Act 1- Prologue.mp3") {
                    return "Prologue.mp3";
                }
                if (name === "Theme - Scene 1 The Journey.mp3") {
                    return "The Journey.mp3";
                }
                var m = /Variation [IVX]+ - Scene \d+ (.*)\.mp3/.exec(name);
                if (!m) {
                    throw new Error("");
                }
                return m[1];
            }
        },
        "The Turn of the Screw 2" : {
            fixTrackName: /The Turn of the Screw Act II, Variation [IVX]+ - Act II, Scene \d+ (.*)\.mp3/
        },
        "Violin Concerto" : {
            fixTrackName: /Violin Concerto Op\.15 \-I+\- (.*)\.mp3/
        },
        "Young Person's Guide to the Orchestra" : {
            firstTrackNumber: 23,
            fixTrackName: /Young Person's Guide to the Orchestra, Op. 34 [IVX]+\. (.*)\.mp3/
        }
    },
    "Bruch" : {
        "Scottish Fantasy" : {
            firstTrackNumber: 4,
            fixTrackName: /Scottish Fantasy (.*).mp3/
        },
        "Violin Conc 1" : {
            fixTrackName: /Concerto No.1 (.*)\.mp3/
        }
    },
    "Bruckner" : {
        "Mass in C Minor" : {
            firstTrackNumber: 9,
            fixTrackName: /Mass in C Minor - (.*)\.mp3/
        },
        "Mass in E Minor" : {
            fixTrackName: /Mass No 2 in E minor - (.*)\.mp3/
        },
        "Two songs" : {
            firstTrackNumber: 7,
            fixTrackName: /(.*)\.mp3/
        }
    },
    // CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
    "Camarón" : {
        "Te Lo Dice Camarón" : {
            fixTrackName: /Camarón - (.*)\.mp3/
        }
    },
    "Corelli" : {
        "Conc 1 D" : {
            fixAlbumTitle: concerto({num: 1, major:"D", op:[6,1]}),
            fixTrackName: /Concerto No.1 in D major [IV]+\.(.*)\.mp3/
        },
        "Conc 2 F" : {
            firstTrackNumber: 8,
            fixAlbumTitle: concerto({num: 2, major:"F", op:[6,2]}),
            fixTrackName: /Concerto No.2 in F -[IV]+- (.*)\.mp3/
        },
        "Conc 3 c" : {
            firstTrackNumber: 12,
            fixAlbumTitle: concerto({num: 3, minor:"C", op:[6,3]}),
            fixTrackName: /Concerto No.3 in C minor -[IV]+- (.*)\.mp3/
        },
        "Conc 4 D" : {
            firstTrackNumber: 17,
            fixAlbumTitle: concerto({num: 4, major:"D", op:[6,4]}),
            fixTrackName: /Concerto No.4 in D -[IV]+- (.*).mp3/
        },
        "Conc 5 B flat" : {
            firstTrackNumber: 21,
            fixAlbumTitle: concerto({num: 5, major:"Bb", op:[6,5]}),
            fixTrackName: /Concerto #5 in B Flat [IV]+\. (.*).mp3/
        },
        "Conc 6 F" : {
            firstTrackNumber: 25,
            fixAlbumTitle: concerto({num: 6, major:"F", op:[6,6]}),
            fixTrackName: /Concerto No.6 in F -[IV]+- (.*)\.mp3/
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
            fixTrackName: /CPE Bach - Sonata Wq78 - (.*)\.mp3/
        }
    },

    "Charles-François Gounod" : {
        "Messe Solennelle de Sainte Cécile - St. Cecilia Mass - Cäcilienmesse" : {
            fixTrackName: /Messe Solennelle de Sainte Cécile: (?:[IVX]+\. )?(.*)\.mp3/
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
           fixAlbumTitle: sonata({num: 1, minor:"C", op: 4, by: "Zilberstein"}),
           fixTrackName: /Piano Sonata no. 1 in C minor, op. 4: [IV]+\. (.*) \(feat. piano: Lilya Zilberstein\)\.mp3/
       },
       "Sonata2" : {
           fixAlbumTitle: sonata({num: 2, minor:"Bb", op: 35, by: "Pollini"}),
           firstTrackNumber: 5,
           fixTrackName: /Piano Sonata no. 2 in B-flat minor, op. 35: [IV]+\. (.*) \(feat. piano: Maurizio Pollini\)\.mp3/
       },
       "Sonata3" : {
           fixAlbumTitle: sonata({num: 3, minor:"B", op: 58, by: "Pollini"}),
           firstTrackNumber: 9,
           fixTrackName: /Piano Sonata no. 3 in B minor, op. 58: [IV]+\. (.*) \(feat. piano: Maurizio Pollini\).mp3/
       },
       "Waltzes[Ashkenazy]" : {
           validation : ["skipUniqueTrackNameCheck"]
        },
    },
    // DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDdd
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
            fixAlbumTitle: symphony({num: 7}),
            fixTrackName: /Dvorak- Sym#7- [IV]+\.(.*).mp3/
        },
        "Symph8" : {
            fixAlbumTitle: symphony({num: 8, major: "C", op: 88}),
            fixTrackName: /Symphony 8 in C major Op 88 - (.*)\.mp3/
        },
        "Symph9" : {
            fixAlbumTitle: symphony({num: 9, minor: "E", op: 95, subTitle: "New World"}),
            firstTrackNumber: 5,
            fixTrackName: /Symphony 9 in E minor Op 95 New World - (.*)\.mp3/
        }
    },
    // EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    "Elgar" : {
        "Cello" : {
            fixAlbumTitle: concerto({ for: "Cello", op:85, minor : "E" }),
            fixTrackName: /Cello Concerto in E minor, Op. 85 [IV]+\. (.*)\.mp3/
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
    // FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
    "Furtwangler" : {
        "Adagio" : {
            firstTrackNumber: 5,
            fixTrackName: /Furtwangler - (Adagio solemne).mp3/
        }
    },
    // GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
    "Gershwin" : {
        "An American in Paris[Previn]" : {
            firstTrackNumber: 2
        },
        "PianoConc" : {
            fixAlbumTitle: concerto({for: "Piano", major: "F"}),
            fixTrackName: /Gershwin - Concerto for Piano and Orchestra in F - [IV]+\. (.*)\.mp3/
        },
        "PianoConc[Previn]" : {
            fixAlbumTitle: concerto({for: "Piano", major: "F", by: "Previn"}),
            firstTrackNumber: 3,
            fixTrackName: /Piano Concerto in F: [IV]+\. (.*)\.mp3/
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
    "Grieg" : {
        "From_Holberg's_Time" : {
            firstTrackNumber: 9,
            fixTrackName: /From Holberg's Time, op. 40: [IV]+\. (.*)\.mp3/
        },
        "PeerGynt1" : {
            fixTrackName: /Peer Gynt Suite no. 1, op. 46: [IV]+\. (.*)\.mp3/
        },
        "PeerGynt2" : {
            firstTrackNumber: 5,
            fixTrackName: /Peer Gynt Suite no. 2, op. 55: [IV]+\. (.*)\.mp3/
        },
        "PianoConcerto[Richter]" : {
            fixTrackName: /Piano concerto a minor op 16 - Richter - (.*)\.mp3/
        },
        "Three psalms" : {
            firstTrackNumber: 7,
            fixTrackName: /Psalms - (.*)\.mp3/
        },
        "ViolinSonata" : {
            firstTrackNumber: 4,
            fixTrackName: /ViolinSonata G major Op 13 - (.*)\.mp3/
        }
    },
    "Grigny" : {
        "Two organ pieces" : {
            firstTrackNumber: 4,
            fixTrackName: /Grigny - (.*)\.mp3/
        }
    },
    // HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
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
            fixTrackName: /Concerto for Harp in B flat major - HWV 294 - \d - (.*)\.mp3/
        },
        "HornConcerto" : {
            fixAlbumTitle: concerto({num:2, for:"Two Horns", major:"F", HWV:333}),
            firstTrackNumber: 12,
            fixTrackName: /Concerto a due cori No.2 in F major - HWV 333 - \d - (.*)\.mp3/
        },
        "JudasMaccabeus" : {
            firstTrackNumber: 7,
            fixTrackName: /Judas Maccabeus - \d (.*).mp3/
        },
        "OboeConcerto" : {
            fixAlbumTitle: concerto({num:3, for:"Oboe", minor:"G", HWV:287}),
            firstTrackNumber: 8,
            fixTrackName: /Concerto for Oboe No.3 in G minor - HWV 287 - \d - (.*).mp3/
        },
        "OrganConcerto" : {
            fixAlbumTitle: concerto({for:"Organ", major:"F", HWV:295, subTitle:"Cuckoo and Nightingale"}),
            firstTrackNumber: 4,
            fixTrackName: /Concerto for Organ in F major - HWV 295 - Cuckoo and Nightingale - \d - (.*)\.mp3/
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
            fixAlbumTitle: concerto({ for:"Cello", num : 1, major: "C" }),
            fixTrackName: /Cello Concerto No. 1 in C major, Hob VIIb 1 [IV]+\. (.*)\.mp3/
        },
        "CelloConc 2 D" : {
            fixAlbumTitle: concerto({ for:"Cello", num : 2, major: "D" }),
            firstTrackNumber: 4,
            fixTrackName: /Cello Concerto No. 2 in D major, Hob VIIb 2 [IV]+\. (.*)\.mp3/
        },
        "PianoConc 11" : {
            fixAlbumTitle: concerto({ for:"Piano", num : 11, major: "D" }),
            firstTrackNumber: 7,
            fixTrackName: /Piano Concerto No. 11 in D major, Hob XVIII 11 [IV]+\. (.*)\.mp3/
        },
        "PianoConc 3" : {
            fixAlbumTitle: concerto({ for:"Piano", num : 3, major: "F" }),
            firstTrackNumber: 4,
            fixTrackName: /Piano Concerto No. 3 in F major, Hob XVIII 3 [IV]+\. (.*)\.mp3/
        },
        "PianoConc 4" : {
            fixAlbumTitle: concerto({ for:"Piano", num : 4, major: "G" }),
            fixTrackName: /Piano Concerto No. 4 in G major, Hob XVIII 4 [IV]+\. (.*)\.mp3/
        },
        "PianoTrio42 E flat" : {
            fixAlbumTitle: trio({ for:"Piano", num : 42, major: "Eb" }),
            firstTrackNumber: 10,
            fixTrackName: /Piano Trio in E-Flat Major, Hob. XV 30 No.42 \(1795\) - [IV]+\. (.*)\.mp3/
        },
        "PianoTrio43 C" : {
            fixAlbumTitle: trio({ for:"Piano", num : 43, major: "C" }),
            fixTrackName: /Piano Trio in C Major, Hob. XV 27 No.43 \(1797\) - [IV]+\. (.*)\.mp3/
        },
        "PianoTrio44 E" : {
            fixAlbumTitle: trio({ for:"Piano", num : 44, major: "E" }),
            firstTrackNumber: 4,
            fixTrackName: /Piano Trio in E Major, Hob. XV 28 No.44 \(1797\) - [IV]+\. (.*)\.mp3/
       },
       "PianoTrio45 E flat" : {
           fixAlbumTitle: trio({ for:"Piano", num : 45, major: "Eb" }),
           firstTrackNumber: 7,
           fixTrackName: /Piano Trio in E-Flat Major, Hob. XV 29 No.45 \(1797\) - [IV]+\. (.*)\.mp3/
        },
        "Quartet23 f Op20 No5" : {
            fixAlbumTitle: quartet({ num : 23, minor: "f", op: [20, 5] }),
            firstTrackNumber: 5,
            fixTrackName: /Quartet No.23 in F Minor, Op. 20, No.5-(.*)\.mp3/
        },
        "Quartet24 A Op20 No6" : {
            fixAlbumTitle: quartet({ num : 24, major: "A", op: [20, 6] }),
            firstTrackNumber: 9,
            fixTrackName: /Quartet No.24 in A Major, Op. 20, No.6-(.*)\.mp3/
        },
        "Quartet25 C Op20 No2" : {
            fixAlbumTitle: quartet({ num : 25, major: "C", op: [20, 2] }),
            firstTrackNumber: 5
        },
        "Quartet26 g Op20 No3" : {
            fixAlbumTitle: quartet({ num : 26, minor: "g", op: [20, 3] }),
            firstTrackNumber: 9
        },
        "Quartet27 D Op20 No4" : {
            fixAlbumTitle: quartet({ num : 27, major: "D", op: [20, 4] }),
            fixTrackName: /Quartet No.27 in D Major, Op. 20, No.4-(.*)\.mp3/
        },
        "Quartet29 G Op33 No5 'How do you do_'" : {
            fixAlbumTitle: quartet({ num : 29, major: "G", op: [33, 5], subTitle: "How do you do" }),
            fixTrackName: /String Quartet in G major, Op. 33 No. 5 - (.*)\.mp3/
        },
        "Quartet30 E flat Op33 No2 'Joke'" : {
            fixAlbumTitle: quartet({ num : 30, major: "Eb", op: [33, 2], subTitle: "Joke" }),
            firstTrackNumber: 9,
            fixTrackName: /String Quartet in E-flat major, Op. 33 No. 2 - (.*)\.mp3/
        },
        "Quartet32 C Op33 No3 'Bird'" : {
            fixAlbumTitle: quartet({ num : 32, major: "C", op: [33, 3], subTitle: "Bird" }),
            firstTrackNumber: 5,
            fixTrackName: /String Quartet in C major, Op. 33 No. 3 - (.*)\.mp3/
        },
        "Quartet54 B flat Op71 No1" : {
            fixAlbumTitle: quartet({ num : 55, major: "Bb", op: [71, 1] }),
            fixTrackName: /Op. 71-1 - (.*)\.mp3/
       },
       "Quartet55 D Op71 No2" : {
           fixAlbumTitle: quartet({ num : 55, major: "D", op: [71, 2] }),
            firstTrackNumber: 5,
            fixTrackName: /Op. 71-2 - (.*)\.mp3/
        },
        "Quartet56 E flat Op71 No3" : {
            fixAlbumTitle: quartet({ num : 56, major: "Eb", op: [71, 3] }),
            firstTrackNumber: 9,
            fixTrackName: /Op. 71-3 - (.*)\.mp3/
        },
        "Sonata 48 in C major, H.XVI_48" : {
            fixAlbumTitle: sonata({ num : 48, major: "C" }),
            firstTrackNumber: 3,
            fixTrackName: /[IV]+\. (.*)\.mp3/
        },
        "Sonata49 E flat" : {
            fixAlbumTitle: sonata({ num : 49, major: "Eb" }),
            firstTrackNumber: 5,
            fixTrackName: /(?:Sonata in E-flat major, H.XVI 49 - )?[IV]+\. (.*)\.mp3/
        },
        "Symph100 G 'Military'" : {
            fixAlbumTitle: symphony({ num : 100, major: "G", subTitle:"Military" }),
            firstTrackNumber: 9,
            fixTrackName: /Symphony in G, Hob. I 100 Military , [IV]+\. (.*)\.mp3/
        },
        "Symph101 D 'Clock'" : {
            fixAlbumTitle: symphony({ num : 101, major: "D", subTitle:"Clock" }),
            firstTrackNumber: 9,
            fixTrackName: /Symphony in D, Hob. I 101 Clock , [IV]+\. (.*)\.mp3/
        },
        "Symph102 B flat" : {
            fixAlbumTitle: symphony({ num : 102, major: "Bb" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony No. 102 in B flat major, Hob I 102 [IV]+\. (.*)\.mp3/
        },
        "Symph103 E-flat" : {
            fixAlbumTitle: symphony({ num : 103, major: "Eb", subTitle:"Drumroll" }),
            firstTrackNumber: 9,
            fixTrackName: /Symphony No. 103 in E flat major, Drumroll , Hob I 103 [IV]+\. (.*)\.mp3/
        },
        "Symph104 D" : {
            fixAlbumTitle: symphony({ num : 104, major: "D" }),
            firstTrackNumber: 9,
            fixTrackName: /Symphony No. 104 in D major, London , Hob I 104 [IV]+\. (.*)\.mp3/
        },
        "Symph22 E flat 'Philosopher'" : {
            fixAlbumTitle: symphony({ num : 22, major: "Eb", subTitle:"Philosopher" }),
            firstTrackNumber: 5,
            fixTrackName: /[IV]+\. (.*)\.mp3/
        },
        "Symph64 A 'Tempora mutantur'" : {
            fixAlbumTitle: symphony({ num : 64, major: "A", subTitle:"Tempora mutantur" }),
            firstTrackNumber: 9,
            fixTrackName: /[IV]+\. (.*)\.mp3/
        },
        "Symph93 D" : {
            fixAlbumTitle: symphony({ num : 93, major: "D" }),
            fixTrackName: /Symphony in D, Hob. I 93, [IV]+\. (.*)\.mp3/
        },
        "Symph94 G 'Surprise'" : {
            fixAlbumTitle: symphony({ num : 94, major: "G", subTitle:"Surprise" }),
            fixTrackName: /Symphony in G, Hob. I 94 Surprise , [IV]+\. (.*)\.mp3/
       },
       "Symph95 c" : {
           fixAlbumTitle: symphony({ num : 95, minor: "c" }),
           fixTrackName: /Symphony No. 95 in C minor, Hob I 95 [IV]+\. (.*)\.mp3/
        },
        "Symph96 D 'Miracle'" : {
            fixAlbumTitle: symphony({ num : 96, major: "D", subTitle:"Miracle" }),
            fixTrackName: /Symphony No. 96 in D major, Miracle , Hob I 96 [IV]+\. (.*)\.mp3/
        },
        "Symph97 C" : {
            fixAlbumTitle: symphony({ num : 97, major: "C" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony in C, Hob. I 97, [IV]+\. (.*)\.mp3/
        },
        "Symph98 B flat" : {
            fixAlbumTitle: symphony({ num : 98, major: "Bb" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony No. 98 in B flat major, Hob I 98 [IV]+\. (.*)\.mp3/
        },
        "Symph99 E-flat" : {
            fixAlbumTitle: symphony({ num : 99, major: "Eb" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony in E flat, Hob. I 99, [IV]+\. (.*)\.mp3/
        }
    },
    // IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    "In_the_country" : {
        "Losing stones, collecting bones" : {
            fixTrackName: /In the country - (.*)\.mp3/
        }
    },
    "Ives" : {
        "Hymns" : {
            firstTrackNumber: 5,
            fixTrackName: /Ives Hymns \d+ (.*)\.mp3/
        },
        "Symphony1" : {
            fixAlbumTitle: symphony({ num: 1 }),
            fixTrackName: /Ives Symphony No.1 \d+ (.*)\.mp3/
        },
        "Symphony4" : {
            fixAlbumTitle: symphony({ num: 4 }),
            firstTrackNumber: 10,
            fixTrackName: /Ives Symphony No.4 \d+ (.*)\.mp3/
        }
    },
    // JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
    "Jackie_Treehorn" : {
        "We are Jackie Treehorn" : {
            fixTrackName: /Jackie Treehorn - (.*)\.mp3/
        }
    },
    "Janáček" : {
        "Jenůfa1" : {
            fixTrackName: /Jenůfa Jednání I\. (.*)\.mp3/
        },
        "Jenůfa2" : {
            firstTrackNumber: 9,
            fixTrackName: /Jenůfa Jednání II\. (.*)\.mp3/
        },
        "Jenůfa3" : {
            firstTrackNumber: 5,
            fixTrackName: /Jenůfa Jednání III\. (.*)\.mp3/
        },
        "Jenůfa Extras" : {
            firstTrackNumber: 14
        }
    },
    "James MacMillan" : {
        "Seven Last Words from the Cross" : {
            fixTrackName: /Seven Last Words from the Cross \(1993\) \d. (.*)\.mp3/
        },
        "Cantos Sagrados" : {
            firstTrackNumber: 8,
            fixTrackName: /Cantos Sagrados \(1989\) \d. (.*)\.mp3/
        }
    },
    "Jan Garbarek" : {
        "Officium" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Joan Cererols" : {
        "Missa de Batalla" : {
            firstTrackNumber: 11,
            fixTrackName: /Missa de batalla - (.*)\.mp3/
        },
        "Missa pro Defunctis" : {
            fixTrackName: /Missa [Pp]ro [Dd]efunctis - (.*)\.mp3/
        }
    },
    // KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
    "Khachaturian" : {
        "Piano Concerto" : {
            fixAlbumTitle: concerto({ for: "Piano", major: "Db" }),
            fixTrackName: /Khachaturian Piano Concerto in Db - [I]+ (.*)\.mp3/
        },
        "Sonatina" : {
            firstTrackNumber: 4,
            fixTrackName: /(?:Khachaturian Sonatina - )?I+\.? (.*)\.mp3/
        },
        "Toccata" : {
            firstTrackNumber: 7,
            fixTrackName: /(Toccata) \(1932\)\.mp3/
        }
    },
    "Korngold" : {
        "ViolinConc[Ehnes]" : {
            fixAlbumTitle: concerto({ for: "Violin", op:[35], major: "D" }),
            fixTrackName: /Korngold - Violin Concerto in D, [Oo]p\. ?35 - I+ - (.*)\.mp3/
        }
    },
    "Kronos_Quartet" : {
        "Black Angels" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Karkwa" : {
        "Les Chemins de verre" : {
            fixTrackName: /Karkwa - (.*)\.mp3/
        }
    },
    "Kayhan Kalhor" : {
        "Ali Akbar Moradi" : {
            fixTrackName: /Kayhan Kalhor - (.*)\.mp3/
        }
    },
    "Knut Reiersrud" : {
        "Himmelskip" : {
            fixTrackName: /Knut Reiersrud - (.*)\.mp3/
        }
    },
    "Kristorn" : {
        "69" : {
            fixTrackName: /Kriston - 69-\d+ (.*)\.mp3/
        }
    },
    // LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
    "Lisa LeBlanc" : {
        "Lisa LeBlanc" : {
            fixTrackName: /Lisa LeBlanc - (.*)\.mp3/
        }
    },
    "Liszt (as on disk!)" : {
        "PianoConcerto2[Brendel]" : {
            firstTrackNumber: 6,
            fixTrackName: /List - Piano concerto No 2 in A major - (.*)\.mp3/
        }
    },
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    "Mahler" : {
        "Symph8" : {
            // TODO can do better with the two sections here
            fixTrackName: /Symphony No. 8 in E-flat major, Symphony of a Thousand (?:I\. Hymnus Veni, Creator Spiritus|II\. Final Scene from Faust II) [a-z]\. (.*)\.mp3/
        }
    },
    "Malcolm Arnold" : {
        "Symph1":{
            fixTrackName: /(.*) - Symphony No\.1 Op\.22\.mp3/
        },
        "PianoConcerto 3 hands" : {
            firstTrackNumber: 4,
            fixTrackName: /(.*) - Concerto for 2 Pianos \(3 Hands\) Op\.104\.mp3/
        },
        "Five orch pieces" : {
            firstTrackNumber: 7
        }
    },
    "Medtner" : {
        "SonateOp11" : {
            firstTrackNumber: 7,
            fixTrackName: /(?:Sonaten-Triade op\. 11 - )?Nr\. \d (.*)\.mp3/
        },
        "Zwei Märchen" : {
            firstTrackNumber: 5,
            fixTrackName: /Zwei Märchen op. 8 - I+\. (.*)\.mp3/
        },
    },
    "Maurice Jarre" : {
        "Lawrence of Arabia Soundtrack" : {
            fixTrackName: /Maurice Jarre - (.*)\.mp3/
        }
    },
    "Miles Davis" : {
        "Ascenseur pour l'Échafaud" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Dingo" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Live at Montreux" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Music From Siesta" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "We Want Miles" : {
           validation : ["skipUniqueTrackNameCheck"]
       }
    },
    "Mozart" : {
        "Coronation Mass [Markevitch]": {
            firstTrackNumber: 6,
            fixTrackName: /Coronation Mass - (.*).mp3/
        }
    }
};
