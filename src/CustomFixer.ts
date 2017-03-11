import {Album} from "./Album";
import {FixOptionsForAlbumName} from "./businessInterfaces/fixers/FixOptionsForAlbumName";
import {ValidationOption} from "./businessInterfaces/fixers/ValidationOption";

import * as npmlog from "npmlog";

// TODO remove
export interface CustomFixer {
        albumName?: string;
        fixAlbumTitle?: FixOptionsForAlbumName;
        fixTrack: (album: Album, logger: npmlog.NpmLog) => void;
        validation: ValidationOption[];
}
