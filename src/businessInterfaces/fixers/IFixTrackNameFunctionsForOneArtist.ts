import * as npmlog from "npmlog";
import {IFixTrackNameFunction} from "./IFixTrackNameFunction";

export interface IFixTrackNameFunctionsForOneArtist
{
        [name: string]: IFixTrackNameFunction;
}
