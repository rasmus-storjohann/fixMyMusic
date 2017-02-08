import { Format, cantata, quartet, symphony, sonata, concerto } from "../AlbumFormat";

export var rules = {
    "EroicaVariations-Gilels": {
        firstTrackNumber: 9,
        fixTrackName: /15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*)/
    },
    "CelloSonata1" : {
        fixAlbumTitle: sonata({num:1, for:"Cello",major:"F",op:[5, 1] }),
        fixTrackName: /Sonata for Cello and Piano No. 1 in F major, Op. 5 No. 1: [IV]+\. (.*)/
    },
    "CelloSonata2" : {
        firstTrackNumber: 3,
        fixAlbumTitle: sonata({num:2, for:"Cello",minor:"G",op:[5, 2] }),
        fixTrackName: /Sonata for Cello and Piano No. 2 in G minor, Op. 5 No. 2: [IV]+\. (.*)/
    },
    "CelloSonata3" : {
        firstTrackNumber: 5,
        fixAlbumTitle: sonata({num:3, for:"Cello", major:"A", op:69 }),
        fixTrackName: /Sonata for Cello and Piano No. 3 in A major, Op. 69: [IV]+\. (.*)/
    },
    "CelloSonata4" : {
        fixAlbumTitle: sonata({num:4, for:"Cello", op:[102,1] }),
        fixTrackName: /Cello Sonata 4 Op 102 No 1 - \d - (.*)/
    },
    "CelloSonata5" : {
        firstTrackNumber: 3,
        fixAlbumTitle: sonata({num:5, for:"Cello", op:[102,2] }),
        fixTrackName: /Cello Sonata 5 Op 102 No 2 - \d - (.*)/
    },
    "Chorphantasie" : {
        // TODO check tracks on this, finale is not the last track!
        firstTrackNumber: 4,
        fixTrackName: /.*(Adagio|Finale|Allegro)/
    },
    "Diabelli[Demidenko]" : {
        firstTrackNumber: 3,
        fixTrackNameFunc: function(name: string, logger) : string
        {
            return name === "- Track 3.mp3" ? "Theme.mp3" : "Variation.mp3"
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
        fixTrackName: /(Große Fuge) in B-flat major for String Quartet op. 133: Overtura. Allegro - Meno mosso e moderato - Allegro - Fuga. \[Allegro\] - Meno mosso e moderato - Allegro molto e con brio - Allegro/
    },
    "Leonore Overture no. 2" : {
        firstTrackNumber: 5
    },
    "Mass in C Major" : {
        fixTrackName: /Mass in C Major (?:Op. 86 )?- (.*)/
    },
    "PianoConc1" : {
        fixAlbumTitle: concerto({num:1, for:"Piano", major:"C", op:15 }),
        fixTrackName: /Klavierkonzert Nr. 1 C-dur, Op. 15 [IV]+\. (.*)/
    },
    "PianoConc2" : {
        firstTrackNumber: 4,
        fixAlbumTitle: concerto({num:2, for:"Piano", major:"B", op:19 }),
        fixTrackName: /Klavierkonzert Nr. 2 B-dur, Op. 19 [IV]+\. (.*)/
    },
    "PianoConc3" : {
        fixAlbumTitle: concerto({num:3, for:"Piano", minor:"C", op:37 }),
    },
    "PianoConc4" : {
        firstTrackNumber: 4,
        fixAlbumTitle: concerto({num:4, for:"Piano", major:"G", op:58 }),
        fixTrackName: /\d+\. (.*)/
    },
    "PianoConc5" : {
        fixAlbumTitle: concerto({num:5, for:"Piano", major:"Eb", op:73 }),
    },
    "PianoConc5[Gould]" : {
        fixAlbumTitle: concerto({num:5, for:"Piano", major:"Eb", op:73, by:"Gould" }),
        fixTrackName: /Beethoven Piano Concerto 5 - \d+ - (.*)/
    },
    "PianoTrio7[Richter] Op97 Archduke" : {
        fixTrackName: /Piano Trio No\.7 in B flat, Op\. 97 Archduke - \d+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Quartet1 [Tokyo]" : {
        fixAlbumTitle: quartet({num:1, major:"F", op:[18,1], by:"Tokyo"}),
        fixTrackName: /String Quartet no. 1 in F major, op. 18-1: [IV]+\. (.*)/
    },
    "Quartet2 [Tokyo]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: quartet({num:2, major:"G", op:[18,2], by:"Tokyo"}),
        fixTrackName: /String Quartet no. 2 in G major, op. 18-2: [IV]+\. (.*)/
    },
    "Quartet3 Op18No3 [Kodaly]" : {
        fixAlbumTitle: quartet({num:3, major:"D", op:[18,3], by:"Kodaly"}),
        fixTrackName: /Beethoven String Quartet in D Major, Op.18, No.3 - [IV]+\. (.*)/
    },
    "Quartet3 [Tokyo]" : {
        fixAlbumTitle: quartet({num:3, major:"D", op:[18,3], by:"Tokyo"}),
        fixTrackName: /String Quartet no. 3 in D major, op. 18-3: [IV]+\. (.*)/
    },
    "Quartet4 Op18No4 [Kodaly]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: quartet({num:4, minor:"C", op:[18,4], by:"Kodaly"}),
        fixTrackName: /Beethoven String Quartet in C Minor, Op.18, No.4 - [IV]+\. (.*)/
    },
    "Quartet4 [Tokyo]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: quartet({num:4, minor:"C", op:[18,4], by:"Tokyo"}),
        fixTrackName: /String Quartet no. 4 in C minor, op. 18-4: [IV]+\. (.*)/
    },
    "Quartet5 [Tokyo]" : {
        fixAlbumTitle: quartet({num:5, major:"A", op:[18,5], by:"Tokyo"}),
        fixTrackName: /String Quartet no. 5 in A major, op. 18-5: [IV]+\. (.*)/
    },
    "StringQuartet5 Op18No5" : {
        fixAlbumTitle: quartet({num:5, major:"A", op:[18,5] }),
        fixTrackName: /String quartet in A major, op 18, No.5; (.*)/
    },
    "Quartet6 [Tokyo]" : {
        firstTrackNumber: 9,
        fixAlbumTitle: quartet({num:6, major:"Bb", op:[18,6], by:"Tokyo"}),
        fixTrackName: /String Quartet no. 6 in B-flat major, op. 18-6: [IV]+\. (.*)/
    },
    "Quartet7 [Tokyo]" : {
        fixAlbumTitle: quartet({num:7, major:"F", op:[59,1], by:"Tokyo"}),
        fixTrackName: /String Quartet no. 7 in F major, op. 59-1 “Rasumovsky”: [IV]+\. (.*)/
    },
    "Quartet8 [Tokyo]" : {
        fixAlbumTitle: quartet({num:8, minor:"E", op:[59,2], by:"Tokyo"}),
        fixTrackName: /String Quartet no. 8 in E minor, op. 59-2 “Rasumovsky”: [IV]+\. (.*)/
    },
    "Quartet9 [Tokyo]" : {
        fixAlbumTitle: quartet({num:9, major:"C", op:[59,3], by:"Tokyo"}),
        fixTrackName: /String Quartet no. 9 in C major, op. 59-3 “Rasumovsky”: [IV]+\. (.*)/
    },
    "Quartet10 [Tokyo]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: quartet({num:10, major:"Eb", op:74, subTitle:"Harp", by:"Tokyo"}),
        fixTrackName: /String Quartet no. 10 in E-flat major, op. 74 \“Harp\”: [IV]+\. (.*)/
    },
    "Quartet11 [Tokyo]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: quartet({num:11, minor:"F", op:95, subTitle:"Serioso", by:"Tokyo"}),
        fixTrackName: /String Quartet no. 11 in F minor, op. 95 \“Serioso\”: [IV]+\. (.*)/
    },
    "Quartet12 [Tokyo]" : {
        fixAlbumTitle: quartet({num:12, major:"Eb", op:127, by:"Tokyo"}),
        fixTrackName: /String Quartet no. 12 in E-flat major, op\. 127: [IV]+\. (.*)/
    },
    "Quartet12[Lindsay]" : {
        fixAlbumTitle: quartet({num:12, major:"Eb", op:127, by:"Lindsay"}),
        fixTrackName: /Quartet 12 Op 127 - \d+ - (.*)/
    },
    "Quartet13[Tokyo]" : {
        fixAlbumTitle: quartet({num:13, major:"Bb", op:130, by:"Tokyo"}),
        fixTrackName: /String Quartet no. 13 in B-flat major, op. 130: [IV]+\. (.*)/
    },
    "Quartet13[Lindsay]" : {
        fixAlbumTitle: quartet({num:13, major:"Bb", op:130, by:"Lindsay"}),
        fixTrackName: /Quartet no. 13 in B-flat major, op. 130: [IV]+\. (.*)/
    },
    "Quartet13-GrosseFuge[Lindsay]" : {
        fixAlbumTitle: quartet({num:13, major:"Bb", op:130, subTitle:"Große Fuge", by:"Lindsay"}),
        fixTrackName: /Quartet no. 13 in B-flat major, op. 130: [IV]+\. (.*)/
    },
    "Quartet13-GrosseFuge[Tokyo]" : {
        fixAlbumTitle: quartet({num:13, major:"Bb", op:130, subTitle:"Große Fuge", by:"Tokyo"}),
        fixTrackName: /String Quartet no. 13 in B-flat major, op. 130: [IV]+\. (.*)/
    },
    // TODO make second versions with Grosse Fuge as last movement
    "StringQuartetOp130[Amadeus]" : {
        fixAlbumTitle: quartet({num:13, major:"Bb", op:130, /*subTitle:"Große Fuge",*/ by:"Amadeus"}),
        fixTrackName: /String quartet Op 130 - \d+ - (.*)/
    },
    "Quartet14[Lindsay]" : {
        fixAlbumTitle: quartet({num:14, minor:"C#", op:131, by:"Lindsay"}),
        fixTrackName: /Quartet for 2 Violins, Viola, and Cello no. 14 in C-sharp minor, op. 131: [IV]+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    // Quartet14 C# Op131 [Bernstein], they're ogg files
    "Quartet14 [Tokyo]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: quartet({num:14, minor:"C#", op:131, by:"Tokyo"}),
        fixTrackName: /String Quartet no. 14 in C-sharp minor, op. 131: [IV]+\. (.*)/
    },
    "Quartet15[Lindsay]" : {
        fixAlbumTitle: quartet({num:15, minor:"A", op:132, by:"Lindsay"}),
        fixTrackName: /Quartet for 2 Violins, Viola, and Cello no. 15 in A minor, op. 132: [IV]+\. (.*)/
    },
    "Quartet15 [Tokyo]" : {
        fixAlbumTitle: quartet({num:15, minor:"A", op:132, by:"Tokyo"}),
        fixTrackName: /String Quartet no. 15 in A minor, op. 132: [IV]+\. (.*)/
    },
    "Quartet16[Lindsay]" : {
        firstTrackNumber: 6,
        fixAlbumTitle: quartet({num:16, major:"F", op:135, by:"Lindsay"}),
        fixTrackName: /Quartet for 2 Violins, Viola, and Cello no. 16 in F major, op. 135: [IV]+\. (.*)/
    },
    "Quartet16 [Tokyo]" : {
        firstTrackNumber: 6,
        fixAlbumTitle: quartet({num:16, major:"F", op:135, by:"Tokyo"}),
        fixTrackName: /String Quartet no. 16 in F major, op. 135: [IV]+\. (.*)/
    },
    "StringQuartetOp135[Amadeus]" : {
        firstTrackNumber: 8,
        fixAlbumTitle: quartet({num:16, major:"F", op:135, by:"Amadeus"}),
        fixTrackName: /String quartet Op 135 - \d+ - (.*)/
    },
    // Quartet16 F Op135 [Bernstein], they're ogg files
    "Quintet Op16[Richter]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: "Quintet [Richter] in Eb Op.16",
        fixTrackName: /Quintet in E flat, Op. 16 - \d+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Quintet [Tokyo]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: "Quintet [Tokyo] in Eb Op.16",
        fixTrackName: /String Quartet in C major, op. 29: [IV]+\. (.*)/
    },
    "Sonata1[Goode]" : {
        fixAlbumTitle: sonata({ num : 1, op:[2, 1], minor : "f", by: "Goode" }),
        fixTrackName: /Goode - Piano Sonata No.1 F minor [IV]+\. (.*)/
    },
    "Sonata1[Gould]" : {
        fixAlbumTitle: sonata({ num : 1, op:[2, 1], minor : "f", by: "Gould" }),
        fixTrackName: /Sonata No. 1 in F minor, Op. 2, No. 1 - [IV]+\. (.*)/
    },
    "Sonata2[Goode]" : {
        fixAlbumTitle: sonata({ num : 2, op:[2, 2], major : "A", by: "Goode" }),
        firstTrackNumber: 5,
        fixTrackName: /Goode - Piano Sonata No.2 A major [IV]+\. (.*)/
    },
    "Sonata2[Gould]" : {
        fixAlbumTitle: sonata({ num : 2, op:[2, 2], major : "A", by: "Gould" }),
        firstTrackNumber: 5,
        fixTrackName: /Sonata No. 2 in A major, Op. 2, No. 2 - [IV]+\. (.*)/
    },
    "Sonata2-Gilels" : {
        fixAlbumTitle: sonata({ num : 2, op:[2, 2], major : "A", by: "Gilels" }),
        fixTrackName: /Sonate No.2 A-dur op.2 No.2 - \d\. (.*)/
    },
    "Sonata3[Goode]" : {
        fixAlbumTitle: sonata({ num : 3, op:[2, 3], major : "C", by: "Goode" }),
        firstTrackNumber: 9,
        fixTrackName: /Goode - Piano Sonata No.3 in C major [IV]+\. (.*)/
    },
    "Sonata3[Gould]" : {
        fixAlbumTitle: sonata({ num : 3, op:[2, 3], major : "C", by: "Gould" }),
        firstTrackNumber: 9,
        fixTrackName: /Sonata No. 3 in C major, Op. 2, No. 3 - [IV]+\. (.*)/
    },
    "Sonata3-Gilels" : {
        fixAlbumTitle: sonata({ num : 3, op:[2, 3], major : "C", by: "Gilels" }),
        firstTrackNumber: 5,
        fixTrackName: /Sonate No.3 C-Dur, op. 2 No.3 - \d\. (.*)/
    },
    "Sonata4[Goode]" : {
        fixAlbumTitle: sonata({ num : 4, op:7, major : "Eb", by: "Goode" }),
    },
    "Sonata4-Gilels" : {
        fixAlbumTitle: sonata({ num : 4, op:7, major : "Eb", by: "Gilels" }),
        fixTrackName: /Sonate No.4 Es-dur op.7 - \d\. (.*)/
    },
    "Sonata5[Goode]" : {
        fixAlbumTitle: sonata({ num : 5, op:[10, 1], minor : "C", by: "Goode" }),
        fixTrackName: /No.5 in C minor, op.10, no.1- (.*)/
    },
    "Sonata5[Gould]" : {
        fixAlbumTitle: sonata({ num : 5, op:[10, 1], minor : "C", by: "Gould" }),
        fixTrackName: /Sonata No. 5 in C minor, Op. 10, No. 1 - [IV]+\. (.*)/
    },
    "Sonata5-Gilels" : {
        fixAlbumTitle: sonata({ num : 5, op:[10, 1], minor : "C", by: "Gilels" }),
        fixTrackName: /Piano Sonata No. 5 in C minor, Op. 10 No. 1 \d\. (.*)/
    },
    "Sonata6[Goode]" : {
        fixAlbumTitle: sonata({ num : 6, op:[10, 2], major : "F", by: "Goode" }),
        firstTrackNumber: 4,
        fixTrackName: /No.6 in F major, op.10, no.2- (.*)/
    },
    "Sonata6[Gould]" : {
        fixAlbumTitle: sonata({ num : 6, op:[10, 2], major : "F", by: "Gould" }),
        firstTrackNumber: 4,
        fixTrackName: /Sonata No. 6 in F major, Op. 10, No. 2 - [IV]+\. (.*)/
    },
    "Sonata6-Gilels" : {
        fixAlbumTitle: sonata({ num : 6, op:[10, 2], major : "F", by: "Gilels" }),
        firstTrackNumber: 4,
        fixTrackName: /Piano Sonata No. 6 in F major, Op. 10 No. 2 \d\. (.*)/
    },
    "Sonata7[Goode]" : {
        fixAlbumTitle: sonata({ num : 7, op:[10, 3], major : "D", by: "Goode" }),
        firstTrackNumber: 7,
        fixTrackName: /No.7 in D major, op.10, no.3- (.*)/
    },
    "Sonata7[Gould]" : {
        fixAlbumTitle: sonata({ num : 7, op:[10, 3], major : "D", by: "Gould" }),
        firstTrackNumber: 7,
        fixTrackName: /Sonata No. 7 in D major, Op. 10, No. 3 - [IV]+\. (.*)/
    },
    "Sonata7-Gilels" : {
        fixAlbumTitle: sonata({ num : 7, op:[10, 3], major : "D", by: "Gilels" }),
        firstTrackNumber: 7,
        fixTrackName: /Piano Sonata No. 7 in D major, Op. 10 No. 3 \d\. (.*)/
    },
    "Sonata8[Goode]" : {
        fixAlbumTitle: sonata({ num : 8, op:13, subTitle: "Pathetique", minor : "C", by: "Goode" }),
        firstTrackNumber: 8
    },
    "Sonata8[Gould]" : {
        fixAlbumTitle: sonata({ num : 8, op:13, subTitle: "Pathetique", minor : "C", by: "Gould" }),
        fixTrackName: /Sonata No.8 IN C Minor, Op.13 'Pathetique'- [IV]+\. (.*)/
    },
    "Sonata8-Gilels" : {
        fixAlbumTitle: sonata({ num : 8, op:13, subTitle: "Pathetique", minor : "C", by: "Gilels" }),
        firstTrackNumber: 5,
        fixTrackName: /Sonate No.8 C-Moll Op. 13 'Pathétique' - \d\. (.*)/
    },
    "Sonata9[Goode]" : {
        fixAlbumTitle: sonata({ num : 9, op:[14, 1], major : "E", by: "Goode" }),
        firstTrackNumber: 5
    },
    "Sonata9[Gould]" : {
        fixAlbumTitle: sonata({ num : 9, op:[14, 1], major : "E", by: "Gould" }),
        firstTrackNumber: 4,
        fixTrackName: /Sonata No.9 In E Major, Op.14, No. 1- [IV]+\. (.*)/
    },
    "Sonata9 arranged for strings [Tokyo]" : {
        fixAlbumTitle: sonata({ num : 9, op:[14, 1], major : "E", by: "Tokyo Quartet" }),
        firstTrackNumber: 9,
        fixTrackName: /String Quartet in F major after Piano Sonata, op. 14-1: [IV]+\. (.*)/
    },
    "Sonata10[Gould]" : {
        firstTrackNumber: 7,
        fixAlbumTitle: sonata({ num : 10, op:[14, 2], major : "G", by: "Gould" }),
        fixTrackName: /Sonata No\.10 In G Major, Op\.14, No.2\- I+\. (.*)/
    },
    "Sonata10[Goode]" : {
        fixAlbumTitle: sonata({ num : 10, op:[14, 2], major : "G", by: "Goode" }),
        fixTrackName: /No.10 in G major, op.14, no.\d- (.*)/
    },
    "Sonata10-Gilels" : {
        fixAlbumTitle: sonata({ num : 10, op:[14, 2], major : "G", by: "Gilels" }),
        firstTrackNumber: 8,
        fixTrackName: /Sonate No.10 G-dur op.14 No.2 - \d. (.*)/
    },
    "Sonata11[Goode]" : {
        firstTrackNumber: 4,
        fixAlbumTitle: sonata({ num : 11, op:22, minor : "b", by: "Goode" }),
        fixTrackName: /No.11 in B-moll major, op.22- (.*)/
    },
    "Sonata11-Gilels" : {
        fixAlbumTitle: sonata({ num : 11, op:22, minor : "b", by: "Gilels" }),
        fixTrackName: /Sonate No.11 B[ -]dur op.22 \d. (.*)/
    },
    "Sonata12[Goode]" : {
        firstTrackNumber: 8,
        fixAlbumTitle: sonata({ num : 12, op:26, minor : "a", by: "Goode" }),
        fixTrackName: /No.12 in A-moll major, op.26- (.*)/
    },
    "Sonata12[Gould]" : {
        firstTrackNumber: 11,
        fixAlbumTitle: sonata({ num : 12, op:26, major : "Ab", by: "Gould" }),
        fixTrackName: /Sonata No. 12 in A flat major, Op. 26 - [IV]+\. (.*)/
    },
    "Sonata12-Gilels" : {
        fixAlbumTitle: sonata({ num : 12, op:26, major : "Ab", by: "Gilels" }),
        firstTrackNumber: 5,
        fixTrackName: /Sonate No.12 As[ -]dur op. ?26[ -]*\d\. (.*)/
    },
    "Sonata13[Goode]" : {
        fixAlbumTitle: sonata({ num : 13, op:[27,1], major : "Eb", by: "Goode" }),
        fixTrackName: /No.13 in E-moll major, op.27, no.1- (.*)/
    },
    "Sonata13[Gould]" : {
        firstTrackNumber: 10,
        fixAlbumTitle: sonata({ num : 13, op:[27,1], major : "Eb", by: "Gould" }),
        fixTrackName: /Sonata No.13 In E-Flat Major, Op.27, No.1- [IV]+\. (.*)/
    },
    "Sonata13-Gilels" : {
        fixAlbumTitle: sonata({ num : 13, op:[27,1], major : "Eb", by: "Gilels" }),
        fixTrackName: /Sonate No.13 Es-dur op. 27 No.1 \(Sonata quasi una fantasia\) - \d\. (.*)/
    },
    "Sonata14[Goode]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: sonata({ num : 14, op:[27,2], subTitle:"Moonlight", minor : "C#", by: "Goode" }),
        fixTrackName: /No.14 in C flat minor, op.27, no.2- (.*)/
    },
    "Sonata14[Gould]" : {
        firstTrackNumber: 14,
        fixAlbumTitle: sonata({ num : 14, op:[27,2], subTitle:"Moonlight", minor : "C#", by: "Gould" }),
        fixTrackName: /Sonata No.14 In C-Sharp Minor, Op.27, No.2 'Moonlight'- [IV]+\. (.*)/
    },
    "Sonata14-Gilels" : {
        fixAlbumTitle: sonata({ num : 14, op:[27,2], subTitle:"Moonlight", minor : "C#", by: "Gilels" }),
        firstTrackNumber: 5,
        fixTrackName: /Sonate No.14 cis-moll op. 27 No.2 'Mondschein' \(Sonata quasi una fantasia\) - \d\. (.*)/
    },
    "Sonata15[Goode]" : {
        firstTrackNumber: 8,
        fixAlbumTitle: sonata({ num : 15, op:28, major : "D", by: "Goode" }),
        fixTrackName: /No.15 in D major, op.28- (.*)/
    },
    "Sonata15[Gould]" : {
        fixAlbumTitle: sonata({ num : 15, op:28, major : "D", by: "Gould" }),
        fixTrackName: /Sonata No. 15 in D major, [IV]+\. (.*)/
    },
    "Sonata15-Gilels" : {
        fixAlbumTitle: sonata({ num : 15, op:28, major : "D", by: "Gilels" }),
        firstTrackNumber: 8,
        fixTrackName: /Sonate No.15 D-dur op.28 'Pastorale' - \d\. (.*)/
    },
    "Sonata16[Goode]" : {
        fixAlbumTitle: sonata({ num : 16, op:[31,1], major : "G", by: "Goode" }),
        fixTrackName: /Sonata No.16 in G major,Op.31,No.1 - [IV]+\. (.*)/
    },
    "Sonata16[Gould]" : {
        fixAlbumTitle: sonata({ num : 16, op:[31,1], major : "G", by: "Gould" }),
        fixTrackName: /Sonata No. 16 in G major, op. 31,1 - [IV]+\. (.*)/
    },
    "Sonata16-Gilels" : {
        fixAlbumTitle: sonata({ num : 16, op:[31,1], major : "G", by: "Gilels" }),
       fixTrackName: /Sonate No.16 G-dur op.31 No.1 - \d\. (.*)/
    },
    "Sonata17[Goode]" : {
        firstTrackNumber: 4,
        fixAlbumTitle: sonata({ num : 17, op:[31,2], subTitle:"Tempest", minor : "D", by: "Goode" }),
        fixTrackName: /Sonata No.17 in D minor,Op.31,No.2 \(Tempest\) - [IV]+\. (.*)/
    },
    "Sonata17[Gould]" : {
        firstTrackNumber: 4,
        fixAlbumTitle: sonata({ num : 17, op:[31,2], subTitle:"Tempest", minor : "D", by: "Gould" }),
        fixTrackName: /Sonata No. 17 in D minor, op. 31,2 - [IV]+\. (.*)/
    },
    "Sonata17-Gilels" : {
        fixAlbumTitle: sonata({ num : 17, op:[31,2], subTitle:"Tempest", minor : "D", by: "Gilels" }),
        firstTrackNumber: 4,
        fixTrackName: /Sonate No.17 d-moll op.31 No.2 'Der Sturm' - \d\. (.*)/
    },
    "Sonata18[Goode]" : {
        firstTrackNumber: 7,
        fixAlbumTitle: sonata({ num : 18, op:[31,3], major : "Eb", by: "Goode" }),
        fixTrackName: /Sonata No.18 in E-flat major,Op.31,No.3 - [IV]+\. (.*)/
    },
    "Sonata18[Gould]" : {
        firstTrackNumber: 7,
        fixAlbumTitle: sonata({ num : 18, op:[31,3], major : "Eb", by: "Gould" }),
        fixTrackName: /Sonata No. 18 in E-flat major, op. 31,3 - [IV]+\. (.*)/
    },
    "Sonata18-Gilels" : {
        fixAlbumTitle: sonata({ num : 18, op:[31,3], major : "Eb", by: "Gilels" }),
        firstTrackNumber: 7,
        fixTrackName: /Sonate No\.18 Es-[Dd]ur,? op\. ?31 No.3 - \d\. (.*)/
    },
    "Sonata18[Richter]" : {
        fixAlbumTitle: sonata({ num : 18, op:[31,3], major : "Eb", by: "Richter" }),
        fixTrackName: /\d+\. (.*)/
    },
    "Sonata19[Goode]" : {
        fixAlbumTitle: sonata({ num : 19, op:[49, 1], minor : "G", by: "Goode" })
    },
    "Sonata19-Gilels" : {
        fixAlbumTitle: sonata({ num : 19, op:[49, 1], minor : "G", by: "Gilels" }),
        fixTrackName: /Sonate No.19 g-moll op.49 No.1 - \d\. (.*)/
    },
    "Sonata20[Goode]" : {
        firstTrackNumber: 3,
        fixAlbumTitle: sonata({ num : 20, op:[49,2], major : "G", by: "Goode" }),
        fixTrackName: /I+\. (.*)/
    },
    "Sonata21[Goode]" : {
        fixAlbumTitle: sonata({ num : 21, op:53, major : "C", subTitle: "Waldstein", by: "Goode" }),
        fixTrackName: /Sonata No. 21 in C Major \(Waldstein\), Op. 53- (.*)/
    },
    "Sonata21-Gilels" : {
        fixAlbumTitle: sonata({ num : 21, op:53, major : "C", subTitle: "Waldstein", by: "Gilels" }),
        firstTrackNumber: 5,
        fixTrackName: /Sonate No.21 C-[Dd]ur op. ?53 '?Waldstein'? - \d\. (.*)/
    },
    "Sonata22[Goode]" : {
        firstTrackNumber: 4,
        fixAlbumTitle: sonata({ num : 22, op:54, major : "F", by: "Goode" }),
        fixTrackName: /Sonata No. 22 in F Major, Op. 54- (.*)/
    },
    "Sonata23[Goode]" : {
        firstTrackNumber: 6,
        fixAlbumTitle: sonata({ num : 23, subTitle: "Appassionata", op:57, minor : "F", by: "Goode" }),
        fixTrackName: /Sonata No. 23 in F Minor \(Appassionata\), Op. 57- (.*)/
    },
    "Sonata23[Gould]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: sonata({ num : 23, subTitle: "Appassionata", op:57, minor : "F", by: "Gould" }),
        fixTrackName: /Sonata No. 23 in F minor, [IV]+\. (.*)/
    },
    "Sonata23-Gilels" : {
        fixAlbumTitle: sonata({ num : 23, subTitle: "Appassionata", op:57, minor : "F", by: "Gilels" }),
        firstTrackNumber: 8,
        fixTrackName: /Sonate No.23 [Ff]-[Mm]oll [Oo]p. ?57 'Appassionata' - \d\. (.*)/
    },
    "Sonata23[Richter]Appassionata" : {
        fixAlbumTitle: sonata({ num : 23, subTitle: "Appassionata", op:57, minor : "F", by: "Richter" }),
        firstTrackNumber: 5,
        fixTrackName: /Piano Sonata No. 23 in F minor, Op. 57 Appassionata [IV]+\. (.*)/
    },
    "Sonata24[Demidenko]" : {
        fixAlbumTitle: sonata({ num : 24, subTitle: "à Thérèse", op:78, minor : "F#", by: "Demidenko" }),
        fixTrackName: /Sonata24 - (.*)/
    },
    "Sonata24[Goode]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: sonata({ num : 24, subTitle: "à Thérèse", op:78, minor : "F#", by: "Goode" }),
        fixTrackName: /I+. (.*)/
    },
    "Sonata24[Gould] \"À Thérèse\"" : {
        fixAlbumTitle: sonata({ num : 24, subTitle: "à Thérèse", op:78, minor : "F#", by: "Gould" }),
        fixTrackName: /Sonata No. 24 in F-sharp major, Op. 78 \"À Thérèse\": I+\. (.*)/
    },
    "Sonata25[Goode]" : {
        firstTrackNumber: 7,
        fixAlbumTitle: sonata({ num : 25, op:79, major : "G", by: "Goode" }),
        fixTrackName: /[IV]+\. (.*)/
    },
    "Sonata25-Gilels" : {
        fixAlbumTitle: sonata({ num : 25, op:79, major : "G", by: "Gilels" }),
        firstTrackNumber: 11,
        fixTrackName: /Sonate No.25 G-dur op. 79 - \d\. (.*)/
    },
    "Sonata26[Goode]" : {
        firstTrackNumber: 10,
        fixAlbumTitle: sonata({ num : 26, op:81, major : "Eb", by: "Goode" }),
        fixTrackName: /[IV]+\. (.*)/
    },
    "Sonata26-Gilels" : {
        fixAlbumTitle: sonata({ num : 26, op:81, major : "Eb", by: "Gilels" }),
        fixTrackName: /Sonate No.26 Es-dur op. ?81a 'Les Adieux' - \d\. (.*)/
    },
    "Sonata27[Goode]" : {
        firstTrackNumber: 13,
        fixAlbumTitle: sonata({ num : 27, op:90, minor : "E", by: "Goode" }),
        fixTrackName: /No.27 in E minor, op.90- (.*)/
    },
    "Sonata27-Gilels" : {
        fixAlbumTitle: sonata({ num : 27, op:90, minor : "E", by: "Gilels" }),
        firstTrackNumber: 4,
        fixTrackName: /Sonate No.27 e-moll op. ?90 - \d\. (.*)/
    },
    "Sonata28[Richter]" : {
        firstTrackNumber: 7,
        fixAlbumTitle: sonata({ num : 28, op:101, major : "A", by: "Richter" }),
        fixTrackName: /Sonata No.28 in A, Op. 101 - \d+\. (.*)/
    },
    "Sonata28-Gilels" : {
        fixAlbumTitle: sonata({ num : 28, op:101, major : "A", by: "Gilels" }),
        fixTrackName: /Sonata No.28 in A major, Op.101 - \d\. (.*)/
    },
    "Sonata28[Goode]" : {
        fixAlbumTitle: sonata({ num : 28, op:101, major : "A", by: "Goode" })
    },
    "Sonata29[Goode]" : {
        firstTrackNumber: 4,
        fixAlbumTitle: sonata({ num : 29, subTitle: "Hammerklavier", op:106, major : "Bb", by: "Goode" }),
        fixTrackName: /[IV]+\. (.*)/
    },
    "Sonata29[Gould] \"Hammerklavier\"" : {
        firstTrackNumber: 3,
        fixAlbumTitle: sonata({ num : 29, subTitle: "Hammerklavier", op:106, major : "Bb", by: "Gould" }),
        fixTrackName: /Sonata No. 29 in B-flat major, Op. 106 "Hammerklavier": [IV]+\. (.*)/
    },
    "Sonata29-Gilels" : {
        fixAlbumTitle: sonata({ num : 29, subTitle: "Hammerklavier", op:106, major : "Bb", by: "Gilels" }),
       firstTrackNumber: 5,
       fixTrackName: /Sonata No.29 in B dur, Op.106 Hammerklavier - \d\. (.*)/
    },
    "Sonata30[Goode]" : {
        fixAlbumTitle: sonata({ num : 30, op:109, major : "E", by: "Goode" }),
        fixTrackName: /Sonata No.30 in E major, Op.109 - [IV]+\. (.*)/
    },
    "Sonata30[Gould]" : {
        fixAlbumTitle: sonata({ num : 30, op:109, major : "E", by: "Gould" }),
        fixTrackName: /Sonata No. 30 In E Major, Op. 109- [IV]+\. (.*)/
    },
    "Sonata30-Gilels" : {
        fixAlbumTitle: sonata({ num : 30, op:109, major : "E", by: "Gilels" }),
        firstTrackNumber: 6,
        fixTrackName: /Sonate No.30 E-dur op.109 - \d\. (.*)/
    },
    "Sonata31[Goode]" : {
        firstTrackNumber: 4,
        fixAlbumTitle: sonata({ num : 31, op:110, major : "Ab", by: "Goode" }),
        fixTrackName: /Sonata No.31 in A flat major, Op.110 - [IV]+\. (.*)/
    },
    "Sonata31[Gould]" : {
        firstTrackNumber: 4,
        fixAlbumTitle: sonata({ num : 31, op:110, major : "Ab", by: "Gould" }),
        fixTrackName: /Sonata No. 31 In A-Flat Major, Op. 110- [IV]+\. (.*)/
    },
    "Sonata31-Gilels" : {
        fixAlbumTitle: sonata({ num : 31, op:110, major : "Ab", by: "Giles" }),
        firstTrackNumber: 15,
        fixTrackName: /Sonate No.31 As-dur op.110 - \d\. (.*)/
    },
    "Sonata32[Goode]" : {
        firstTrackNumber: 7,
        fixAlbumTitle: sonata({ num : 32, op:111, minor : "C", by: "Goode" }),
        fixTrackName: /Sonata No.32 in C minor, Op.111 - [IV]+\. (.*)/
    },
    "Sonata32[Gould]" : {
        firstTrackNumber: 7,
        fixAlbumTitle: sonata({ num : 32, op:111, minor : "C", by: "Gould" }),
        fixTrackName: /Sonata No. 32 In C Minor, Op. 111- [IV]+\. (.*)/
    },
    "SonataWoo47-1-Gilels" : {
        firstTrackNumber: 9,
        fixTrackName: /Sonate Es-dur WoO 47 No.1 - \d\. (.*)/
    },
    "SonataWoo47-2-Gilels" : {
       firstTrackNumber: 12,
       fixTrackName: /Sonate f-moll WoO 47 No.2 - \d\. (.*)/
    },
    "Symph1[Karajan]" : {
        fixAlbumTitle: symphony({ num : 1, op:21, major : "C", by: "Karajan" }),
        fixTrackName: /Symphonie Nr. 1 C-dur op. 21: \d+\. (.*)/
    },
    "Symph1[Norrington]" : {
        fixAlbumTitle: symphony({ num : 1, op:21, major : "C", by: "Norrington" }),
        fixTrackName: /Symphony No. 1 in C major, Op. 21 [IV]+\. (.*)/
    },
    "Symph2[Karajan]" : {
        fixAlbumTitle: symphony({ num : 2, op:36, major : "D", by: "Karajan" }),
        fixTrackName: /Symphonie Nr. 2 D-dur op. 36: \d+\. (.*)/
    },
    "Symph2[Norrington]" : {
        fixAlbumTitle: symphony({ num : 2, op:36, major : "D", by: "Norrington" }),
        fixTrackName: /Symphony No. 2 in D major, Op. 36 [IV]+\. (.*)/
    },
    "Symph3[Haitink]" : {
        fixAlbumTitle: symphony({ num : 3, subTitle:"Eroica", op:55, major : "Eb", by: "Haitink" }),
        fixTrackName: /Symphony no. 3 in E‐flat major, op. 55 \“Eroica\”: [IV]+\. (.*)/
    },
    "Symph3[Karajan]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: symphony({ num : 3, subTitle:"Eroica", op:55, major : "Eb", by: "Karajan" }),
        fixTrackName: /Symphonie Nr. 3 in Es-dur op. 55 \»Eroica\«: \d+\. (.*)/
    },
    "Symph3[Norrington]" : {
        firstTrackNumber: 2,
        fixAlbumTitle: symphony({ num : 3, subTitle:"Eroica", op:55, major : "Eb", by: "Norrington" }),
        fixTrackName: /Symphony No.3 In E Flat Major, Op.55 (.*)/
    },
    "Symph4[Karajan]" : {
       firstTrackNumber: 5,
       fixAlbumTitle: symphony({ num : 4, op:60, major : "Bb", by: "Karajan" }),
       fixTrackName: /Symphonie Nr. 4 B-dur op. 60: \d+\. (.*)/
   },
   "Symph4[Norrington]" : {
       fixAlbumTitle: symphony({ num : 4, op:60, major : "Bb", by: "Norrington" }),
       fixTrackName: /Symphony No. 4 in B-flat major, Op. 60 [IV]+\. (.*)/
   },
   "Symph5[Furtwangler]" : {
       fixAlbumTitle: symphony({ num : 5, op:67, minor : "c", by: "Furtwangler" }),
       fixTrackName: /Beethoven Symph 5 - \d+ - (.*)/
   },
   "Symph5[Karajan]" : {
       fixAlbumTitle: symphony({ num : 5, op:67, minor : "c", by: "Karajan" }),
        fixTrackName: /Symphonie Nr. 5 c-moll op. 67: \d+\. (.*)/
    },
    "Symph5[Kleiber]" : {
        fixAlbumTitle: symphony({ num : 5, op:67, minor : "c", by: "Kleiber" }),
        fixTrackName: /Symphonie No. 5 C-moll, Op. 67 [IV]+\. (.*)/
    },
    "Symph5[Norrington]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: symphony({ num : 5, op:67, minor : "c", by: "Norrington" }),
        fixTrackName: /Symphony No. 5 in C minor, Op. 67 [IV]+\. (.*)/
    },
    "Symph6[Gould]" : {
        fixAlbumTitle: symphony({ num : 6, op:68, major : "F", subTitle:"Pastoral", by: "Gould" }),
        fixTrackName: /Symphony No.6 Op.68 Pastoral [IV]+\. (.*)/
    },
    "Symph6[Karajan]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: symphony({ num : 6, op:68, major : "F", subTitle:"Pastoral", by: "Karajan" }),
        fixTrackName: /Symphonie Nr. 6 F-dur op. 68 \»Pastorale\«: \d\. (.*)/
    },
    "Symph6[Norrington]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: symphony({ num : 6, op:68, major : "F", subTitle:"Pastoral", by: "Norrington" }),
        fixTrackName: /Symphony No. 6 in F major, Op. 68 Pastoral [IV]+\. (.*)/
    },
    "Symph7[Karajan]" : {
        fixAlbumTitle: symphony({ num : 7, op:92, major : "A", by: "Karajan" }),
        fixTrackName: /Symphonie Nr. 7 A-dur op. 92: \d+\. (.*)/
    },
    "Symph7[Kleiber]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: symphony({ num : 7, op:92, major : "A", by: "Kleiber" }),
        fixTrackName: /Symphonie No. 7 A-dur, Op. 92 [IV]+\. (.*)/
    },
    "Symph7[Norrington]" : {
        firstTrackNumber: 3,
        fixAlbumTitle: symphony({ num : 7, op:92, major : "A", by: "Norrington" }),
        fixTrackName: /Symphony No.7 in A [Mm]ajor, op.92 - [IV]+\. (.*)/
    },
    "Symph8[Karajan]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: symphony({ num : 8, op:93, major : "F", by: "Karajan" }),
        fixTrackName: /Symphonie Nr. 8 F-dur op. 93: \d+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Symph8[Norrington]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: symphony({ num : 8, op:93, major : "F", by: "Norrington" }),
        fixTrackName: /Symphony No. 8 in F major, Op. 93 [IV]+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Symph9[Furtwangler]" : {
        fixAlbumTitle: symphony({ num : 9, op:125, minor: "D", by: "Furtwangler" }),
        fixTrackName: /Symphony No. 9 in D minor, Op. 125 [IV]+\. (.*)/
    },
    "Symph9[Karajan]" : {
        fixAlbumTitle: symphony({ num : 9, op:125, minor: "D", by: "Karajan" }),
        fixTrackName: /Symphonie No. 9 d-Moll, Op. 125 [IV]+\. (.*)/
    },
    "ViolinSon 9 Kreutzer" : {
        firstTrackNumber: 5,
        fixAlbumTitle: sonata({ for:"Violin", num : 9, op:47, major: "A", subTitle:"Kreutzer" }),
        fixTrackName: /Violinsonate No.9 A-dur op. 47 'Kreutzer' - (.*)/
    },
    "ViolinSon 10" : {
        firstTrackNumber: 8,
        fixAlbumTitle: sonata({ for:"Violin", num : 10, op:96, major: "G" }),
        fixTrackName: /^(\d+) Violinsonate No.10 G-dur op. 96 - (.*)/
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
        fixTrackName: /Konzert für Violine und Orchester in D-dur, op. 61 [IV]+\. (.*)/
    },
    "ViolinSonata1 Op12No1" : {
        fixAlbumTitle: sonata({ for:"Violin", num : 1, op:[12,1], major: "D" }),
        fixTrackName: /Sonata for Violin and Piano in D major, Op. 12 No. 1 [IV]+\. (.*)/
    },
    "ViolinSonata10 Op96[Francescatti, Casadesus]" : {
        firstTrackNumber: 8,
        fixAlbumTitle: sonata({ for:"Violin", num : 10, op:96, major: "G", by:"Francescatti, Casadesus" }),
        fixTrackName: /Violinsonate No.10 G-dur op. 96 - (.*)/
    },
    "ViolinSonata10 Op96" : {
        firstTrackNumber: 7,
        fixAlbumTitle: sonata({ for:"Violin", num : 10, op:96, major: "G" }),
        fixTrackName: /Sonata for Violin and Piano in G major, Op. 96 [IV]+\. (.*)/
    },
    "ViolinSonata10[Gould-Menuhin]" : {
       firstTrackNumber: 5,
       fixAlbumTitle: sonata({ for:"Violin", num : 10, op:96, major: "G", by:"Gould, Menuhin" }),
       fixTrackName: /Beethoven ViolinSonata Op96 - (.*)/
   },
   "ViolinSonata2 Op12No2" : {
        firstTrackNumber: 4,
        fixAlbumTitle: sonata({ for:"Violin", num : 2, op:[12,2], major: "A" }),
        fixTrackName: /Sonata for Violin and Piano in A major, Op. 12 No. 2 [IV]+\. (.*)/
    },
    "ViolinSonata3 Op12No3" : {
        firstTrackNumber: 7,
        fixAlbumTitle: sonata({ for:"Violin", num : 3, op:[12,3], major: "Eb" }),
        fixTrackName: /Sonata for Violin and Piano in E-flat major, Op. 12 No. 3 [IV]+\. (.*)/
    },
    "ViolinSonata4 Op23" : {
        firstTrackNumber: 10,
        fixAlbumTitle: sonata({ for:"Violin", num : 4, op:23, minor: "A" }),
        fixTrackName: /Sonata for Violin and Piano in A minor, Op. 23 [IV]+\. (.*)/
    },
    "ViolinSonata5 Op24 \"Frühling\"" : {
        fixAlbumTitle: sonata({ for:"Violin", num : 5, op:24, major: "F", subTitle:"Frühling" }),
        fixTrackName: /Sonata for Violin and Piano in F major, Op. 24 \“Frühling\” [IV]+\. (.*)/
    },
    "ViolinSonata5 Op24[Francescatti, Casadesus]" : {
        fixAlbumTitle: sonata({ for:"Violin", num : 5, op:24, major: "F", subTitle:"Frühling", by:"Francescatti, Casadesus" }),
        fixTrackName: /Violinsonate No.5 F-dur op. 24 \'Frühling\' - (.*)/
    },
    "ViolinSonata6 Op30No1" : {
        firstTrackNumber: 5,
        fixAlbumTitle: sonata({ for:"Violin", num : 6, op:[30,1], major: "A" }),
        fixTrackName: /Sonata for Violin and Piano in A major, Op. 30 No. 1 [IV]+\. (.*)/
    },
    "ViolinSonata7 Op30No2" : {
        firstTrackNumber: 8,
        fixAlbumTitle: sonata({ for:"Violin", num : 7, op:[30,2], minor: "C" }),
        fixTrackName: /Sonata for Violin and Piano in C minor, Op. 30 No. 2 [IV]+\. (.*)/
    },
    "ViolinSonata8 Op30No3" : {
        fixAlbumTitle: sonata({ for: "Violin", num : 8, op:[30,3], major: "G" }),
        fixTrackName: /Sonata for Violin and Piano in G major, Op. 30 No. 3 [IV]+\. (.*)/
    },
    "ViolinSonata9 Op47 \"Kreutzer\"[Francescatti, Casadesus]" : {
        firstTrackNumber: 5,
        fixAlbumTitle: sonata({ for:"Violin", num : 9, op:47, major: "A", subTitle:"Kreutzer", by:"Francescatti, Casadesus" }),
        fixTrackName: /Violinsonate No.9 A-dur op. 47 \'Kreutzer\' - (.*)/
    },
    "ViolinSonata9 Op47 \"Kreutzer\"" : {
        firstTrackNumber: 4,
        fixAlbumTitle: sonata({ for:"Violin", num : 9, op:47, major: "A", subTitle:"Kreutzer" }),
        fixTrackName: /Sonata for Violin and Piano in A major, Op. 47 \“Kreutzer\” [IV]+\. (.*)/
    }
};
