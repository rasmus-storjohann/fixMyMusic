import { Album } from "./Album";
import { Track } from "./Track";

export class AlbumFactory
{
    public create(tracks: Track[]) : Album[]
    {
        var track = tracks[0];
        var album = new Album(track.artist, track.album);
        album.push(track);
        return [album];
    }
}
