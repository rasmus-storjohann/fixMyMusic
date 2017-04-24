import {Album} from "../../Album";
import {AlbumTrack} from "../../businessInterfaces/tracks/AlbumTrack";
import {Track} from "../../businessInterfaces/tracks/Track";
import * as npmlog from "npmlog";

export class AlbumFactory
{
        private logger: npmlog.NpmLog;
        private working: {[key: string] : Album;};

        constructor(logger: npmlog.NpmLog)
        {
                this.logger = logger;
                this.working = {};
        }

        public create(tracks: Track[]): Album[]
        {
                // sort by artist/album
                // reduce to group to artist album
                // map to build albums
                tracks.forEach((track) => {
                        var album = this.getAlbumForTrack(track) || this.createAlbumForTrack(track);
                        album.push(track);
                });
                var albums = this.buildAlbums();

                this.logger.info("Album factory", "Assembled " + albums.length + " albums");

                return albums;
        }

        private getAlbumForTrack(track: Track): Album
        {
                var key = this.computeKey(track);
                return this.working[key];
        }

        private createAlbumForTrack(track: Track): Album
        {
                var key = this.computeKey(track);
                if (this.working[key])
                {
                        throw new Error("Cannot create album that already exists");
                }
                this.working[key] = new Album(track.artist, track.album);
                return this.working[key];
        }

        private computeKey(track: Track): string { return track.artist + "->" + track.album; }

        private buildAlbums(): Album[]
        {
                var result: Album[];
                result = [];
                for (var albumKey in this.working)
                {
                        if (this.working.hasOwnProperty(albumKey))
                        {
                                var album = this.working[albumKey];
                                result.push(album);
                        }
                }
                return result;
        }
}
