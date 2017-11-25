"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapFilesToTracks(files, logger) {
    let result = files.map(createTrack);
    logger.info("Tracks", "Processed " + result.length + " tracks");
    return result;
}
exports.mapFilesToTracks = mapFilesToTracks;
function createTrack(path) {
    let parsedPath = parsePath(path);
    let parsedTrackName = parseTrackName(parsedPath.trackName);
    let disk = parsedTrackName.disk || parsedPath.disk;
    return {
        path: path,
        artist: parsedPath.artist,
        album: parsedPath.album,
        title: parsedTrackName.title,
        trackNumber: parsedTrackName.trackNumber,
        disk: disk
    };
}
function parsePath(path) {
    return parsePathWithDiskDirectory(path) || parsePathWithoutDisk(path);
}
function parsePathWithDiskDirectory(path) {
    const elements = path.split("/");
    const elementCount = elements.length;
    const disk = parseDiskDirectory(elements[elementCount - 2]);
    if (!disk) {
        return undefined;
    }
    validateElementCount(elementCount, 5, path);
    const artist = elements[elementCount - 4];
    const album = elements[elementCount - 3];
    const trackName = elements[elementCount - 1];
    return { artist: artist, album: album, disk: disk, trackName: trackName };
}
function parseDiskDirectory(directoryName) {
    const match = /disk(\d+)/.exec(directoryName);
    return match ? parseInt(match[1]) : undefined;
}
function parsePathWithoutDisk(path) {
    const elements = path.split("/");
    const elementCount = elements.length;
    validateElementCount(elementCount, 4, path);
    const artist = elements[elementCount - 3];
    const album = elements[elementCount - 2];
    const trackName = elements[elementCount - 1];
    return { artist: artist, album: album, trackName: trackName };
}
function parseTrackName(title) {
    return parseTrackNameWithTrack(title)
        || parseTrackNameWithNamePrefixes(title)
        || parseTrackNameWithLetterPrefixes(title)
        || throwOnTrackNameParseFailed();
}
function parseTrackNameWithTrack(trackName) {
    const match = /^(\d+)[ \.-]*(.*)\.mp3$/.exec(trackName);
    if (!match) {
        return undefined;
    }
    return { trackNumber: parseInt(match[1]), title: match[2] };
}
function parseTrackNameWithNamePrefixes(trackName) {
    return parseTrackNameWithDiskAndTrack(trackName, /^Disc (\d+) - (\d+)[ -]*(.*)\.mp3$/);
}
function parseTrackNameWithLetterPrefixes(trackName) {
    return parseTrackNameWithDiskAndTrack(trackName, /^d(\d+)t(\d+)\. (.*)\.mp3$/);
}
function parseTrackNameWithDiskAndTrack(trackName, regex) {
    const match = regex.exec(trackName);
    if (!match) {
        return undefined;
    }
    return { disk: parseInt(match[1]), trackNumber: parseInt(match[2]), title: match[3] };
}
function throwOnTrackNameParseFailed() {
    throw new Error("Could not parse file names");
}
function validateElementCount(actual, expected, path) {
    if (actual < expected) {
        throw new Error(path + ": Invalid path to music file, at least " +
            expected + " elements needed");
    }
}
