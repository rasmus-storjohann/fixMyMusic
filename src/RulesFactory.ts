import { Format } from "./AlbumFormat";

import * as BachJs from "./Rules/BachJS";
import * as Beethoven from "./Rules/Beethoven";
import * as Others from "./Rules/Others";

export class RulesFactory
{
    public create()
    {
        var allTheRules = Others.rules;

        allTheRules["Bach JS"] = BachJs.rules;
        allTheRules["Beethoven"] = Beethoven.rules;

        return allTheRules;
    };
};
