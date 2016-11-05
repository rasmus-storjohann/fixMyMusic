export function SpecialHandlers()
{
    return {
        "ArtOfFugue[Gould,organ]" : {
            // TODO rename "Kunst[Gould,organ]"
            fixTrackName: /(\d+) The Art of the Fugue, BWV 1080: (.*).mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "BminorMass" : {
            fixTrackName: /(\d+) - (?:Mass in B minor -[IV]+- )?(.*).mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Brandenburg 1 [Karajan]" : {
            fixTrackName: /(\d+) - Brandenburg Concerto No. 1 in F major, BWV 1046_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 1 [Pinnock]" : {
            fixTrackName: /(\d+) Concerto No. 1 in F major, BWV 1046_ [IV]+. (.*).mp3/
        },
        "Brandenburg 2 [Karajan]" : {
            fixTrackName: /(\d+) - Concerto No. 2 in F Major_ l+\.+ (.*)\.mp3/
        },
        "Brandenburg 2 [Pinnock]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) Concerto No. 2 in F major, BWV 1047_ [IV]+. (.*).mp3/
        },
        "Brandenburg 3 [Karajan]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) - Brandenburg Concerto No. 3 in G major, BWV 1048_ [IV]+. (.*).mp3/
        },
        "Brandenburg 3 [Pinnock]" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) Concerto No\. 3 in G major, BWV 1048_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 4 [Karajan]" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) - Brandenburg Concerto No\. 4 in G major, BWV 1049_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 4 [Pinnock]" : {
            firstTrackNumber: 11,
            fixTrackName: /(\d+) Concerto No\. 4 in G major, BWV 1049_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 5 [Karajan]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) - Concerto No. 5 in D Major_ l+\. (.*).mp3/
        },
        "Brandenburg 5 [Pinnock]" : {
            fixTrackName: /(\d+) Concerto No. 5, BWV 1050_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 6 [Karajan]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) - Concerto No. 6 in B Flat Major_ l+\. (.*).mp3/
        },
        "Brandenburg 6 [Pinnock]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Concerto No. 6, BWV 1051_ [IV]+\. (.*).mp3/
        },
        "Cantata BWV 51 Jauchzet" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) - Cantata, BWV 51 - \d+\. (.*).mp3/
        },
        "Cantata Aus der Tiefen [Suzuki] BWV131" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) Cantata no. 131, BWV 131 "Aus der Tiefe rufe ich, Herr, zu dir": [IV]+. (.*).mp3/
        },
        "Cantata Aus der Tiefen [Koopman] BWV131" : {
            firstTrackNumber: 12,
            fixTrackName: /(\d+) Cantata, BWV 131 "Aus der Tiefen rufe ich, Herr, zu dir": [IV]+. (.*).mp3/
        },
        "Cantata Barmherziges Herze [Koopman] BWV185" : {
            firstTrackNumber: 10,
            fixTrackName: /(\d+) Kantate, BWV 185 "Barmherziges Herze der ewigen Liebe": [IV]+. (.*).mp3/
        },
        "Cantata Christ lag in Todesbanden [Koopman] BWV4" : {
            firstTrackNumber: 16,
            fixTrackName: /(\d+) Kantate, BWV 4 "Christ lag in Todesbanden": [IV]+. (.*).mp3/
        },
        "Cantata Christ lag in Todesbanden (appendix) [Koopman] BWV4" : {
            firstTrackNumber: 24,
            fixTrackName: /(\d+) Kantate, BWV 4 \(appendix\) "Christ lag in Todesbanden": [IV]+. (.*).mp3/
        },
        "Cantata Der Herr denket an uns [Koopman] BWV196" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) - Der Herr denket an uns(?: BWV196)? - (.*).mp3/
        },
        "Cantata Der Himmel lacht [Koopman] BWV31" : {
            fixTrackName: /(\d+) Kantate, BWV 31 "Der Himmel lacht! die Erde jubilieret": [IVX]+\. (.*).mp3/
        },
        "Cantata Ein feste Burg [Rifkin]" : {
            firstTrackNumber: 11,
            fixTrackName: /(\d+) Cantata, BWV 80 "Ein feste Burg ist unser Gott": (.*).mp3/
        },
        "Cantata Ein feste Burg" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) - Cantata No. 80_ [IV]+\. (.*).mp3/
        },
        "Cantata Geist und Seele [Mullejans] BWV35" : {
            firstTrackNumber: 13,
            fixTrackName: /(\d+) - Cantata BWV 35. \d+. (.*).mp3/
        },
        "Cantata Gott ist mein Konig [Koopman] BWV71" : {
            // TODO
            // title: "Cant[Koopman] Gott ist mein Konig"
            firstTrackNumber: 10,
            fixTrackName: /(\d+) - Gott ist mein Konig (?:BWV71 )?- (.*).mp3/
        },
        "Cantata Gott ist mein König [Suzuki] BWV71" : {
            fixTrackName: /(\d+) Cantata no. 71, BWV 71 "Gott ist mein König": [IVX]+\. (.*).mp3/
        },
        "Cantata Gott soll allein mein Herze haben [Mullejans] BWV169" : {
            fixTrackName: /(\d+) - Cantata BWV 169. \d+\. (.*)\.mp3/
        },
        "Cantata Gottes Zeit [Koopman] BWV106" : {
            fixTrackName: /(\d+) - Gottes Zeit BWV106 - (.*).mp3/
        },
        "Cantata Gottes Zeit [Suzuki] BWV106" : {
            // title: "Cant[Suzuki] Gottes Zeit"
            firstTrackNumber: 13,
            fixTrackName: /(\d+) Cantata no. 106, BWV 106 "Gottes Zeit ist die allerbeste Zeit": (.*).mp3/
        },
        "Cantata Herz und Mund und Tat und Leben [Rifkin]" : {
            fixTrackName: /(\d+) Cantata, BWV 147 "Herz und Mund und Tat und Leben": Part [IVX]+, (.*).mp3/
        },
        "Cantata Herz und Mund" : {
            fixTrackName: /(\d+) - Cantata No. 147_ Part I+. [IVX]+. (.*).mp3/
        },
        "Cantata ich habe genug BWV82" : {
            firstTrackNumber: 13,
            fixTrackName: /(\d*) Cantata "Ich habe genug", BWV 82: [IV]+. (.*).mp3/
        },
        "Cantata Ich hatte viel Bekümmernis [Koopman] BWV21" : {
            fixTrackName: /(\d+) Cantata, BWV 21 "Ich hatte viel Bekümmernis": [IVX]+\. (.*).mp3/
        },
        "Cantata Ich hatte viel Bekümmernis (appendix) [Koopman] BWV21" : {
            firstTrackNumber: 17,
            fixTrackName: /(\d+) Cantata, BWV 21 "Ich hatte viel Bekümmernis": \(appendix\) (.*).mp3/
        },
        "Cantata Jauchzet Gott in allem Landed [Rifkin]" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) Cantata, BWV 51 "Jauchzet Gott in allen Landen": (.*).mp3/
        },
        "Cantata Jesu der du meine Seele [Rifkin]" : {
            firstTrackNumber: 13,
            fixTrackName: /(\d+) Cantata, BWV 78 "Jesu, der du meine Seele": (.*).mp3/
        },
        "Cantata Jesu meine Freunde BWV 227 " : {
            firstTrackNumber: 11,
            fixTrackName: /(\d+) - Jesu, meine Freunde, BW 227_ [IVX]+\.(.*).mp3/
        },
        "Cantata Liebster Gott [Rifkin]" : {
            firstTrackNumber: 19,
            fixTrackName: /(\d+) Cantata, BWV 8 "Liebster Gott, wann werd ich sterben": (.*).mp3/
        },
        "Cantata Nach dir, Herr [Koopman] BWV150" : {
            firstTrackNumber: 17,
            fixTrackName: /(\d*) - Nach dir, Herr, verlanget mich BWV150 - (.*).mp3/
        },
        "Cantata Wachet auf [Rifkin]" : {
            fixTrackName: /(\d+) Cantata, BWV 140 "Wachet auf, ruft uns die Stimme": Part [IVX]+, (.*).mp3/
        },
        "Cantata Wachet auf" : {
            fixTrackName: /(\d+) - Cantata No. 140_ [IVX]+\. (.*).mp3/
        },
        "Cantata Wie jammern [Mullejans] BWV170" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) - Cantata BWV 170. \d+. (.*).mp3/
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
        "Fantasias, Preludes and Fugues [Herrick]" : {
            fixTrackNameFunc: function(name: string, logger) : string {
                if (/(\d+) Fantasia in .*, BWV \d+.mp3/.exec(name)) {
                    return name;
                }
                var m = /(\d+) .* and Fugue in (.*) (major|minor), BWV (\d+): I+\. (.*).mp3/.exec(name);
                if (m) {
                    var trackNumber = m[1];
                    var key = m[2];
                    var opusNumber = m[4];
                    var trackName = m[5];
                    if (m[3] === "minor") {
                        key = key.toLowerCase();
                    }
                    return trackNumber + " BWV" + opusNumber + " in " + key + ": " + trackName + ".mp3";
                }
                throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
            },
            validation : ["skipUniqueTrackNameCheck"]
        },
        "FrenchOuverture[Gould]" : {
            firstTrackNumber: 16,
            fixTrackName: /(\d+) Overture in the French Style \(in B minor\), BWV 831: [IVX]+\. (.*).mp3/
        },
        "FrenchSuite1[Gould]" : {
            fixTrackName: /(\d+) French Suite No. 1 in D minor, BWV 812: [IV]+. (.*).mp3/
        },
        "FrenchSuite2[Gould]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) French Suite No. 2 in C minor, BWV 813: [IV]+. (.*).mp3/
        },
        "FrenchSuite3[Gould]" : {
            firstTrackNumber: 13,
            fixTrackName: /(\d+) French Suite No. 3 in B minor, BWV 814: [IV]+. (.*).mp3/
        },
        "FrenchSuite4[Gould]" : {
            firstTrackNumber: 19,
            fixTrackName: /(\d+) French Suite No. 4 in E-flat major, BWV 815: [IV]+. (.*).mp3/
        },
        "FrenchSuite5[Gould]" : {
            fixTrackName: /(\d+) French Suite No. 5 in G major, BWV 816: [IV]+. (.*).mp3/
        },
        "FrenchSuite6[Gould]" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) French Suite No. 6 in E major, BWV 817: [IV]+. (.*).mp3/
        },
        "Goldberg-Strings" : {
            fixTrackNameFunc: function(name: string, logger) : string {
                var m = /(\d+) - J.S. Bach Goldberg-Variationen, BWV 988 - Variatio (\d+)[^\d].*\.mp3/.exec(name);
                if (m)
                {
                    var trackNumber = m[1];
                    var variationNumber = parseInt(m[2]);
                    return trackNumber + " Variations " + variationNumber + "-" + (variationNumber + 2) + ".mp3";
                }
                if (name === "01 - J.S. Bach Goldberg-Variationen, BWV 988 - Aria.mp3") {
                    return "01 Aria.mp3";
                }
                if (name === "12 - J.S. Bach Goldberg-Variationen, BWV 988 - Aria.mp3") {
                    return "12 Aria da capo.mp3";
                }
            }
        },
        "GoldbergCanadianBrass" : {
            fixTrackName: /(\d+) - Goldberg Variations, BWV 988_ (.*).mp3/
        },
        "GoldbergGould1955" : {
            fixTrackName: /(\d+) - Goldberg Variations, BWV 988_ (.*).mp3/
        },
        "GoldbergGould1981" : {
            fixTrackName: /(\d+) - Goldberg Variations, BWV 988_ [IVX]+\. (.*).mp3/
        },
        "Inventions[Gould]" : {
            firstTrackNumber: 3,
            fixTrackNameFunc: function(name: string, logger) : string {
                var m = /(\d+) (\d-Part Invention) No\. (\d+) in ([^ ]+) (major|minor), BWV (\d+)\.mp3/.exec(name);
                if (!m) {
                    throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
                }
                var key = m[4];
                if (m[5] === "minor") {
                    key = key.toLowerCase();
                }
                return m[1] + " " + m[2] + " " + m[3] + " " + key + " BWV" + m[6] + ".mp3";
            },
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Klavierubung III" : {
            validation : ["skipTrackNumberCheck"]
        },
        "Kunst [Aimard]" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Kunst [Marriner]" : {
            fixTrackName: /(\d+) The Art of Fugue: (.*)\.mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Kunst [Münchinger]" : {
            fixTrackName: /(\d+) The Art of Fugue, BWV 1080: [\dab]+\. (.*)\.mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Magnificat" : {
            fixTrackName: /(\d+) Magnificat in D major, BWV 243: [IVX]+\. (.*)\.mp3/
        },
        "Opfer [Marriner]" : {
           firstTrackNumber: 5,
           fixTrackName: /(\d+) Musical Offering: (.*).mp3/
       },
       "Opfer [Münchinger]" : {
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
        "Organ works including toccata and fugue in D minor" : {
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Ouverture 1 [Pinnock]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) Ouverture No. 1, BWV 1066_ [IV]+\. (.*)\.mp3/
        },
        "Ouverture 2 [Pinnock]" : {
            fixTrackName: /(\d+) Ouverture No. 2, BWV 1067_ [IV]+\. (.*)\.mp3/
        },
        "Ouverture 3 [Pinnock]" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) Ouverture No. 3, BWV 1068_ [IV]+\. (.*)\.mp3/
        },
        "Ouverture 4 [Pinnock]" : {
            firstTrackNumber: 13,
            fixTrackName: /(\d+) Ouverture No. 4, BWV 1069_ [IV]+\. (.*)\.mp3/
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
        "PianoConc4 BWV1055" : {
            fixTrackName: /(\d+) - Piano Concerto No.4 in A major, BWV 1055 - \d+\. (.*)\.mp3/
        },
        "PianoConc5 BWV1056" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) - Piano Concerto No.5 in F minor, BWV 1056 - \d+. (.*).mp3/
        },
        "PianoConc7 BWV1058" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) - Piano Concerto No.7 in G minor, BWV 1058 - \d+. (.*).mp3/
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
       "PianoPartita6 BWV830" : {
           fixTrackName: /(\d+) - Partita No. 6 in E minor, BWV 830_ [IV]+\. (.*)\.mp3/
       },
       "PianoWorks[Gould]" : {
           firstTrackNumber: 8,
           validation : ["skipUniqueTrackNameCheck"]
       },
       "Prelude&Fugue on B.A.C.H." : {
           firstTrackNumber: 17
       },
       "St. John Passion" : {
          fixTrackNameFunc: function(name: string, logger) : string {
              var m = /(\d+) Johannes-Passion, BWV 245: Teil [I]+\. (.*)\.mp3/.exec(name);
              if (m)
              {
                  return m[1] + " " + m[2];
              }
              return name;
          },
          validation : ["skipUniqueTrackNameCheck"]
      },
      "St. Matthew Passion" : {
          fixTrackName: /(\d+) - St. Matthew Passion, BWV 244_ Teil [I]+. (.*).mp3/
      },
      "Two fugues from WellTemp2[Gould1955]" : {
          firstTrackNumber: 33,
          fixTrackName: /(\d+) - The Well-Tempered Clavier_ (.*)\.mp3/
      },
      "ViolinConc[Stern] BWV 1041" : {
          fixTrackName: /(\d+) - Concerto for Violin and Orchestra in A minor, BWV 1041_ [IV]+\. (.*).mp3/
      },
      "ViolinConc[Stern] BWV 1042" : {
          firstTrackNumber: 4,
          fixTrackName: /(\d+) - Concerto for Violin and Orchestra in E major, BWV 1042_ [IV]+. (.*).mp3/
      },
      "ViolinPartita1 BWV1002" : {
          firstTrackNumber: 5,
          fixTrackName: /(\d+) - Partita No. 1 in B minor, BWV 1002_ [IV]+\. (.*)\.mp3/
      },
      "ViolinPartita2 BWV1004" : {
          fixTrackName: /(\d+) - Partita No. 2 in D minor, BWV 1004_ [IV]+\. (.*).mp3/
      },
      "ViolinPartita3 BWV1006" : {
          firstTrackNumber: 10,
          fixTrackName: /(\d+) - Partita No. 3 in E, BWV 1006_ [IV]+. (.*).mp3/
      },
      "ViolinSoloSon1 BWV1001" : {
          fixTrackName: /(\d+) - Sonata No. 1 in G minor, BWV 1001_ [IV]+. (.*).mp3/
      },
      "ViolinSoloSon2 BWV1003" : {
          firstTrackNumber: 13,
          fixTrackName: /(\d+) - Sonata No. 2 in A minor, BWV 1003_ [IV]+\. (.*).mp3/
      },
      "ViolinSoloSon3 BWV1005" : {
          firstTrackNumber: 6,
          fixTrackName: /(\d+) - Sonata No. 3 in C, BWV 1005_ [IV]+. (.*).mp3/
      },
      "ViolinSonata BWV1014" : {
          fixTrackName: /(\d+) - ViolinSonata BWV1014 - (.*).mp3/
      },
      "ViolinSonata BWV1015" : {
          firstTrackNumber: 5,
          fixTrackName: /(\d+) - ViolinSonata BWV1015 - (.*).mp3/
      },
      "ViolinSonata BWV1019" : {
         firstTrackNumber: 9,
         fixTrackName: /(\d+) - ViolinSonata BWV1019 - (.*).mp3/
      },
      "ViolinSonata4[Gould-Menuhin]" : {
            fixTrackName: /(\d+) - Bach PianoSonata4 BWV1017 - (.*).mp3/
      },
      "WellTemp1 [Fellner]" : {
          fixTrackNameFunc: function(name: string, logger) : string {
              var m = /(\d+) - (Präludium|Fuge) [IVX]+ in ([a-zA-Z]+)-(Dur|Moll), BWV \d+.mp3/.exec(name);
              if (m) {
                  var trackNumber = m[1];
                  var type = m[2];
                  var key = m[3].toLowerCase();
                  if (m[4] === "Dur") {
                      key = key.charAt(0).toUpperCase() + key.slice(1);
                  }
                  if (type !== "Fuge") {
                      type = "Prelude";
                  }
                  return trackNumber + " " + type + " in " + key + ".mp3";
              }
              throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
          },
          validation : ["skipUniqueTrackNameCheck"]
      },
      "WellTemp1 [Gould]" : {
          fixTrackNameFunc: function(name: string, logger) : string {
              if (name === "15 Prelude in E-flat minor and Fugue in D-sharp minor, BWV 853: I. Praeludium.mp3") {
                  return "15 Prelude in e-flat.mp3";
              }
              if (name === "16 Prelude in E-flat minor and Fugue in D-sharp minor, BWV 853: II. Fuga.mp3") {
                  return "16 Fuge in d-sharp.mp3"
              }
              var m = /(\d+) Prelude and Fugue no\. \d+ in ([a-zA-Z\-]+) (major|minor), BWV \d+: [IVX]+\. (Praeludium|Fuga).mp3/.exec(name);
              if (m) {
                  var trackNumber = m[1];
                  var key = m[2].toLowerCase();
                  if (m[3] === "major") {
                      key = key.charAt(0).toUpperCase() + key.slice(1);
                  }
                  var type = m[4];
                  if (type === "Fuga") {
                      type = "Fuge";
                  }
                  if (type === "Praeludium") {
                      type = "Prelude";
                  }
                  return trackNumber + " " + type + " in " + key + ".mp3";
              }
              throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
          },
          validation : ["skipUniqueTrackNameCheck"]
      },
      "WellTemp2 [Gould]" : {
          fixTrackNameFunc: function(name: string, logger) : string {
              var trackNumber, key, type;
              var m = /(\d+) - Prelude and Fugue No.\d+ in ([a-zA-Z]+) (major|minor) - (Prelude|Fugue).mp3/.exec(name);
              var n = /(\d+) - Prelude (?:&|and) Fugue No.\d+ [Ii]n (.*) ([Mm]ajor|[Mm]inor) (?:- )?(Prelude|Fugue).mp3/.exec(name);
              var o = /(\d+) - (Prelude|Fugue) No.\d+ in (.*) ?(major|minor)?\.mp3/.exec(name);
              if (m) {
                  trackNumber = m[1];
                  key = m[2].toLowerCase();
                  if (m[3].toLowerCase() === "major") {
                      key = key.charAt(0).toUpperCase() + key.slice(1);
                  }
                  type = m[4];
                  if (type === "Fugue") {
                      type = "Fuge";
                  }
              } else if(n) {
                  trackNumber = n[1];
                  key = n[2].toLowerCase();
                  if (n[3] === "Major") {
                      key = key.charAt(0).toUpperCase() + key.slice(1);
                  }
                  type = n[4];
              } else if (o) {
                  trackNumber = o[1];
                  type = o[2];
                  key = o[3].toLowerCase();
                  if (o[4] !== "minor") {
                      key = key.charAt(0).toUpperCase() + key.slice(1);
                  }
              } else {
                  throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
              }
              return trackNumber + " " + type + " in " + key + ".mp3";
          },
          validation : ["skipUniqueTrackNameCheck"]
      },
      "WellTemp2 [Tureck]" : {
          fixTrackNameFunc: function(name: string, logger) : string {
              var trackNumber, key, type;
              var m = /(\d+) Prelude and Fugue no. \d+ in (.*) (major|minor), BWV \d+: [IVX]+\. (Praeludium|Fuga).mp3/.exec(name);
              if (m) {
                  trackNumber = m[1];
                  key = m[2].toLowerCase();
                  if (m[3].toLowerCase() === "major") {
                      key = key.charAt(0).toUpperCase() + key.slice(1);
                  }
                  type = m[4];
                  if (type === "Praeludium") {
                      type = "Prelude";
                  } else if (type === "Fuga") {
                      type = "Fuge";
                  }
              } else {
                  throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
              }
              return trackNumber + " " + type + " in " + key + ".mp3";
          },
          validation : ["skipUniqueTrackNameCheck"]
      }
  };
}
