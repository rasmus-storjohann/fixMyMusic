import {FixOptionsForOneArtist} from "./../../businessInterfaces/fixers/FixOptionsForOneArtist";
import {buildAlbumFixer} from "./details/buildAlbumFixer";

export function parseArtistFixer(json: string): FixOptionsForOneArtist
{
        var result = new FixOptionsForOneArtist();
        var parsed = JSON.parse(json);
        for (var album in parsed)
        {
                if (parsed.hasOwnProperty(album))
                {
                        result[album] = buildAlbumFixer(parsed[album]);
                }
        }
        return result;
}
