import { Format, cantata, quartet, symphony, sonata, concerto, suite } from "../AlbumFormat";

export var rules = {
    "BminorMass" : {
        fixAlbumTitle: "Mass in b BWV232",
        fixTrackName: /(?:Mass in B minor -[IV]+- )?(.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Brandenburg 1 [Karajan]" : {
        fixTrackName: /Brandenburg Concerto No. 1 in F major, BWV 1046 [IV]+\. (.*)/
    },
    "Brandenburg 1 [Pinnock]" : {
        fixTrackName: /Concerto No. 1 in F major, BWV 1046 [IV]+. (.*)/
    },
    "Brandenburg 2 [Karajan]" : {
        fixTrackName: /Concerto No. 2 in F Major l+\.+ (.*)/
    },
    "Brandenburg 2 [Pinnock]" : {
        firstTrackNumber: 5,
        fixTrackName: /Concerto No. 2 in F major, BWV 1047 [IV]+. (.*)/
    },
    "Brandenburg 3 [Karajan]" : {
        firstTrackNumber: 5,
        fixTrackName: /Brandenburg Concerto No. 3 in G major, BWV 1048 [IV]+. (.*)/
    },
    "Brandenburg 3 [Pinnock]" : {
        firstTrackNumber: 8,
        fixTrackName: /Concerto No\. 3 in G major, BWV 1048 [IV]+\. (.*)/
    },
    "Brandenburg 4 [Karajan]" : {
        firstTrackNumber: 8,
        fixTrackName: /Brandenburg Concerto No\. 4 in G major, BWV 1049 [IV]+\. (.*)/
    },
    "Brandenburg 4 [Pinnock]" : {
        firstTrackNumber: 11,
        fixTrackName: /Concerto No\. 4 in G major, BWV 1049 [IV]+\. (.*)/
    },
    "Brandenburg 5 [Karajan]" : {
        firstTrackNumber: 4,
        fixTrackName: /Concerto No. 5 in D Major l+\. (.*)/
    },
    "Brandenburg 5 [Pinnock]" : {
        fixTrackName: /Concerto No. 5, BWV 1050 [IV]+\. (.*)/
    },
    "Brandenburg 6 [Karajan]" : {
        firstTrackNumber: 7,
        fixTrackName: /Concerto No. 6 in B Flat Major l+\. (.*)/
    },
    "Brandenburg 6 [Pinnock]" : {
        firstTrackNumber: 4,
        fixTrackName: /Concerto No. 6, BWV 1051 [IV]+\. (.*)/
    },
    "Cantata BWV 51 Jauchzet" : {
        fixAlbumTitle: cantata({ subTitle: "Jauchzet", BWV: 51 }),
        firstTrackNumber: 8,
        fixTrackName: /Cantata, BWV 51 - \d+\. (.*)/
    },
    "Cantata Aus der Tiefen [Suzuki] BWV131" : {
        fixAlbumTitle: cantata({ subTitle: "Aus der Tiefe", BWV: 131, by: "Suzuki" }),
        firstTrackNumber: 8,
        fixTrackName: /Cantata no. 131, BWV 131 "Aus der Tiefe rufe ich, Herr, zu dir": [IV]+. (.*)/
    },
    "Cantata Aus der Tiefen [Koopman] BWV131" : {
        fixAlbumTitle: cantata({ subTitle: "Aus der Tiefe", BWV: 131, by: "Koopman" }),
        firstTrackNumber: 12,
        fixTrackName: /Cantata, BWV 131 "Aus der Tiefen rufe ich, Herr, zu dir": [IV]+. (.*)/
    },
    "Cantata Barmherziges Herze [Koopman] BWV185" : {
        fixAlbumTitle: cantata({ subTitle: "Barmherziges Herze", BWV: 185, by: "Koopman" }),
        firstTrackNumber: 10,
        fixTrackName: /Kantate, BWV 185 "Barmherziges Herze der ewigen Liebe": [IV]+. (.*)/
    },
    "Cantata Christ lag in Todesbanden [Koopman] BWV4" : {
        fixAlbumTitle: cantata({ subTitle: "Christ lag in Todesbanden", BWV: 4, by: "Koopman" }),
        firstTrackNumber: 16,
        fixTrackName: /Kantate, BWV 4 "Christ lag in Todesbanden": [IV]+. (.*)/
    },
    "Cantata Christ lag in Todesbanden (appendix) [Koopman] BWV4" : {
        fixAlbumTitle: cantata({ subTitle: "appendix: Christ lag in Todesbanden", BWV: 4, by: "Koopman" }),
        firstTrackNumber: 24,
        fixTrackName: /Kantate, BWV 4 \(appendix\) "Christ lag in Todesbanden": [IV]+. (.*)/
    },
    "Cantata Der Herr denket an uns [Koopman] BWV196" : {
        fixAlbumTitle: cantata({ subTitle: "Der Herr denket an uns", BWV: 196, by: "Koopman" }),
        firstTrackNumber: 5,
        fixTrackName: /Der Herr denket an uns(?: BWV196)? - (.*)/
    },
    "Cantata Der Himmel lacht [Koopman] BWV31" : {
        fixAlbumTitle: cantata({ subTitle: "Der Himmel lacht", BWV: 31, by: "Koopman" }),
        fixTrackName: /Kantate, BWV 31 "Der Himmel lacht! die Erde jubilieret": [IVX]+\. (.*)/
    },
    "Cantata Ein feste Burg [Rifkin]" : {
        fixAlbumTitle: cantata({ subTitle: "Ein feste Burg", BWV: 80, by: "Rifkin" }),
        firstTrackNumber: 11,
        fixTrackName: /Cantata, BWV 80 "Ein feste Burg ist unser Gott": (.*)/
    },
    "Cantata Ein feste Burg" : {
        fixAlbumTitle: cantata({ subTitle: "Ein feste Burg", BWV: 80, by: "???" }),
        firstTrackNumber: 8,
        fixTrackName: /Cantata No. 80 [IV]+\. (.*)/
    },
    "Cantata Geist und Seele [Mullejans] BWV35" : {
        fixAlbumTitle: cantata({ subTitle: "Geist und Seele", BWV: 35, by: "Mullejans" }),
        firstTrackNumber: 13,
        fixTrackName: /Cantata BWV 35. \d+. (.*)/
    },
    "Cantata Gott ist mein Konig [Koopman] BWV71" : {
        fixAlbumTitle: cantata({ subTitle: "Gott ist mein Konig", BWV: 71, by: "Koopman" }),
        firstTrackNumber: 10,
        fixTrackName: /Gott ist mein Konig (?:BWV71 )?- (.*)/
    },
    "Cantata Gott ist mein König [Suzuki] BWV71" : {
        fixAlbumTitle: cantata({ subTitle: "Gott ist mein Konig", BWV: 71, by: "Suzuki" }),
        fixTrackName: /Cantata no. 71, BWV 71 "Gott ist mein König": [IVX]+\. (.*)/
    },
    "Cantata Gott soll allein mein Herze haben [Mullejans] BWV169" : {
        fixAlbumTitle: cantata({ subTitle: "Gott soll allein mein Herze haben", BWV: 169, by: "Mullejans" }),
        fixTrackName: /Cantata BWV 169. \d+\. (.*)/
    },
    "Cantata Gottes Zeit [Koopman] BWV106" : {
        fixAlbumTitle: cantata({ subTitle: "Gottes Zeit", BWV: 106, by: "Koopman" }),
        fixTrackName: /Gottes Zeit BWV106 - (.*)/
    },
    "Cantata Gottes Zeit [Suzuki] BWV106" : {
        fixAlbumTitle: cantata({ subTitle: "Gottes Zeit", BWV: 106, by: "Suzuki" }),
        firstTrackNumber: 13,
        fixTrackName: /Cantata no. 106, BWV 106 "Gottes Zeit ist die allerbeste Zeit": (.*)/
    },
    "Cantata Herz und Mund und Tat und Leben [Rifkin]" : {
        fixAlbumTitle: cantata({ subTitle: "Herz und Mund", BWV: 147, by: "Rifkin" }),
        fixTrackName: /Cantata, BWV 147 "Herz und Mund und Tat und Leben": Part [IVX]+, (.*)/
    },
    "Cantata Herz und Mund" : {
        fixAlbumTitle: cantata({ subTitle: "Herz und Mund", BWV: 147, by: "???" }),
        fixTrackName: /Cantata No. 147 Part I+. [IVX]+. (.*)/
    },
    "Cantata ich habe genug BWV82" : {
        fixAlbumTitle: cantata({ subTitle: "Ich habe genug", BWV: 82, by: "???" }),
        firstTrackNumber: 13,
        fixTrackName: /Cantata "Ich habe genug", BWV 82: [IV]+. (.*)/
    },
    "Cantata Ich hatte viel Bekümmernis [Koopman] BWV21" : {
        fixAlbumTitle: cantata({ subTitle: "Ich hatte viel Bekümmernis", BWV: 21, by: "Koopman" }),
        fixTrackName: /Cantata, BWV 21 "Ich hatte viel Bekümmernis": [IVX]+\. (.*)/
    },
    "Cantata Ich hatte viel Bekümmernis (appendix) [Koopman] BWV21" : {
        fixAlbumTitle: cantata({ subTitle: "appendix: Ich hatte viel Bekümmernis", BWV: 21, by: "Koopman" }),
        firstTrackNumber: 17,
        fixTrackName: /Cantata, BWV 21 "Ich hatte viel Bekümmernis": \(appendix\) (.*)/
    },
    "Cantata Jauchzet Gott in allem Landed [Rifkin]" : {
        fixAlbumTitle: cantata({ subTitle: "Jauchzet Gott", BWV: 51, by: "Rifkin" }),
        firstTrackNumber: 8,
        fixTrackName: /Cantata, BWV 51 "Jauchzet Gott in allen Landen": (.*)/
    },
    "Cantata Jesu der du meine Seele [Rifkin]" : {
        fixAlbumTitle: cantata({ subTitle: "Jesu der du meine Seele", BWV: 78, by: "Rifkin" }),
        firstTrackNumber: 13,
        fixTrackName: /Cantata, BWV 78 "Jesu, der du meine Seele": (.*)/
    },
    "Cantata Jesu meine Freunde BWV 227 " : {
        fixAlbumTitle: cantata({ subTitle: "Jesu meine Freunde", BWV: 227, by: "???" }),
        firstTrackNumber: 11,
        fixTrackName: /Jesu, meine Freunde, BW 227 [IVX]+\.(.*)/
    },
    "Cantata Liebster Gott [Rifkin]" : {
        fixAlbumTitle: cantata({ subTitle: "Liebster Gott, wann werd ich sterben", BWV: 8, by: "Rifkin" }),
        firstTrackNumber: 19,
        fixTrackName: /Cantata, BWV 8 "Liebster Gott, wann werd ich sterben": (.*)/
    },
    "Cantata Nach dir, Herr [Koopman] BWV150" : {
        fixAlbumTitle: cantata({ subTitle: "Nach dir, Herr, verlanget mich", BWV: 150, by: "Koopman" }),
        firstTrackNumber: 17,
        fixTrackName: /Nach dir, Herr, verlanget mich BWV150 - (.*)/
    },
    "Cantata Wachet auf [Rifkin]" : {
        fixAlbumTitle: cantata({ subTitle: "Wachet auf", BWV: 140, by: "Rifkin" }),
        fixTrackName: /Cantata, BWV 140 "Wachet auf, ruft uns die Stimme": Part [IVX]+, (.*)/
    },
    "Cantata Wachet auf" : {
        fixAlbumTitle: cantata({ subTitle: "Wachet auf", BWV: 140, by: "???" }),
        fixTrackName: /Cantata No. 140 [IVX]+\. (.*)/
    },
    "Cantata Wie jammern [Mullejans] BWV170" : {
        fixAlbumTitle: cantata({ subTitle: "Wie jammern", BWV: 170, by: "Mullejans" }),
        firstTrackNumber: 8,
        fixTrackName: /Cantata BWV 170. \d+. (.*)/
    },
    "CelloSuite1" : {
      // TODO fixAlbumTitle
        fixAlbumTitle: suite({ for: "Cello", num: 1, major: "G", BWV: 1007 }),
        fixTrackName: /Cello Suite No. 1 in G major, BWV 1007 [IVab]+\. (.*)/
    },
    "CelloSuite2" : {
        fixAlbumTitle: suite({ for: "Cello", num: 2, minor: "D", BWV: 1008 }),
        fixTrackName: /Cello Suite No. 2 in D minor, BWV 1008 [IVab]+\. (.*)/
    },
    "CelloSuite3" : {
        firstTrackNumber: 8,
        fixAlbumTitle: suite({ for: "Cello", num: 3, major: "C", BWV: 1009 }),
        fixTrackName: /Cello Suite No. 3 in C major, BWV 1009 [IVab]+\. (.*)/
    },
    "CelloSuite4" : {
        firstTrackNumber: 8,
        fixAlbumTitle: suite({ for: "Cello", num: 4, major: "Eb", BWV: 1010 }),
        fixTrackName: /Cello Suite No. 4 in E-flat major, BWV 1010 [IVab]+\. (.*)/
    },
    "CelloSuite5" : {
        firstTrackNumber: 15,
        fixAlbumTitle: suite({ for: "Cello", num: 5, minor: "C", BWV: 1011 }),
        fixTrackName: /Cello Suite No. 5 in C minor, BWV 1011 [IVab]+\. (.*)/
    },
    "CelloSuite6" : {
        firstTrackNumber: 15,
        fixAlbumTitle: suite({ for: "Cello", num: 6, major: "D", BWV: 1012 }),
        fixTrackName: /Cello Suite No. 6 in D major, BWV 1012 [IVab]+\. (.*)/
    },
    "Conc2Violins[Stern] BWV1043" : {
        firstTrackNumber: 7,
        fixTrackName: /Concerto for Two Violins and Orchestra in D minor, BWV 1043 [IV]+. (.*)/
    },
    "ConcOboeViolin[Stern] BWV 1060" : {
        firstTrackNumber: 10,
        fixTrackName: /Concerto for Oboe, Violin and Orchestra in C minor, BWV 1060 [IV]+. (.*)/
    },
    "Fantasias, Preludes and Fugues [Herrick]" : {
        fixTrackNameFunc: function(name: string, logger) : string {
            if (/Fantasia in .*, BWV \d+/.exec(name)) {
                return name;
            }
            var m = /and Fugue in (.*) (major|minor), BWV (\d+): I+\. (.*)/.exec(name);
            if (m) {
                var key = m[1];
                var opusNumber = m[3];
                var trackName = m[4];
                if (m[2] === "minor") {
                    key = key.toLowerCase();
                }
                return "BWV" + opusNumber + " in " + key + ": " + trackName;
            }
            throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
        },
        validation : ["skipUniqueTrackNameCheck"]
    },
    "FrenchOuverture[Gould]" : {
        firstTrackNumber: 16,
        fixTrackName: /Overture in the French Style \(in B minor\), BWV 831: [IVX]+\. (.*)/
    },
    "FrenchSuite1[Gould]" : {
        fixTrackName: /French Suite No. 1 in D minor, BWV 812: [IV]+. (.*)/
    },
    "FrenchSuite2[Gould]" : {
        firstTrackNumber: 7,
        fixTrackName: /French Suite No. 2 in C minor, BWV 813: [IV]+. (.*)/
    },
    "FrenchSuite3[Gould]" : {
        firstTrackNumber: 13,
        fixTrackName: /French Suite No. 3 in B minor, BWV 814: [IV]+. (.*)/
    },
    "FrenchSuite4[Gould]" : {
        firstTrackNumber: 19,
        fixTrackName: /French Suite No. 4 in E-flat major, BWV 815: [IV]+. (.*)/
    },
    "FrenchSuite5[Gould]" : {
        fixTrackName: /French Suite No. 5 in G major, BWV 816: [IV]+. (.*)/
    },
    "FrenchSuite6[Gould]" : {
        firstTrackNumber: 8,
        fixTrackName: /French Suite No. 6 in E major, BWV 817: [IV]+. (.*)/
    },
    "Goldberg-Strings" : {
        fixTrackNameFunc: function(name: string, logger) : string {
            if (name === "J.S. Bach Goldberg-Variationen, BWV 988 - Aria") {
                return "Aria";
            }
            var match = /J.S. Bach Goldberg-Variationen, BWV 988 - Variatio (\d+)¡E\d+¡E\d+/.exec(name);
            if (match)
            {
                var variationNumber = parseInt(match[1]);
                return "Variations " + variationNumber + "-" + (variationNumber + 2);
            }
        }
    },
    "GoldbergCanadianBrass" : {
        fixTrackName: /Goldberg Variations, BWV 988 (.*)/
    },
    "GoldbergGould1955" : {
        fixTrackName: /Goldberg Variations, BWV 988 (.*)/
    },
    "GoldbergGould1981" : {
        fixTrackName: /Goldberg Variations, BWV 988 [IVX]+\. (.*)/
    },
    "Inventions[Gould]" : {
        firstTrackNumber: 3,
        fixTrackNameFunc: function(name: string, logger) : string {
            var m = /(\d-Part Invention) No\. (\d+) in ([^ ]+) (major|minor), BWV (\d+)/.exec(name);
            if (!m) {
                throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
            }
            var key = m[3];
            if (m[4] === "minor") {
                key = key.toLowerCase();
            }
            return m[1] + " " + m[2] + " " + key + " BWV" + m[5];
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
        fixTrackName: /The Art of Fugue: (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Kunst [Münchinger]" : {
        fixTrackName: /The Art of Fugue, BWV 1080: [\dab]+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "ArtOfFugue[Gould,organ]" : {
        fixAlbumTitle: "Kunst[Gould,organ]",
        fixTrackName: /The Art of the Fugue, BWV 1080: (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Magnificat" : {
        fixTrackName: /Magnificat in D major, BWV 243: [IVX]+\. (.*)/
    },
    "Opfer [Marriner]" : {
       firstTrackNumber: 5,
       fixTrackName: /Musical Offering: (.*)/
   },
   "Opfer [Münchinger]" : {
       firstTrackNumber: 4,
       fixTrackName: /Musikalisches Opfer, BWV 1079 (.*)/
   },
   "Orchestral Suite 2 [Karajan]" : {
        firstTrackNumber: 11,
        fixTrackName: /Suite for Orchestra No. 2 in B minor, BWV 1067 [IV]+. (.*)/
    },
    "Orchestral Suite 3 [Karajan]" : {
        firstTrackNumber: 10,
        fixTrackName: /Orchestral Suite No. 3 in D Major [lV]+. (.*)/
    },
    "Organ works including toccata and fugue in D minor" : {
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Ouverture 1 [Pinnock]" : {
        firstTrackNumber: 7,
        fixTrackName: /Ouverture No. 1, BWV 1066 [IV]+\. (.*)/
    },
    "Ouverture 2 [Pinnock]" : {
        fixTrackName: /Ouverture No. 2, BWV 1067 [IV]+\. (.*)/
    },
    "Ouverture 3 [Pinnock]" : {
        firstTrackNumber: 8,
        fixTrackName: /Ouverture No. 3, BWV 1068 [IV]+\. (.*)/
    },
    "Ouverture 4 [Pinnock]" : {
        firstTrackNumber: 13,
        fixTrackName: /Ouverture No. 4, BWV 1069 [IV]+\. (.*)/
    },
    "PianoConc1 BVW1052" : {
        fixTrackName: /Piano Concerto No.1 in D minor, BWV 1052 - \d+. (.*)/
    },
    "PianoConc2 BVW1053" : {
        firstTrackNumber: 4,
        fixTrackName: /Piano Concerto No.2 in E major, BWV 1053 - \d+. (.*)/
    },
    "PianoConc3 BWV1054" : {
        firstTrackNumber: 7,
        fixTrackName: /Piano Concerto No.3 in D major, BWV 1054 - \d+. (.*)/
    },
    "PianoConc4 BWV1055" : {
        fixTrackName: /Piano Concerto No.4 in A major, BWV 1055 - \d+\. (.*)/
    },
    "PianoConc5 BWV1056" : {
        firstTrackNumber: 4,
        fixTrackName: /Piano Concerto No.5 in F minor, BWV 1056 - \d+. (.*)/
    },
    "PianoConc7 BWV1058" : {
        firstTrackNumber: 7,
        fixTrackName: /Piano Concerto No.7 in G minor, BWV 1058 - \d+. (.*)/
    },
    "PianoPartita1 BWV825" : {
        fixTrackName: /Partita No.1 in G major, BWV 825 [IV]+\. (.*)/
    },
    "PianoPartita2 BWV826" : {
        firstTrackNumber: 7,
        fixTrackName: /Partita No.2 in C minor, BWV 826 [IV]+. (.*)/
    },
    "PianoPartita3 BWV827" : {
        firstTrackNumber: 13,
        fixTrackName: /Partita No.3 in C minor, BWV 827 [IV]+. (.*)/
    },
    "PianoPartita4 BWV828" : {
        firstTrackNumber: 20,
        fixTrackName: /Partita No.4 in D Major, BWV 828, [IV]+\. (.*)/
    },
    "PianoPartita5 BWV829" : {
       firstTrackNumber: 27,
       fixTrackName: /Partita No.5 in G major, BWV 829\. [IV]+\. (.*)/
   },
   "PianoPartita6 BWV830" : {
       fixTrackName: /Partita No. 6 in E minor, BWV 830 [IV]+\. (.*)/
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
          var m = /(\d+) Johannes-Passion, BWV 245: Teil [I]+\. (.*)/.exec(name);
          if (m)
          {
              return m[1] + " " + m[2];
          }
          return name;
      },
      validation : ["skipUniqueTrackNameCheck"]
  },
  "St. Matthew Passion" : {
      fixTrackName: /St. Matthew Passion, BWV 244 Teil [I]+. (.*)/
  },
  "Two fugues from WellTemp2[Gould1955]" : {
      firstTrackNumber: 33,
      fixTrackName: /The Well-Tempered Clavier (.*)/
  },
  "ViolinConc[Stern] BWV 1041" : {
      fixAlbumTitle: concerto({for:"Violin", minor:"A", BWV:1041, by:"Stern" }),
      fixTrackName: /Concerto for Violin and Orchestra in A minor, BWV 1041 [IV]+\. (.*)/
  },
  "ViolinConc[Stern] BWV 1042" : {
      fixAlbumTitle: concerto({for:"Violin", major:"E", BWV:1042, by:"Stern" }),
      firstTrackNumber: 4,
      fixTrackName: /Concerto for Violin and Orchestra in E major, BWV 1042 [IV]+. (.*)/
  },
  "ViolinPartita1 BWV1002" : {
      firstTrackNumber: 5,
      fixTrackName: /Partita No. 1 in B minor, BWV 1002 [IV]+\. (.*)/
  },
  "ViolinPartita2 BWV1004" : {
      fixTrackName: /Partita No. 2 in D minor, BWV 1004 [IV]+\. (.*)/
  },
  "ViolinPartita3 BWV1006" : {
      firstTrackNumber: 10,
      fixTrackName: /Partita No. 3 in E, BWV 1006 [IV]+. (.*)/
  },
  "ViolinSoloSon1 BWV1001" : {
      fixAlbumTitle: sonata({num: 1, for: "ViolinSolo", BWV:1001, minor: "G" }),
      fixTrackName: /Sonata No. 1 in G minor, BWV 1001 [IV]+. (.*)/
  },
  "ViolinSoloSon2 BWV1003" : {
      fixAlbumTitle: sonata({num: 2, for: "ViolinSolo", BWV:1003, minor: "A" }),
      firstTrackNumber: 13,
      fixTrackName: /Sonata No. 2 in A minor, BWV 1003 [IV]+\. (.*)/
  },
  "ViolinSoloSon3 BWV1005" : {
      fixAlbumTitle: sonata({num: 3, for: "ViolinSolo", BWV:1005, major: "C" }),
      firstTrackNumber: 6,
      fixTrackName: /Sonata No. 3 in C, BWV 1005 [IV]+. (.*)/
  },
  "ViolinSonata BWV1014" : {
      fixAlbumTitle: sonata({num: 1, for: "Violin", BWV:1014, minor: "B" }),
      fixTrackName: /ViolinSonata BWV1014 - (.*)/
  },
  "ViolinSonata BWV1015" : {
      fixAlbumTitle: sonata({num: 2, for: "Violin", BWV:1015, major: "A" }),
      firstTrackNumber: 5,
      fixTrackName: /ViolinSonata BWV1015 - (.*)/
  },
  "ViolinSonata BWV1019" : {
     fixAlbumTitle: sonata({num: 6, for: "Violin", BWV:1019, major: "G" }),
     firstTrackNumber: 9,
     fixTrackName: /ViolinSonata BWV1019 - (.*)/
  },
  "ViolinSonata4[Gould-Menuhin]" : {
      fixAlbumTitle: sonata({num: 4, for: "Violin", BWV:1017, minor: "C", by: "Gould/Menuhin" }),
      fixTrackName: /Bach PianoSonata4 BWV1017 - (.*)/
  },
  "WellTemp1 [Fellner]" : {
      fixTrackNameFunc: function(name: string, logger) : string {
          var m = /(Präludium|Fuge) [IVX]+ in ([a-zA-Z]+)-(Dur|Moll), BWV \d+/.exec(name);
          if (m) {
              var type = m[1];
              var key = m[2].toLowerCase();
              if (m[3] === "Dur") {
                  key = key.charAt(0).toUpperCase() + key.slice(1);
              }
              if (type !== "Fuge") {
                  type = "Prelude";
              }
              return type + " in " + key;
          }
          throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
      },
      validation : ["skipUniqueTrackNameCheck"]
  },
  "WellTemp1 [Gould]" : {
      fixTrackNameFunc: function(name: string, logger) : string {
          if (name === "Prelude in E-flat minor and Fugue in D-sharp minor, BWV 853: I. Praeludium") {
              return "Prelude in e-flat";
          }
          if (name === "Prelude in E-flat minor and Fugue in D-sharp minor, BWV 853: II. Fuga") {
              return "Fuge in d-sharp"
          }
          var m = /Prelude and Fugue no\. \d+ in ([a-zA-Z\-]+) (major|minor), BWV \d+: [IVX]+\. (Praeludium|Fuga)/.exec(name);
          if (m) {
              var key = m[1].toLowerCase();
              if (m[2] === "major") {
                  key = key.charAt(0).toUpperCase() + key.slice(1);
              }
              var type = m[3];
              if (type === "Fuga") {
                  type = "Fuge";
              }
              if (type === "Praeludium") {
                  type = "Prelude";
              }
              return type + " in " + key;
          }
          throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
      },
      validation : ["skipUniqueTrackNameCheck"]
  },
  "WellTemp2 [Gould]" : {
      fixTrackNameFunc: function(name: string, logger) : string {
          var trackNumber, key, type;
          var m = /Prelude and Fugue No.\d+ in ([a-zA-Z]+) (major|minor) - (Prelude|Fugue)/.exec(name);
          var n = /Prelude (?:&|and) Fugue No.\d+ [Ii]n (.*) ([Mm]ajor|[Mm]inor) (?:- )?(Prelude|Fugue)/.exec(name);
          var o = /(Prelude|Fugue) No.\d+ in (.*) ?(major|minor)?/.exec(name);
          if (m) {
              key = m[1].toLowerCase();
              if (m[2].toLowerCase() === "major") {
                  key = key.charAt(0).toUpperCase() + key.slice(1);
              }
              type = m[3];
              if (type === "Fugue") {
                  type = "Fuge";
              }
          } else if(n) {
              key = n[1].toLowerCase();
              if (n[2] === "Major") {
                  key = key.charAt(0).toUpperCase() + key.slice(1);
              }
              type = n[3];
          } else if (o) {
              type = o[1];
              key = o[2].toLowerCase();
              if (o[3] !== "minor") {
                  key = key.charAt(0).toUpperCase() + key.slice(1);
              }
          } else {
              throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
          }
          return type + " in " + key;
      },
      validation : ["skipUniqueTrackNameCheck"]
  },
  "WellTemp2 [Tureck]" : {
      fixTrackNameFunc: function(name: string, logger) : string {
          var trackNumber, key, type;
          var m = /Prelude and Fugue no. \d+ in (.*) (major|minor), BWV \d+: [IVX]+\. (Praeludium|Fuga)/.exec(name);
          if (m) {
              key = m[1].toLowerCase();
              if (m[2].toLowerCase() === "major") {
                  key = key.charAt(0).toUpperCase() + key.slice(1);
              }
              type = m[3];
              if (type === "Praeludium") {
                  type = "Prelude";
              } else if (type === "Fuga") {
                  type = "Fuge";
              }
          } else {
              throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
          }
            return type + " in " + key;
        },
        validation : ["skipUniqueTrackNameCheck"]
    }
};
