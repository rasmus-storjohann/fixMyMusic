import {FixOptionsForOneArtist} from "./FixOptionsForOneArtist";

export interface FixOptionsForAll {
        [name: string]: FixOptionsForOneArtist;
}
