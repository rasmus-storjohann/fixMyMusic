import {reduceTracksToAlbums} from "./businessObjects/albums/reduceTracksToAlbums";
import {executeCommand} from "./businessObjects/commands/executeCommand";
import {createCommands} from "./businessObjects/commands/createCommands";
import {CustomFixerFactory} from "./businessObjects/fixers/CustomFixerFactory";
import {readTrackFileFromDirectories} from "./businessObjects/tracks/readTrackFileFromDirectories";
import {mapFilesToTracks} from "./businessObjects/tracks/mapFilesToTracks";
import {AlbumFixer} from "./AlbumFixer";
import {FixOptionsParser} from "./businessObjects/fixers/FixOptionsParser";
import {AlbumValidator} from "./businessObjects/albums/AlbumValidator";
import {FixTrackNameFunctionsForAll} from "./fixers/FixTrackNameFunctionsForAll";

import * as shelljs from 'shelljs';
import * as fs from 'fs.realpath';
import * as parseArguments from 'minimist';
import * as npmlog from "npmlog";

export class Application
{
        public static main(argv: string[]) { new Application().execute(argv.splice(2)); }

        public execute(argv: string[])
        {
                var parsedArguments = parseArguments(argv);
                var fromDirectories = parsedArguments._;
                var dryRun = parsedArguments["dry-run"];
                var toDir = parsedArguments["out"];

                var logger = require("npmlog");
                logger.level = parsedArguments["verb"] || "info";

                if (!toDir)
                {
                        throw new Error("Specify --out argument");
                }

                var files = readTrackFileFromDirectories(fromDirectories, logger);
                var tracks = mapFilesToTracks(files, logger);
                var albums = reduceTracksToAlbums(tracks, logger);

                var fixOptions = new FixOptionsParser(FixTrackNameFunctionsForAll, logger).create();
                var customFixerFactory = new CustomFixerFactory(fixOptions, logger);

                var validator = new AlbumValidator(customFixerFactory, logger);
                var fixer = new AlbumFixer(customFixerFactory, logger);

                albums.forEach(album => {
                        fixer.fix(album);
                        validator.validate(album);
                        album.reassignTrackNumbers();
                });

                var commands = createCommands(albums, toDir, logger);

                if (!dryRun)
                {
                        commands.forEach(command => { executeCommand(command, logger); });
                }
        }
}
