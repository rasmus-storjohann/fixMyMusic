import { Album } from "./Album";
import { Track } from "./Track";

export class AlbumFactory
{
    public create(tracks: Track[]) : Album[]
    {
        var working = {};
        tracks.forEach((track) => {
            var key = this.computeKey(track);
            if (!working[key])
            {
                working[key] = new Album(track.artist, track.album);
            }
            working[key].push(track);
        });
        return this.toAlbumArray(working);
    }

    computeKey(track: Track) : string
    {
        return track.artist + "->" + track.album;
    }

    toAlbumArray(working) : Album[]
    {
        var result: Album[];
        result = [];
        for (var property in working) {
            if (working.hasOwnProperty(property)) {
                result.push(working[property]);
            }
        }
        return result;
    }
}
