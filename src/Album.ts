import { MusicFile } from "./MusicFile";

export class Album
{
    constructor(artist: string, title: string)
    {
        this.artist = artist;
        this.title = title;
        this.tracks = [];
    }

    public push(file: MusicFile)
    {
        if (file.artist != this.artist || file.album != this.title)
        {
            throw new Error("Music track cannot be added to this album");
        }
        this.tracks.push(file);
    }

    artist: string;
    title: string;
    tracks: MusicFile[];
}
