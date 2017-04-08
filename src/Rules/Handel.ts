import { Format, cantata, concerto, concerto_grosso, quartet, symphony, sonata, trio, quintet } from "../AlbumFormat";

// TODO remove
export var rules = {
        "ConcertoInC" : {
        fixAlbumTitle: concerto_grosso({major:"C"}),
        fixTrackName: /Concerto Grosso in C - \d+\.? (.*)/
    },
    "ConcertoOp3-1" : {
        fixAlbumTitle: concerto_grosso({major:"Bb", op:[3,1]}),
        firstTrackNumber: 9,
        fixTrackName: /Concerto Grosso Op. 3 No.1 in B flat - \d+ (.*)/
    },
    "ConcertoOp3-3" : {
        fixAlbumTitle: concerto_grosso({major:"G", op:[3,3]}),
        firstTrackNumber: 5,
        fixTrackName: /Concerto Grosso Op. 3 No.3 in G - \d+ (.*)/
    },
    "ConcertoOp3-6" : {
        fixAlbumTitle: concerto_grosso({major:"D", op:[3,6]}),
        firstTrackNumber: 12,
        fixTrackName: /Concerto Grosso Op. 3 No.6 in D - \d+ (.*)/
    },
    "ConcertoOp6-1" : {
        fixAlbumTitle: concerto_grosso({major:"G", op:[6,1]}),
        firstTrackNumber: 14,
        fixTrackName: /Concerto Grosso Op. 6 No.1 in G - \d+ (.*)/
    },
    "ConcertoOp6-7" : {
        fixAlbumTitle: concerto_grosso({major:"Bb", op:[6,7]}),
        firstTrackNumber: 19,
        fixTrackName: /Concerto Grosso Op. 6 No.7 in B flat - \d+ (.*)/
    },
    "ConcertoOp6-9" : {
        fixAlbumTitle: concerto_grosso({major:"F", op:[6,9]}),
        firstTrackNumber: 24,
        fixTrackName: /Concerto Grosso Op. 6 No.9 in F - \d+ (.*)/
    },
    "Fireworks" : {
        firstTrackNumber: 10,
        fixTrackName: /Music for the Royal Fireworks - \d+ (.*)/
    },
    "HarpConcerto" : {
        fixAlbumTitle: concerto({for:"Harp", major:"Bb", HWV:294}),
        fixTrackName: /Concerto for Harp in B flat major - HWV 294 - \d - (.*)/
    },
    "HornConcerto" : {
        fixAlbumTitle: concerto({num:2, for:"Two Horns", major:"F", HWV:333}),
        firstTrackNumber: 12,
        fixTrackName: /Concerto a due cori No.2 in F major - HWV 333 - \d - (.*)/
    },
    "JudasMaccabeus" : {
        firstTrackNumber: 7,
        fixTrackName: /Judas Maccabeus - \d (.*)/
    },
    "OboeConcerto" : {
        fixAlbumTitle: concerto({num:3, for:"Oboe", minor:"G", HWV:287}),
        firstTrackNumber: 8,
        fixTrackName: /Concerto for Oboe No.3 in G minor - HWV 287 - \d - (.*)/
    },
    "OrganConcerto" : {
        fixAlbumTitle: concerto({for:"Organ", major:"F", HWV:295, subTitle:"Cuckoo and Nightingale"}),
        firstTrackNumber: 4,
        fixTrackName: /Concerto for Organ in F major - HWV 295 - Cuckoo and Nightingale - \d - (.*)/
    },
    "Sinfonia" : {
        fixTrackName: /Sinfonia in B flat for 2 Violins and Continuo - \d (.*)/
    },
    "SonataInA" : {
        fixAlbumTitle: sonata({for:"Flute", minor:"A"}),
        firstTrackNumber: 9,
        fixTrackName: /Sonata in A minor Halle No.1 for Flute - \d (.*)/
    },
    "SonataInB" : {
        fixAlbumTitle: sonata({for:"Violin, Oboe, Strings and Continuo", major:"Bb"}),
        firstTrackNumber: 29,
        fixTrackName: /Sonata à 5 in B flat for Violin, Oboe, Strings and Continuo - \d (.*)/
    },
    "SonataInD" : {
        fixAlbumTitle: sonata({for:"Recorder and Continuo", minor:"D"}),
        firstTrackNumber: 13,
        fixTrackName: /Sonata in D minor for Recorder and Continuo - \d (.*)/
    },
    "SonataInE" : {
        fixAlbumTitle: sonata({for:"Two Flutes", minor:"E"}),
        firstTrackNumber: 20,
        fixTrackName: /Sonata in E minor for 2 Flutes - \d (.*)/
    },
    "SonataInF" : {
        fixAlbumTitle: sonata({for:"Oboe and Continuo", minor:"F", op:[1,5]}),
        firstTrackNumber: 4,
        fixTrackName: /Sonata in F, Op. 1 No.5 for Oboe and Continuo - \d (.*)/
    },
    "SonataInG" : {
        fixAlbumTitle: sonata({for:"Two Violins and Continuo", major:"G", op:[5,4]}),
        firstTrackNumber: 24,
        fixTrackName: /Sonata in G, Op. 5 No.4 for Two Violins and Continuo - \d (.*)/
    },
    "TheKingShallRejoice" : {
        firstTrackNumber: 15,
        fixTrackName: /The King Shall Rejoice - \d (.*)/
    },
    "WaterMusic2" : {
        firstTrackNumber: 19,
        fixTrackName: /Water Music Suite 2 in D - \d (.*)/
    },
    "WaterMusic3" : {
        firstTrackNumber: 3,
        fixTrackName: /Water Music Suite 3 in G - \d (.*)/
    }
};
