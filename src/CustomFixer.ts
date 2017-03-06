import {Album} from "./Album";

import * as npmlog from "npmlog";

// TODO remove
export interface CustomFixer {
        fixAlbumTitle?: string;
        fixTrack: (album: Album, logger: npmlog.NpmLog) => void;
        validation: string[];
}
