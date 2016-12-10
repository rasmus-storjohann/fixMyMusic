import { Album } from "./Album";
import { AlbumTrack } from "./AlbumTrack";

import * as npmlog from "npmlog";

export interface CustomFixer
{
    fixArtist: (album: Album, logger: npmlog.NpmLog) => void;
    fixAlbumTitle?: string;
    fixTrack: (track: AlbumTrack, logger: npmlog.NpmLog) => void;
    validation: string[];
}
