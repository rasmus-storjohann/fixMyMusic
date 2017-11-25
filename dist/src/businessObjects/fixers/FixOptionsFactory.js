"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFixers_1 = require("./parseFixers");
const parseArtistFixer_1 = require("./parseArtistFixer");
const fs = require("fs");
class FixOptionsFactory {
    constructor(fixTrackNameFunctions, logger) {
        this.artists = ["JS Bach", "Beethoven", "Handel",
            "Haydn", "Mahler", "Mozart", "Frédéric Chopin",
            "Schubert", "Shostakovich"];
        this.logger = logger;
        this.fixTrackNameFunctions = fixTrackNameFunctions;
    }
    create() {
        let fixOptionsForAll = this.readRootJsonFile("Others.json");
        fixOptionsForAll = this.addArtistSpecificFixers(fixOptionsForAll);
        // reduce to flatten nested hash to array tuples, using Object.keys
        // reduce to add functions to result
        this.addFixTrackNameFunctions(fixOptionsForAll);
        return fixOptionsForAll;
    }
    ;
    addArtistSpecificFixers(fixOptionsForAll) {
        const self = this;
        const addArtistFixers = function (fixOptionsForAll, artist, index, array) {
            let filename = artist + ".json";
            self.addArtistJsonFile(fixOptionsForAll, filename, artist);
            return fixOptionsForAll;
        };
        return this.artists.reduce(addArtistFixers, fixOptionsForAll);
    }
    addArtistJsonFile(result, file, key) {
        if (result[key]) {
            throw new Error(key + ": fixer data contains duplicate keys");
        }
        result[key] = this.readArtistJsonFile(file);
    }
    readRootJsonFile(filename) {
        var json = this.readFixerFile(filename);
        return parseFixers_1.parseFixers(json);
    }
    readArtistJsonFile(filename) {
        var json = this.readFixerFile(filename);
        return parseArtistFixer_1.parseArtistFixer(json);
    }
    readFixerFile(filename) {
        return fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + filename, "utf8");
    }
    addFixTrackNameFunctions(result) {
        for (var artist in this.fixTrackNameFunctions) {
            if (this.fixTrackNameFunctions.hasOwnProperty(artist)) {
                if (!result[artist]) {
                    throw new Error("fix track function for non-existent artist '" + artist + "'");
                }
                for (var album in this.fixTrackNameFunctions[artist]) {
                    if (this.fixTrackNameFunctions[artist].hasOwnProperty(album)) {
                        this.logger.silly("FixOptionsFactory", "Adding functions for " + artist + ": " + album);
                        if (!result[artist][album]) {
                            throw new Error("fix track function for non-existent album '" + artist + "'/'" + album + "'");
                        }
                        var theFunction = this.fixTrackNameFunctions[artist][album];
                        var theExisting = result[artist][album];
                        result[artist][album] = {
                            firstTrackNumber: theExisting.firstTrackNumber,
                            fixTrackName: theExisting.fixTrackName,
                            fixTrackNameFunction: theFunction,
                            albumName: theExisting.albumName,
                            fixAlbumTitle: theExisting.fixAlbumTitle,
                            validation: theExisting.validation
                        };
                    }
                }
            }
        }
    }
}
exports.FixOptionsFactory = FixOptionsFactory;
;
