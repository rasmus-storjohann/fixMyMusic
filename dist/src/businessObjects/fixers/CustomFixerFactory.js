"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomFixerFactory {
    constructor(fixOptionsForAll, logger) {
        this.logger = logger;
        this.fixOptionsForAll = fixOptionsForAll;
    }
    create(album) {
        var artist = album.originalArtist;
        var albumTitle = album.originalTitle;
        this.logger.silly("Custom fixer factory", "called with '" + artist + "' and '" + albumTitle + "'");
        var fixOptionsForArtist = this.fixOptionsForAll[artist];
        var fixOptionsForAlbum = fixOptionsForArtist && fixOptionsForArtist[albumTitle];
        var albumName = fixOptionsForAlbum && fixOptionsForAlbum.albumName;
        var fixAlbumTitle = fixOptionsForAlbum && fixOptionsForAlbum.fixAlbumTitle;
        var validation = fixOptionsForAlbum && fixOptionsForAlbum.validation || [];
        var fixTrack = this.buildCustomTrackFixer(fixOptionsForAlbum);
        return {
            albumName: albumName,
            fixAlbumTitle: fixAlbumTitle,
            fixTrack: fixTrack,
            validation: validation
        };
    }
    buildCustomTrackFixer(fixOptions) {
        if (!fixOptions) {
            this.logger.silly("No custom fixer created");
            return function (album, logger) { };
        }
        var fixers;
        fixers = [];
        // TODO make one fixer function from either fixTrackNameFunction
        // or fixTrackName or noop
        if (fixOptions.fixTrackNameFunction && fixOptions.fixTrackName) {
            throw new Error("Can't have both kinds of track fixers");
        }
        if (fixOptions.fixTrackNameFunction) {
            this.logger.silly("Found fix track name function");
            var fixTrackNameFunction = fixOptions.fixTrackNameFunction;
            var fixTrackName = function (album, logger) {
                album.tracks.forEach((track) => {
                    var oldTitle = track.title;
                    var newTitle = fixTrackNameFunction(oldTitle, logger);
                    logger.verbose("fixTrackNameFunction", "Renaming '" +
                        oldTitle + "' -> '" +
                        newTitle + "'");
                    track.title = newTitle;
                });
            };
            fixers.push(fixTrackName);
        }
        if (fixOptions.fixTrackName) {
            this.logger.silly("Found fix track name regexp");
            var fixTrackNameRegExp = fixOptions.fixTrackName;
            var fixTrackName = function (album, logger) {
                album.tracks.forEach((track) => {
                    var match = fixTrackNameRegExp.exec(track.title);
                    if (!match) {
                        throw new Error("'" + track.path + "': Track name \n'" +
                            track.title +
                            "' does not match fixer for fixTrackName: \n" +
                            fixOptions.fixTrackName);
                    }
                    var newTitle = match[1];
                    logger.silly("SpecialFixTrackName", track.title + ": Extracting track name '" +
                        newTitle + "'");
                    track.title = newTitle;
                });
            };
            fixers.push(fixTrackName);
        }
        if (fixOptions.firstTrackNumber) {
            this.logger.silly("Found fix track number");
            var self = this;
            var fixTrackNumber = function (album, logger) {
                var adjustment = fixOptions.firstTrackNumber ? 1 - fixOptions.firstTrackNumber : 0;
                var previousDiskNumber = album.tracks[0].disk;
                var previousTrackNumber = 0;
                album.tracks.forEach((track) => {
                    if (previousDiskNumber !== track.disk) {
                        previousDiskNumber = track.disk;
                        adjustment = previousTrackNumber;
                    }
                    track.trackNumber += adjustment;
                    var expectedTrackNumber = previousTrackNumber + 1;
                    self.validateTrackNumber(track, expectedTrackNumber, logger);
                    // TODO have this function quit when the
                    // disk number changes, then the disk
                    // number can remain and subsequent call to
                    // Fixer.fixTrackNumbering() will finish
                    // up the track numbering
                    track.disk = undefined;
                    previousTrackNumber = track.trackNumber;
                });
            };
            fixers.push(fixTrackNumber);
        }
        this.logger.silly("Combining " + fixers.length + " fixers");
        var applyAllFixers = function (album, logger) { fixers.forEach((fixer) => { fixer(album, logger); }); };
        return applyAllFixers;
    }
    validateTrackNumber(track, expectedTrackNumber, logger) {
        if (track.trackNumber < 1) {
            throw new Error(track.title +
                ": fixing track number gave negative result of " +
                track.trackNumber);
        }
        if (track.trackNumber < expectedTrackNumber) {
            throw new Error(track.title + ": duplicate track number " +
                expectedTrackNumber);
        }
        if (track.trackNumber > expectedTrackNumber) {
            throw new Error(track.title + ": missing track number " +
                expectedTrackNumber);
        }
        this.logger.verbose("SpecialFixTrackNumber", track.title + ": setting track number to " + track.trackNumber);
    }
}
exports.CustomFixerFactory = CustomFixerFactory;
