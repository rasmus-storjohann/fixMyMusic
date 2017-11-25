"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationOption_1 = require("../../businessInterfaces/fixers/ValidationOption");
class AlbumValidator {
    constructor(customFixerFactory, logger) {
        this.customFixerFactory = customFixerFactory;
        this.logger = logger;
    }
    validate(album) {
        var rule = this.customFixerFactory.create(album);
        var validationOptions = (rule && rule.validation) || [];
        album.sortTracks();
        this.validateTracks(album, validationOptions);
        this.validateTrackUniqueness(album, validationOptions);
        this.defaultValidateArtist(album);
    }
    validateTracks(album, validationOptions) {
        if (validationOptions.indexOf(ValidationOption_1.ValidationOption.skipTrackNumberCheck) >= 0) {
            this.logger.info("Validate", "Skipping track number check for ", "[" + album.artist + "][" + album.title + "]");
            album.tracks.forEach((track) => {
                this.logger.info("Skipped", "[" + album.artist + "][" + album.title + "][" +
                    track.trackNumber + "][" + track.title + "]");
            });
            return;
        }
        var index = 1;
        var numberPrefixLength;
        album.tracks.forEach((track) => {
            this.logger.info("Validate", "[" + album.artist + "][" + album.title +
                "][" + track.trackNumber + "][" +
                track.title + "]");
            if (track.trackNumber != index) {
                var trackNumber = track.trackNumber || "<undefined>";
                var suggestedSpecialHandler = "\"" + album.artist + "\" : {\n" + "    \"" + album.title +
                    "\" : {\n" + "        \"firstTrackNumber\": " + trackNumber +
                    ",\n" + "        \"fixTrackName\": \"" + track.title + "(.*)\"\n" +
                    "    }\n" + "}";
                throw new Error(track.title + ": Track number out of order, expected " + index +
                    " but got " + trackNumber +
                    "\nTemplate for special handler:\n" + suggestedSpecialHandler);
            }
            index++;
        });
    }
    defaultValidateArtist(album) {
        if (album.artist.indexOf(" ") !== -1) {
            throw new Error(album.tracks[0].path + ": Artist contains a space: \"" +
                album.artist + "\"");
        }
    }
    validateTrackUniqueness(album, validationOptions) {
        if (validationOptions.indexOf(ValidationOption_1.ValidationOption.skipUniqueTrackNameCheck) >= 0) {
            this.logger.info("Validate", "Skipping track name uniqueness check for ", "[" + album.artist + "][" + album.title + "]");
            return;
        }
        var firstTrackName;
        album.tracks.forEach((track) => {
            if (firstTrackName && this.isTrackNameRedundant(firstTrackName, track.title)) {
                var suggestedSpecialHandler = "\"" + album.artist + "\" : {\n" +
                    "    \"" + album.title + "\" : {\n" +
                    "        \"fixTrackName\": \"" + track.title + "(.*)\",\n" +
                    "        \"validation\" : [\"skipUniqueTrackNameCheck\"]\n" +
                    "    }\n" +
                    "}";
                throw new Error(album.title + ": Album contains redundant track names '" +
                    track.title + "'" + "\nTemplate for special handler:\n" +
                    suggestedSpecialHandler);
            }
            if (!firstTrackName) {
                firstTrackName = track.title;
            }
        });
    }
    isTrackNameRedundant(firstTrackName, secondTrackName) {
        var length = Math.min(firstTrackName.length, secondTrackName.length);
        var matches = 0;
        for (var i = 0; i < length; i++) {
            if (firstTrackName[i] == secondTrackName[i]) {
                matches += 1;
            }
        }
        return matches > 15;
    }
}
exports.AlbumValidator = AlbumValidator;
