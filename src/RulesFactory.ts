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

export class RulesFactory
{
        public create()
        {
                var allTheRules = Others.rules;

                allTheRules["JS Bach"] = BachJs.rules;
                allTheRules["Beethoven"] = Beethoven.rules;
                allTheRules["Handel"] = Handel.rules;
                allTheRules["Haydn"] = Haydn.rules;
                allTheRules["Mahler"] = Mahler.rules;
                allTheRules["Mozart"] = Mozart.rules;
                allTheRules["Frédéric Chopin"] = Copin.rules;
                allTheRules["Schubert"] = Schubert.rules;
                allTheRules["Shostakovich"] = Shostakovich.rules;

                return allTheRules;
        };
};
