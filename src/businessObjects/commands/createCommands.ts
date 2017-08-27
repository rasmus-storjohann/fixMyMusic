import {Track} from "../../businessInterfaces/tracks/Track";
import {AlbumTrack} from "../../businessInterfaces/tracks/AlbumTrack";
import {Album} from "../../Album";
import {Command} from "../../businessInterfaces/commands/Command";
import {NpmLog} from "npmlog";

export function createCommands(albums: Album[], outputDirectory: string, logger: NpmLog): Command[]
{
        var result: Command[];
        result = [];
        // TODO there must be a better way, see ts standard library map and flatten in order
        albums.forEach((album) => { 
                result = result.concat(createCommandsForAlbum(album, outputDirectory)); 
        });
        logger.info("Command factory", "Created " + result.length + " commands");
        return result;
}

function createCommandsForAlbum(album: Album, outputDirectory: string): Command[]
{
        var mkDirCommand = {
                command : "mkdir",
                target : [ outputDirectory, album.artist, album.title ].join("/")
        };
        var copyFilesCommands = createCommandsForTracks(album, outputDirectory);
        copyFilesCommands.unshift(mkDirCommand);

        return copyFilesCommands;
}

function createCommandsForTracks(album: Album, outputDirectory: string): Command[]
{
        var result = new Array<Command>();
        album.tracks.forEach((track) => {
                var trackTitle = buildTrackName(track);

                var target = [
                        outputDirectory, album.artist, album.title, trackTitle + ".mp3"
                ].join("/");
                result.push({command : "cp", source : track.path, target : target});
                result.push({
                        command : "tag",
                        target : target,
                        tags : {
                                artist : album.artist,
                                album : album.title,
                                track : trackTitle
                        }
                });
        });
        return result;
}

function buildTrackName(track: AlbumTrack): string
{
        var title = track.title;
        if (!title)
        {
                throw new Error(track.path + ": title is null");
        }
        if (title.indexOf(".mp3") !== -1)
        {
                throw new Error(track.path + ": track name contains the mp3 extension");
        }
        var formattedNumber = ("00" + track.trackNumber).slice(-2);
        return formattedNumber + " " + title;
}
