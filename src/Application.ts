import {AlbumFactory} from "./businessObjects/albums/AlbumFactory";
import {CommandExecutor} from "./businessObjects/commands/CommandExecutor";
import {CommandFactory} from "./businessObjects/commands/CommandFactory";
import {CustomFixerFactory} from "./businessObjects/fixers/CustomFixerFactory";
import {readTrackFileFromDirectories} from "./businessObjects/tracks/readTrackFileFromDirectories";
import {AlbumFixer} from "./AlbumFixer";
import {FixOptionsFactory} from "./businessObjects/fixers/FixOptionsFactory";
import {TrackFactory} from "./businessObjects/tracks/TrackFactory";
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
                var tracks = new TrackFactory(logger).create(files);
                var albums = new AlbumFactory(logger).create(tracks);

                var fixOptions =
                    new FixOptionsFactory(FixTrackNameFunctionsForAll, logger).create();
                var customFixerFactory = new CustomFixerFactory(fixOptions, logger);

                var validator = new AlbumValidator(customFixerFactory, logger);
                var fixer = new AlbumFixer(customFixerFactory, logger);

                albums.forEach(album => {
                        fixer.fix(album);
                        validator.validate(album);
                        album.reassignTrackNumbers();
                });

                var commands = new CommandFactory(toDir, logger).create(albums);

                if (!dryRun)
                {
                        new CommandExecutor(logger).execute(commands);
                }
        }
}
