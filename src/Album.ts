import {Track} from "./businessInterfaces/tracks/Track";
import {AlbumTrack} from "./businessInterfaces/tracks/AlbumTrack";

export class Album
{
        constructor(tracks: Track[])
        {
                if (tracks.length === 0)
                {
                        throw new Error("Album must contain one or more tracks");
                }

                let artist = tracks[0].artist;
                let album = tracks[0].album;

                this.artist = this.originalArtist = artist;
                this.title = this.originalTitle = album;
                this.tracks = tracks.map(this.validateTracks(artist, album));
        }

        private validateTracks(artist: string, album: string) : (track: Track) => Track
        {
                return function(track: Track) : Track
                {
                        if (track.artist !== artist)
                        {
                                throw new Error("Music track with artist '" + track.artist +
                                                "' cannot be added to this album with artist '" + artist + "'");
                        }
                        if (track.album !== album)
                        {
                                throw new Error("Music track with album title '" + track.album +
                                                "' cannot be added to this album with title '" + album + "'");
                        }
                        return track;
                }
        }

        // TODO move out into an AlbumSorter class which produces SortedAlbum[]
        public sortTracks(): void { this.tracks.sort(this.sortOrder); }

        private sortOrder(first: AlbumTrack, second: AlbumTrack)
        {
                if (first.disk)
                {
                        if (!second.disk)
                                throw new Error(
                                    second.path +
                                    ": Album contains tracks with and without disk number");
                        if (first.disk < second.disk) return -1;
                        if (first.disk > second.disk) return 1;
                }
                if (first.trackNumber < second.trackNumber) return -1;
                if (first.trackNumber > second.trackNumber) return 1;
                return 0;
        }
        // include in the album sorter probably
        public reassignTrackNumbers()
        {
                var i = 1;
                this.tracks.forEach((track => {
                        track.trackNumber = i;
                        i++;
                }));
        }

        artist: string;
        title: string;
        originalArtist: string;
        originalTitle: string;
        tracks: AlbumTrack[];
}
