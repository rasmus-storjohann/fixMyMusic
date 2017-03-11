import {FixOptionsParser} from "./businessObjects/fixers/FixOptionsParser";
import {FixOptionsForAll} from "./businessInterfaces/fixers/FixOptionsForAll";
import {FixOptionsForOneComposer} from "./businessInterfaces/fixers/FixOptionsForOneComposer";
import * as fs from "fs";

export class RulesFactory
{
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
};
