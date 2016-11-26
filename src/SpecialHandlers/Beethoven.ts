import { Format, cantata, quartet, symphony, sonata, concerto } from "../AlbumFormat";

export function Create()
{
    return {
        "Eroica Variations E# op.35 [Gilels]": {
            firstTrackNumber: 9,
            fixTrackName: /^(\d+)\. 15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*).mp3$/
        },
        "CelloSonata1" : {
            fixAlbumTitle: sonata({num:1, for:"Cello",major:"F",op:[5, 1] }),
            fixTrackName: /(\d+) Sonata for Cello and Piano No. 1 in F major, Op. 5 No. 1: [IV]+\. (.*)\.mp3/
        },
        "CelloSonata2" : {
            firstTrackNumber: 3,
            fixAlbumTitle: sonata({num:2, for:"Cello",minor:"G",op:[5, 2] }),
            fixTrackName: /(\d+) Sonata for Cello and Piano No. 2 in G minor, Op. 5 No. 2: [IV]+\. (.*)\.mp3/
        },
        "CelloSonata3" : {
            firstTrackNumber: 5,
            fixAlbumTitle: sonata({num:3, for:"Cello", major:"A", op:69 }),
            fixTrackName: /(\d+) Sonata for Cello and Piano No. 3 in A major, Op. 69: [IV]+\. (.*)\.mp3/
        },
        "CelloSonata4" : {
            fixAlbumTitle: sonata({num:4, for:"Cello", op:[102,1] }),
            fixTrackName: /(\d+) Cello Sonata 4 Op 102 No 1 - \d - (.*).mp3/
        },
        "CelloSonata5" : {
            firstTrackNumber: 3,
            fixAlbumTitle: sonata({num:5, for:"Cello", op:[102,2] }),
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
        // TODO remove?
        "GroßeFuge[Lindsay]" : {
            firstTrackNumber: 6
        },
        // TODO remove?
        // amadeus quartet?
        "GrosseFuge" : {
            firstTrackNumber: 7
        },
        // TODO remove?
        "GrosseFuge [Tokyo]" : {
            firstTrackNumber: 6,
            fixTrackName: /(\d+) (Große Fuge) in B-flat major for String Quartet op. 133: Overtura. Allegro - Meno mosso e moderato - Allegro - Fuga. \[Allegro\] - Meno mosso e moderato - Allegro molto e con brio - Allegro.mp3/
        },
        "Leonore Overture no. 2" : {
            firstTrackNumber: 5
        },
        "Mass in C Major" : {
            fixTrackName: /(\d+) - Mass in C Major (?:Op. 86 )?- (.*)\.mp3/
        },
        "PianoConc1" : {
            fixAlbumTitle: concerto({num:1, for:"Piano", major:"C", op:15 }),
            fixTrackName: /(\d+) - Klavierkonzert Nr. 1 C-dur, Op. 15 [IV]+\. (.*)\.mp3/
        },
        "PianoConc2" : {
            firstTrackNumber: 4,
            fixAlbumTitle: concerto({num:2, for:"Piano", major:"B", op:19 }),
            fixTrackName: /(\d+) - Klavierkonzert Nr. 2 B-dur, Op. 19 [IV]+\. (.*)\.mp3/
        },
        "PianoConc3" : {
            fixAlbumTitle: concerto({num:3, for:"Piano", minor:"C", op:37 }),
        },
        "PianoConc4" : {
            firstTrackNumber: 4,
            fixAlbumTitle: concerto({num:4, for:"Piano", major:"G", op:58 }),
            fixTrackName: /(\d+) - \d+\. (.*).mp3/
        },
        "PianoConc5" : {
            fixAlbumTitle: concerto({num:5, for:"Piano", major:"Eb", op:73 }),
        },
        "PianoConc5[Gould]" : {
            fixAlbumTitle: concerto({num:5, for:"Piano", major:"Eb", op:73, by:"Gould" }),
            fixTrackName: /(\d+) - Beethoven Piano Concerto 5 - \d+ - (.*).mp3/
        },
        "PianoTrio7[Richter] Op97 Archduke" : {
            fixTrackName: /(\d+) - Piano Trio No\.7 in B flat, Op\. 97 Archduke - \d+\. (.*).mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Quartet1 [Tokyo]" : {
            fixAlbumTitle: quartet({num:1, major:"F", op:[18,1], by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 1 in F major, op. 18-1: [IV]+\. (.*)\.mp3/
        },
        "Quartet2 [Tokyo]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: quartet({num:2, major:"G", op:[18,2], by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 2 in G major, op. 18-2: [IV]+\. (.*)\.mp3/
        },
        "Quartet3 Op18No3 [Kodaly]" : {
            fixAlbumTitle: quartet({num:3, major:"D", op:[18,3], by:"Kodaly"}),
            fixTrackName: /(\d+) - Beethoven String Quartet in D Major, Op.18, No.3 - [IV]+\. (.*)\.mp3/
        },
        "Quartet3 [Tokyo]" : {
            fixAlbumTitle: quartet({num:3, major:"D", op:[18,3], by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 3 in D major, op. 18-3: [IV]+\. (.*)\.mp3/
        },
        "Quartet4 Op18No4 [Kodaly]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: quartet({num:4, minor:"C", op:[18,4], by:"Kodaly"}),
            fixTrackName: /(\d+) - Beethoven String Quartet in C Minor, Op.18, No.4 - [IV]+\. (.*)\.mp3/
        },
        "Quartet4 [Tokyo]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: quartet({num:4, minor:"C", op:[18,4], by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 4 in C minor, op. 18-4: [IV]+\. (.*)\.mp3/
        },
        "Quartet5 [Tokyo]" : {
            fixAlbumTitle: quartet({num:5, major:"A", op:[18,5], by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 5 in A major, op. 18-5: [IV]+\. (.*)\.mp3/
        },
        "StringQuartet5 Op18No5" : {
            fixAlbumTitle: quartet({num:5, major:"A", op:[18,5] }),
            fixTrackName: /(\d+) - String quartet in A major, op 18, No.5; (.*)\.mp3/
        },
        "Quartet6 [Tokyo]" : {
            firstTrackNumber: 9,
            fixAlbumTitle: quartet({num:6, major:"Bb", op:[18,6], by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 6 in B-flat major, op. 18-6: [IV]+\. (.*)\.mp3/
        },
        "Quartet7 [Tokyo]" : {
            fixAlbumTitle: quartet({num:7, major:"F", op:[59,1], by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 7 in F major, op. 59-1 “Rasumovsky”: [IV]+\. (.*)\.mp3/
        },
        "Quartet8 [Tokyo]" : {
            fixAlbumTitle: quartet({num:8, minor:"E", op:[59,2], by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 8 in E minor, op. 59-2 “Rasumovsky”: [IV]+\. (.*)\.mp3/
        },
        "Quartet9 [Tokyo]" : {
            fixAlbumTitle: quartet({num:9, major:"C", op:[59,3], by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 9 in C major, op. 59-3 “Rasumovsky”: [IV]+\. (.*)\.mp3/
        },
        "Quartet10 [Tokyo]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: quartet({num:10, major:"Eb", op:74, subTitle:"Harp", by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 10 in E-flat major, op. 74 \“Harp\”: [IV]+\. (.*)\.mp3/
        },
        "Quartet11 [Tokyo]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: quartet({num:11, minor:"F", op:95, subTitle:"Serioso", by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 11 in F minor, op. 95 \“Serioso\”: [IV]+\. (.*)\.mp3/
        },
        "Quartet12 [Tokyo]" : {
            fixAlbumTitle: quartet({num:12, major:"Eb", op:127, by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 12 in E-flat major, op\. 127: [IV]+\. (.*)\.mp3/
        },
        "Quartet12[Lindsay]" : {
            fixAlbumTitle: quartet({num:12, major:"Eb", op:127, by:"Lindsay"}),
            fixTrackName: /(\d+) Quartet 12 Op 127 - \d+ - (.*)\.mp3/
        },
        "Quartet13[Tokyo]" : {
            fixAlbumTitle: quartet({num:13, major:"Bb", op:130, by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 13 in B-flat major, op. 130: [IV]+\. (.*).mp3/
        },
        "Quartet13[Lindsay]" : {
            fixAlbumTitle: quartet({num:13, major:"Bb", op:130, by:"Lindsay"}),
            fixTrackName: /(\d+) Quartet no. 13 in B-flat major, op. 130: [IV]+\. (.*).mp3/
        },
        "Quartet13-GrosseFuge[Lindsay]" : {
            fixAlbumTitle: quartet({num:13, major:"Bb", op:130, subTitle:"Große Fuge", by:"Lindsay"}),
            fixTrackName: /(\d+) Quartet no. 13 in B-flat major, op. 130: [IV]+\. (.*)\.mp3/
        },
        "Quartet13-GrosseFuge[Tokyo]" : {
            fixAlbumTitle: quartet({num:13, major:"Bb", op:130, subTitle:"Große Fuge", by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 13 in B-flat major, op. 130: [IV]+\. (.*)\.mp3/
        },
        // TODO make second versions with Grosse Fuge as last movement
        "StringQuartetOp130[Amadeus]" : {
            fixAlbumTitle: quartet({num:13, major:"Bb", op:130, /*subTitle:"Große Fuge",*/ by:"Amadeus"}),
            fixTrackName: /(\d+) - String quartet Op 130 - \d+ - (.*)\.mp3/
        },
        "Quartet14[Lindsay]" : {
            fixAlbumTitle: quartet({num:14, minor:"C#", op:131, by:"Lindsay"}),
            fixTrackName: /(\d+) Quartet for 2 Violins, Viola, and Cello no. 14 in C-sharp minor, op. 131: [IV]+\. (.*)\.mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        // Quartet14 C# Op131 [Bernstein], they're ogg files
        "Quartet14 [Tokyo]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: quartet({num:14, minor:"C#", op:131, by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 14 in C-sharp minor, op. 131: [IV]+\. (.*)\.mp3/
        },
        "Quartet15[Lindsay]" : {
            fixAlbumTitle: quartet({num:15, minor:"A", op:132, by:"Lindsay"}),
            fixTrackName: /(\d+) Quartet for 2 Violins, Viola, and Cello no. 15 in A minor, op. 132: [IV]+\. (.*)\.mp3/
        },
        "Quartet15 [Tokyo]" : {
            fixAlbumTitle: quartet({num:15, minor:"A", op:132, by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 15 in A minor, op. 132: [IV]+\. (.*)\.mp3/
        },
        "Quartet16[Lindsay]" : {
            firstTrackNumber: 6,
            fixAlbumTitle: quartet({num:16, major:"F", op:135, by:"Lindsay"}),
            fixTrackName: /(\d+) Quartet for 2 Violins, Viola, and Cello no. 16 in F major, op. 135: [IV]+\. (.*)\.mp3/
        },
        "Quartet16 [Tokyo]" : {
            firstTrackNumber: 6,
            fixAlbumTitle: quartet({num:16, major:"F", op:135, by:"Tokyo"}),
            fixTrackName: /(\d+) String Quartet no. 16 in F major, op. 135: [IV]+\. (.*).mp3/
        },
        "StringQuartetOp135[Amadeus]" : {
            firstTrackNumber: 8,
            fixAlbumTitle: quartet({num:16, major:"F", op:135, by:"Amadeus"}),
            fixTrackName: /(\d+) - String quartet Op 135 - \d+ - (.*)\.mp3/
        },
        // Quartet16 F Op135 [Bernstein], they're ogg files
        "Quintet Op16[Richter]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: "Quintet [Richter] in Eb Op.16",
            fixTrackName: /(\d+) - Quintet in E flat, Op. 16 - \d+\. (.*)\.mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Quintet [Tokyo]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: "Quintet [Tokyo] in Eb Op.16",
            fixTrackName: /(\d+) String Quartet in C major, op. 29: [IV]+\. (.*).mp3/
        },
        "Sonata1[Goode]" : {
            fixAlbumTitle: sonata({ num : 1, op:[2, 1], minor : "f", by: "Goode" }),
            fixTrackName: /(\d+) Goode - Piano Sonata No.1 F minor [IV]+\. (.*)\.mp3/
        },
        "Sonata1[Gould]" : {
            fixAlbumTitle: sonata({ num : 1, op:[2, 1], minor : "f", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 1 in F minor, Op. 2, No. 1 - [IV]+\. (.*).mp3/
        },
        "Sonata2[Goode]" : {
            fixAlbumTitle: sonata({ num : 2, op:[2, 2], major : "A", by: "Goode" }),
            firstTrackNumber: 5,
            fixTrackName: /(\d+) Goode - Piano Sonata No.2 A major [IV]+\. (.*)\.mp3/
        },
        "Sonata2[Gould]" : {
            fixAlbumTitle: sonata({ num : 2, op:[2, 2], major : "A", by: "Gould" }),
            firstTrackNumber: 5,
            fixTrackName: /(\d+) Sonata No. 2 in A major, Op. 2, No. 2 - [IV]+\. (.*).mp3/
        },
        "Sonata3[Goode]" : {
            fixAlbumTitle: sonata({ num : 3, op:[2, 3], major : "C", by: "Goode" }),
            firstTrackNumber: 9,
            fixTrackName: /(\d+) Goode - Piano Sonata No.3 in C major [IV]+\. (.*)\.mp3/
        },
        "Sonata3[Gould]" : {
            fixAlbumTitle: sonata({ num : 3, op:[2, 3], major : "C", by: "Gould" }),
            firstTrackNumber: 9,
            fixTrackName: /(\d+) Sonata No. 3 in C major, Op. 2, No. 3 - [IV]+\. (.*)\.mp3/
        },
        "Sonata5[Goode]" : {
            fixAlbumTitle: sonata({ num : 5, op:[10, 1], minor : "C", by: "Goode" }),
            fixTrackName: /(\d+) No.5 in C minor, op.10, no.1- (.*)\.mp3/
        },
        "Sonata5[Gould]" : {
            fixAlbumTitle: sonata({ num : 5, op:[10, 1], minor : "C", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 5 in C minor, Op. 10, No. 1 - [IV]+\. (.*).mp3/
        },
        "Sonata6[Goode]" : {
            fixAlbumTitle: sonata({ num : 6, op:[10, 2], major : "F", by: "Goode" }),
            firstTrackNumber: 4,
            fixTrackName: /(\d+) No.6 in F major, op.10, no.2- (.*).mp3/
        },
        "Sonata6[Gould]" : {
            fixAlbumTitle: sonata({ num : 6, op:[10, 2], major : "F", by: "Gould" }),
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Sonata No. 6 in F major, Op. 10, No. 2 - [IV]+\. (.*)\.mp3/
        },
        "Sonata7[Goode]" : {
            fixAlbumTitle: sonata({ num : 7, op:[10, 3], major : "D", by: "Goode" }),
            firstTrackNumber: 7,
            fixTrackName: /(\d+) No.7 in D major, op.10, no.3- (.*)\.mp3/
        },
        "Sonata7[Gould]" : {
            fixAlbumTitle: sonata({ num : 7, op:[10, 3], major : "D", by: "Gould" }),
            firstTrackNumber: 7,
            fixTrackName: /(\d+) Sonata No. 7 in D major, Op. 10, No. 3 - [IV]+\. (.*)\.mp3/
        },
        "Sonata8[Goode]" : {
            fixAlbumTitle: sonata({ num : 8, op:13, subTitle: "Pathetique", minor : "C", by: "Goode" }),
            firstTrackNumber: 8
        },
        "Sonata8[Gould]" : {
            fixAlbumTitle: sonata({ num : 8, op:13, subTitle: "Pathetique", minor : "C", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No.8 IN C Minor, Op.13 'Pathetique'- [IV]+\. (.*)\.mp3/
        },
        "Sonata9[Goode]" : {
            fixAlbumTitle: sonata({ num : 9, op:[14, 1], major : "E", by: "Goode" }),
            firstTrackNumber: 5
        },
        "Sonata9[Gould]" : {
            fixAlbumTitle: sonata({ num : 9, op:[14, 1], major : "E", by: "Gould" }),
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Sonata No.9 In E Major, Op.14, No. 1- [IV]+\. (.*).mp3/
        },
        "Sonata9 arranged for strings [Tokyo]" : {
            fixAlbumTitle: sonata({ num : 9, op:[14, 1], major : "E", by: "Tokyo Quartet" }),
            firstTrackNumber: 9,
            fixTrackName: /(\d+) String Quartet in F major after Piano Sonata, op. 14-1: [IV]+\. (.*).mp3/
        },
        "Sonata10[Gould]" : {
            firstTrackNumber: 7,
            fixAlbumTitle: sonata({ num : 10, op:[14, 2], major : "G", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No\.10 In G Major, Op\.14, No.2\- I+\. (.*)\.mp3/
        },
        "Sonata10[Goode]" : {
            fixAlbumTitle: sonata({ num : 10, op:[14, 2], major : "G", by: "Goode" }),
            fixTrackName: /(\d+) No.10 in G major, op.14, no.\d- (.*)\.mp3/
        },
        "Sonata11[Goode]" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ num : 11, op:22, minor : "b", by: "Goode" }),
            fixTrackName: /(\d+) No.11 in B-moll major, op.22- (.*)\.mp3/
        },
        "Sonata12[Goode]" : {
            firstTrackNumber: 8,
            fixAlbumTitle: sonata({ num : 12, op:26, minor : "a", by: "Goode" }),
            fixTrackName: /(\d+) No.12 in A-moll major, op.26- (.*)\.mp3/
        },
        "Sonata12[Gould]" : {
            firstTrackNumber: 11,
            fixAlbumTitle: sonata({ num : 12, op:26, major : "Ab", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 12 in A flat major, Op. 26 - [IV]+\. (.*)\.mp3/
        },
        "Sonata13[Goode]" : {
            fixAlbumTitle: sonata({ num : 13, op:[27,1], major : "Eb", by: "Goode" }),
            fixTrackName: /(\d+) No.13 in E-moll major, op.27, no.1- (.*)\.mp3/
        },
        "Sonata13[Gould]" : {
            firstTrackNumber: 10,
            fixAlbumTitle: sonata({ num : 13, op:[27,1], major : "Eb", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No.13 In E-Flat Major, Op.27, No.1- [IV]+\. (.*)\.mp3/
        },
        "Sonata14[Goode]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: sonata({ num : 14, op:[27,2], subTitle:"Moonlight", minor : "C#", by: "Goode" }),
            fixTrackName: /(\d+) No.14 in C flat minor, op.27, no.2- (.*)\.mp3/
        },
        "Sonata14[Gould]" : {
            firstTrackNumber: 14,
            fixAlbumTitle: sonata({ num : 14, op:[27,2], subTitle:"Moonlight", minor : "C#", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No.14 In C-Sharp Minor, Op.27, No.2 'Moonlight'- [IV]+\. (.*)\.mp3/
        },
        "Sonata15[Goode]" : {
            firstTrackNumber: 8,
            fixAlbumTitle: sonata({ num : 15, op:28, major : "D", by: "Goode" }),
            fixTrackName: /(\d+) No.15 in D major, op.28- (.*)\.mp3/
        },
        "Sonata15[Gould]" : {
            fixAlbumTitle: sonata({ num : 15, op:28, major : "D", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 15 in D major, [IV]+\. (.*).mp3/
        },
        "Sonata16[Goode]" : {
            fixAlbumTitle: sonata({ num : 16, op:[31,1], major : "G", by: "Goode" }),
            fixTrackName: /(\d+) Sonata No.16 in G major,Op.31,No.1 - [IV]+\. (.*)\.mp3/
        },
        "Sonata16[Gould]" : {
            fixAlbumTitle: sonata({ num : 16, op:[31,1], major : "G", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 16 in G major, op. 31,1 - [IV]+\. (.*)\.mp3/
        },
        "Sonata17[Goode]" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ num : 17, op:[31,2], subTitle:"Tempest", minor : "D", by: "Goode" }),
            fixTrackName: /(\d+) Sonata No.17 in D minor,Op.31,No.2 \(Tempest\) - [IV]+\. (.*).mp3/
        },
        "Sonata17[Gould]" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ num : 17, op:[31,2], subTitle:"Tempest", minor : "D", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 17 in D minor, op. 31,2 - [IV]+\. (.*)\.mp3/
        },
        "Sonata18[Goode]" : {
            firstTrackNumber: 7,
            fixAlbumTitle: sonata({ num : 18, op:[31,3], major : "Eb", by: "Goode" }),
            fixTrackName: /(\d+) Sonata No.18 in E-flat major,Op.31,No.3 - [IV]+\. (.*).mp3/
        },
        "Sonata18[Gould]" : {
            firstTrackNumber: 7,
            fixAlbumTitle: sonata({ num : 18, op:[31,3], major : "Eb", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 18 in E-flat major, op. 31,3 - [IV]+\. (.*)\.mp3/
        },
        "Sonata18[Richter]" : {
            fixAlbumTitle: sonata({ num : 18, op:[31,3], major : "Eb", by: "Richter" }),
            fixTrackName: /(\d+) - \d+\. (.*)\.mp3/
        },
        "Sonata19[Goode]" : {
            fixAlbumTitle: sonata({ num : 19, op:49, minor : "G", by: "Goode" })
        },
        "Sonata20[Goode]" : {
            firstTrackNumber: 3,
            fixAlbumTitle: sonata({ num : 20, op:[49,2], major : "G", by: "Goode" }),
            fixTrackName: /(\d+) I+\. (.*).mp3/
        },
        "Sonata21[Goode]" : {
            fixAlbumTitle: sonata({ num : 21, op:53, major : "C", subTitle: "Waldstein", by: "Goode" }),
            fixTrackName: /(\d+) Sonata No. 21 in C Major \(Waldstein\), Op. 53- (.*)\.mp3/
        },
        "Sonata22[Goode]" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ num : 22, op:54, major : "F", by: "Goode" }),
            fixTrackName: /(\d+) Sonata No. 22 in F Major, Op. 54- (.*)\.mp3/
        },
        "Sonata23[Goode]" : {
            firstTrackNumber: 6,
            fixAlbumTitle: sonata({ num : 23, subTitle: "Appassionata", op:57, minor : "F", by: "Goode" }),
            fixTrackName: /(\d+) Sonata No. 23 in F Minor \(Appassionata\), Op. 57- (.*)\.mp3/
        },
        "Sonata23[Gould]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: sonata({ num : 23, subTitle: "Appassionata", op:57, minor : "F", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 23 in F minor, [IV]+\. (.*)\.mp3/
        },
        "Sonata24[Demidenko]" : {
            fixAlbumTitle: sonata({ num : 24, subTitle: "à Thérèse", op:78, minor : "F#", by: "Demidenko" }),
            fixTrackName: /(\d+) - Sonata24 - (.*).mp3/
        },
        "Sonata24[Goode]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: sonata({ num : 24, subTitle: "à Thérèse", op:78, minor : "F#", by: "Goode" }),
            fixTrackName: /(\d+) I+. (.*).mp3/
        },
        "Sonata24[Gould] \"À Thérèse\"" : {
            fixAlbumTitle: sonata({ num : 24, subTitle: "à Thérèse", op:78, minor : "F#", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 24 in F-sharp major, Op. 78 \"À Thérèse\": I+\. (.*).mp3/
        },
        "Sonata25[Goode]" : {
            firstTrackNumber: 7,
            fixAlbumTitle: sonata({ num : 25, op:79, major : "G", by: "Goode" }),
            fixTrackName: /(\d+) [IV]+\. (.*)\.mp3/
        },
        "Sonata26[Goode]" : {
            firstTrackNumber: 10,
            fixAlbumTitle: sonata({ num : 26, op:81, major : "Eb", by: "Goode" }),
            fixTrackName: /(\d+) [IV]+\. (.*)\.mp3/
        },
        "Sonata27[Goode]" : {
            firstTrackNumber: 13,
            fixAlbumTitle: sonata({ num : 27, op:90, minor : "E", by: "Goode" }),
            fixTrackName: /(\d+) No.27 in E minor, op.90- (.*)\.mp3/
        },
        "Sonata28[Richter]" : {
            firstTrackNumber: 7,
            fixAlbumTitle: sonata({ num : 28, op:101, major : "A", by: "Richter" }),
            fixTrackName: /(\d+) - Sonata No.28 in A, Op. 101 - \d+\. (.*)\.mp3/
        },
        "Sonata29[Goode]" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ num : 29, subTitle: "Hammerklavier", op:106, major : "Bb", by: "Goode" }),
            fixTrackName: /(\d+) [IV]+\. (.*)\.mp3/
        },
        "Sonata29[Gould] \"Hammerklavier\"" : {
            firstTrackNumber: 3,
            fixAlbumTitle: sonata({ num : 29, subTitle: "Hammerklavier", op:106, major : "Bb", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 29 in B-flat major, Op. 106 "Hammerklavier": [IV]+\. (.*)\.mp3/
        },
        "Sonata30[Goode]" : {
            fixAlbumTitle: sonata({ num : 30, op:109, major : "E", by: "Goode" }),
            fixTrackName: /(\d+) Sonata No.30 in E major, Op.109 - [IV]+\. (.*).mp3/
        },
        "Sonata30[Gould]" : {
            fixAlbumTitle: sonata({ num : 30, op:109, major : "E", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 30 In E Major, Op. 109- [IV]+\. (.*)\.mp3/
        },
        "Sonata31[Goode]" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ num : 31, op:110, major : "Ab", by: "Goode" }),
            fixTrackName: /(\d+) Sonata No.31 in A flat major, Op.110 - [IV]+\. (.*)\.mp3/
        },
        "Sonata31[Gould]" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ num : 31, op:110, major : "Ab", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 31 In A-Flat Major, Op. 110- [IV]+\. (.*)\.mp3/
        },
        "Sonata32[Goode]" : {
            firstTrackNumber: 7,
            fixAlbumTitle: sonata({ num : 32, op:111, minor : "C", by: "Goode" }),
            fixTrackName: /(\d+) Sonata No.32 in C minor, Op.111 - [IV]+\. (.*)\.mp3/
        },
        "Sonata32[Gould]" : {
            firstTrackNumber: 7,
            fixAlbumTitle: sonata({ num : 32, op:111, minor : "C", by: "Gould" }),
            fixTrackName: /(\d+) Sonata No. 32 In C Minor, Op. 111- [IV]+\. (.*)\.mp3/
        },
        "Symph1[Karajan]" : {
            fixAlbumTitle: symphony({ num : 1, op:21, major : "C", by: "Karajan" }),
            fixTrackName: /(\d+) Symphonie Nr. 1 C-dur op. 21: \d+\. (.*)\.mp3/
        },
        "Symph1[Norrington]" : {
            fixAlbumTitle: symphony({ num : 1, op:21, major : "C", by: "Norrington" }),
            fixTrackName: /(\d+) - Symphony No. 1 in C major, Op. 21 [IV]+\. (.*)\.mp3/
        },
        "Symph2[Karajan]" : {
            fixAlbumTitle: symphony({ num : 2, op:36, major : "D", by: "Karajan" }),
            fixTrackName: /(\d+) Symphonie Nr. 2 D-dur op. 36: \d+\. (.*)\.mp3/
        },
        "Symph2[Norrington]" : {
            fixAlbumTitle: symphony({ num : 2, op:36, major : "D", by: "Norrington" }),
            fixTrackName: /(\d+) - Symphony No. 2 in D major, Op. 36 [IV]+\. (.*)\.mp3/
        },
        "Symph3[Haitink]" : {
            fixAlbumTitle: symphony({ num : 3, subTitle:"Eroica", op:55, major : "Eb", by: "Haitink" }),
            fixTrackName: /(\d+) Symphony no. 3 in E‐flat major, op. 55 \“Eroica\”: [IV]+\. (.*)\.mp3/
        },
        "Symph3[Karajan]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num : 3, subTitle:"Eroica", op:55, major : "Eb", by: "Karajan" }),
            fixTrackName: /(\d+) Symphonie Nr. 3 in Es-dur op. 55 \»Eroica\«: \d+\. (.*)\.mp3/
        },
        "Symph3[Norrington]" : {
            firstTrackNumber: 2,
            fixAlbumTitle: symphony({ num : 3, subTitle:"Eroica", op:55, major : "Eb", by: "Norrington" }),
            fixTrackName: /(\d+) - Symphony No.3 In E Flat Major, Op.55 (.*)\.mp3/
        },
        "Symph4[Karajan]" : {
           firstTrackNumber: 5,
           fixAlbumTitle: symphony({ num : 4, op:60, major : "Bb", by: "Karajan" }),
           fixTrackName: /(\d+) Symphonie Nr. 4 B-dur op. 60: \d+\. (.*)\.mp3/
       },
       "Symph4[Norrington]" : {
           fixAlbumTitle: symphony({ num : 4, op:60, major : "Bb", by: "Norrington" }),
           fixTrackName: /(\d+) - Symphony No. 4 in B-flat major, Op. 60 [IV]+\. (.*)\.mp3/
       },
       "Symph5[Furtwangler]" : {
           fixAlbumTitle: symphony({ num : 5, op:67, minor : "c", by: "Furtwangler" }),
           fixTrackName: /(\d+) - Beethoven Symph 5 - \d+ - (.*).mp3/
       },
       "Symph5[Karajan]" : {
           fixAlbumTitle: symphony({ num : 5, op:67, minor : "c", by: "Karajan" }),
            fixTrackName: /(\d+) Symphonie Nr. 5 c-moll op. 67: \d+\. (.*)\.mp3/
        },
        "Symph5[Kleiber]" : {
            fixAlbumTitle: symphony({ num : 5, op:67, minor : "c", by: "Kleiber" }),
            fixTrackName: /(\d+) - Symphonie No. 5 C-moll, Op. 67 [IV]+\. (.*)\.mp3/
        },
        "Symph5[Norrington]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num : 5, op:67, minor : "c", by: "Norrington" }),
            fixTrackName: /(\d+) - Symphony No. 5 in C minor, Op. 67 [IV]+\. (.*)\.mp3/
        },
        "Symph6[Gould]" : {
            fixAlbumTitle: symphony({ num : 6, op:68, major : "F", subTitle:"Pastoral", by: "Gould" }),
            fixTrackName: /(\d+) - Symphony No.6 Op.68 Pastoral [IV]+\. (.*)\.mp3/
        },
        "Symph6[Karajan]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num : 6, op:68, major : "F", subTitle:"Pastoral", by: "Karajan" }),
            fixTrackName: /(\d+) Symphonie Nr. 6 F-dur op. 68 \»Pastorale\«: \d\. (.*)\.mp3/
        },
        "Symph6[Norrington]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num : 6, op:68, major : "F", subTitle:"Pastoral", by: "Norrington" }),
            fixTrackName: /(\d+) - Symphony No. 6 in F major, Op. 68 Pastoral [IV]+\. (.*)\.mp3/
        },
        "Symph7[Karajan]" : {
            fixAlbumTitle: symphony({ num : 7, op:92, major : "A", by: "Karajan" }),
            fixTrackName: /(\d+) Symphonie Nr. 7 A-dur op. 92: \d+\. (.*)\.mp3/
        },
        "Symph7[Kleiber]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num : 7, op:92, major : "A", by: "Kleiber" }),
            fixTrackName: /(\d+) - Symphonie No. 7 A-dur, Op. 92 [IV]+\. (.*).mp3/
        },
        "Symph7[Norrington]" : {
            firstTrackNumber: 3,
            fixAlbumTitle: symphony({ num : 7, op:92, major : "A", by: "Norrington" }),
            fixTrackName: /(\d+) - Symphony No.7 in A [Mm]ajor, op.92 - [IV]+\. (.*)\.mp3/
        },
        "Symph8[Karajan]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num : 8, op:93, major : "F", by: "Karajan" }),
            fixTrackName: /(\d+) Symphonie Nr. 8 F-dur op. 93: \d+\. (.*)\.mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Symph8[Norrington]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: symphony({ num : 8, op:93, major : "F", by: "Norrington" }),
            fixTrackName: /(\d+) - Symphony No. 8 in F major, Op. 93 [IV]+\. (.*)\.mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Symph9[Furtwangler]" : {
            fixAlbumTitle: symphony({ num : 9, op:125, minor: "D", by: "Furtwangler" }),
            fixTrackName: /(\d+) - Symphony No. 9 in D minor, Op. 125 [IV]+\. (.*)\.mp3/
        },
        "Symph9[Karajan]" : {
            fixAlbumTitle: symphony({ num : 9, op:125, minor: "D", by: "Karajan" }),
            fixTrackName: /(\d+) - Symphonie No. 9 d-Moll, Op. 125 [IV]+\. (.*)\.mp3/
        },
        "ViolinSon 9 Kreutzer" : {
            firstTrackNumber: 5,
            fixAlbumTitle: sonata({ for:"Violin", num : 9, op:47, major: "A", subTitle:"Kreutzer" }),
            fixTrackName: /(\d+) Violinsonate No.9 A-dur op. 47 'Kreutzer' - (.*).mp3$/
        },
        "ViolinSon 10" : {
            firstTrackNumber: 8,
            fixAlbumTitle: sonata({ for:"Violin", num : 10, op:96, major: "G" }),
            fixTrackName: /^(\d+) Violinsonate No.10 G-dur op. 96 - (.*).mp3$/
        },
        "Three sets of variations for cello and piano" : {
            firstTrackNumber: 6,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "TwoRondos[Richter]" : {
            firstTrackNumber: 5,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "ViolinConcerto" : {
            fixAlbumTitle: concerto({for: "Violin", major: "D", op:61}),
            fixTrackName: /(\d+) - Konzert für Violine und Orchester in D-dur, op. 61 [IV]+\. (.*)\.mp3/
        },
        "ViolinSonata1 Op12No1" : {
            fixAlbumTitle: sonata({ for:"Violin", num : 1, op:[12,1], major: "D" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in D major, Op. 12 No. 1 [IV]+\. (.*)\.mp3/
        },
        "ViolinSonata10 Op96[Francescatti, Casadesus]" : {
            firstTrackNumber: 8,
            fixAlbumTitle: sonata({ for:"Violin", num : 10, op:96, major: "G", by:"Francescatti, Casadesus" }),
            fixTrackName: /(\d+) - Violinsonate No.10 G-dur op. 96 - (.*)\.mp3/
        },
        "ViolinSonata10 Op96" : {
            firstTrackNumber: 7,
            fixAlbumTitle: sonata({ for:"Violin", num : 10, op:96, major: "G" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in G major, Op. 96 [IV]+\. (.*).mp3/
        },
        "ViolinSonata10[Gould-Menuhin]" : {
           firstTrackNumber: 5,
           fixAlbumTitle: sonata({ for:"Violin", num : 10, op:96, major: "G", by:"Gould, Menuhin" }),
           fixTrackName: /(\d+) - Beethoven ViolinSonata Op96 - (.*)\.mp3/
       },
       "ViolinSonata2 Op12No2" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ for:"Violin", num : 2, op:[12,2], major: "A" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in A major, Op. 12 No. 2 [IV]+\. (.*)\.mp3/
        },
        "ViolinSonata3 Op12No3" : {
            firstTrackNumber: 7,
            fixAlbumTitle: sonata({ for:"Violin", num : 3, op:[12,3], major: "Eb" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in E-flat major, Op. 12 No. 3 [IV]+\. (.*)\.mp3/
        },
        "ViolinSonata4 Op23" : {
            firstTrackNumber: 10,
            fixAlbumTitle: sonata({ for:"Violin", num : 4, op:23, minor: "A" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in A minor, Op. 23 [IV]+\. (.*)\.mp3/
        },
        "ViolinSonata5 Op24 \"Frühling\"" : {
            fixAlbumTitle: sonata({ for:"Violin", num : 5, op:24, major: "F", subTitle:"Frühling" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in F major, Op. 24 \“Frühling\” [IV]+\. (.*)\.mp3/
        },
        "ViolinSonata5 Op24[Francescatti, Casadesus]" : {
            fixAlbumTitle: sonata({ for:"Violin", num : 5, op:24, major: "F", subTitle:"Frühling", by:"Francescatti, Casadesus" }),
            fixTrackName: /(\d+) - Violinsonate No.5 F-dur op. 24 \'Frühling\' - (.*).mp3/
        },
        "ViolinSonata6 Op30No1" : {
            firstTrackNumber: 5,
            fixAlbumTitle: sonata({ for:"Violin", num : 6, op:[30,1], major: "A" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in A major, Op. 30 No. 1 [IV]+\. (.*)\.mp3/
        },
        "ViolinSonata7 Op30No2" : {
            firstTrackNumber: 8,
            fixAlbumTitle: sonata({ for:"Violin", num : 7, op:[30,2], minor: "C" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in C minor, Op. 30 No. 2 [IV]+\. (.*)\.mp3/
        },
        "ViolinSonata8 Op30No3" : {
            fixAlbumTitle: sonata({ for:"Violin", num : 8, op:[30,3], major: "G" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in G major, Op. 30 No. 3 [IV]+\. (.*)\.mp3/
        },
        "ViolinSonata9 Op47 \"Kreutzer\"[Francescatti, Casadesus]" : {
            firstTrackNumber: 5,
            fixAlbumTitle: sonata({ for:"Violin", num : 9, op:47, major: "A", subTitle:"Kreutzer", by:"Francescatti, Casadesus" }),
            fixTrackName: /(\d+) - Violinsonate No.9 A-dur op. 47 \'Kreutzer\' - (.*)\.mp3/
        },
        "ViolinSonata9 Op47 \"Kreutzer\"" : {
            firstTrackNumber: 4,
            fixAlbumTitle: sonata({ for:"Violin", num : 9, op:47, major: "A", subTitle:"Kreutzer" }),
            fixTrackName: /(\d+) Sonata for Violin and Piano in A major, Op. 47 \“Kreutzer\” [IV]+\. (.*).mp3/
        }
    };
};
