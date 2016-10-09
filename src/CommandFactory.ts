/// <reference path = "../typings/auto.d.ts" />

import { Track } from "../src/Track";
import { Album, AlbumTrack } from "../src/Album";
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
        var result: Command[];
        result = [];
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
        var copyFilesCommands = this.createCommandsForTracks(album);
        copyFilesCommands.unshift(mkDirCommand);

        return copyFilesCommands;
    }

    private createCommandsForTracks(album: Album) : Command[]
    {
        var result = new Array<Command>();
        album.tracks.forEach((track) => {
            result.push({
                command: "cp",
                source: track.path,
                target: [this.outputDirectory, album.artist, album.title, track.title].join("/")
            });
            result.push({
                command: "tag",
                target: [this.outputDirectory, album.artist, album.title, track.title].join("/"),
                tags: {
                    artist: album.artist,
                    album: album.title,
                    track: this.stripFileExtension(track.title)
                }
            });
        });
        return result;
    }

    private stripFileExtension(name: string) : string
    {
        var index = name.indexOf(".mp3");
        if (index !== -1)
        {
            return name.slice(0, index);
        }
        return name;
    }
}
