"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createCommands(albums, outputDirectory, logger) {
    var nestedCommands = albums.map(album => createCommandsForAlbum(album, outputDirectory));
    var commands = [].concat.apply([], nestedCommands);
    logger.info("Command factory", "Created " + commands.length + " commands");
    return commands;
}
exports.createCommands = createCommands;
function createCommandsForAlbum(album, outputDirectory) {
    var mkDirCommand = {
        command: "mkdir",
        target: [outputDirectory, album.artist, album.title].join("/")
    };
    var copyFilesCommands = createCommandsForTracks(album, outputDirectory);
    return [mkDirCommand].concat(copyFilesCommands);
}
function createCommandsForTracks(album, outputDirectory) {
    let nestedCommands = album.tracks.map(track => createCommandsForTrack(track, album, outputDirectory));
    return [].concat.apply([], nestedCommands);
}
function createCommandsForTrack(track, album, outputDirectory) {
    let trackTitle = buildTrackName(track);
    let target = [outputDirectory, album.artist, album.title, trackTitle + ".mp3"].join("/");
    let copyCommand = {
        command: "cp",
        source: track.path,
        target: target
    };
    let tagCommand = {
        command: "tag",
        target: target,
        tags: {
            artist: album.artist,
            album: album.title,
            track: trackTitle
        }
    };
    return [copyCommand, tagCommand];
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
