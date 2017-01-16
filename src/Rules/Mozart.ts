import { Format, cantata, quartet, symphony, sonata, suite } from "../AlbumFormat";

export var rules = {
    "CoronationMass K317" : {
        firstTrackNumber: 6,
        fixTrackName: /Coronation Mass in C major, KV 317 - (.*)\.mp3/
    },
    "ClarinetConcerto" : {
        fixTrackName: /Clarinet Concerto in A Major, K. 622 - [IV]+\. (.*)\.mp3/
    }
}
