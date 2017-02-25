import { Format, cantata, concerto, concerto_grosso, quartet, symphony, sonata, trio, quintet } from "../AlbumFormat";

export var rules = {
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

            var parseFirstFormat = function(name: string)
            {
                var match = /Prelude and Fugue No\.(\d+) in ([A-Za-z]+)( flat| sharp)?( major| minor)? - (Prelude|Fugue)/.exec(name);
                if (!match)
                {
                  return undefined;
                }
                return {
                  number: match[1],
                  key: match[2],
                  sharpOrFlat: match[3],
                  minorOrMajor: match[4],
                  preludeOrFugue: match[5]
                }
            };

            var parseSecondFormat = function(name: string)
            {
              var match = /(Prelude|Fugue) in ([A-Z])( sharp| flat)?( major| minor), Op\. 87 No\. (\d+)/.exec(name);
              if (!match)
              {
                return undefined;
              }
              return {
                preludeOrFugue: match[1],
                key: match[2],
                sharpOrFlat: match[3],
                minorOrMajor: match[4],
                number: match[5]
              }
            };

            var formatKey = function(key: string, sharpOrFlat: string, minorOrMajor: string)
            {
              if (sharpOrFlat === " sharp")
              {
                  key += "#";
              }
              if (sharpOrFlat === " flat")
              {
                  key += "b";
              }
              if (minorOrMajor === " minor")
              {
                  return key.toLowerCase();
              }
              return key;
            };

            var parsed = parseFirstFormat(name) || parseSecondFormat(name);

            if (!parsed)
            {
                throw new Error("Could not parse name in Shostakovich preludes and fugues");
            }

            var formattedKey = formatKey(parsed.key, parsed.sharpOrFlat, parsed.minorOrMajor);

            return parsed.preludeOrFugue + " " + parsed.number + " in " + formattedKey;
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
};
