import { Album } from "./Album";
import { Rule } from "./Rule";

export interface IRuleFactory
{
    create(album: Album) : Rule;

    // TODO this does not belong in this file
    getArtistName(artist: string) : string;
}
