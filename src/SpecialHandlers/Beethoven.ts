export function Create()
{
    return {
        "Eroica Variations E# op.35 [Gilels]": {
            firstTrackNumber: 9,
            fixTrackName: /^(\d+)\. 15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*).mp3$/
        },
        "CelloSonata1" : {
            fixTrackName: /(\d+) Sonata for Cello and Piano No. 1 in F major, Op. 5 No. 1: [IV]+\. (.*)\.mp3/
        },
        "CelloSonata2" : {
            firstTrackNumber: 3,
            fixTrackName: /(\d+) Sonata for Cello and Piano No. 2 in G minor, Op. 5 No. 2: [IV]+\. (.*)\.mp3/
        },
        "CelloSonata3" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) Sonata for Cello and Piano No. 3 in A major, Op. 69: [IV]+\. (.*)\.mp3/
        },
        "CelloSonata4" : {
            fixTrackName: /(\d+) Cello Sonata 4 Op 102 No 1 - \d - (.*).mp3/
        },
        "CelloSonata5" : {
            firstTrackNumber: 3,
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
        "GroßeFuge[Lindsay]" : {
            firstTrackNumber: 6
        },
        // amadeus quartet?
        "GrosseFuge" : {
            firstTrackNumber: 7
        },
        "Leonore Overture no. 2" : {
            firstTrackNumber: 5
        },
        "Mass in C Major" : {
            fixTrackName: /(\d+) - Mass in C Major (?:Op. 86 )?- (.*)\.mp3/
        },
        "PianoConc1" : {
            fixTrackName: /(\d+) - Klavierkonzert Nr. 1 C-dur, Op. 15_ [IV]+\. (.*)\.mp3/
        },
        "PianoConc2" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) - Klavierkonzert Nr. 2 B-dur, Op. 19_ [IV]+\. (.*)\.mp3/
        },
        "PianoConc4" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) - \d+\. (.*).mp3/
        },
        "PianoConc5[Gould]" : {
            fixTrackName: /(\d+) - Beethoven Piano Concerto 5 - \d+ - (.*).mp3/
        },
        "PianoTrio7[Richter] Op97 Archduke" : {
            fixTrackName: /(\d+) - Piano Trio No\.7 in B flat, Op\. 97 _Archduke_ - \d+\. (.*).mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Quartet3 Op18No3 [Kodaly]" : {
            fixTrackName: /(\d+) - Beethoven String Quartet in D Major, Op.18, No.3 - [IV]+\. (.*)\.mp3/
        },
        "Quartet4 Op18No4 [Kodaly]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) - Beethoven String Quartet in C Minor, Op.18, No.4 - [IV]+\. (.*)\.mp3/
        },
        "Quartet12[Lindsay]" : {
            fixTrackName: /(\d+) Quartet 12 Op 127 - \d+ - (.*)\.mp3/
        },
        "Quartet13[Lindsay]" : {
            fixTrackName: /(\d+) Quartet no. 13 in B-flat major, op. 130: [IV]+\. (.*)\.mp3/
        },
        "Quartet13 alt ending[Lindsay]" : {
            firstTrackNumber: 7
        },
        "Quartet14[Lindsay]" : {
            fixTrackName: /(\d+) Quartet for 2 Violins, Viola, and Cello no. 14 in C-sharp minor, op. 131: [IV]+\. (.*)\.mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Quartet15[Lindsay]" : {
            fixTrackName: /(\d+) Quartet for 2 Violins, Viola, and Cello no. 15 in A minor, op. 132: [IV]+\. (.*)\.mp3/
        },
        "Quartet16[Lindsay]" : {
            firstTrackNumber: 6,
            fixTrackName: /(\d+) Quartet for 2 Violins, Viola, and Cello no. 16 in F major, op. 135: [IV]+\. (.*)\.mp3/
        },
        "Quintet Op16[Richter]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) - Quintet in E flat, Op. 16 - \d+\. (.*)\.mp3/,
            validation : ["skipUniqueTrackNameCheck"]
        },
        "Sonata1[Goode]" : {
            fixTrackName: /(\d+) Goode - Piano Sonata No.1 F minor [IV]+\. (.*)\.mp3/
        },
        "Sonata1[Gould]" : {
            fixTrackName: /(\d+) Sonata No. 1 in F minor, Op. 2, No. 1 - [IV]+\. (.*).mp3/
        },
        "Sonata2[Goode]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) Goode - Piano Sonata No.2 A major [IV]+\. (.*)\.mp3/
        },
        "Sonata2[Gould]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) Sonata No. 2 in A major, Op. 2, No. 2 - [IV]+\. (.*).mp3/
        },
        "Sonata3[Goode]" : {
            firstTrackNumber: 9,
            fixTrackName: /(\d+) Goode - Piano Sonata No.3 in C major [IV]+\. (.*)\.mp3/
        },
        "Sonata3[Gould]" : {
            firstTrackNumber: 9,
            fixTrackName: /(\d+) Sonata No. 3 in C major, Op. 2, No. 3 - [IV]+\. (.*)\.mp3/
        },
        "Sonata5[Goode]" : {
            fixTrackName: /(\d+) No.5 in C minor, op.10, no.1- (.*)\.mp3/
        },
        "Sonata5[Gould]" : {
            fixTrackName: /(\d+) Sonata No. 5 in C minor, Op. 10, No. 1 - [IV]+\. (.*).mp3/
        },
        "Sonata6[Goode]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) No.6 in F major, op.10, no.2- (.*).mp3/
        },
        "Sonata6[Gould]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Sonata No. 6 in F major, Op. 10, No. 2 - [IV]+\. (.*)\.mp3/
        },
        "Sonata7[Goode]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) No.7 in D major, op.10, no.3- (.*)\.mp3/
        },
        "Sonata7[Gould]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) Sonata No. 7 in D major, Op. 10, No. 3 - [IV]+\. (.*)\.mp3/
        },
        "Sonata8[Goode]" : {
            firstTrackNumber: 8
        },
        "Sonata8[Gould]" : {
            fixTrackName: /(\d+) Sonata No.8 IN C Minor, Op.13 'Pathetique'- [IV]+\. (.*)\.mp3/
        },
        "Sonata9[Goode]" : {
            firstTrackNumber: 5
        },
        "Sonata9[Gould]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Sonata No.9 In E Major, Op.14, No. 1- [IV]+\. (.*).mp3/
        },
        "Sonata10[Gould]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) Sonata No\.10 In G Major, Op\.14, No.2\- I+\. (.*)\.mp3/
        },
        "Sonata10[Goode]" : {
            fixTrackName: /(\d+) No.10 in G major, op.14, no.\d- (.*)\.mp3/
        },
        "Sonata11[Goode]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) No.11 in B-moll major, op.22- (.*)\.mp3/
        },
        "Sonata12[Goode]" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) No.12 in A-moll major, op.26- (.*)\.mp3/
        },
        "Sonata12[Gould]" : {
            firstTrackNumber: 11,
            fixTrackName: /(\d+) Sonata No. 12 in A flat major, Op. 26 - [IV]+\. (.*)\.mp3/
        },
        "Sonata13[Goode]" : {
            fixTrackName: /(\d+) No.13 in E-moll major, op.27, no.1- (.*)\.mp3/
        },
        "Sonata13[Gould]" : {
            firstTrackNumber: 10,
            fixTrackName: /(\d+) Sonata No.13 In E-Flat Major, Op.27, No.1- [IV]+\. (.*)\.mp3/
        },
        "Sonata14[Goode]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) No.14 in C flat minor, op.27, no.2- (.*)\.mp3/
        },
        "Sonata14[Gould]" : {
            firstTrackNumber: 14,
            fixTrackName: /(\d+) Sonata No.14 In C-Sharp Minor, Op.27, No.2 'Moonlight'- [IV]+\. (.*)\.mp3/
        },
        "Sonata15[Goode]" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) No.15 in D major, op.28- (.*)\.mp3/
        },
        "Sonata15[Gould]" : {
            fixTrackName: /(\d+) Sonata No. 15 in D major, [IV]+\. (.*).mp3/
        },
        "Sonata16[Goode]" : {
            fixTrackName: /(\d+) Sonata No.16 in G major,Op.31,No.1 - [IV]+\. (.*)\.mp3/
        },
        "Sonata16[Gould]" : {
            fixTrackName: /(\d+) Sonata No. 16 in G major, op. 31,1 - [IV]+\. (.*)\.mp3/
        },
        "Sonata17[Goode]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Sonata No.17 in D minor,Op.31,No.2 \(Tempest\) - [IV]+\. (.*).mp3/
        },
        "Sonata17[Gould]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Sonata No. 17 in D minor, op. 31,2 - [IV]+\. (.*)\.mp3/
        },
        "Sonata18[Goode]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) Sonata No.18 in E-flat major,Op.31,No.3 - [IV]+\. (.*).mp3/
        },
        "Sonata18[Gould]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) Sonata No. 18 in E-flat major, op. 31,3 - [IV]+\. (.*)\.mp3/
        },
        "Sonata20[Goode]" : {
            firstTrackNumber: 3,
            fixTrackName: /(\d+) I+\. (.*).mp3/
        },
        "Sonata21[Goode]" : {
            fixTrackName: /(\d+) Sonata No. 21 in C Major \(Waldstein\), Op. 53- (.*)\.mp3/
        },
        "Sonata22[Goode]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Sonata No. 22 in F Major, Op. 54- (.*)\.mp3/
        },
        "Sonata23[Goode]" : {
            firstTrackNumber: 6,
            fixTrackName: /(\d+) Sonata No. 23 in F Minor \(Appassionata\), Op. 57- (.*)\.mp3/
        },
        "Sonata23[Gould]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) Sonata No. 23 in F minor, [IV]+\. (.*)\.mp3/
        },
        "Sonata24[Demidenko]" : {
            fixTrackName: /(\d+) - Sonata24 - (.*).mp3/
        },
        "Sonata24[Goode]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) I+. (.*).mp3/
        },
        "Sonata24[Gould] \"À Thérèse\"" : {
            fixTrackName: /(\d+) Sonata No. 24 in F-sharp major, Op. 78 \"À Thérèse\": I+\. (.*).mp3/
        },
        "Sonata25[Goode]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) [IV]+\. (.*)\.mp3/
        },
        "Sonata26[Goode]" : {
            firstTrackNumber: 10,
            fixTrackName: /(\d+) [IV]+\. (.*)\.mp3/
        },
        "Sonata27[Goode]" : {
            firstTrackNumber: 13,
            fixTrackName: /(\d+) No.27 in E minor, op.90- (.*)\.mp3/
        },
        "Sonata28[Richter]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) - Sonata No.28 in A, Op. 101 - \d+\. (.*)\.mp3/
        },
        "Sonata29[Goode]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) [IV]+\. (.*)\.mp3/
        },
        "Sonata29[Gould] \"Hammerklavier\"" : {
            firstTrackNumber: 3,
            fixTrackName: /(\d+) Sonata No. 29 in B-flat major, Op. 106 "Hammerklavier": [IV]+\. (.*)\.mp3/
        },
        "Sonata30[Goode]" : {
            fixTrackName: /(\d+) Sonata No.30 in E major, Op.109 - [IV]+\. (.*).mp3/
        },
        "Sonata30[Gould]" : {
            fixTrackName: /(\d+) Sonata No. 30 In E Major, Op. 109- [IV]+\. (.*)\.mp3/
        },
        "Sonata31[Goode]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Sonata No.31 in A flat major, Op.110 - [IV]+\. (.*)\.mp3/
        },
        "Sonata31[Gould]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) Sonata No. 31 In A-Flat Major, Op. 110- [IV]+\. (.*)\.mp3/
        },
        "Sonata32[Goode]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) Sonata No.32 in C minor, Op.111 - [IV]+\. (.*)\.mp3/
        },
        "Sonata32[Gould]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) Sonata No. 32 In C Minor, Op. 111- [IV]+\. (.*)\.mp3/
        },
        "ViolinSon 9 Kreutzer" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) Violinsonate No.9 A-dur op. 47 'Kreutzer' - (.*).mp3$/
        },
        "ViolinSon 10" : {
            firstTrackNumber: 8,
            fixTrackName: /^(\d+) Violinsonate No.10 G-dur op. 96 - (.*).mp3$/
        }
    };
};
