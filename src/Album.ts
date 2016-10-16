/// <reference path = "../typings/auto.d.ts" />
import { Track } from "./Track";

export interface AlbumTrack
{
    path: string,
    title: string,
    disk?: number
}

export class Album
{
    constructor(artist: string, title: string)
    {
        this.artist = artist;
        this.title = title;
        this.tracks = [];
    }

    public push(file: Track)
    {
        if (file.artist != this.artist)
        {
            throw new Error("Music track cannot be added to this album: Wrong artist");
        }
        if (file.album != this.title)
        {
            throw new Error("Music track cannot be added to this album: Wrong album title");
        }
        this.tracks.push({
            path: file.path,
            title: file.title,
            disk: file.disk
        });
    }

    public sortTracks(): void
    {
        this.tracks.sort((first: AlbumTrack, second: AlbumTrack) => {
            if (first.disk)
            {
                if (!second.disk) throw new Error("Album contains tracks with and without disk number");
                if (first.disk < second.disk) return -1;
                if (first.disk > second.disk) return 1;
            }
            if (first.title < second.title) return -1;
            if (first.title > second.title) return 1;
            return 0;
        });
    }

    artist: string;
    title: string;
    tracks: AlbumTrack[];
}
