import * as npmlog from "npmlog";
import {fixTrackNameFunc} from "./fixTrackNameFunc";

export interface FixTrackNameFunctionsForOneComposer
{
        [name: string]: fixTrackNameFunc;
}
