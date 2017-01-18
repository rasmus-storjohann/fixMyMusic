import { Format } from "./AlbumFormat";

import * as BachJs from "./Rules/BachJS";
import * as Beethoven from "./Rules/Beethoven";
import * as Mozart from "./Rules/Mozart";
import * as Others from "./Rules/Others";

export class RulesFactory
{
    public create()
    {
        var allTheRules = Others.rules;

        allTheRules["Bach JS"] = BachJs.rules;
        allTheRules["Beethoven"] = Beethoven.rules;
        allTheRules["Mozart"] = Mozart.rules;

        return allTheRules;
    };
};
