/// <reference path = "../typings/auto.d.ts" />
import { Track } from "./Track";
import { AlbumTrack } from "./AlbumTrack";

export class Album
{
    constructor(artist: string, title: string)
    {
        this.artist = this.originalArtist = artist;
        this.title = this.originalTitle = title;
        this.tracks = [];
    }

    public push(file: Track)
    {
        this.validate(file.artist, file.album);

        this.tracks.push({
            path: file.path,
            title: file.title,
            trackNumber: file.trackNumber,
            disk: file.disk
        });
    }

    private validate(artist: string, album: string)
    {
        if (artist !== this.artist)
        {
            throw new Error("Music track cannot be added to this album: Wrong artist");
        }
        if (album !== this.title)
        {
            throw new Error("Music track cannot be added to this album: Wrong album title");
        }
    }

    public sortTracks(): void
    {
        this.tracks.sort(this.sortOrder);
    }

    private sortOrder(first: AlbumTrack, second: AlbumTrack)
    {
        if (first.disk)
        {
            if (!second.disk) throw new Error(second.path + ": Album contains tracks with and without disk number");
            if (first.disk < second.disk) return -1;
            if (first.disk > second.disk) return 1;
        }
        if (first.trackNumber < second.trackNumber) return -1;
        if (first.trackNumber > second.trackNumber) return 1;
        return 0;
    }

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
