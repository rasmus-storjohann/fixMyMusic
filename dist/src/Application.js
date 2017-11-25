"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduceTracksToAlbums_1 = require("./businessObjects/albums/reduceTracksToAlbums");
const executeCommand_1 = require("./businessObjects/commands/executeCommand");
const createCommands_1 = require("./businessObjects/commands/createCommands");
const CustomFixerFactory_1 = require("./businessObjects/fixers/CustomFixerFactory");
const readTrackFileFromDirectories_1 = require("./businessObjects/tracks/readTrackFileFromDirectories");
const mapFilesToTracks_1 = require("./businessObjects/tracks/mapFilesToTracks");
const AlbumFixer_1 = require("./AlbumFixer");
const FixOptionsParser_1 = require("./businessObjects/fixers/FixOptionsParser");
const AlbumValidator_1 = require("./businessObjects/albums/AlbumValidator");
const FixTrackNameFunctionsForAll_1 = require("./fixers/FixTrackNameFunctionsForAll");
const parseArguments = require("minimist");
class Application {
    static main(argv) { new Application().execute(argv.splice(2)); }
    execute(argv) {
        var parsedArguments = parseArguments(argv);
        var fromDirectories = parsedArguments._;
        var dryRun = parsedArguments["dry-run"];
        var toDir = parsedArguments["out"];
        var logger = require("npmlog");
        logger.level = parsedArguments["verb"] || "info";
        if (!toDir) {
            throw new Error("Specify --out argument");
        }
        var files = readTrackFileFromDirectories_1.readTrackFileFromDirectories(fromDirectories, logger);
        var tracks = mapFilesToTracks_1.mapFilesToTracks(files, logger);
        var albums = reduceTracksToAlbums_1.reduceTracksToAlbums(tracks, logger);
        var fixOptions = new FixOptionsParser_1.FixOptionsParser(FixTrackNameFunctionsForAll_1.FixTrackNameFunctionsForAll, logger).create();
        var customFixerFactory = new CustomFixerFactory_1.CustomFixerFactory(fixOptions, logger);
        var validator = new AlbumValidator_1.AlbumValidator(customFixerFactory, logger);
        var fixer = new AlbumFixer_1.AlbumFixer(customFixerFactory, logger);
        albums.forEach(album => {
            fixer.fix(album);
            validator.validate(album);
            album.reassignTrackNumbers();
        });
        var commands = createCommands_1.createCommands(albums, toDir, logger);
        if (!dryRun) {
            commands.forEach(command => { executeCommand_1.executeCommand(command, logger); });
        }
    }
}
exports.Application = Application;
