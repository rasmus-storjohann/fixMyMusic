"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createCommands(albums, outputDirectory, logger) {
    var result;
    result = [];
    // TODO there must be a better way, see ts standard library map and flatten in order
    albums.forEach((album) => { result = result.concat(createCommandsForAlbum(album, outputDirectory)); });
    logger.info("Command factory", "Created " + result.length + " commands");
    return result;
}
exports.createCommands = createCommands;
function createCommandsForAlbum(album, outputDirectory) {
    var mkDirCommand = {
        command: "mkdir",
        target: [outputDirectory, album.artist, album.title].join("/")
    };
    var copyFilesCommands = createCommandsForTracks(album, outputDirectory);
    copyFilesCommands.unshift(mkDirCommand);
    return copyFilesCommands;
}
function createCommandsForTracks(album, outputDirectory) {
    var result = new Array();
    album.tracks.forEach((track) => {
        var trackTitle = buildTrackName(track);
        var target = [
            outputDirectory, album.artist, album.title, trackTitle + ".mp3"
        ].join("/");
        result.push({ command: "cp", source: track.path, target: target });
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
function buildTrackName(track) {
    var title = track.title;
    if (!title) {
        throw new Error(track.path + ": title is null");
    }
    if (title.indexOf(".mp3") !== -1) {
        throw new Error(track.path + ": track name contains the mp3 extension");
    }
    var formattedNumber = ("00" + track.trackNumber).slice(-2);
    return formattedNumber + " " + title;
}
