/// <reference path = "../typings/auto.d.ts" />
import { Album, AlbumTrack } from "./Album";
import { Track } from "./Track";

export class AlbumFactory
{
    private working: { [key: string]: Album; };

    constructor()
    {
        this.working = {};
    }

    public create(tracks: Track[]) : Album[]
    {
        tracks.forEach((track) => {
            var album = this.createAlbumIfNeeded(track);
            album.push(track);
        });
        return this.buildAlbums();
    }

    private createAlbumIfNeeded(track: Track) : Album
    {
        var key = this.computeKey(track);
        if (!this.working[key])
        {
            this.working[key] = new Album(track.artist, track.album);
        }
        return this.working[key];
    }

    private computeKey(track: Track) : string
    {
        return track.artist + "->" + track.album;
    }

    private buildAlbums() : Album[]
    {
        var result: Album[];
        result = [];
        for (var albumKey in this.working) {
            if (this.working.hasOwnProperty(albumKey)) {
                var album = this.working[albumKey];

                this.sortTracks(album);

                result.push(album);
            }
        }
        return result;
    }

    private sortTracks(album:Album): void
    {
        album.tracks.sort((first: AlbumTrack, second: AlbumTrack) => {
            if (first.title < second.title)
            {
                return -1;
            }
            if (first.title > second.title)
            {
                return 1;
            }
            return 0;
        });
    }
}
