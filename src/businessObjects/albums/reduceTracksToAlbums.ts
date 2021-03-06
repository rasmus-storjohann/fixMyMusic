import {Album} from "../../Album";
import {AlbumTrack} from "../../businessInterfaces/tracks/AlbumTrack";
import {Track} from "../../businessInterfaces/tracks/Track";
import {NpmLog} from "npmlog";

export function reduceTracksToAlbums(tracks: Track[], logger: NpmLog): Album[]
{
        return tracks.sort(sortTracksByArtistAndAlbum)
                .reduce(groupByArtistAndAlbum(), [])
                .map(trackGroup => new Album(trackGroup));
}

function sortTracksByArtistAndAlbum(first: Track, second: Track) : number
{
        if (first.artist == second.artist)
        {
                if (first.album == second.album) { return 0; }
                return first.album < second.album ? -1 : 1;
        }
        return first.artist < second.artist ? -1 : 1;
}

function groupByArtistAndAlbum() : (acc: Track[][], currentValue: Track, currentIndex: number, array: Track[]) => Track[][]
{
        let firstTrackInAlbum: Track | undefined = undefined;

        function isCurrentAlbum(track: Track): boolean
        {
                if (!firstTrackInAlbum) { return false; }

                return firstTrackInAlbum.artist === track.artist &&
                        firstTrackInAlbum.album === track.album;
        }

        function reducer(accumulator: Track[][], track: Track, index: number, array: Track[]) : Track[][]
        {
                if (!isCurrentAlbum(track))
                {
                        firstTrackInAlbum = track;
                        accumulator.push([]);
                }
                accumulator[accumulator.length-1].push(track);
                return accumulator;
        }

        return reducer;
}
