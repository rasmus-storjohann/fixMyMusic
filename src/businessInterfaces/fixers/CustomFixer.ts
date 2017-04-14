import {Album} from "../../Album";
import {ClassicalWorkName} from "../../businessInterfaces/fixers/ClassicalWorkName";
import {ValidationOption} from "../../businessInterfaces/fixers/ValidationOption";
import * as npmlog from "npmlog";

// move to business interfaces fixers
export interface CustomFixer {
        albumName?: string;
        fixAlbumTitle?: ClassicalWorkName;
        fixTrack: (album: Album, logger: npmlog.NpmLog) => void;
        validation: ValidationOption[];
}
