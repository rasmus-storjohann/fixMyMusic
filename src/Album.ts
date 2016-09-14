/// <reference path = "../typings/auto.d.ts" />
import { Track } from "./Track";

export interface AlbumTrack
{
    path: string,
    title: string
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
            title: file.title
        });
    }

    artist: string;
    title: string;
    tracks: AlbumTrack[];
}
