/// <reference path = "../typings/auto.d.ts" />

import { Track } from "../src/Track";
import { Album, AlbumTrack } from "../src/Album";
import { Command } from "../src/Command";
import * as npmlog from "npmlog";

export class CommandFactory
{
    private logger: npmlog.NpmLog;
    private outputDirectory: string;

    constructor(outputDirectory: string, logger: npmlog.NpmLog)
    {
        this.outputDirectory = outputDirectory;
        this.logger = logger;
    }

    public create(albums: Album[]) : Command[]
    {
        var result: Command[];
        result = [];
        albums.forEach((album) => {
            result = result.concat(this.createCommandsForAlbum(album));
        });
        this.logger.info("Command factory", "Created " + result.length + " commands");
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
            var trackTitle = this.buildTrackTitleWithNumberPrefix(track);
            var target = [this.outputDirectory, album.artist, album.title, trackTitle].join("/");
            result.push({
                command: "cp",
                source: track.path,
                target: target
            });
            result.push({
                command: "tag",
                target: target,
                tags: {
                    artist: album.artist,
                    album: album.title,
                    track: this.stripFileExtension(trackTitle)
                }
            });
        });
        return result;
    }

    private buildTrackTitleWithNumberPrefix(track: AlbumTrack) : string
    {
        var formattedNumber = ("00" + track.trackNumber).slice(-2);
        return formattedNumber + " " + track.title;
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
