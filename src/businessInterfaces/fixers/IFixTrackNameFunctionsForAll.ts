import {IFixTrackNameFunctionsForOneArtist} from "./IFixTrackNameFunctionsForOneArtist";

export interface IFixTrackNameFunctionsForAll
{
        [name: string]: IFixTrackNameFunctionsForOneArtist;
}
