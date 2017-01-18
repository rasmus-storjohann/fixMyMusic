import { Format, cantata, quartet, symphony, sonata, concerto } from "../AlbumFormat";

export var rules = {
    "AdagioK261" : {
       firstTrackNumber: 10
    },
    "ClarinetConcerto" : {
        fixTrackName: /(?:Clarinet Concerto in A Major, K. 622 - )?[IV]+\. (.*)\.mp3/
    },
    "ClarinetQuintet" : {
        firstTrackNumber: 4,
        fixTrackName: /(?:Clarinet Quintet in A major, K.581 - )?[IV]+\. (.*)\.mp3/
    },
    "CoronationMass" : {
        firstTrackNumber: 6,
        fixTrackName: /Coronation Mass (?:in C major, KV 317 )?- (.*)\.mp3/
    },
    "Così Fan Tutte [Böhm]1" : {
        fixTrackName: /[\d\) ]*(.*)\.mp3/
    },
    "Così Fan Tutte [Böhm]2" : {
        firstTrackNumber: 6,
        fixTrackName: /(?:Act II, Scene \d )?(.*)\.mp3/
    },
    "DonGiovanni1" : {
        fixTrackName: /(?:Il dissoluto punito, ossia il Don Giovanni, K. 527 )?(?:Act I, Scene [IVX]+\. )?(?:No\. \d+ )?(.*)\.mp3/
    },
    "DonGiovanni2" : {
        firstTrackNumber: 12,
        fixTrackName: /(?:Il dissoluto punito, ossia il Don Giovanni, K. 527 )?(?:Act II, Scene [IVXd]+\. )?(?:Anhang\. )?(?:No\. [\db]+ )?(.*)\.mp3/
    },
    "FantasieK475" : {
        firstTrackNumber: 7
    },
    "Figaro2" : {
        firstTrackNumber: 19
    },
    "Figaro3" : {
        firstTrackNumber: 3
    },
    "Figaro4" : {
        firstTrackNumber: 15
    },
    "Magic Flute 1" : {
        fixTrackName: /Die Zauberflöte, K. 620 (?:Act I, Scene [IVX]+\. )?(?:No.\ \d+ )?(.*)\.mp3/
    },
    "Magic Flute 2" : {
       firstTrackNumber: 25,
       fixTrackName: /Die Zauberflöte, K. 620 (?:Act II, Scene [IVX \-]+\. )?(?:No.\ \d+ )?(.*)\.mp3/
   },
   // DUPE, need artist
   "PianConc 17" : {
        fixTrackName: /PiaNo.17 KV 453 - (?:1er|2e|3e) mvt - (.*)\.mp3/,
    },
    // DUPE, need artist
    "PianConc 9" : {
        fixTrackName: /Piano Concerto in E flat KV 271 (.*)\.mp3/
    },
    "PianoConcerto15" : {
        fixAlbumTitle: concerto({num: 15, for: "Piano", major: "Bb", K: 450 }),
        firstTrackNumber: 3,
        fixTrackName: /Piano Concerto No. 15 in B-flat major, KV 450 [IV]+\. (.*)\.mp3/
    },
    "PianoConcerto19" : {
        fixAlbumTitle: concerto({num: 19, for: "Piano", major: "F", K: 459 }),
        fixTrackName: /Concerto No. 19 in F major for Piano, K. 459 [IV]+\. (.*)\.mp3/
    },
    "PianoConcerto20" : {
        fixAlbumTitle: concerto({num: 20, for: "Piano", minor: "D", K: 466 }),
        firstTrackNumber: 4,
        fixTrackName: /Concerto for Piano No. 20 in D minor, K. 466 [IV]+\. (.*)\.mp3/
   },
   "PianoConcerto21" : {
        fixAlbumTitle: concerto({num: 21, for: "Piano", major: "C", K: 467, subTitle: "Elvira Madigan" }),
        firstTrackNumber: 3,
        fixTrackName: /Concerto for Piano No. 21 in C major, K. 467 Elvira Madigan [IV]+\. (.*)\.mp3/
   },
   "PianoConcerto22" : {
        fixAlbumTitle: concerto({num: 22, for: "Piano", major: "Eb", K: 482 }),
        firstTrackNumber: 7,
        fixTrackName: /Piano Concerto No. 22 in E-flat major, KV 482 [IV]+\. (.*)\.mp3/
    },
    "PianoConcerto23" : {
        fixAlbumTitle: concerto({num: 23, for: "Piano", minor: "A", K: 488 }),
        firstTrackNumber: 10,
        fixTrackName: /Concerto for Piano No. 23 in A major, K. 488 [IV]+\. (.*)\.mp3/
    },
    "PianoConcerto24" : {
        fixAlbumTitle: concerto({num: 24, for: "Piano", minor: "C", K: 491 }),
        firstTrackNumber: 6,
        fixTrackName: /Concerto for Piano No. 24 in C minor, K. 491 [IV]+\. (.*)\.mp3/
    },
    "PianoConcerto25" : {
        fixAlbumTitle: concerto({num: 25, for: "Piano", major: "C", K:503 }),
        firstTrackNumber: 4,
        fixTrackName: /Piano Concerto No. 25 in C major, KV 503 [IV]+\. (.*)\.mp3/
    },
    "PianoConcerto27" : {
        fixAlbumTitle: concerto({num: 27, for: "Piano", major: "Bb", K:595 }),
        firstTrackNumber: 6,
        fixTrackName: /Piano Concerto No. 27 in B-flat major, KV 595 [IV]+\. (.*)\.mp3/
    },
    "PianoConcerto9" : {
        fixAlbumTitle: concerto({num: 9, for: "Piano", major: "Eb", K:271, subTitle: "Jeunehomme" }),
        fixTrackName: /Piano Concerto No. 9 in E-flat major, KV 271 Jeunehomme [IV]+\. (.*)\.mp3/
    },
    "RondoK382" : {
        firstTrackNumber: 7,
        fixTrackName: /Rondo for Piano & Orchestra in D major, K. 382 Rondo. [a-c]\. (.*)\.mp3/
    },
    "RondoK386" : {
        firstTrackNumber: 9
    },
    "RondoK373" : {
       firstTrackNumber: 11
    },
    "SonataK46d" : {
        //fixAlbumTitle: sonata({ K: 46, major: "C" }),
        fixTrackName: /Sonata in C major, KV 46d [IV]+\. (.*)\.mp3/
    },
    "SonataK46e" : {
        //fixAlbumTitle: sonata({ K: 46, major: "F" }),
        firstTrackNumber: 3,
        fixTrackName: /Sonata in F major, KV 46e [IV]+\. (.*)\.mp3/
    },
    "Sonata1" : {
        fixAlbumTitle: sonata({ num : 1, K: 279, major: "C" }),
        firstTrackNumber: 5,
        fixTrackName: /Sonata for Piano No. 1 in C major, K. 189d-279 [IV]+\. (.*)\.mp3/
    },
    "Sonata2" : {
        fixAlbumTitle: sonata({ num : 2, K: 280, major: "F" }),
        firstTrackNumber: 8,
        fixTrackName: /Sonata for Piano No. 2 in F major, K. 189e-280 [IV]+\. (.*)\.mp3/
    },
    "Sonata3" : {
        fixAlbumTitle: sonata({ num : 3, K: 281, major: "Bb" }),
        firstTrackNumber: 11,
        fixTrackName: /Sonata for Piano No. 3 in B-flat major, K. 189f-281 [IV]+\. (.*)\.mp3/
    },
    "Sonata4" : {
        fixAlbumTitle: sonata({ num : 4, K: 282, major: "Eb" }),
        firstTrackNumber: 14,
        fixTrackName: /Sonata for Piano No. 4 in E-flat major, K. 189g-282 [IV]+\. (.*)\.mp3/
    },
    "Sonata5" : {
        fixAlbumTitle: sonata({ num : 5, K: 283, major: "G" }),
        fixTrackName: /Sonata for Piano No. 5 in G major, K. 189h-283 [IV]+\. (.*)\.mp3/
    },
    "Sonata6" : {
        fixAlbumTitle: sonata({ num : 6, K: 284, major: "D", subTitle: "Dürnitz" }),
        firstTrackNumber: 4,
        fixTrackName: /Sonata for Piano No. 6 in D major, K. 205b-284 Dürnitz [IV]+\. (.*)\.mp3/
    },
    "Sonata7" : {
        fixAlbumTitle: sonata({ num : 7, K: 309, minor: "C" }),
        firstTrackNumber: 7,
        fixTrackName: /Sonata for Piano No. 7 in C major, K. 284b-309 [IV]+\. (.*)\.mp3/
    },
    "Sonata8" : {
        fixAlbumTitle: sonata({ num : 8, K: 310, minor: "A" }),
        fixTrackName: /Sonata for Piano No. 8 in A minor, K. 300d-310 [IV]+\. (.*)\.mp3/
    },
    "Sonata9" : {
        fixAlbumTitle: sonata({ num : 9, K: 311, major: "D" }),
        firstTrackNumber: 10,
        fixTrackName: /Sonata for Piano No. 9 in D major, K. 284c-311 [IV]+\. (.*)\.mp3/
    },
    "Sonata10" : {
        fixAlbumTitle: sonata({ num : 10, K: 330, major: "C" }),
        firstTrackNumber: 4,
        fixTrackName: /Sonata for Piano No. 10 in C major, K. 300h-330 [IV]+\. (.*)\.mp3/
    },
    "Sonata11" : {
        fixAlbumTitle: sonata({ num : 11, K: 331, major: "A", subTitle: "Alla Turca" }),
        firstTrackNumber: 7,
        fixTrackName: /Sonata for Piano No. 11 in A major, K. 300i-331 Alla Turca [IV]+\. (.*)\.mp3/
    },
    "Sonata12" : {
        fixAlbumTitle: sonata({ num : 12, K: 332, major: "F" }),
        fixTrackName: /Sonata for Piano No. 12 in F major, K. 300k-332 [IV]+\. (.*)\.mp3/
    },
    "Sonata13" : {
        fixAlbumTitle: sonata({ num : 13, K: 333, minor: "C" }),
        firstTrackNumber: 4,
        fixTrackName: /Sonata for Piano No. 13 in B-flat major, K. 315c-333 [IV]+\. (.*)\.mp3/
    },
    "Sonata14" : {
        fixAlbumTitle: sonata({ num : 14, K: 457, minor: "C" }),
        firstTrackNumber: 8,
        fixTrackName: /Sonata for Piano No. 14 in C minor, K. 457 [IV]+\. (.*)\.mp3/
    },
    "Sonata15" : {
        fixAlbumTitle: sonata({ num : 15, K: 494, major : "F" }),
        fixTrackName: /Sonata for Piano No. 15 in F major, K. 494\+533 [IV]+\. (.*)\.mp3/
    },
    "Sonata16" : {
        fixAlbumTitle: sonata({ num : 16, K: 545, major : "C", subTitle: "Semplice" }),
       firstTrackNumber: 4,
       fixTrackName: /Sonata for Piano No. 16 in C major, K. 545 Sonata semplice [IV]+\. (.*)\.mp3/
    },
    "Sonata17" : {
        fixAlbumTitle: sonata({ num : 17, K: 570, major : "Bb" }),
        firstTrackNumber: 7,
        fixTrackName: /Sonata for Piano No. 17 in B-flat major, K. 570 [IV]+\. (.*)\.mp3/
    },
    "Sonata18" : {
        fixAlbumTitle: sonata({ num : 18, K:576, major : "D", subTitle: "Trumpet" }),
        firstTrackNumber: 10,
        fixTrackName: /Sonata for Piano No. 18 in D major, K. 576 Trumpet , Hunt [IV]+\. (.*)\.mp3/
    },
    "SonataForTwoPianos" : {
       fixTrackName: /Sonata for Two Pianos in D major, K.448 [IV]+\. (.*)\.mp3/
    },
    "Sinfonia Concertante" : {
        fixAlbumTitle: "SinfConc Violin, Viola & Orch K320",
        firstTrackNumber: 7,
        fixTrackName: /Sinfonia Concertante in E major for Violin, Viola & Orchestra, K. 320d-364 [IV]+\. (.*)\.mp3/
    },
    "Symphony16[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 16, K: 128, major : "C", by: "Pinnock" }),
        fixTrackName: /Sinfonie No.16 in C-Dur K. 128, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony17[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 17, K: 129, major : "G", by: "Pinnock" }),
        firstTrackNumber: 4,
        fixTrackName: /Sinfonie No.17 in G-Dur K. 129, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony18[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 18, K: 130, major : "F", by: "Pinnock" }),
        firstTrackNumber: 7,
        fixTrackName: /Sinfonie No.18 in F-Dur K. 130, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony19[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 19, K: 132, major : "Eb", by: "Pinnock" }),
        firstTrackNumber: 11,
        fixTrackName: /Sinfonie No.19 in E flat-Dur K. 132, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony20[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 20, K: 133, major : "D", by: "Pinnock" }),
       fixTrackName: /Sinfonie No.20 D-Dur K.133, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony21[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 21, K: 134, major : "A", by: "Pinnock" }),
        firstTrackNumber: 5,
        fixTrackName: /Sinfonie No.21 A-Dur K.134, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony22[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 22, K: 162, major : "C", by: "Pinnock" }),
       fixTrackName: /Sinfonie No.22 C-Dur K.162, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony23[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 23, K: 181, major : "D", by: "Pinnock" }),
       firstTrackNumber: 4,
       fixTrackName: /Sinfonie No.23 D-Dur K.181, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony24[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 24, K: 182, major : "B", by: "Pinnock" }),
        firstTrackNumber: 7,
        fixTrackName: /Sinfonie No.24 B-Dur K.182, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony25[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 25, K: 183, minor : "G", by: "Pinnock" }),
        firstTrackNumber: 10,
        fixTrackName: /Sinfonie No.25 g-moll K.183, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony26[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 26, K: 184, major : "Eb", by: "Pinnock" }),
        firstTrackNumber: 9,
        fixTrackName: /Sinfonie No.26 Es-Dur K.184, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony27[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 27, K: 199, major : "G", by: "Pinnock" }),
        firstTrackNumber: 12,
        fixTrackName: /Sinfonie No.27 G-Dur K.199, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony28[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 28, K: 200, major : "C", by: "Pinnock" }),
        firstTrackNumber: 5,
        fixTrackName: /Sinfonie No.28 C-Dur K.200, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony29[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 29, K: 201, major : "A", by: "Pinnock" }),
        fixTrackName: /Sinfonie No.29 A-Dur K.201, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symphony30[Pinnock]" : {
        fixAlbumTitle: symphony({ num : 30, K: 202, major : "D", by: "Pinnock" }),
        firstTrackNumber: 14,
        fixTrackName: /Sinfonie No.30 D-Dur K.202, \d\. (.*)- The English Concert, Trevor Pinnock\.mp3/
    },
    "Symph35[Davis]" : {
        fixAlbumTitle: symphony({ num : 35, K: 385, subTitle: "Haffner", major : "D", by: "Davis" }),
        fixTrackName: /Symphony No. 35 in D major, K. 385 Haffner [IV]+\. (.*)\.mp3/
    },
    "Symph38[Davis]" : {
        fixAlbumTitle: symphony({ num : 38, K: 504, subTitle: "Prague", major : "D", by: "Davis" }),
        firstTrackNumber: 5,
        fixTrackName: /Symphony No. 38 in D major, K. 504 Prague [IV]+\. (.*)\.mp3/
    },
    "Symph39[Davis]" : {
        fixAlbumTitle: symphony({ num : 39, K: 543, major : "Eb", by: "Davis" }),
        firstTrackNumber: 8,
        fixTrackName: /Symphony No. 39 in E-flat major, K. 543 [IV]+\. (.*)\.mp3/
    },
    "Symph40[Davis]" : {
        fixAlbumTitle: symphony({ num : 40, K: 550, minor : "G", by: "Davis" }),
        firstTrackNumber: 3,
        fixTrackName: /Symphony No. 40 in G minor, K. 550 [IV]+\. (.*)\.mp3/
    },
    "Symphony40[Tate]" : {
        fixAlbumTitle: symphony({ num : 40, K: 550, minor : "G", by: "Tate" }),
        fixTrackName: /Symphony No.40 - [IV]+\. (.*)\.mp3/
    },
    "Symph41[Davis]" : {
        fixAlbumTitle: symphony({ num : 41, subTitle:"Jupiter", K: 551, major : "C", by: "Davis" }),
        firstTrackNumber: 7,
        fixTrackName: /Symphony No. 41 in C major, K. 551 Jupiter [IV]+\. (.*)\.mp3/
    },
    "Symphony41[Tate]" : {
        fixAlbumTitle: symphony({ num : 41, subTitle:"Jupiter", K: 551, major : "C", by: "Tate" }),
        firstTrackNumber: 5,
        fixTrackName: /Symphony No.41 - [IV]+\. (.*)\.mp3/
    },
    "ViolinConcerto1" : {
        fixAlbumTitle: concerto({num:1, for:"Violin", major:"Bb", K:207 }),
       fixTrackName: /Concerto for Violin No. 1 in B-flat major, K. 207 [IV]+\. (.*)\.mp3/
   },
   "ViolinConcerto2" : {
       fixAlbumTitle: concerto({num:2, for:"Violin", major:"D", K:211 }),
       fixTrackName: /Concerto for Violin No. 2 in D major, K. 211 [IV]+\. (.*)\.mp3/
   },
   "ViolinConcerto3" : {
       fixAlbumTitle: concerto({num:3, for:"Violin", major:"G", K:216 }),
        firstTrackNumber: 4,
        fixTrackName: /Concerto No. 3 in G major for Violin, K. 216 Strassburg [IV]+\. (.*)\.mp3/
    },
    "ViolinConcerto4" : {
        fixAlbumTitle: concerto({num:4, for:"Violin", major:"D", K:218 }),
       firstTrackNumber: 7,
       fixTrackName: /Concerto No. 4 in D major for Violin, K. 218 [IV]+\. (.*)\.mp3/
    },
    "ViolinConcerto5" : {
        fixAlbumTitle: concerto({num:5, for:"Violin", major:"A", K:219 }),
        firstTrackNumber: 4,
        fixTrackName: /Concerto No. 5 in A major for Violin, K. 219 Turkish [IV]+\. (.*)\.mp3/
    }
}
