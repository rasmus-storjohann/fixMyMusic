import {Track} from "../../businessInterfaces/tracks/Track";
import * as npmlog from "npmlog";

export function mapFilesToTracks(paths: string[], logger: npmlog.NpmLog): Track[]
{
        let result = paths.map(createTrack);
        logger.info("Tracks", "Processed " + result.length + " tracks");
        return result;
}

function createTrack(path: string): Track
{
        let parsedPath = parsePath(path);
        let parsedTrackName = parseTrackName(parsedPath.trackName);
        let disk = parsedTrackName.disk || parsedPath.disk;

        return {
                path : path,
                artist : parsedPath.artist,
                album : parsedPath.album,
                title : parsedTrackName.title,
                trackNumber : parsedTrackName.trackNumber,
                disk : disk
        };
}

interface ArtistAlbumTrackNameAndMaybeDisk
{
        artist: string, album: string, trackName: string, disk?: number
}

function parsePath(path: string) : ArtistAlbumTrackNameAndMaybeDisk
{
        return parsePathWithDiskDirectory(path) || parsePathWithoutDisk(path);
}

function parsePathWithDiskDirectory(path: string) : ArtistAlbumTrackNameAndMaybeDisk | undefined
{
        const splitPath = path.split("/");
        const elementCount = splitPath.length;
        const disk = parseDiskDirectory(splitPath[elementCount - 2]);
        if (!disk) { return undefined; }

        validateElementCount(elementCount, 5, path);

        const artist = splitPath[elementCount - 4];
        const album = splitPath[elementCount - 3];
        const trackName = splitPath[elementCount - 1];

        return {artist: artist, album: album, disk: disk, trackName: trackName};
}

function parseDiskDirectory(directoryName: string) : number | undefined
{
        const match = /disk(\d+)/.exec(directoryName);
        return match ? parseInt(match[1]) : undefined;
}

function parsePathWithoutDisk(path: string) : ArtistAlbumTrackNameAndMaybeDisk
{
        const splitPath = path.split("/");
        const elementCount = splitPath.length;
        validateElementCount(elementCount, 4, path);

        const album = splitPath[elementCount - 2];
        const artist = splitPath[elementCount - 3];
        const trackName = splitPath[elementCount - 1];

        return {artist: artist, album: album, trackName: trackName};
}

interface TitleTrackAndMaybeDisk
{
        title: string, trackNumber: number, disk?: number
}

function parseTrackName(title: string) : TitleTrackAndMaybeDisk
{
        return parseTrackNameWithTrack(title)
                || parseTrackNameWithNamePrefixes(title)
                || parseTrackNameWithLetterPrefixes(title)
                || throwOnTrackNameParseFailed();
}

function parseTrackNameWithTrack(trackName: string) : TitleTrackAndMaybeDisk | undefined
{
        const match = /^(\d+)[ \.-]*(.*)\.mp3$/.exec(trackName);
        if (!match) { return undefined; }

        return { trackNumber: parseInt(match[1]), title: match[2] };
}

function parseTrackNameWithNamePrefixes(trackName: string) : TitleTrackAndMaybeDisk | undefined
{
        return parseTrackNameWithDiskAndTrack(trackName, /^Disc (\d+) - (\d+)[ -]*(.*)\.mp3$/);
}

function parseTrackNameWithLetterPrefixes(trackName: string) : TitleTrackAndMaybeDisk | undefined
{
        return parseTrackNameWithDiskAndTrack(trackName, /^d(\d+)t(\d+)\. (.*)\.mp3$/);
}

function parseTrackNameWithDiskAndTrack(trackName: string, regex: RegExp) : TitleTrackAndMaybeDisk | undefined
{
        const match = regex.exec(trackName);
        if (!match) { return undefined; }

        return { disk: parseInt(match[1]), trackNumber: parseInt(match[2]), title: match[3] };
}

function throwOnTrackNameParseFailed() : TitleTrackAndMaybeDisk
{
        throw new Error("Could not parse file names");
}

function validateElementCount(actual: number, expected: number, path: string)
{
        if (actual < expected)
        {
                throw new Error(path + ": Invalid path to music file, at least " +
                                expected + " elements needed");
        }
}
