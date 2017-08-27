import {FixOptionsForOneAlbum} from "./../../businessInterfaces/fixers/FixOptionsForOneAlbum";
import {buildAlbumFixer} from "./details/buildAlbumFixer";

export function parseAlbumFixer(json: string): FixOptionsForOneAlbum
{
        var parsed = JSON.parse(json);
        return buildAlbumFixer(parsed);
}
