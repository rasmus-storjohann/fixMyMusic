import * as npmlog from "npmlog";
import {IFixTrackNameFunction} from "./IFixTrackNameFunction";

export interface IFixTrackNameFunctionsForOneComposer
{
        [name: string]: IFixTrackNameFunction;
}
