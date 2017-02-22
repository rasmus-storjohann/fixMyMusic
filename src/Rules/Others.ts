import { Format, cantata, concerto, concerto_grosso, quartet, symphony, sonata, trio, quintet } from "../AlbumFormat";

export var rules = {
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
    "Aaron Copland" : {
        "AppalachianSpring" : {
            fixTrackName: /Appalachian Spring \(Ballet for Martha\): (.*)/
        },
        "ClarinetConcerto" : {
            fixAlbumTitle: concerto({for:"Clarinet"}),
            fixTrackName: /Concerto for Clarinet and String Orchestra, [IV]+\. (.*)/
        },
        "DancePanels" : {
            firstTrackNumber: 10,
            fixTrackName: /Dance Panels, [IV]+\. (.*)/
        },
        "FallRiverLegend" : {
            firstTrackNumber: 12,
            fixTrackName: /Fall River Legend: (.*)/
        },
        "FourPieces" : {
            fixAlbumTitle: "Four Pieces",
            validation : ["skipTrackNumberCheck"]
        },
        "MusicForTheTheatre" : {
            firstTrackNumber: 4,
            fixTrackName: /Music for the Theatre: (.*)/
        },
        "Symph3" : {
            fixAlbumTitle: symphony({ num : 3 }),
            fixTrackName: /Symphony No. 3: [IV]+\. (.*)/
        },
        "Symphonette" : {
            firstTrackNumber: 18,
            fixTrackName: /Latin-American Symphonette: [IV]+\. (.*)/
        },
        "TenderLand" : {
            firstTrackNumber: 9,
            fixTrackName: /The Tender Land Suite: (.*)/
        }
    },
    "Adams_John" : {
        "Nixon1" : {
            fixTrackName: /Act I Scene \d (.*)/
        },
        "Nixon2" : {
            fixTrackName: /Act II Scene \d (.*)/
        },
        "Nixon3" : {
            fixTrackName: /Act III Scene \d (.*)/
        }
    },
    "Albeniz" : {
        "Cantos de España" : {
            fixTrackName: /Cantos de España: \d+\. (.*)/
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
            fixTrackName: /^\d+ Sonatine, Op. 61 (\d+)\. (.*)/
        },
        "Barcarolle" : {
            firstTrackNumber: 9
        },
        "Le festin d'Esope" : {
            firstTrackNumber: 10,
            fixTrackName: /(.*), op. 39 no. 12/
        },
        // TODO dupe
        "Sonatine" : {
            firstTrackNumber: 5,
            fixTrackName: /Sonatine, op. 61: [IV]+. (.*)/
        },
        "Grande sonate op33 \"Les quatre âges\"" : {
            fixAlbumTitle: sonata({ op:33, subTitle: "Les quatre âges" }),
            fixTrackName: /Grande sonate, op\. 33 \"Les quatre âges\": [IV]+\. (.*)/
        }
    },
    "Arild Andersen" : {
        "Sagn" : {
            fixTrackName: /Sagn, (.*)/
        }
    },
    "Arnold Schönberg" : {
        "Erwartung[Boulez]" : {
            fixTrackName: /Erwartung, Scene \d+ (.*)/
        },
        "ChamberSymphony" : {
           fixTrackName: /Chamber Symphony no. 2, op. 38: [IV]+\. (.*)/
       },
       "Cinematographic" : {
           firstTrackNumber: 3
       },
        "Five Piano Pieces Op23" : {
            firstTrackNumber: 4,
            fixTrackName: /Five Piano Pieces, Op. 23 (.*)/
        },
        "Five pieces for orchestra" : {
            fixTrackName: /Schoenberg - 5 pieces for orchestra Op 16 - (.*)/
        },
        "Lied der Waldtaube[Boulez]" : {
            firstTrackNumber: 30,
            fixTrackName: /(.*) \(Chamber Orchestra version\) .*/
        },
        "Ode to Napoleon Buonaparte" : {
            firstTrackNumber: 7,
            fixTrackName: /(Ode to Napoleon Buonaparte), Op. 41/
        },
        "Phantasy[Gould-Menuhin] Op47" : {
            firstTrackNumber: 9,
            fixTrackName: /Schoenberg Phantasy Op47 - (.*)/
        },
        "Piano Concerto" : {
            fixAlbumTitle: concerto({for:"Piano", op:42 }),
            fixTrackName: /Concerto for Piano and Orchestra, Op. 42 (.*)/
        },
        // TODO fix duplication
        "PianoConc Op42" : {
            fixTrackName: /Concerto for Piano and Orchestra, Op. 42 (.*)/
        },
        "Three Piano Pieces Op11" : {
            fixTrackName: /Three Piano Pieces, Op. 11 (.*)/
        },
        "Pierrot Lunaire[Boulez]" : {
            firstTrackNumber: 9,
            fixTrackName: /Pierrot Lunaire, Part I+ (.*) \(.*\)/
        },
        "Six Little Piano Pieces Op19" : {
            firstTrackNumber: 9,
            fixTrackName: /Six Little Piano Pieces, Op. 19 (.*)/
        },
        "Suite for Piano Op25" : {
          // TODO fixAlbumTitle
            firstTrackNumber: 15,
            fixTrackName: /Suite for Piano, Op. 25 (.*)/
        },
        "Three Pieces for Orchestra" : {
            firstTrackNumber: 7,
            fixTrackName: /Three Pieces for Orchestra, \d. (.*)/
        },
        "Two Piano Pieces Op33" : {
            firstTrackNumber: 20,
            fixTrackName: /Two Piano Pieces, Op. 33- A & B (.*)/
        },
        "VariationsForOrch" : {
            fixTrackName: /Schoenberg - Variations for orchestra Op 31 - (.*)/
        },
        "Verklärte Nacht" : {
             firstTrackNumber: 4,
             fixTrackName: /Verklärte Nacht, op. 4 \(arr. for string orchestra\): (.*)/
         }
    },
    // BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
    "Barber" : {
        "ViolinConc[Ehnes]" : {
            fixAlbumTitle: concerto({for:"Violin", op:14, by:"Ehnes" }),
            firstTrackNumber: 4,
            fixTrackName: /Barber - Concerto for Violin and Orchestra, Op. 14 - [IV]+ - (.*)/
        }
    },
    "Bartok" : {
        "Concerto for Orchestra" : {
            fixAlbumTitle: concerto({for:"Orchestra" }),
            fixTrackName: /Concerto for orchestra - (.*)/
        },
        "Music for Strings, Percussion and Celesta" : {
            firstTrackNumber: 6,
            fixTrackName: /Music for Strings, Percussion and Celesta - (.*)/
        },
        "Sonata" : {
            firstTrackNumber: 13,
            fixTrackName: /Bartok - Sonata for two pianos and percussion - (.*)/
        }
    },
    "Beatles" : {
        "Sgt. Pepper" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Bellini" : {
        "I Puritani3 [Callas]" : {
            firstTrackNumber: 11,
            fixTrackName: /Act 3 - (.*)/
        }
    },
    "Berg" : {
        "Lulu Suite" : {
            firstTrackNumber: 10,
            fixTrackName: /Lulu Suite, \d+\. (.*)/
        },
        "Lulu2" : {
            fixTrackName: /Lulu Akt II, Szene I+\. (.*)/
        },
        "Lulu3" : {
            fixTrackName: /Lulu Akt III, Szene I+\. (.*)/
        },
        "ViolinConcerto" : {
            fixAlbumTitle: concerto({for:"Violin", by:"Mutter" }),
            fixTrackName: /Violinkonzert [IV]+\. (.*)/
        },
        "Three pieces for orchestra" : {
            firstTrackNumber: 7,
            fixTrackName: /Alban Berg - 3 pieces for orchestra - (.*)/
        },
        "Wozzeck1" : {
            fixTrackNameFunc: function(name: string, logger) : string {
                if (name === "Wozzeck - Act One - Scene 1 - Langsam, Wozzeck, langsam!") {
                    return "Langsam, Wozzeck, langsam!";
                }
                var m = /Scene \d- (.*)/.exec(name);
                if (m) {
                    return m[1];
                }
                return name;
            }
        },
        "Wozzeck2" : {
            firstTrackNumber: 8
        }
    },
    "Billy Joel" : {
        "Piano Man: The Very Best of Billy Joel" : {
            fixTrackName: /Billy Joel - (.*)/
        }
    },
    "Bizet" : {
      // TODO fixAlbumTitle?
        "CarmenSuite" : {
            fixTrackName: /Carmen Suite No. \d+: (.*)/
        }
    },
    "Brahms" : {
        "Drei Gesänge" : {
            fixTrackName: /Drei Gesänge-I+\. (.*)/
        },
        "Fünf Gesänge" : {
            firstTrackNumber: 15,
            fixTrackName: /Fünf Gesänge-[IV]+\. (.*)/
        },
        "In stiller Nacht" : {
            firstTrackNumber: 20,
            fixTrackName: /(.*)/
        },
        "PianoConcerto2[Richter]" : {
            fixAlbumTitle: concerto({num:2, for:"Piano", major:"Bb", op:83, by: "Richter" }),
             fixTrackName: /Piano Concerto No. 2 in B-flat major, Op. 83 [IV]+\. (.*)/,
             validation : ["skipUniqueTrackNameCheck"]
         },
        "Sieben Lieder" : {
            firstTrackNumber: 8,
            fixTrackName: /Sieben Lieder-[IV]+\. (.*)/
        },
        "Symph 1 c Op.68" : {
            fixAlbumTitle: symphony({ num: 1, minor: "C", op: 68, by: "Karajan"}),
            fixTrackName: /Symphony No. 1 in C minor, Op. 68 [IV]+\. (.*)/
        },
        "Symph 2 D Op.73" : {
            fixAlbumTitle: symphony({ num: 2, major: "D", op: 73, by: "Karajan"}),
            fixTrackName: /Symphony No. 2 in D major, Op. 73 [IV]+\. (.*)/
        },
        "Symph 3 F Op.90" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num: 3, major: "F", op: 90, by: "Karajan"}),
            fixTrackName: /Symphony No. 3 in F major, Op. 90 [IV]+\. (.*)/
        },
        "Symph 4 e Op.98" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num: 4, minor: "e", op: 98, by: "Karajan"}),
            fixTrackName: /Symphony No. 4 in E minor, Op. 98 [IV]+\. (.*)/
        },
        "Vier Gesänge" : {
            firstTrackNumber: 4,
            fixTrackName: /Vier Gesänge-[IV]+\. (.*)/
        },
        "ViolConc D Op.77" : {
            fixAlbumTitle: concerto({ for:"Violinn", major: "D", op: 77}),
            fixTrackName: /Konzert für Violine und Orchester D-Dur, Op. 77 [IV]+\. (.*)/
        },
        "ViolSon 1 G Op.78" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ for:"Violin", num: 1, major: "G", op: 78}),
            fixTrackName: /Sonata for Violin and Piano No. 1 in G major, Op. 78 [IV]+\. (.*)/
        },
        "ViolSon 2 A Op.100" : {
            fixAlbumTitle: sonata({ for:"Violin", num: 2, major: "a", op: 100}),
            fixTrackName: /Sonata for Violin and Piano No. 2 in A major, Op. 100 [IV]+\. (.*)/
        },
        "ViolSon 3 d Op.108" : {
           firstTrackNumber: 7,
           fixAlbumTitle: sonata({ for:"Violin", num: 3, minor: "d", op: 108}),
           fixTrackName: /Sonata for Violin and Piano No. 3 in D minor, Op. 108 [IV]+\. (.*)/
       }
    },
    "Britten" : {
        "The Turn of the Screw 1" : {
            fixTrackNameFunc: function(name: string, logger) : string {
                if (name === "Act 1- Prologue") {
                    return "Prologue";
                }
                if (name === "Theme - Scene 1 The Journey") {
                    return "The Journey";
                }
                var m = /Variation [IVX]+ - Scene \d+ (.*)/.exec(name);
                if (!m) {
                    throw new Error("Pattern mismatch in Britten/Turn of the screw 1");
                }
                return m[1];
            }
        },
        "The Turn of the Screw 2" : {
            fixTrackName: /The Turn of the Screw Act II, Variation [IVX]+ - Act II, Scene \d+ (.*)/
        },
        "Violin Concerto" : {
            fixAlbumTitle: concerto({for:"Violin", op: 15 }),
            fixTrackName: /Violin Concerto Op\.15 \-I+\- (.*)/
        },
        "Young Person's Guide to the Orchestra" : {
            firstTrackNumber: 23,
            fixTrackName: /Young Person's Guide to the Orchestra, Op. 34 [IVX]+\. (.*)/
        }
    },
    "Bruch" : {
        "Scottish Fantasy" : {
            firstTrackNumber: 4,
            fixTrackName: /Scottish Fantasy (.*)/
        },
        "Violin Conc 1" : {
            fixAlbumTitle: concerto({for:"Violin", num: 1 }),
            fixTrackName: /Concerto No.1 (.*)/
        },
        "ViolinConcert[Menuhin]" : {
            fixAlbumTitle: concerto({for:"Violin", num: 1, by: "Menuhin" }),
            firstTrackNumber: 4,
            fixTrackName: /Yehudi Menuhin - [IV]+\. (.*)/
        }
    },
    "Bruckner" : {
        "Mass in C Minor" : {
          // TODO fixAlbumTitle
            firstTrackNumber: 9,
            fixTrackName: /Mass in C Minor - (.*)/
        },
        "Mass in E Minor" : {
          // TODO fixAlbumTitle
            fixTrackName: /Mass No 2 in E minor - (.*)/
        },
        "Two songs" : {
            firstTrackNumber: 7,
            fixTrackName: /(.*)/
        }
    },
    // CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
    "Camarón" : {
        "Te Lo Dice Camarón" : {
            fixTrackName: /Camarón - (.*)/
        }
    },
    "Carl Nielsen" : {
      "Symph 1" : {
          fixAlbumTitle: symphony({ num : 1 }),
          fixTrackName: /\d - (.*)/
      },
      "Symph 4" : {
          fixAlbumTitle: symphony({ num : 4 }),
          firstTrackNumber: 6,
          fixTrackName: /\d - (.*)/
      },
      "Two Orch Pieces" : {
          validation : ["skipTrackNumberCheck"]
      }
    },
    "Corelli" : {
        "Conc 1 D" : {
            fixAlbumTitle: concerto({num: 1, major:"D", op:[6,1]}),
            fixTrackName: /Concerto No.1 in D major [IV]+\.(.*)/
        },
        "Conc 2 F" : {
            firstTrackNumber: 8,
            fixAlbumTitle: concerto({num: 2, major:"F", op:[6,2]}),
            fixTrackName: /Concerto No.2 in F -[IV]+- (.*)/
        },
        "Conc 3 c" : {
            firstTrackNumber: 12,
            fixAlbumTitle: concerto({num: 3, minor:"C", op:[6,3]}),
            fixTrackName: /Concerto No.3 in C minor -[IV]+- (.*)/
        },
        "Conc 4 D" : {
            firstTrackNumber: 17,
            fixAlbumTitle: concerto({num: 4, major:"D", op:[6,4]}),
            fixTrackName: /Concerto No.4 in D -[IV]+- (.*)/
        },
        "Conc 5 B flat" : {
            firstTrackNumber: 21,
            fixAlbumTitle: concerto({num: 5, major:"Bb", op:[6,5]}),
            fixTrackName: /Concerto #5 in B Flat [IV]+\. (.*)/
        },
        "Conc 6 F" : {
            firstTrackNumber: 25,
            fixAlbumTitle: concerto({num: 6, major:"F", op:[6,6]}),
            fixTrackName: /Concerto No.6 in F -[IV]+- (.*)/
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
            fixTrackName: /CPE Bach - Sonata Wq78 - (.*)/
        }
    },

    "Charles-François Gounod" : {
        "Messe Solennelle de Sainte Cécile - St. Cecilia Mass - Cäcilienmesse" : {
          // TODO fixAlbumTitle
            fixTrackName: /Messe Solennelle de Sainte Cécile: (?:[IVX]+\. )?(.*)/
        }
    },

    "Frédéric Chopin" : {
        "Ballades & Etudes" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "CelloSonata" : {
            fixAlbumTitle: sonata({ for:"Cello", op:65, minor: "G", by:"Rostropovich" }),
            firstTrackNumber: 7,
            fixTrackName: /Cello Sonata in G minor, op. 65: [IV]+\. (.*) \(cello: Mstislav Rostropovich, piano: Martha Argerich\)/
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
        "Nocturnes[Rubinstein]" : {
            firstTrackNumber: 8,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "PianoConc1" : {
          fixAlbumTitle: concerto({num:1, for:"Piano", minor:"E", op:11 }),
           fixTrackName: /Concerto for Piano and Orchestra no. 1 in E minor, op. 11: [IV]+\. (.*)/
       },
       "PianoConcerto1[Rubinstein]" : {
          fixAlbumTitle: concerto({num:1, for:"Piano", minor:"E", op:11, by: "Rubinstein" }),
            fixTrackName: /Concerto for Piano and Orchestra No. 1 in E minor, Op. 11: [IV]+\. (.*)/
        },
       "PianoConc2" : {
            fixAlbumTitle: concerto({num:2, for:"Piano", minor:"F", op:21 }),
            firstTrackNumber: 4,
            fixTrackName: /Concerto for Piano and Orchestra no. 2 in F minor, op. 21: [IV]+\. (.*)/
       },
        "PianoConcerto2[Rubinstein]" : {
            fixAlbumTitle: concerto({num:2, for:"Piano", minor:"F", op:21, by: "Rubinstein" }),
            firstTrackNumber: 4,
            fixTrackName: /Concerto for Piano and Orchestra No. 2 in F minor, Op. 21: [IV]+\. (.*)/
        },
       "PianoTrio" : {
            fixAlbumTitle: trio({for:"Piano", minor:"G", op:8, by: "Beaux Arts" }),
            fixTrackName: /Piano Trio in G minor, op. 8: [IV]+\. (.*) \(Beaux Arts Trio\)/
       },
       "Polonaises" : {
           validation : ["skipUniqueTrackNameCheck"]
       },
       "Preludes, Impromptus & Scherzoz" : {
           validation : ["skipUniqueTrackNameCheck"]
       },
       "Sonata1" : {
           fixAlbumTitle: sonata({num: 1, minor:"C", op: 4, by: "Zilberstein"}),
           fixTrackName: /Piano Sonata no. 1 in C minor, op. 4: [IV]+\. (.*) \(feat. piano: Lilya Zilberstein\)/
       },
       "Sonata2" : {
           fixAlbumTitle: sonata({num: 2, minor:"Bb", op: 35, by: "Pollini"}),
           firstTrackNumber: 5,
           fixTrackName: /Piano Sonata no. 2 in B-flat minor, op. 35: [IV]+\. (.*) \(feat. piano: Maurizio Pollini\)/
       },
       "Sonata3" : {
           fixAlbumTitle: sonata({num: 3, minor:"B", op: 58, by: "Pollini"}),
           firstTrackNumber: 9,
           fixTrackName: /Piano Sonata no. 3 in B minor, op. 58: [IV]+\. (.*) \(feat. piano: Maurizio Pollini\)/
       },
       "Waltzes[Ashkenazy]" : {
           validation : ["skipUniqueTrackNameCheck"]
        },
        "WaltzOp65[Rubinstein]" : {
            firstTrackNumber: 7
        }
    },
    // DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDdd
    "Debussy" : {
        "ChildrensCorner" : {
            firstTrackNumber: 7,
            fixTrackName: /Children's Corner, suite for piano \(or orchestra\), L\. 113: (.*)/
        },
        "EnBlancEtNoire" : {
           firstTrackNumber: 8,
           fixTrackName: /En blanc et noir, L 134: I+\. (.*)/
       },
       "epigraphes antiques" : {
            firstTrackNumber: 16,
            fixTrackName: /6 épigraphes antiques, L 131: [IV]+\. (.*)/
        },
        "Etudes" : {
            firstTrackNumber: 19,
            fixTrackName: /Études \(6\) for piano, Book 2, L. 136-7-12: (.*)/
        },
        "Images" : {
            firstTrackNumber: 4,
            fixTrackName: /Images \(3\), for piano, Set I+, L\. \d+: (.*)/
        },
        "MidiDunFaune" : {
            firstTrackNumber: 7
        },
        "PetiteSuiteL65" : {
          // TODO fixAlbumTitle
            firstTrackNumber: 11,
            fixTrackName: /Petite suite, L 65: [IV]+\. (.*)/
        },
        "PianoPieces" : {
            validation : ["skipTrackNumberCheck"]
        },
        "Preludes" : {
            firstTrackNumber: 11,
            fixTrackName: /Préludes \(12\) for piano, Book [I]+, L. \d+: (.*)/
        },
        "SuiteBergamasque" : {
            firstTrackNumber: 15,
            fixTrackName: /Suite Bergamasque, L 75: [IV]+\. (.*)/
        },
        "ThreePieces" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Donizetti" : {
        "Lucia1" : {
            fixTrackName: /Lucia di Lammermoor (.*)/
        },
        "Lucia2" : {
            fixTrackName: /Lucia di Lammermoor (.*)/
        }
    },
    "Dvorak" : {
        "Symph7" : {
            fixAlbumTitle: symphony({num: 7}),
            fixTrackName: /Dvorak- Sym#7- [IV]+\.(.*)/
        },
        "Symph8" : {
            fixAlbumTitle: symphony({num: 8, major: "C", op: 88}),
            fixTrackName: /Symphony 8 in C major Op 88 - (.*)/
        },
        "Symph9" : {
            fixAlbumTitle: symphony({num: 9, minor: "E", op: 95, subTitle: "New World"}),
            firstTrackNumber: 5,
            fixTrackName: /Symphony 9 in E minor Op 95 New World - (.*)/
        }
    },
    // EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    "Elgar" : {
        "Cello" : {
            fixAlbumTitle: concerto({ for: "Cello", op:85, minor : "E" }),
            fixTrackName: /Cello Concerto in E minor, Op. 85 [IV]+\. (.*)/
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
            fixTrackName: /Furtwangler - (Adagio solemne)/
        }
    },
    // GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
    "Gershwin" : {
        "An American in Paris[Previn]" : {
            firstTrackNumber: 2
        },
        "PianoConc" : {
            fixAlbumTitle: concerto({for: "Piano", major: "F"}),
            fixTrackName: /Gershwin - Concerto for Piano and Orchestra in F - [IV]+\. (.*)/
        },
        "PianoConc[Previn]" : {
            fixAlbumTitle: concerto({for: "Piano", major: "F", by: "Previn"}),
            firstTrackNumber: 3,
            fixTrackName: /Piano Concerto in F: [IV]+\. (.*)/
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
        "CelloSonata" : {
            fixAlbumTitle: sonata({ for: "Cello", op:36, minor : "A" }),
            fixTrackName: /Cello Sonata in A minor, op. 36: [IV]+\. (.*)/
        },
        "FourPieces" : {
            firstTrackNumber: 7,
            fixTrackName: /Four Pieces, op. 78: [IV]+\. (.*)/
        },
        "From Holberg's Time" : {
            firstTrackNumber: 9,
            fixTrackName: /From Holberg's Time, op. 40: [IV]+\. (.*)/
        },
        "Haugtussa[vonOtter]" : {
           fixTrackName: /»Haugtussa« Op. 67: [IV]+\. (.*)/
       },
       "LyricPieces[Andsnes]" : {
           firstTrackNumber: 8,
           fixTrackName: /Lyrical Pieces op. 65: [IV]+\. (.*)/
       },
        "PeerGynt1" : {
            fixTrackName: /Peer Gynt Suite no. 1, op. 46: [IV]+\. (.*)/
        },
        "PeerGynt2" : {
            firstTrackNumber: 5,
            fixTrackName: /Peer Gynt Suite no. 2, op. 55: [IV]+\. (.*)/
        },
        "PianoConcerto[Richter]" : {
            fixAlbumTitle: concerto({for:"Piano", minor:"A", op:16, by: "Richter" }),
            fixTrackName: /Piano concerto a minor op 16 - Richter - (.*)/
        },
        "PianoConcerto[Andsnes]" : {
            fixAlbumTitle: concerto({for:"Piano", minor:"A", op:16, by: "Andsnes" }),
            fixTrackName: /Piano Concerto: [IV]+\. (.*)/
        },
        "Sanger[vonOtter]" : {
           firstTrackNumber: 15,
           validation : ["skipUniqueTrackNameCheck"]
       },
       "SeksSange[vonOtter]" : {
            firstTrackNumber: 9,
            fixTrackName: /Seks Sange Op. 48: [IV]+\. (.*)/
        },
        "Three psalms" : {
            firstTrackNumber: 7,
            fixTrackName: /Psalms - (.*)/
        },
        "TwoPieces" : {
          firstTrackNumber: 5,
          fixTrackName: /Two Pieces, op\. 77: [IV]+\. (.*)/
        },
        "ViolinSonata" : {
            fixAlbumTitle: sonata({for:"Violin", major:"G", op:13 }),
            firstTrackNumber: 4,
            fixTrackName: /ViolinSonata G major Op 13 - (.*)/
        }
    },
    "Grigny" : {
        "Two organ pieces" : {
            firstTrackNumber: 4,
            fixTrackName: /Grigny - (.*)/
        }
    },
    // HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
    "Handel" : {
        "ConcertoInC" : {
            fixAlbumTitle: concerto_grosso({major:"C"}),
            fixTrackName: /Concerto Grosso in C - \d+\.? (.*)/
        },
        "ConcertoOp3-1" : {
            fixAlbumTitle: concerto_grosso({major:"Bb", op:[3,1]}),
            firstTrackNumber: 9,
            fixTrackName: /Concerto Grosso Op. 3 No.1 in B flat - \d+ (.*)/
        },
        "ConcertoOp3-3" : {
            fixAlbumTitle: concerto_grosso({major:"G", op:[3,3]}),
            firstTrackNumber: 5,
            fixTrackName: /Concerto Grosso Op. 3 No.3 in G - \d+ (.*)/
        },
        "ConcertoOp3-6" : {
            fixAlbumTitle: concerto_grosso({major:"D", op:[3,6]}),
            firstTrackNumber: 12,
            fixTrackName: /Concerto Grosso Op. 3 No.6 in D - \d+ (.*)/
        },
        "ConcertoOp6-1" : {
            fixAlbumTitle: concerto_grosso({major:"G", op:[6,1]}),
            firstTrackNumber: 14,
            fixTrackName: /Concerto Grosso Op. 6 No.1 in G - \d+ (.*)/
        },
        "ConcertoOp6-7" : {
            fixAlbumTitle: concerto_grosso({major:"Bb", op:[6,7]}),
            firstTrackNumber: 19,
            fixTrackName: /Concerto Grosso Op. 6 No.7 in B flat - \d+ (.*)/
        },
        "ConcertoOp6-9" : {
            fixAlbumTitle: concerto_grosso({major:"F", op:[6,9]}),
            firstTrackNumber: 24,
            fixTrackName: /Concerto Grosso Op. 6 No.9 in F - \d+ (.*)/
        },
        "Fireworks" : {
            firstTrackNumber: 10,
            fixTrackName: /Music for the Royal Fireworks - \d+ (.*)/
        },
        "HarpConcerto" : {
            fixAlbumTitle: concerto({for:"Harp", major:"Bb", HWV:294}),
            fixTrackName: /Concerto for Harp in B flat major - HWV 294 - \d - (.*)/
        },
        "HornConcerto" : {
            fixAlbumTitle: concerto({num:2, for:"Two Horns", major:"F", HWV:333}),
            firstTrackNumber: 12,
            fixTrackName: /Concerto a due cori No.2 in F major - HWV 333 - \d - (.*)/
        },
        "JudasMaccabeus" : {
            firstTrackNumber: 7,
            fixTrackName: /Judas Maccabeus - \d (.*)/
        },
        "OboeConcerto" : {
            fixAlbumTitle: concerto({num:3, for:"Oboe", minor:"G", HWV:287}),
            firstTrackNumber: 8,
            fixTrackName: /Concerto for Oboe No.3 in G minor - HWV 287 - \d - (.*)/
        },
        "OrganConcerto" : {
            fixAlbumTitle: concerto({for:"Organ", major:"F", HWV:295, subTitle:"Cuckoo and Nightingale"}),
            firstTrackNumber: 4,
            fixTrackName: /Concerto for Organ in F major - HWV 295 - Cuckoo and Nightingale - \d - (.*)/
        },
        "Sinfonia" : {
            fixTrackName: /Sinfonia in B flat for 2 Violins and Continuo - \d (.*)/
        },
        "SonataInA" : {
            fixAlbumTitle: sonata({for:"Flute", minor:"A"}),
            firstTrackNumber: 9,
            fixTrackName: /Sonata in A minor Halle No.1 for Flute - \d (.*)/
        },
        "SonataInB" : {
            fixAlbumTitle: sonata({for:"Violin, Oboe, Strings and Continuo", major:"Bb"}),
            firstTrackNumber: 29,
            fixTrackName: /Sonata à 5 in B flat for Violin, Oboe, Strings and Continuo - \d (.*)/
        },
        "SonataInD" : {
            fixAlbumTitle: sonata({for:"Recorder and Continuo", minor:"D"}),
            firstTrackNumber: 13,
            fixTrackName: /Sonata in D minor for Recorder and Continuo - \d (.*)/
        },
        "SonataInE" : {
            fixAlbumTitle: sonata({for:"Two Flutes", minor:"E"}),
            firstTrackNumber: 20,
            fixTrackName: /Sonata in E minor for 2 Flutes - \d (.*)/
        },
        "SonataInF" : {
            fixAlbumTitle: sonata({for:"Oboe and Continuo", minor:"F", op:[1,5]}),
            firstTrackNumber: 4,
            fixTrackName: /Sonata in F, Op. 1 No.5 for Oboe and Continuo - \d (.*)/
        },
        "SonataInG" : {
            fixAlbumTitle: sonata({for:"Two Violins and Continuo", major:"G", op:[5,4]}),
            firstTrackNumber: 24,
            fixTrackName: /Sonata in G, Op. 5 No.4 for Two Violins and Continuo - \d (.*)/
        },
        "TheKingShallRejoice" : {
            firstTrackNumber: 15,
            fixTrackName: /The King Shall Rejoice - \d (.*)/
        },
        "WaterMusic2" : {
            firstTrackNumber: 19,
            fixTrackName: /Water Music Suite 2 in D - \d (.*)/
        },
        "WaterMusic3" : {
            firstTrackNumber: 3,
            fixTrackName: /Water Music Suite 3 in G - \d (.*)/
        }
    },
    "Haydn":{
        "CelloConc 1 C" : {
            fixAlbumTitle: concerto({ for:"Cello", num : 1, major: "C" }),
            fixTrackName: /Cello Concerto No. 1 in C major, Hob VIIb 1 [IV]+\. (.*)/
        },
        "CelloConc 2 D" : {
            fixAlbumTitle: concerto({ for:"Cello", num : 2, major: "D" }),
            firstTrackNumber: 4,
            fixTrackName: /Cello Concerto No. 2 in D major, Hob VIIb 2 [IV]+\. (.*)/
        },
        "PianoConc 11" : {
            fixAlbumTitle: concerto({ for:"Piano", num : 11, major: "D" }),
            firstTrackNumber: 7,
            fixTrackName: /Piano Concerto No. 11 in D major, Hob XVIII 11 [IV]+\. (.*)/
        },
        "PianoConc 3" : {
            fixAlbumTitle: concerto({ for:"Piano", num : 3, major: "F" }),
            firstTrackNumber: 4,
            fixTrackName: /Piano Concerto No. 3 in F major, Hob XVIII 3 [IV]+\. (.*)/
        },
        "PianoConc 4" : {
            fixAlbumTitle: concerto({ for:"Piano", num : 4, major: "G" }),
            fixTrackName: /Piano Concerto No. 4 in G major, Hob XVIII 4 [IV]+\. (.*)/
        },
        "PianoTrio42 E flat" : {
            fixAlbumTitle: trio({ for:"Piano", num : 42, major: "Eb" }),
            firstTrackNumber: 10,
            fixTrackName: /Piano Trio in E-Flat Major, Hob. XV 30 No.42 \(1795\) - [IV]+\. (.*)/
        },
        "PianoTrio43 C" : {
            fixAlbumTitle: trio({ for:"Piano", num : 43, major: "C" }),
            fixTrackName: /Piano Trio in C Major, Hob. XV 27 No.43 \(1797\) - [IV]+\. (.*)/
        },
        "PianoTrio44 E" : {
            fixAlbumTitle: trio({ for:"Piano", num : 44, major: "E" }),
            firstTrackNumber: 4,
            fixTrackName: /Piano Trio in E Major, Hob. XV 28 No.44 \(1797\) - [IV]+\. (.*)/
       },
       "PianoTrio45 E flat" : {
           fixAlbumTitle: trio({ for:"Piano", num : 45, major: "Eb" }),
           firstTrackNumber: 7,
           fixTrackName: /Piano Trio in E-Flat Major, Hob. XV 29 No.45 \(1797\) - [IV]+\. (.*)/
        },
        "Quartet23 f Op20 No5" : {
            fixAlbumTitle: quartet({ num : 23, minor: "f", op: [20, 5] }),
            firstTrackNumber: 5,
            fixTrackName: /Quartet No.23 in F Minor, Op. 20, No.5-(.*)/
        },
        "Quartet24 A Op20 No6" : {
            fixAlbumTitle: quartet({ num : 24, major: "A", op: [20, 6] }),
            firstTrackNumber: 9,
            fixTrackName: /Quartet No.24 in A Major, Op. 20, No.6-(.*)/
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
            fixTrackName: /Quartet No.27 in D Major, Op. 20, No.4-(.*)/
        },
        "Quartet29 G Op33 No5 'How do you do_'" : {
            fixAlbumTitle: quartet({ num : 29, major: "G", op: [33, 5], subTitle: "How do you do" }),
            fixTrackName: /String Quartet in G major, Op. 33 No. 5 - (.*)/
        },
        "Quartet30 E flat Op33 No2 'Joke'" : {
            fixAlbumTitle: quartet({ num : 30, major: "Eb", op: [33, 2], subTitle: "Joke" }),
            firstTrackNumber: 9,
            fixTrackName: /String Quartet in E-flat major, Op. 33 No. 2 - (.*)/
        },
        "Quartet32 C Op33 No3 'Bird'" : {
            fixAlbumTitle: quartet({ num : 32, major: "C", op: [33, 3], subTitle: "Bird" }),
            firstTrackNumber: 5,
            fixTrackName: /String Quartet in C major, Op. 33 No. 3 - (.*)/
        },
        "Quartet54 B flat Op71 No1" : {
            fixAlbumTitle: quartet({ num : 55, major: "Bb", op: [71, 1] }),
            fixTrackName: /Op. 71-1 - (.*)/
       },
       "Quartet55 D Op71 No2" : {
           fixAlbumTitle: quartet({ num : 55, major: "D", op: [71, 2] }),
            firstTrackNumber: 5,
            fixTrackName: /Op. 71-2 - (.*)/
        },
        "Quartet56 E flat Op71 No3" : {
            fixAlbumTitle: quartet({ num : 56, major: "Eb", op: [71, 3] }),
            firstTrackNumber: 9,
            fixTrackName: /Op. 71-3 - (.*)/
        },
        "Sonata 48 in C major, H.XVI_48" : {
            fixAlbumTitle: sonata({ num : 48, major: "C" }),
            firstTrackNumber: 3,
            fixTrackName: /[IV]+\. (.*)/
        },
        "Sonata49 E flat" : {
            fixAlbumTitle: sonata({ num : 49, major: "Eb" }),
            firstTrackNumber: 5,
            fixTrackName: /(?:Sonata in E-flat major, H.XVI 49 - )?[IV]+\. (.*)/
        },
        "Symph100 G 'Military'" : {
            fixAlbumTitle: symphony({ num : 100, major: "G", subTitle:"Military" }),
            firstTrackNumber: 9,
            fixTrackName: /Symphony in G, Hob. I 100 Military , [IV]+\. (.*)/
        },
        "Symph101 D 'Clock'" : {
            fixAlbumTitle: symphony({ num : 101, major: "D", subTitle:"Clock" }),
            firstTrackNumber: 9,
            fixTrackName: /Symphony in D, Hob. I 101 Clock , [IV]+\. (.*)/
        },
        "Symph102 B flat" : {
            fixAlbumTitle: symphony({ num : 102, major: "Bb" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony No. 102 in B flat major, Hob I 102 [IV]+\. (.*)/
        },
        "Symph103 E-flat" : {
            fixAlbumTitle: symphony({ num : 103, major: "Eb", subTitle:"Drumroll" }),
            firstTrackNumber: 9,
            fixTrackName: /Symphony No. 103 in E flat major, Drumroll , Hob I 103 [IV]+\. (.*)/
        },
        "Symph104 D" : {
            fixAlbumTitle: symphony({ num : 104, major: "D" }),
            firstTrackNumber: 9,
            fixTrackName: /Symphony No. 104 in D major, London , Hob I 104 [IV]+\. (.*)/
        },
        "Symph22 E flat 'Philosopher'" : {
            fixAlbumTitle: symphony({ num : 22, major: "Eb", subTitle:"Philosopher" }),
            firstTrackNumber: 5,
            fixTrackName: /[IV]+\. (.*)/
        },
        // TODO add symph 44, sonatas 50, 51, 52, quartet 28
        "Symph64 A 'Tempora mutantur'" : {
            fixAlbumTitle: symphony({ num : 64, major: "A", subTitle:"Tempora mutantur" }),
            firstTrackNumber: 9,
            fixTrackName: /[IV]+\. (.*)/
        },
        "Symph93 D" : {
            fixAlbumTitle: symphony({ num : 93, major: "D" }),
            fixTrackName: /Symphony in D, Hob. I 93, [IV]+\. (.*)/
        },
        "Symph94 G 'Surprise'" : {
            fixAlbumTitle: symphony({ num : 94, major: "G", subTitle:"Surprise" }),
            fixTrackName: /Symphony in G, Hob. I 94 Surprise , [IV]+\. (.*)/
       },
       "Symph95 c" : {
           fixAlbumTitle: symphony({ num : 95, minor: "c" }),
           fixTrackName: /Symphony No. 95 in C minor, Hob I 95 [IV]+\. (.*)/
        },
        "Symph96 D 'Miracle'" : {
            fixAlbumTitle: symphony({ num : 96, major: "D", subTitle:"Miracle" }),
            fixTrackName: /Symphony No. 96 in D major, Miracle , Hob I 96 [IV]+\. (.*)/
        },
        "Symph97 C" : {
            fixAlbumTitle: symphony({ num : 97, major: "C" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony in C, Hob. I 97, [IV]+\. (.*)/
        },
        "Symph98 B flat" : {
            fixAlbumTitle: symphony({ num : 98, major: "Bb" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony No. 98 in B flat major, Hob I 98 [IV]+\. (.*)/
        },
        "Symph99 E-flat" : {
            fixAlbumTitle: symphony({ num : 99, major: "Eb" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony in E flat, Hob. I 99, [IV]+\. (.*)/
        }
    },
    // HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
    "Hindemith" : {
        "ViolinConcerto" : {
            fixAlbumTitle: concerto({for:"Violin" }),
            firstTrackNumber: 16,
            fixTrackName: /Hindemith - Concerto for violin and orchestra - (.*)/
        }
    },
    // IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    "In_the_country" : {
        "Losing stones, collecting bones" : {
            fixTrackName: /In the country - (.*)/
        }
    },
    "Ives" : {
        "Hymns" : {
            firstTrackNumber: 5,
            fixTrackName: /Ives Hymns \d+ (.*)/
        },
        "Symphony1" : {
            fixAlbumTitle: symphony({ num: 1 }),
            fixTrackName: /Ives Symphony No.1 \d+ (.*)/
        },
        "Symphony4" : {
            fixAlbumTitle: symphony({ num: 4 }),
            firstTrackNumber: 10,
            fixTrackName: /Ives Symphony No.4 \d+ (.*)/
        }
    },
    // JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
    "Jackie_Treehorn" : {
        "We are Jackie Treehorn" : {
            fixTrackName: /Jackie Treehorn - (.*)/
        }
    },
    "Janáček" : {
        "Jenůfa1" : {
            fixTrackName: /Jenůfa Jednání I\. (.*)/
        },
        "Jenůfa2" : {
            firstTrackNumber: 9,
            fixTrackName: /Jenůfa Jednání II\. (.*)/
        },
        "Jenůfa3" : {
            firstTrackNumber: 5,
            fixTrackName: /Jenůfa Jednání III\. (.*)/
        },
        "Jenůfa Extras" : {
            firstTrackNumber: 14
        }
    },
    "James MacMillan" : {
        "Seven Last Words from the Cross" : {
            fixTrackName: /Seven Last Words from the Cross \(1993\) \d. (.*)/
        },
        "Cantos Sagrados" : {
            firstTrackNumber: 8,
            fixTrackName: /Cantos Sagrados \(1989\) \d. (.*)/
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
            fixTrackName: /Missa de batalla - (.*)/
        },
        "Missa pro Defunctis" : {
            fixTrackName: /Missa [Pp]ro [Dd]efunctis - (.*)/
        }
    },
    // KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
    "Khachaturian" : {
        "Piano Concerto" : {
            fixAlbumTitle: concerto({ for: "Piano", major: "Db" }),
            fixTrackName: /Khachaturian Piano Concerto in Db - [I]+ (.*)/
        },
        "Sonatina" : {
            firstTrackNumber: 4,
            fixTrackName: /(?:Khachaturian Sonatina - )?I+\.? (.*)/
        },
        "Toccata" : {
            firstTrackNumber: 7,
            fixTrackName: /(Toccata) \(1932\)/
        }
    },
    "Kodaly" : {
      "Hary Janos Suite" : {
          firstTrackNumber: 16
      }
  },
    "Korngold" : {
        "ViolinConc[Ehnes]" : {
            fixAlbumTitle: concerto({ for: "Violin", op:[35], major: "D" }),
            fixTrackName: /Korngold - Violin Concerto in D, [Oo]p\. ?35 - I+ - (.*)/
        }
    },
    "Kronos_Quartet" : {
        "Black Angels" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Karkwa" : {
        "Les Chemins de verre" : {
            fixTrackName: /Karkwa - (.*)/
        }
    },
    "Kayhan Kalhor" : {
        "Ali Akbar Moradi" : {
            fixTrackName: /Kayhan Kalhor - (.*)/
        }
    },
    "Knut Reiersrud" : {
        "Himmelskip" : {
            fixTrackName: /Knut Reiersrud - (.*)/
        }
    },
    "Kristorn" : {
        "69" : {
            fixTrackName: /Kriston - 69-\d+ (.*)/
        }
    },
    // LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
    "Lassus" : {
      "Missa Bell' Amfitrit" : {
          firstTrackNumber: 8,
          fixTrackName: /(?:Lassus Missa Bell' Amfitrit' altera - )?(.*)/
      }
  },
    "Lisa LeBlanc" : {
        "Lisa LeBlanc" : {
            fixTrackName: /Lisa LeBlanc - (.*)/
        }
    },
    "Liszt" : {
        "Five pieces [Brendel]" : {
          validation : ["skipTrackNumberCheck"]
        },
        "PianoConcerto1 [Richter]" : {
          fixAlbumTitle: concerto({ num : 1, major : "Eb", by: "Richter" }),
          fixTrackName: /Piano Concerto no. 1 in E-flat major: [IV]+\. (.*)/
      },
      "PianoConcerto2 [Richter]" : {
          fixAlbumTitle: concerto({ num : 2, major : "A", by: "Richter" }),
          firstTrackNumber: 5,
          fixTrackName: /Piano Concerto no\. 2 in A major: [IV]+\. (.*)/
      },
      "PianoConcerto2[Andsnes]" : {
          fixAlbumTitle: concerto({ num : 2, major : "A", by: "Andsnes" }),
          firstTrackNumber: 4,
          fixTrackName: /Piano Concerto No. 2 in A minor: [IV]+\. (.*)/
      },
      "Sonata in b [Richter]" : {
         fixAlbumTitle: sonata({ for: "Piano", minor : "B", by: "Richter" }),
         firstTrackNumber: 9,
         fixTrackName: /Piano Sonata in B minor: [IV]+\. (.*)/
     }
    },
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    "Mahler" : {
        "Fahrenden Gesellen[Ludwig]" : {
            fixTrackName: /Lieder eines Fahrenden Gesellen - (.*)/,
        },
        "Five Songs[Ludwig]" : {
            firstTrackNumber: 10
        },
        "Kindertotenlieder[Ludwig]" : {
           firstTrackNumber: 5,
           fixTrackName: /Kindertotenlieder - (.*)/
       },
       "Symph1[Chailly]" : {
           fixAlbumTitle: symphony({ num : 1, subTitle:"Titan", major : "D", by: "Chailly" }),
           fixTrackName: /Symphony No. 1 in D major: [IV]+\. (.*)/
        },
        "Symph1[Haitink]" : {
            fixAlbumTitle: symphony({ num : 1, subTitle:"Titan", major : "D", by: "Haitink" }),
            fixTrackName: /Symphony No. 1 in D Titan [IV]+\. (.*)/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Symph2[Chailly]" : {
            fixAlbumTitle: symphony({ num : 2, subTitle:"Resurrection", minor : "C", by: "Chailly" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony No. 2 in C minor: [IVi\-]+\. (.*)/
        },
        "Symph2[Haitink]" : {
            fixAlbumTitle: symphony({ num : 2, subTitle:"Resurrection", minor : "C", by: "Haitink" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony No. 2 in C minor Resurrection [IV]+\. (.*)/
        },
        "Symph3[Chailly]" : {
            fixAlbumTitle: symphony({ num : 3, minor : "D", by: "Chailly" }),
            fixTrackName: /Symphony No. 3 in D minor: [IV]+\. (.*)/
        },
        "Symph3[Haitink]" : {
            fixAlbumTitle: symphony({ num : 3, minor : "D", by: "Haitink" }),
            fixTrackName: /Symphony No. 3 in D minor [IV]+\. Part I+\. (.*)/,
        },
        "Symph4[Chailly]" : {
            fixAlbumTitle: symphony({ num : 4, major: "G", by: "Chailly" }),
            firstTrackNumber: 2,
            fixTrackName: /Symphony No. 4 in G major: [IV]+\. (.*)/
        },
        "Symph4[Haitink]" : {
            fixAlbumTitle: symphony({ num : 4, major: "G", by: "Haitink" }),
            firstTrackNumber: 2,
            fixTrackName: /Symphony No. 4 in G major [IV]+\. (.*)/
        },
        "Symph4[Solti]" : {
            fixAlbumTitle: symphony({ num : 4, major: "G", by: "Solti" }),
            fixTrackName: /Symphony No. 4 in G major: [IV]+\. (.*)/
        },
        "Symph5[Barbirolli]" : {
            fixAlbumTitle: symphony({ num : 5, minor: "C#", by: "Barbirolli" })
        },
        "Symph5[Chailly]" : {
            fixAlbumTitle: symphony({ num : 5, minor: "C#", by: "Chailly" }),
            fixTrackName: /Symphony No. 5 in C-sharp minor: [IV]+\. (.*)/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Symph5[Haitink]" : {
            fixAlbumTitle: symphony({ num : 5, minor: "C#", by: "Haitink" }),
            fixTrackName: /Symphony No. 5 in C-sharp minor [IV]+\. Part I+\. (.*)/
        },
        "Symph6[Chailly]" : {
            fixAlbumTitle: symphony({ num : 6, subTitle:"Tragic", minor : "A", by: "Chailly" }),
            fixTrackName: /Symphony No. 6 in A minor: [IV]+\. (.*)/
        },
        "Symph6[Haitink]" : {
            fixAlbumTitle: symphony({ num : 6, subTitle:"Tragic", minor : "A", by: "Haitink" }),
            firstTrackNumber: 2,
            fixTrackName: /Symphony No. 6 in A minor [IV]+\. (.*)/
        },
        "Symph7[Chailly]" : {
            fixAlbumTitle: symphony({ num : 7, minor : "E", by: "Chailly" }),
            firstTrackNumber: 2,
            fixTrackName: /Symphony No. 7 in E minor: [IV]+\. (.*)/
        },
        "Symph7[Haitink]" : {
            fixAlbumTitle: symphony({ num : 7, minor : "E", by: "Haitink" }),
            fixTrackName: /Symphony No. 7 in E minor [IV]+\. (.*)/
        },
        "Symph8[Chailly]" : {
            fixAlbumTitle: symphony({ num : 8, subTitle:"Of A Thousand", major : "Eb", by: "Chailly" }),
            firstTrackNumber: 4,
            fixTrackName: /Symphony No. 8 in E-flat major: [IVivx\-]+\. (.*)/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Symph8[Haitink]" : {
            fixAlbumTitle: symphony({ num : 8, subTitle:"Of A Thousand", major : "Eb", by: "Haitink" }),
            fixTrackName: /Symphony no. 8 in E-flat major "Symphony of a Thousand": Teil \d: (.*)/
        },
        "Symph8[Järvi]" : {
            fixAlbumTitle: symphony({ num : 8, subTitle:"Of A Thousand", major : "Eb", by: "Järvi" }),
            fixTrackName: /Symphony No. 8 in E-flat major, Symphony of a Thousand (.*)/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Symph9[Chailly]" : {
            fixAlbumTitle: symphony({ num : 9, major : "D", by: "Chailly" }),
            fixTrackName: /Symphony No. 9 in D major: [IV]+\. (.*)/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Symph9[Haitink]" : {
            fixAlbumTitle: symphony({ num : 9, major : "D", by: "Haitink" }),
            firstTrackNumber: 2,
            fixTrackName: /Symphony No. 9 in D major [IV]+\. (.*)/
        },
        "Symph10[Chailly]" : {
            fixAlbumTitle: symphony({ num : 10, major : "F#", by: "Chailly/Deryck Cooke" }),
            fixTrackName: /Symphony no. 10: [IV]+\. (.*)/
        }
    },
    "Malcolm Arnold" : {
        "Symph1":{
            fixAlbumTitle: symphony({ num: 1, op: 27 }),
            fixTrackName: /(.*) - Symphony No\.1 Op\.22/
        },
        "PianoConcerto 3 hands" : {
            fixAlbumTitle: concerto({ for:"Piano", op: 104, subTitle: "2 pianos 3 hands" }),
            firstTrackNumber: 4,
            fixTrackName: /(.*) - Concerto for 2 Pianos \(3 Hands\) Op\.104/
        },
        "Five orch pieces" : {
            firstTrackNumber: 7
        }
    },
    "Madredeus" : {
        "O Espírito da Paz" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Medtner" : {
        "SonateOp11" : {
            fixAlbumTitle: sonata({ for:"Piano", op: 11 }),
            firstTrackNumber: 7,
            fixTrackName: /(?:Sonaten-Triade op\. 11 - )?Nr\. \d (.*)/
        },
        "Zwei Märchen" : {
            firstTrackNumber: 5,
            fixTrackName: /Zwei Märchen op. 8 - I+\. (.*)/
        },
    },
    "Mendelssohn" : {
        "Symph4" : {
            fixAlbumTitle: symphony({ num: 4, op: 90, major: "A", subTitle: "Italian" }),
            fixTrackName: /Symphonie Nr\. 4 A-Dur op\. 90 "Italienische": [IV]+\. (.*)/
        },
        "Symph5" : {
            fixAlbumTitle: symphony({ num: 5, op: 107, minor: "D", subTitle: "Reformation" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphonie Nr\. 5 d-Moll op\. 107 "Reformation": [IV]+\. (.*)/
       },
        "ViolinConcert[Menuhin]" : {
            fixAlbumTitle: concerto({ for: "Violin", op: 64, minor: "E" }),
            fixTrackName: /Yehudi Menuhin - [IV]+\. (.*)/
        }
    },
    "Maurice Jarre" : {
        "Lawrence of Arabia Soundtrack" : {
            fixTrackName: /Maurice Jarre - (.*)/
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
    "Moussorgsky" : {
        "Pictures (original)" : {
            firstTrackNumber: 16,
            fixTrackName: /Pictures at an exhibition - Original version \d+\. (.*)/
        },
        "Pictures (orchestral)" : {
            fixTrackName: /Pictures at an exhibition - Orchestral version by Ravel \d+\. (.*)/
        },
        "NightOnBaldMountain" : {
          firstTrackNumber: 9
      }
    },
    // OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    "Orff" : {
        "Carmina Burana" : {
            fixTrackName: /Carmina Burana (.*)/,
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    // PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
    "Poulenc" : {
        "The Story of Babar" : {
            firstTrackNumber: 10,
            fixTrackName: /The Story of Babar [IVX]+\. ?(.*)/
        }
    },
    "Prokofiev" : {
      "Alexander Nevsky [Complete]" : {
          fixTrackName: /Alexander Nevsky (.*)/
      },
      "Alexander Nevsky Suite" : {
          fixTrackName: /Alexander Nevsky, Op. 78 [IV]+\. (.*)/
      },
      "Andante Cantabile" : {
        firstTrackNumber: 12
      },
      "CelloConcertoOp125[YoYoMa]" : {
        // TODO fix work name
         fixTrackName: /Prokofiev - Cello concerto Op 125 - (.*)/
     },
      "Lieutenant Kijé" : {
         firstTrackNumber: 12,
         fixTrackName: /Lieutenant Kijé, Op. 60 [IV]+\. (.*)/
     },
     "Lieutenant Kijé [2]" : {
          firstTrackNumber: 5
      },
      "Love of Three Oranges" : {
         firstTrackNumber: 10
     },
     "Peter and the Wolf" : {
          fixTrackName: /Peter and the Wolf, Op. 67 [IVX]+\. (.*)/
      },
      "Scythian Suite Op20" : {
         firstTrackNumber: 8,
         fixTrackName: /Scythian Suite, Op. 20 [IV]+\. (.*)/
     },
     "Sinfonia Concertante" : {
        fixTrackName: /Sinfonia Concertante, Op.125 (.*)/
    },
    "Rococco Variations" : {
       firstTrackNumber: 4,
       fixTrackName: /Varições Rococó, Op\.33 (.*)/
   }
 },
 "Palestrina" : {
    "Motet Hodie Christus natus est" : {
        firstTrackNumber: 6
    },
    "Stabat Mater" : {
       firstTrackNumber: 7
   }
},
 "Puccini" : {
      "Madama Butterfly 1" : {
          fixTrackName: /Madama Butterfly Act I\. (.*)/
      },
      "Madama Butterfly 2" : {
       fixTrackName: /Madama Butterfly Act II, Part [IV]+\. (.*)/
     },
     "Tosca 1" : {
       fixTrackName: /Atto 1 - (.*)/
     },
     "Tosca 2" : {
       firstTrackNumber: 15,
       fixTrackName: /(?:Atto 2 -|Tosca, Atto II) (.*)/
     },
     "Tosca 3" : {
         firstTrackNumber: 8,
         fixTrackName: /Tosca, Atto III (.*)/
     },
     "Turandot 1" : {
       fixTrackName: /Turandot Act I. (.*)/
   },
   "Turandot 2" : {
       firstTrackNumber: 8,
       fixTrackName: /(?:Turandot Act II, Scene I+\.|Act 2 - Scene 2 - )(.*)/
   },
   "Turandot 3" : {
        firstTrackNumber: 5,
        fixTrackName: /Act 3 - Scene \d - (.*)/
    }
  },
  "Rachmaninoff" : {
    "PianoConcerto2[Janis]" : {
        fixAlbumTitle: concerto({num:2, for:"Piano", minor:"C", op:18, by: "Janis" }),
        firstTrackNumber: 4,
        fixTrackName: /Piano Concerto No. 2 in C minor, Op. 18 [IV]+\. (.*)/
    },
    "PianoConcerto2" : {
      fixAlbumTitle: concerto({num:2, for:"Piano", minor:"C", op:18 }),
       fixTrackName: /Piano Concerto No. 2 in C minor Op. 18 [IV]+\. (.*)/
   },
   "PianoConcerto3[Janis]" : {
        fixAlbumTitle: concerto({num:3, for:"Piano", minor:"D", op:30, by: "Janis" }),
        fixTrackName: /Piano Concerto No. 3 in D minor, Op. 30 [IV]+\. (.*)/
    },
    "Symph2" : {
        fixAlbumTitle: symphony({num:2, minor:"E", op:27 }),
        fixTrackName: /Symphony No. 2 in E minor, Op. 27: [IV]+\. (.*)/
    },
    "TheRockOp7" : {
       firstTrackNumber: 5
   },
    "TwoPreludes[Janis]" : {
       firstTrackNumber: 7,
       validation : ["skipUniqueTrackNameCheck"]
   },
   "Vespers (The Saint Petersburg Cappella, choirmaster: Vladislav Chernushenko)" : {
       fixTrackName: /Vespers, Op. 37: \d+\. (.*)/
   }
 },
 "Ravel" : {
    "Alborada del gracioso" : {
        firstTrackNumber: 6
    },
    "Bolero" : {
        firstTrackNumber: 8
    },
    "Daphnis et Chloe" : {
       firstTrackNumber: 3,
       fixTrackName: /Daphnis [Ee]t Chloe (.*)/
   },
    "MotherGooseSuite" : {
       firstTrackNumber: 2
   },
   "La Valse" : {
      firstTrackNumber: 2
    },
    "PianoConcerto D major left hand" : {
        fixAlbumTitle: concerto({for:"Piano", major:"D", subTitle:"left hand" }),
        firstTrackNumber: 7,
        fixTrackName: /Ravel - Concerto for the left hand in D major - (.*)/
   },
   "PianoConcerto G major" : {
        fixAlbumTitle: concerto({for:"Piano", major:"G" }),
        firstTrackNumber: 4,
        fixTrackName: /Ravel - Concerto for Piano and Orchestra in G major - [IV]+\. (.*)/
    },
    "PianoTrio" : {
        fixAlbumTitle: trio({for:"Piano", minor:"A" }),
       firstTrackNumber: 8,
       fixTrackName: /Pianotrio in a - \d (.*)/
   },
   "PianoPieces[Slåttebrekk]" : {
         firstTrackNumber: 9
     },
    "Rhapsodie espagnole" : {
        fixTrackName: /Rhapsodie espagnole \d\. (.*)/,
        firstTrackNumber: 2
    },
    "StringQuart" : {
        fixAlbumTitle: quartet({major:"F" }),
        fixTrackName: /Strijkkwartet in F - \d (.*)/
    },
    "Tombeau de Couperin" : {
        firstTrackNumber: 7,
        fixTrackName: /Le Tombeau de Couperin - \d.(.*)/
    },
    "Valses nobles et sentimentales" : {
       firstTrackNumber: 11,
       fixTrackName: /Valses \(8\) nobles et sentimentales \d. (.*)/
   },
   "Valses nobles et sentimentale[Slåttebrekk]" : {
       fixTrackName: /Valses nobles et sentimentales - (.*)/
   },
   "ViolinSonata" : {
      fixAlbumTitle: sonata({for:"Violin", minor:"G" }),
       firstTrackNumber: 5,
       fixTrackName: /Vioolsonate in G - \d (.*)/
   }
 },
 "Richard Strauss" : {
     "Burleske for Piano and Orchestra" : {
         firstTrackNumber: 4,
         fixTrackName: /Richart Strauss - (.*)/
     },
     "FourLastSongs" : {
        fixTrackName: /Vier letzte Lieder [IV]+\. (.*)/
    },
    "Lieder" : {
       firstTrackNumber: 5
     },
     "Rosenkavalier1" : {
        fixTrackName: /Der Rosenkavalier, Op. 59 Aufzug I. (.*)/
    },
    "Salome" : {
       fixTrackName: /Salome (?:Erste|Zweite|Dritte|Vierte) Szene. (.*)/
     }
   },
   "Richter" : {
     "The Essential Richter ~ The Mystic" : {
        fixAlbumTitle: "Essential Richter: The Mystic"
     },
     "The Essential Richter ~ The Philosopher" : {
       fixAlbumTitle: "Essential Richter: The Philosopher",
        validation : ["skipUniqueTrackNameCheck"]
     },
     "The Essential Richter ~ The Poet - Sviatoslav Richter" : {
       fixAlbumTitle: "Essential Richter: The Poet"
     },
     "The Essential Richter ~ The Virtuoso" : {
       fixAlbumTitle: "Essential Richter: The Virtuoso"
     },
      "The Sofia Recital 1958" : {
          fixAlbumTitle: "Essential Richter: The Sofia Recital 1958",
           validation : ["skipUniqueTrackNameCheck"]
       }
    },
    "Robert Johnson" : {
        "The Complete Recordings" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Robert Schumann" : {
        "Fantasie[Andsnes]" : {
            firstTrackNumber: 5,
            fixTrackName: /Fantasie C-dur, Op. 17 [IV]+\. (.*)/
        },
        "Fantasy[Brendel]" : {
            firstTrackNumber: 9,
            fixTrackName: /Schumann - Fantasy in C major Op 17 (.*)/
        },
        "Kreislerianna[Brendel]" : {
            fixTrackName: /Schumann - Kreislerianna Op 16 (.*)/
        },
        "Sonata1[Andsnes]" : {
            fixAlbumTitle: sonata({num:1, minor:"F#", op: 11, by: "Andsnes" }),
            fixTrackName: /Klaviersonate Nr. 1 Fis-moll, Op. 11 [IV]+\. (.*)/
       }
    },
    "Rodrigo" : {
        "Concerto in D op.99" : {
            fixAlbumTitle: concerto({for:"Guitar", major:"D", op:99 }),
            firstTrackNumber: 7,
            fixTrackName: /Concerto in D op. 99 - \d - (.*)/
        },
        // TODO dupe?
        "Concierto de Aranjuez" : {
          fixAlbumTitle: concerto({for:"Guitar", subTitle:"de Aranjuez" }),
           fixTrackName: /Concierto de Aranjuez - \d. (.*)/
       },
       "Concierto de Aranjuez[2]" : {
            fixTrackName: /Rodrigo - Concierto de Aranjuez - (.*)/
        },
        // TODO dupe?
        "Concierto Serenata" : {
           firstTrackNumber: 4,
           fixTrackName: /Rodrigo - Concierto Serenata for Harp and Orchestra - (.*)/
       },
       "HarpConcerto" : {
            fixAlbumTitle: concerto({for:"Harp", subTitle:"Serenata" }),
            firstTrackNumber: 4,
            fixTrackName: /Concierto Serenata para Arpa y Orquesta - \d - (.*)/
        },
        "Tres Pieces Espanolas" : {
             firstTrackNumber: 12
         }
    },
    "Roomful_of_Teeth" : {
        "Roomful of Teeth" : {
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Rossini" : {
        "IlBarbiere2" : {
            firstTrackNumber: 6
        }
    },
    // SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
    "Scarlatti" : {
        "Sonatas Pogorelich" : {
            fixAlbumTitle: "Sonatas [Pogorelich]",
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Sonatas Zacharias" : {
            fixAlbumTitle: "Sonatas [Zacharias]",
             validation : ["skipUniqueTrackNameCheck"]
         }
    },
    "Schnittke" : {
        "PianoQuintet" : {
            fixAlbumTitle: quintet({for: "Piano" }),
            firstTrackNumber: 6,
            fixTrackName: /Schnittke - Piano quintet - (.*)/
        }
    },
    "Schubert" : {
        "Impromptu D.899" : {
            firstTrackNumber: 5,
            fixTrackName: /Impromptu D.899 - \d\. (.*)/
        },
        "Impromptu D.935" : {
            firstTrackNumber: 9,
            fixTrackName: /Impromptu D.935 - \d\. (.*)/
        },
        "Notturno" : {
           firstTrackNumber: 5
       },
       "Piano Trio B Flat D 898" : {
         // TODO fixAlbumTitle
            fixTrackName: /Piano Trio B Flat D 898 - (.*)/
        },
        "PianoSonata D784[Lewis]" : {
          // TODO fixAlbumTitle
           fixTrackName: /Piano Sonata D784 : [IV]+\. (.*)/
       },
       "PianoSonata D958[Lewis]" : {
         // TODO fixAlbumTitle
            firstTrackNumber: 4,
            fixTrackName: /Piano Sonata D958 : [IV]+\. (.*)/
        },
        "PianoSonata D959[Lewis]" : {
          // TODO fixAlbumTitle
            fixTrackName: /Piano Sonata D959 : [IV]+\. (.*)/
        },
        "PianoSonata D960[Lewis]" : {
          // TODO fixAlbumTitle
            firstTrackNumber: 5,
            fixTrackName: /Piano Sonata D960 : [IV]+\. (.*)/
        },
        "SonataCminor" : {
          // TODO fixAlbumTitle
           fixTrackName: /D.958 - Piano Sonata in C minor [IV]+\. (.*)/
       },
       "Symp1" : {
         // TODO fixAlbumTitle
           fixTrackName: /Symphony No.1 in D, D.82 - (.*)/
       },
       "Symp2" : {
         // TODO fixAlbumTitle
            fixTrackName: /Symphony No.2 in B flat - (.*)/
        },
        "Symph3" : {
          // TODO fixAlbumTitle
             firstTrackNumber: 5,
             fixTrackName: /Symphony No.3 in D, D.200 - (.*)/
         },
        "Symp3[Beecham]" : {
            fixTrackName: /Symphony No. 3 in D, D. 200 [IV]+\. (.*)/
            // TODO fixAlbumTitle
        },
        "Symp4" : {
            fixTrackName: /Schubert, Franz - Symphony No.4 c-moll D417 'Tragische' - \d+\. (.*)/
            // TODO fixAlbumTitle
        },
        "Symp5[Beecham]" : {
          // TODO fixAlbumTitle
           firstTrackNumber: 5,
           fixTrackName: /Symphony No. 5 in B flat, D. 485 [IV]+\. (.*)/
       },
       "Symp5" : {
         // TODO fixAlbumTitle
           firstTrackNumber: 5,
           fixTrackName: /Schubert, Franz - Symphony No.5 b-dur D485 - \d+\. (.*)/
       },
       "Symp6[Beecham]" : {
         // TODO fixAlbumTitle
           firstTrackNumber: 9,
           fixTrackName: /Symphony No. 6 in C, D. 589 [IV]+\. (.*)/
       },
       "Symp6" : {
         // TODO fixAlbumTitle
           firstTrackNumber: 5,
           fixTrackName: /Symphony No.6 in C - (.*)/
       },
       "Symp7" : {
         // TODO fixAlbumTitle
           fixTrackName: /Symphony No.7 in E minor major, D729 - \d+\. (.*)/
       },
       "Symp8" : {
         // TODO fixAlbumTitle
            fixTrackName: /Symphony No.8 in B minor, D. 759 - (.*)/
        },
        "Symp9" : {
          // TODO fixAlbumTitle
            fixTrackName: /Symphony No.9 in C Major, D. 994 'The Great' - (.*)/
        },
       "Symp10" : {
         // TODO fixAlbumTitle
            firstTrackNumber: 5,
            fixTrackName: /Symphony No.10 in D major, D936a - \d+\. - [IV]+\.? (.*)/
        },
        "Wanderer Fantasie" : {
             fixTrackName: /»Wanderer-Fantaisie« C-Dur D.760 - [IV]+\. (.*)/
         },
         "Winterreise[Fischer-Dieskau]" : {
            fixTrackName: /Winterreise, D 911, Op. 89 [IVX]+\. (.*)/
        }
    },
    "Shchedrin" : {
        "PianoConcerto2[Hamelin]" : {
          // TODO fixAlbumTitle
            firstTrackNumber: 8,
            fixTrackName: /Piano Concerto no. 2: [IV]+\. (.*)/
        }
    },
    "Sheila Jordan" : {
        "Little Song" : {
            fixTrackName: /Sheila Jordan - (.*)/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "With the Steve Kuhn Trio" : {
            fixTrackName: /Sheila Jordan - (.*)/,
            validation : ["skipUniqueTrackNameCheck"]
        }
    },
    "Shostakovich" : {
        "24 Preludes, op. 34" : {
            firstTrackNumber: 4,
            fixTrackName: /24 Preludes, op. 34: No. \d+ in (.*)/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "CelloConc[Rostropovich 1988]" : {
          fixAlbumTitle: concerto({for: "Cello", num:1, major:"Eb", op:107, by: "Rostropovich 1988"}),
           firstTrackNumber: 5,
           fixTrackName: /Concerto for Cello in E-flat, Op. 107 - (.*)/
       },
       "CelloConc1[Rostropovic 1966]" : {
            fixAlbumTitle: concerto({for: "Cello", num:1, major:"Eb", op:107, by: "Rostropovich 1966"}),
            fixTrackName: /CelloConc1 - (.*)/
        },
        "CelloConc2[Rostropovic 1966]" : {
            fixAlbumTitle: concerto({for: "Cello", num:2, op:126, by: "Rostropovich 1966"}),
            firstTrackNumber: 5,
            fixTrackName: /CelloConc2 - (.*)/
        },
        "Lady Macbeth2" : {
           firstTrackNumber: 11
       },
       "Lady Macbeth3" : {
           firstTrackNumber: 4,
           validation : ["skipUniqueTrackNameCheck"]
       },
       "Lady Macbeth4" : {
            firstTrackNumber: 8,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "PianoConc1[Hamelin]" : {
            fixAlbumTitle: concerto({for: "Piano", num:1, minor:"C", op:35, by: "Hamelin"}),
           fixTrackName: /Piano Concerto no. 1 in C minor, op. 35: [IV]+\. (.*)/
       },
       "PianoConc1[Previn]" : {
         fixAlbumTitle: concerto({for: "Piano", num:1, minor:"C", op:35, by: "Previn"}),
            fixTrackName: /Piano Concerto No.1, Op. 35 - (.*)/
        },
        "PianoConc2[Hamelin]" : {
          fixAlbumTitle: concerto({for: "Piano", num:2, major:"F", op:102, by: "Hamelin"}),
           firstTrackNumber: 5,
           fixTrackName: /Piano Concerto no. 2 in F major, op. 102: [IV]+\. (.*)/
       },
       "PianoConc2[Previn]" : {
            fixAlbumTitle: concerto({for: "Piano", num:2, major:"F", op:102, by: "Previn"}),
            firstTrackNumber: 3,
            fixTrackName: /Piano Concerto No.2, Op. 102 - [IV]+ (.*)/
        },
        "PianoQuintet" : {
            fixAlbumTitle: quintet({for: "Piano", minor:"G", op:57}),
            fixTrackName: /Shostakovich - Piano quintet Op 57 - (.*)/
        },
        "PianoSonata2" : {
          fixAlbumTitle: sonata({num:2, minor:"B", op:61}),
           firstTrackNumber: 28,
           fixTrackName: /Piano Sonata no. 2 in B minor, op. 61: [IV]+\. (.*)/
       },
       "Preludes-Fugues" : {
            fixTrackNameFunc: function(name: string, logger) : string {
                var number;
                var key;
                var shartOrFlat;
                var minorOrMajor;
                var preludeOrFugue;

                var m1 = /Prelude and Fugue No\.(\d+) in ([A-Za-z]+)( flat| sharp)?( major| minor)? - (Prelude|Fugue)/.exec(name);
                var m2 = /(Prelude|Fugue) in ([A-Z])( sharp| flat)?( major| minor), Op\. 87 No\. (\d+)/.exec(name);
                if (m1)
                {
                    number = m1[1];
                    key = m1[2];
                    shartOrFlat = m1[3];
                    minorOrMajor = m1[4];
                    preludeOrFugue = m1[5];
                }
                else if (m2)
                {
                    preludeOrFugue = m2[1];
                    key = m2[2];
                    shartOrFlat = m2[3];
                    minorOrMajor = m2[4];
                    number = m2[5];
                }
                else
                {
                    throw new Error("Could not parse name in Shostakovich preludes and fugues");
                }

                if (shartOrFlat === " sharp")   key += "#";
                if (shartOrFlat === " flat")    key += "b";
                if (minorOrMajor === " minor")  key = key.toLowerCase();

                return preludeOrFugue + " " + number + " in " + key;
            }
        },
        "Quartet2" : {
            fixAlbumTitle: quartet({num:2, major:"A", op:68}),
            fixTrackName: /String [Qq]uartet No.2 in A [Mm]ajor, [Oo]p\. ?68 (.*)/
        },
        "Quartet5" : {
          fixAlbumTitle: quartet({num:5, major:"Bb", op:92}),
            firstTrackNumber: 5,
            fixTrackName: /String quartet No.5 in B flat major, op.92 (.*)/
        },
        "Quartet6" : {
            fixAlbumTitle: quartet({num:6, major:"G", op:101}),
            fixTrackName: /String quartet No.6 in G major, op.101 (.*)/
        },
        "Quartet7" : {
            fixAlbumTitle: quartet({num:7, minor:"F#", op:108}),
            firstTrackNumber: 8,
            fixTrackName: /String [Qq]uartet No.7 in F sharp minor, [Oo]p\. ?108 (.*)/
        },
        "Quartet8" : {
              fixAlbumTitle: quartet({num:8, minor:"C", op:110}),
             firstTrackNumber: 10,
             fixTrackName: /String Quartet No.8, in C minor, Op. 110 (.*)/
         },
         "Quartet9" : {
            fixAlbumTitle: quartet({num:9, minor:"Eb", op:117}),
             firstTrackNumber: 5,
             fixTrackName: /String Quartet No.9 in E Flat Major, Op. 117 (.*)/
         },
        "Symph3[Jansons]" : {
            fixAlbumTitle: symphony({ num : 3, op:20, major : "Eb", subTitle:"The First of May", by: "Jansons" }),
            fixTrackName: /Symphony No. 3 in E-flat major, Op. 20 "The First of May": [IVX]+\. (.*)/
        },
        "Symph3[Mravinsky]" : {
            fixAlbumTitle: symphony({ num : 3, op:20, major : "Eb", subTitle:"The First of May", by: "Mravinsky" }),
            fixTrackName: /Symphony No. 3 in E-flat major, Op. 20 The First of May [IVX]+\. (.*)/
        },
        "Symphony5-Mra" : {
          fixAlbumTitle: symphony({ num : 5, op:47, minor : "D", by: "Mravinsky" })
       },
       "Symph6[Jansons]" : {
         fixAlbumTitle: symphony({ num : 6, op:54, minor : "B", by: "Jansons" }),
          fixTrackName: /Symphony no. 6 in B minor, op. 54: [IV]+. (.*)/
      },
      "Symph6[Mra]" : {
        fixAlbumTitle: symphony({ num : 6, op:54, minor : "B", by: "Mravinsky" })
     },
       "Symphony8-Mra" : {
          fixAlbumTitle: symphony({ num : 8, op:65, minor : "C", by: "Mravinsky" }),
           fixTrackName: /Symphonie No.8 en ut mineur, Op.65 - [IV]+\. (.*)/
       },
       "Symph9[Jansons]" : {
            fixAlbumTitle: symphony({ num : 9, op:70, major : "Eb", by: "Jansons" }),
            firstTrackNumber: 4,
            fixTrackName: /Symphony no. 9 in E-flat major, op. 70: [IV]+\. (.*)/
        },
        "Symphony9" : {
          fixAlbumTitle: symphony({ num : 9, op:70, major : "Eb" }),
           firstTrackNumber: 4,
           fixTrackName: /Symphony no.9 in E flat, op.70 (.*)/
       },
        "Symphony10-Mra" : {
            fixAlbumTitle: symphony({ num : 10, op:93, minor : "E", by: "Mravinsky" }),
            firstTrackNumber: 5,
            fixTrackName: /Symphony No.10,? in E [Mm]inor,? Op. 93\.? - (.*)/
        },
        "Symph12[Mra]" : {
          fixAlbumTitle: symphony({ num : 12, op:112, minor : "D", subTitle:"The Year of 1917", by: "Mravinsky" }),
           firstTrackNumber: 4,
           fixTrackName: /symph No.12 - (.*)/
       },
       "Symph13-Jans" : {
          fixAlbumTitle: symphony({ num : 13, op:113, minor : "Bb", subTitle:"Babi Yar", by: "Jansons" }),
           fixTrackName: /Symphony No. 13 in B-flat minor, Op. 113 Babi Yar [IVX]+\. (.*)/
       },
       "Symph14[Jansons]" : {
            fixAlbumTitle: symphony({ num : 14, op:135, by: "Jansons" }),
            firstTrackNumber: 8,
            fixTrackName: /Symphony No. 14, Op. 135: [IVX]+\. (.*)/
      },
      "Symph14[Mravinsky]" : {
          fixAlbumTitle: symphony({ num : 14, op:135, by: "Mravinsky" }),
          firstTrackNumber: 8,
          fixTrackName: /Symphony No. 14, Op. 135 [IVX]+\. (.*)/
      },
       "Three Fantastic Dances" : {
           fixTrackName: /Three Fantastic Dances, op. 5: [IV]+\. (.*)/,
           validation : ["skipUniqueTrackNameCheck"]
       }
    }
};
