"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Album {
    constructor(tracks) {
        if (tracks.length === 0) {
            throw new Error("Album must contain one or more tracks");
        }
        let artist = tracks[0].artist;
        let album = tracks[0].album;
        this.artist = this.originalArtist = artist;
        this.title = this.originalTitle = album;
        this.tracks = tracks.map(this.validateTracks(artist, album));
    }
    validateTracks(artist, album) {
        return function (track) {
            if (track.artist !== artist) {
                throw new Error("Music track with artist '" + track.artist +
                    "' cannot be added to this album with artist '" +
                    artist + "'");
            }
            if (track.album !== album) {
                throw new Error("Music track with album title '" + track.album +
                    "' cannot be added to this album with title '" +
                    album + "'");
            }
            return track;
        };
    }
    // TODO move out into an AlbumSorter class which produces SortedAlbum[]
    sortTracks() { this.tracks.sort(this.sortOrder); }
    sortOrder(first, second) {
        if (first.disk) {
            if (!second.disk)
                throw new Error(second.path +
                    ": Album contains tracks with and without disk number");
            if (first.disk < second.disk)
                return -1;
            if (first.disk > second.disk)
                return 1;
        }
        if (first.trackNumber < second.trackNumber)
            return -1;
        if (first.trackNumber > second.trackNumber)
            return 1;
        return 0;
    }
    // include in the album sorter probably
    reassignTrackNumbers() {
        var i = 1;
        this.tracks.forEach((track => {
            track.trackNumber = i;
            i++;
        }));
    }
}
exports.Album = Album;
