import {FixTrackNameFunctionsForOneComposer} from "./FixTrackNameFunctionsForOneComposer";

// TODO rename FixTrackNameFunctionsForAll
export interface FixTrackNameFunctions
{
        [name: string]: FixTrackNameFunctionsForOneComposer;
}
