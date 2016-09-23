/// <reference path = "../typings/auto.d.ts" />
import { Album } from "./Album";
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
            this.pushToWorking(track);
        });
        return this.toAlbumArray();
    }

    private pushToWorking(track: Track)
    {
        var key = this.computeKey(track);
        if (!this.working[key])
        {
            this.working[key] = new Album(track.artist, track.album);
        }
        this.working[key].push(track);
    }

    private computeKey(track: Track) : string
    {
        return track.artist + "->" + track.album;
    }

    private toAlbumArray() : Album[]
    {
        var result: Album[];
        result = [];
        // TODO use filter
        for (var property in this.working) {
            if (this.working.hasOwnProperty(property)) {
                // todo sort tracks within each album
                result.push(this.working[property]);
            }
        }
        return result;
    }
}
