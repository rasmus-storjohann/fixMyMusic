import { Format, cantata, concerto, concerto_grosso, quartet, symphony, sonata, trio, quintet } from "../AlbumFormat";

// TODO remove
export var rules = {
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
};
