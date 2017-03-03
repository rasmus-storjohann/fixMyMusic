import {Format} from "./AlbumFormat";

import * as BachJs from "./Rules/BachJS";
import * as Copin from "./Rules/Chopin";
import * as Beethoven from "./Rules/Beethoven";
import * as Handel from "./Rules/Handel";
import * as Haydn from "./Rules/Haydn";
import * as Mahler from "./Rules/Mahler";
import * as Mozart from "./Rules/Mozart";
import * as Others from "./Rules/Others";
import * as Schubert from "./Rules/Schubert";
import * as Shostakovich from "./Rules/Shostakovich";

import * as fs from "fs";

export class RulesFactory
{
        public create()
        {
                var allTheRules = Others.rules;
                this.dumpJson(Others.rules,
                              "/home/rasmus/Music/bin/src/fixers/Others.json");

                allTheRules["JS Bach"] = BachJs.rules;
                this.dumpJson(BachJs.rules,
                              "/home/rasmus/Music/bin/src/fixers/BachJs.json");

                allTheRules["Beethoven"] = Beethoven.rules;
                this.dumpJson(
                    Beethoven.rules,
                    "/home/rasmus/Music/bin/src/fixers/Beethoven.json");

                allTheRules["Handel"] = Handel.rules;
                this.dumpJson(Handel.rules,
                              "/home/rasmus/Music/bin/src/fixers/Handel.json");

                allTheRules["Haydn"] = Haydn.rules;
                this.dumpJson(Haydn.rules,
                              "/home/rasmus/Music/bin/src/fixers/Haydn.json");

                allTheRules["Mahler"] = Mahler.rules;
                this.dumpJson(Mahler.rules,
                              "/home/rasmus/Music/bin/src/fixers/Mahler.json");

                allTheRules["Mozart"] = Mozart.rules;
                this.dumpJson(Mozart.rules,
                              "/home/rasmus/Music/bin/src/fixers/Mozart.json");

                allTheRules["Frédéric Chopin"] = Copin.rules;
                this.dumpJson(Copin.rules,
                              "/home/rasmus/Music/bin/src/fixers/Chopin.json");

                allTheRules["Schubert"] = Schubert.rules;
                this.dumpJson(
                    Schubert.rules,
                    "/home/rasmus/Music/bin/src/fixers/Schubert.json");

                allTheRules["Shostakovich"] = Shostakovich.rules;
                this.dumpJson(
                    Shostakovich.rules,
                    "/home/rasmus/Music/bin/src/fixers/Shostakovich.json");

                return allTheRules;
        };
        private dumpJson(data, path)
        {
                return;
                var replacer = function(key, value) {
                        if (value instanceof RegExp)
                        {
                                var s = value.toString();
                                return s.slice(1, s.length - 1);
                        }
                        return value;
                };
                var json = JSON.stringify(data, replacer, 4);
                fs.writeFileSync(path, json);
        }
};
