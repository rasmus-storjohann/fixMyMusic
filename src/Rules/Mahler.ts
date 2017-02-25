import { Format, cantata, concerto, concerto_grosso, quartet, symphony, sonata, trio, quintet } from "../AlbumFormat";

export var rules = {
    "Fahrenden Gesellen[Ludwig]" : {
        fixTrackName: /Lieder eines Fahrenden Gesellen - (.*)/,
    },
    "Five Songs[Ludwig]" : {
        firstTrackNumber: 10
    },
    "Kindertotenlieder[Ludwig]" : {
       firstTrackNumber: 5,
       fixTrackName: /Kindertotenlieder - (.*)/
   },
   "Symph1[Chailly]" : {
       fixAlbumTitle: symphony({ num : 1, subTitle:"Titan", major : "D", by: "Chailly" }),
       fixTrackName: /Symphony No. 1 in D major: [IV]+\. (.*)/
    },
    "Symph1[Haitink]" : {
        fixAlbumTitle: symphony({ num : 1, subTitle:"Titan", major : "D", by: "Haitink" }),
        fixTrackName: /Symphony No. 1 in D Titan [IV]+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Symph2[Chailly]" : {
        fixAlbumTitle: symphony({ num : 2, subTitle:"Resurrection", minor : "C", by: "Chailly" }),
        firstTrackNumber: 5,
        fixTrackName: /Symphony No. 2 in C minor: [IVi\-]+\. (.*)/
    },
    "Symph2[Haitink]" : {
        fixAlbumTitle: symphony({ num : 2, subTitle:"Resurrection", minor : "C", by: "Haitink" }),
        firstTrackNumber: 5,
        fixTrackName: /Symphony No. 2 in C minor Resurrection [IV]+\. (.*)/
    },
    "Symph3[Chailly]" : {
        fixAlbumTitle: symphony({ num : 3, minor : "D", by: "Chailly" }),
        fixTrackName: /Symphony No. 3 in D minor: [IV]+\. (.*)/
    },
    "Symph3[Haitink]" : {
        fixAlbumTitle: symphony({ num : 3, minor : "D", by: "Haitink" }),
        fixTrackName: /Symphony No. 3 in D minor [IV]+\. Part I+\. (.*)/,
    },
    "Symph4[Chailly]" : {
        fixAlbumTitle: symphony({ num : 4, major: "G", by: "Chailly" }),
        firstTrackNumber: 2,
        fixTrackName: /Symphony No. 4 in G major: [IV]+\. (.*)/
    },
    "Symph4[Haitink]" : {
        fixAlbumTitle: symphony({ num : 4, major: "G", by: "Haitink" }),
        firstTrackNumber: 2,
        fixTrackName: /Symphony No. 4 in G major [IV]+\. (.*)/
    },
    "Symph4[Solti]" : {
        fixAlbumTitle: symphony({ num : 4, major: "G", by: "Solti" }),
        fixTrackName: /Symphony No. 4 in G major: [IV]+\. (.*)/
    },
    "Symph5[Barbirolli]" : {
        fixAlbumTitle: symphony({ num : 5, minor: "C#", by: "Barbirolli" })
    },
    "Symph5[Chailly]" : {
        fixAlbumTitle: symphony({ num : 5, minor: "C#", by: "Chailly" }),
        fixTrackName: /Symphony No. 5 in C-sharp minor: [IV]+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Symph5[Haitink]" : {
        fixAlbumTitle: symphony({ num : 5, minor: "C#", by: "Haitink" }),
        fixTrackName: /Symphony No. 5 in C-sharp minor [IV]+\. Part I+\. (.*)/
    },
    "Symph6[Chailly]" : {
        fixAlbumTitle: symphony({ num : 6, subTitle:"Tragic", minor : "A", by: "Chailly" }),
        fixTrackName: /Symphony No. 6 in A minor: [IV]+\. (.*)/
    },
    "Symph6[Haitink]" : {
        fixAlbumTitle: symphony({ num : 6, subTitle:"Tragic", minor : "A", by: "Haitink" }),
        firstTrackNumber: 2,
        fixTrackName: /Symphony No. 6 in A minor [IV]+\. (.*)/
    },
    "Symph7[Chailly]" : {
        fixAlbumTitle: symphony({ num : 7, minor : "E", by: "Chailly" }),
        firstTrackNumber: 2,
        fixTrackName: /Symphony No. 7 in E minor: [IV]+\. (.*)/
    },
    "Symph7[Haitink]" : {
        fixAlbumTitle: symphony({ num : 7, minor : "E", by: "Haitink" }),
        fixTrackName: /Symphony No. 7 in E minor [IV]+\. (.*)/
    },
    "Symph8[Chailly]" : {
        fixAlbumTitle: symphony({ num : 8, subTitle:"Of A Thousand", major : "Eb", by: "Chailly" }),
        firstTrackNumber: 4,
        fixTrackName: /Symphony No. 8 in E-flat major: [IVivx\-]+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Symph8[Haitink]" : {
        fixAlbumTitle: symphony({ num : 8, subTitle:"Of A Thousand", major : "Eb", by: "Haitink" }),
        fixTrackName: /Symphony no. 8 in E-flat major "Symphony of a Thousand": Teil \d: (.*)/
    },
    "Symph8[Järvi]" : {
        fixAlbumTitle: symphony({ num : 8, subTitle:"Of A Thousand", major : "Eb", by: "Järvi" }),
        fixTrackName: /Symphony No. 8 in E-flat major, Symphony of a Thousand (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Symph9[Chailly]" : {
        fixAlbumTitle: symphony({ num : 9, major : "D", by: "Chailly" }),
        fixTrackName: /Symphony No. 9 in D major: [IV]+\. (.*)/,
        validation : ["skipUniqueTrackNameCheck"]
    },
    "Symph9[Haitink]" : {
        fixAlbumTitle: symphony({ num : 9, major : "D", by: "Haitink" }),
        firstTrackNumber: 2,
        fixTrackName: /Symphony No. 9 in D major [IV]+\. (.*)/
    },
    "Symph10[Chailly]" : {
        fixAlbumTitle: symphony({ num : 10, major : "F#", by: "Chailly/Deryck Cooke" }),
        fixTrackName: /Symphony no. 10: [IV]+\. (.*)/
    }
};
