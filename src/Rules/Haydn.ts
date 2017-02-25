import { Format, cantata, concerto, concerto_grosso, quartet, symphony, sonata, trio, quintet } from "../AlbumFormat";

export var rules = {
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
};
