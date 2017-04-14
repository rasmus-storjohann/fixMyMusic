import {AlbumFactory} from "./businessObjects/albums/AlbumFactory";
import {CommandExecutor} from "./businessObjects/commands/CommandExecutor";
import {CommandFactory} from "./businessObjects/commands/CommandFactory";
import {CustomFixerFactory} from "./CustomFixerFactory";
import {FileFactory} from "./FileFactory";
import {Fixer} from "./Fixer";
import {RulesFactory} from "./RulesFactory";
import {TrackFactory} from "./TrackFactory";
import {Validator} from "./Validator";

import * as shelljs from 'shelljs';
import * as fs from 'fs.realpath';
import * as parseArguments from 'minimist';
import * as npmlog from "npmlog";

export class Application
{
        public static main(argv: string[], logger: npmlog.NpmLog)
        {
                logger.level = "info";
                new Application(logger).execute(argv.splice(2));
        }

        constructor(logger: npmlog.NpmLog) { this.logger = logger; }

        public execute(argv: string[])
        {
                var parsedArguments = parseArguments(argv);
                var fromDirectories = parsedArguments._;
                var dryRun = parsedArguments["dry-run"];
                var toDir = parsedArguments["out"];

                if (!toDir)
                {
                        throw new Error("Specify --out argument");
                }

                var files = new FileFactory(this.logger).create(fromDirectories);
                var tracks = new TrackFactory(this.logger).create(files);
                var albums = new AlbumFactory(this.logger).create(tracks);

                var rules = new RulesFactory().create();
                var customFixerFactory = new CustomFixerFactory(rules, this.logger);

                var validator = new Validator(customFixerFactory, this.logger);
                var fixer = new Fixer(customFixerFactory, this.logger);

                albums.forEach(album => {
                        fixer.fix(album);
                        validator.validate(album);
                        album.reassignTrackNumbers();
                });

                var commands = new CommandFactory(toDir, this.logger).create(albums);

                if (!dryRun)
                {
                        new CommandExecutor(this.logger).execute(commands);
                }
        }
        private logger: npmlog.NpmLog;
}
