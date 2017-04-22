import {FixOptionsForAll} from "../../businessInterfaces/fixers/FixOptionsForAll";
import {FixOptionsForOneComposer} from "../../businessInterfaces/fixers/FixOptionsForOneComposer";
import {FixOptionsForOneAlbum} from "../../businessInterfaces/fixers/FixOptionsForOneAlbum";
import {FixOptionsParser} from "./FixOptionsParser";
import {IFixTrackNameFunction} from "../../businessInterfaces/fixers/IFixTrackNameFunction";
import {IFixTrackNameFunctionsForAll} from "../../businessInterfaces/fixers/IFixTrackNameFunctionsForAll";
import * as npmlog from "npmlog";
import * as fs from "fs";

export class FixOptionsFactory
{
        // TODO inject fixTrackNameFunctions
        public constructor(fixTrackNameFunctions: IFixTrackNameFunctionsForAll, logger: npmlog.NpmLog)
        {
                this.logger = logger;
                this.fixTrackNameFunctions = fixTrackNameFunctions;
        }

        private logger: npmlog.NpmLog;
        private fixTrackNameFunctions: IFixTrackNameFunctionsForAll;

        public create(): FixOptionsForAll
        {
                var result = this.readRootJsonFile("Others.json");

                this.addComposerJsonFile(result, "BachJs.json", "JS Bach");
                this.addComposerJsonFile(result, "Beethoven.json", "Beethoven");
                this.addComposerJsonFile(result, "Handel.json", "Handel");
                this.addComposerJsonFile(result, "Haydn.json", "Haydn");
                this.addComposerJsonFile(result, "Mahler.json", "Mahler");
                this.addComposerJsonFile(result, "Mozart.json", "Mozart");
                this.addComposerJsonFile(result, "Chopin.json", "Frédéric Chopin");
                this.addComposerJsonFile(result, "Schubert.json", "Schubert");
                this.addComposerJsonFile(result, "Shostakovich.json", "Shostakovich");

                this.addFixTrackNameFunctions(result);

                return result;
        };
        private addComposerJsonFile(result: FixOptionsForAll, file: string, key: string): void
        {
                if (result[key])
                {
                        throw new Error(key + ": fixer data contains duplicate keys");
                }
                result[key] = this.readComposerJsonFile(file);
        }
        private readRootJsonFile(filename: string): FixOptionsForAll
        {
                var json = this.readFixerFile(filename);
                return new FixOptionsParser().parseGlobalJsonFile(json);
        }
        private readComposerJsonFile(filename: string): FixOptionsForOneComposer
        {
                var json = this.readFixerFile(filename);
                return new FixOptionsParser().parseComposerJsonFile(json);
        }
        private readFixerFile(filename: string): string
        {
                return fs.readFileSync("/home/rasmus/Music/bin/src/fixers/" + filename, "utf8");
        }
        private addFixTrackNameFunctions(result: FixOptionsForAll)
        {
                for (var artist in this.fixTrackNameFunctions)
                {
                        if (this.fixTrackNameFunctions.hasOwnProperty(artist))
                        {
                                if (!result[artist])
                                {
                                        throw new Error("fix track function for non-existent artist '" + artist + "'");
                                }
                                for (var album in this.fixTrackNameFunctions[artist])
                                {
                                        if (this.fixTrackNameFunctions[artist].hasOwnProperty(album))
                                        {
                                                this.logger.silly("FixOptionsFactory", "Adding functions for " + artist + ": " + album);
                                                if (!result[artist][album])
                                                {
                                                        throw new Error("fix track function for non-existent album '" + artist + "'/'" + album + "'");
                                                }
                                                var theFunction = this.fixTrackNameFunctions[artist][album];
                                                var theExisting = result[artist][album];
                                                result[artist][album] = new FixOptionsForOneAlbum(
                                                                theExisting.firstTrackNumber,
                                                                theExisting.fixTrackName,
                                                                theFunction,
                                                                theExisting.albumName,
                                                                theExisting.fixAlbumTitle,
                                                                theExisting.validation);;
                                        }
                                }
                        }
                }
        }
};
