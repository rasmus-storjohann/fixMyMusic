import { Track } from "../src/Track";
import { Album } from "../src/Album";
import { Command } from "../src/Command";

export class CommandFactory
{
    private outputDirectory: string;

    constructor(outputDirectory: string)
    {
        this.outputDirectory = outputDirectory;
    }

    public create(albums: Album[]) : Command[]
    {
        return this.createCommandsForAlbum(albums[0]);
    }

    private createCommandsForAlbum(album: Album) : Command[]
    {
        return [{
            command: "mkdir",
            target: [this.outputDirectory, album.artist, album.title].join("/")
        }];
    }
}
