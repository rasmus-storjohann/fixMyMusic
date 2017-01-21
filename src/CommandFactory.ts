/// <reference path = "../typings/auto.d.ts" />

import { Track } from "./Track";
import { Album } from "./Album";
import { AlbumTrack } from "./AlbumTrack";
import { Command } from "./Command";
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
            var trackTitle = this.buildTrackName(track);

            var target = [this.outputDirectory, album.artist, album.title, trackTitle + ".mp3"].join("/");
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
                    track: trackTitle
                }
            });
        });
        return result;
    }

    private buildTrackName(track: AlbumTrack) : string
    {
        var title = track.title;
        if (!title)
        {
            throw new Error(track.path + ": title is null");
        }
        var index = title.indexOf(".mp3");
        if (index !== -1)
        {
            title = title.slice(0, index);
        }
        var formattedNumber = ("00" + track.trackNumber).slice(-2);
        return formattedNumber + " " + title;
    }
}
