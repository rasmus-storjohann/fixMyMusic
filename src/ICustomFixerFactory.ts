import { Album } from "./Album";
import { CustomFixer } from "./CustomFixer";

export interface ICustomFixerFactory
{
    create(album: Album) : CustomFixer;

    // TODO this does not belong in this file
    getArtistName(artist: string) : string;
}
