"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatAlbumName_1 = require("./businessObjects/albums/formatAlbumName");
// TODO rename AlbumFixer and move to business objects albumste
class AlbumFixer {
    constructor(customFixerFactory, logger) {
        this.customFixerFactory = customFixerFactory;
        this.logger = logger;
    }
    fix(album) {
        this.logger.verbose("Fixer", "Fixing album " + album.artist + ": " + album.title);
        var customFixer = this.customFixerFactory.create(album);
        this.fixTrackTitleSpacing(album);
        this.fixAlbumName(album, customFixer);
        this.fixArtist(album);
        album.sortTracks();
        var fixTracks = customFixer && customFixer.fixTrack;
        if (fixTracks) {
            fixTracks(album, this.logger);
        }
        album.sortTracks();
        this.fixTrackNumbering(album);
    }
    fixTrackTitleSpacing(album) {
        album.tracks.forEach((track) => {
            track.title = track.title.replace(/_/g, " ");
            while (/  /.exec(track.title)) {
                track.title = track.title.replace(/  /g, " ");
            }
        });
    }
    fixAlbumName(album, customFixer) {
        var p1 = this.buildClassicalWorkName(customFixer.fixAlbumTitle);
        var p2 = customFixer.albumName;
        var p3 = p1 || p2;
        if (p3) {
            album.title = p3;
        }
    }
    buildClassicalWorkName(name) {
        if (!name) {
            return undefined;
        }
        return formatAlbumName_1.formatAlbumName(name);
    }
    fixArtist(album) {
        var artist = album.artist;
        var hasThePrefix = /^The (.*)/.exec(artist);
        var hasTwoNames = /^([^ ]+) ([^ ]+)$/.exec(artist);
        if (hasThePrefix) {
            artist = hasThePrefix[1].replace(/ /g, '_');
        }
        else if (hasTwoNames) {
            artist = hasTwoNames[2] + "_" + hasTwoNames[1];
        }
        album.artist = artist;
    }
    fixTrackNumbering(album) {
        var lastDiskNumber = album.tracks[0].disk;
        if (!lastDiskNumber) {
            return;
        }
        var trackNumber;
        var lastTrackNumberOnLastDisk = 0;
        album.tracks.forEach((track) => {
            var diskNumber = track.disk;
            if (lastDiskNumber != diskNumber) {
                lastTrackNumberOnLastDisk = trackNumber;
                lastDiskNumber = diskNumber;
            }
            track.trackNumber += lastTrackNumberOnLastDisk;
            trackNumber = track.trackNumber;
        });
    }
}
exports.AlbumFixer = AlbumFixer;
