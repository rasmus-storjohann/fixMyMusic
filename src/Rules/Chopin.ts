import { Format, cantata, concerto, concerto_grosso, quartet, symphony, sonata, trio, quintet } from "../AlbumFormat";

// TODO remove
export var rules = {
    "Ballades & Etudes" : {
        validation : ["skipUniqueTrackNameCheck"]
    },
    "CelloSonata" : {
        fixAlbumTitle: sonata({ for:"Cello", op:65, minor: "G", by:"Rostropovich" }),
        firstTrackNumber: 7,
        fixTrackName: /Cello Sonata in G minor, op. 65: [IV]+\. (.*) \(cello: Mstislav Rostropovich, piano: Martha Argerich\)/
    },
    "Mazurkas" : {
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Misc" : {
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Nocturnes[Pires]" : {
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Nocturnes[Rubinstein]" : {
        firstTrackNumber: 8,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "PianoConc1" : {
      fixAlbumTitle: concerto({num:1, for:"Piano", minor:"E", op:11 }),
       fixTrackName: /Concerto for Piano and Orchestra no. 1 in E minor, op. 11: [IV]+\. (.*)/
   },
   "PianoConcerto1[Rubinstein]" : {
      fixAlbumTitle: concerto({num:1, for:"Piano", minor:"E", op:11, by: "Rubinstein" }),
        fixTrackName: /Concerto for Piano and Orchestra No. 1 in E minor, Op. 11: [IV]+\. (.*)/
    },
   "PianoConc2" : {
        fixAlbumTitle: concerto({num:2, for:"Piano", minor:"F", op:21 }),
        firstTrackNumber: 4,
        fixTrackName: /Concerto for Piano and Orchestra no. 2 in F minor, op. 21: [IV]+\. (.*)/
   },
    "PianoConcerto2[Rubinstein]" : {
        fixAlbumTitle: concerto({num:2, for:"Piano", minor:"F", op:21, by: "Rubinstein" }),
        firstTrackNumber: 4,
        fixTrackName: /Concerto for Piano and Orchestra No. 2 in F minor, Op. 21: [IV]+\. (.*)/
    },
   "PianoTrio" : {
        fixAlbumTitle: trio({for:"Piano", minor:"G", op:8, by: "Beaux Arts" }),
        fixTrackName: /Piano Trio in G minor, op. 8: [IV]+\. (.*) \(Beaux Arts Trio\)/
   },
   "Polonaises" : {
       validation : ["skipUniqueTrackNameCheck"]
   },
   "Preludes, Impromptus & Scherzoz" : {
       validation : ["skipUniqueTrackNameCheck"]
   },
   "Sonata1" : {
       fixAlbumTitle: sonata({num: 1, minor:"C", op: 4, by: "Zilberstein"}),
       fixTrackName: /Piano Sonata no. 1 in C minor, op. 4: [IV]+\. (.*) \(feat. piano: Lilya Zilberstein\)/
   },
   "Sonata2" : {
       fixAlbumTitle: sonata({num: 2, minor:"Bb", op: 35, by: "Pollini"}),
       firstTrackNumber: 5,
       fixTrackName: /Piano Sonata no. 2 in B-flat minor, op. 35: [IV]+\. (.*) \(feat. piano: Maurizio Pollini\)/
   },
   "Sonata3" : {
       fixAlbumTitle: sonata({num: 3, minor:"B", op: 58, by: "Pollini"}),
       firstTrackNumber: 9,
       fixTrackName: /Piano Sonata no. 3 in B minor, op. 58: [IV]+\. (.*) \(feat. piano: Maurizio Pollini\)/
   },
   "Waltzes[Ashkenazy]" : {
       validation : ["skipUniqueTrackNameCheck"]
    },
    "WaltzOp65[Rubinstein]" : {
        firstTrackNumber: 7
    }
};
