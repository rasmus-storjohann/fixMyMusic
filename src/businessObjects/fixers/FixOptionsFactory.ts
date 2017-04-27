import {FixOptionsForAll} from "../../businessInterfaces/fixers/FixOptionsForAll";
import {FixOptionsForOneArtist} from "../../businessInterfaces/fixers/FixOptionsForOneArtist";
import {FixOptionsForOneAlbum} from "../../businessInterfaces/fixers/FixOptionsForOneAlbum";
import {FixOptionsParser} from "./FixOptionsParser";
import {IFixTrackNameFunction} from "../../businessInterfaces/fixers/IFixTrackNameFunction";
import {IFixTrackNameFunctionsForAll} from "../../businessInterfaces/fixers/IFixTrackNameFunctionsForAll";
import * as npmlog from "npmlog";
import * as fs from "fs";

export class FixOptionsFactory
{
        public constructor(fixTrackNameFunctions: IFixTrackNameFunctionsForAll, logger: npmlog.NpmLog)
        {
                this.logger = logger;
                this.fixTrackNameFunctions = fixTrackNameFunctions;
        }

        private logger: npmlog.NpmLog;
        private fixTrackNameFunctions: IFixTrackNameFunctionsForAll;

        public create(): FixOptionsForAll
        {
                let fixOptionsForAll = this.readRootJsonFile("Others.json");
                fixOptionsForAll = this.addArtistSpecificFixers(fixOptionsForAll);

                // reduce to flatten nested hash to array tuples, using Object.keys
                // reduce to add functions to result
                this.addFixTrackNameFunctions(fixOptionsForAll);

                return fixOptionsForAll;
        };

        private artists =  ["JS Bach", "Beethoven", "Handel",
                        "Haydn", "Mahler", "Mozart", "Frédéric Chopin",
                        "Schubert", "Shostakovich"];

        private addArtistSpecificFixers(fixOptionsForAll: FixOptionsForAll) : FixOptionsForAll
        {
                const self = this;
                const addArtistFixers = function(fixOptionsForAll: FixOptionsForAll, artist: string, index: number, array: string[]) : FixOptionsForAll
                {
                        let filename = artist + ".json";
                        self.addArtistJsonFile(fixOptionsForAll, filename, artist);
                        return fixOptionsForAll;
                };

                return this.artists.reduce(addArtistFixers, fixOptionsForAll);
        }

        private addArtistJsonFile(result: FixOptionsForAll, file: string, key: string): void
        {
                if (result[key])
                {
                        throw new Error(key + ": fixer data contains duplicate keys");
                }
                result[key] = this.readArtistJsonFile(file);
        }
        private readRootJsonFile(filename: string): FixOptionsForAll
        {
                var json = this.readFixerFile(filename);
                return new FixOptionsParser().parseGlobalJsonFile(json);
        }
        private readArtistJsonFile(filename: string): FixOptionsForOneArtist
        {
                var json = this.readFixerFile(filename);
                return new FixOptionsParser().parseArtistJsonFile(json);
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
