/// <reference path = "../typings/auto.d.ts" />

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
        var result = [];
        albums.forEach((album) => {
            result = result.concat(this.createCommandsForAlbum(album));
        });
        return result;
    }

    private createCommandsForAlbum(album: Album) : Command[]
    {
        var mkDirCommand = {
            command: "mkdir",
            target: [this.outputDirectory, album.artist, album.title].join("/")
        };
        var copyFilesCommands = this.createCommandsForTracks(album.tracks);
        copyFilesCommands.unshift(mkDirCommand);

        return copyFilesCommands;
    }

    private createCommandsForTracks(tracks: Track[]) : Command[]
    {
        var result = [];
        tracks.forEach((track) => {
            result.push({
                command: "cp",
                source: track.path,
                target: [this.outputDirectory, track.artist, track.album, track.title].join("/")
            });
        });
        return result;
    }
}
