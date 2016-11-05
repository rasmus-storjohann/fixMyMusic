export function Create()
{
    return {
        "Eroica Variations E# op.35 [Gilels]": {
            firstTrackNumber: 9,
            fixTrackName: /^(\d+)\. 15 Variationen mit Fuge Es-dur op.35 'Eroica' - (.*).mp3$/
        },
        "Mass in C Major" : {
            fixTrackName: /(\d+) Mass in C Major - (.*).mp3/
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
        "Quintet Eb Op16 [Richter]" : {
            fixTrackName: /\d+ Quintet in E flat, Op. 16 - (\d+)\. (.*).mp3/
        },
        "ViolinSon 9 Kreutzer" : {
            firstTrackNumber: 5,
            fixTrackName: /^(\d+) Violinsonate No.9 A-dur op. 47 'Kreutzer' - (.*).mp3$/
        },
        "ViolinSon 10" : {
            firstTrackNumber: 8,
            fixTrackName: /^(\d+) Violinsonate No.10 G-dur op. 96 - (.*).mp3$/
        }
    };
};
