import {Album} from "../../src/Album";
import {Track} from "../../src/businessInterfaces/tracks/Track";

export class AlbumBuilder
{
        artist : string;
        album : string;
        trackNumber : number;
        diskNumber: number;
        trackTitle : string;
        path : string;
        tracks: Track[] = [];

        private init()
        {
                this.artist = "aaaa";
                this.album = "bbbb";
                this.trackNumber = 2;
                this.trackTitle = "dddd";
                this.path = "eeee";
        }

        public constructor()
        {
                this.init();
        }

        public withArtist(value: string) : AlbumBuilder
        {
                this.artist = value;
                return this;
        }

        public withAlbum(value: string) : AlbumBuilder
        {
                this.album = value;
                return this;
        }

        public withTrackNumber(value: number) : AlbumBuilder
        {
                this.trackNumber = value;
                return this;
        }

        public withDiskNumber(value: number) : AlbumBuilder
        {
                this.diskNumber = value;
                return this;
        }

        public withTrackTitle(value: string) : AlbumBuilder
        {
                this.trackTitle = value;
                return this;
        }

        public withPath(value: string) : AlbumBuilder
        {
                this.path = value;
                return this;
        }

        public next() : AlbumBuilder
        {
                this.tracks.push({
                        artist : this.artist,
                        album : this.album,
                        trackNumber : this.trackNumber,
                        title : this.trackTitle,
                        path : this.path,
                        disk: this.diskNumber
                });
                this.init();
                return this;
        }

        public create() : Album
        {
                this.next();
                return new Album(this.tracks);
        }
}
