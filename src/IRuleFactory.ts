import { Rule } from "./Rule";

export interface IRuleFactory
{
    create(artist: string, albumTitle: string) : Rule;

    // TODO this does not belong in this file
    getArtistName(artist: string) : string;
}
