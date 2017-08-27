import {FixOptionsForAll} from "./../../businessInterfaces/fixers/FixOptionsForAll";
import {FixOptionsForOneArtist} from "./../../businessInterfaces/fixers/FixOptionsForOneArtist";
import {buildAlbumFixer} from "./details/buildAlbumFixer";

// TODO parser should throw on both albumName and fixAlbumTitle being defined
export function parseFixers(json: string): FixOptionsForAll
{
        var result: FixOptionsForAll = {};
        var parsed = JSON.parse(json);
        for (var artist in parsed)
        {
                if (parsed.hasOwnProperty(artist))
                {
                        result[artist] = new FixOptionsForOneArtist();
                        for (var album in parsed[artist])
                        {
                                if (parsed[artist].hasOwnProperty(album))
                                {

                                        result[artist][album] = buildAlbumFixer(parsed[artist][album]);
                                }
                        }
                }
        }
        return result;
}
