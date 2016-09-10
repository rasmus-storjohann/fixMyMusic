import { Album } from "./Album";
import { Track } from "./Track";

export class AlbumFactory
{
    private working : Object;

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
        var result = [];
        for (var property in this.working) {
            if (this.working.hasOwnProperty(property)) {
                result.push(this.working[property]);
            }
        }
        return result;
    }
}
