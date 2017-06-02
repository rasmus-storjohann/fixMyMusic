import {Album} from "../../Album";
import {ClassicalWorkName} from "../../businessInterfaces/fixers/ClassicalWorkName";
import {ValidationOption} from "../../businessInterfaces/fixers/ValidationOption";
import {NpmLog} from "npmlog";

export interface CustomFixer {
        albumName?: string;
        fixAlbumTitle?: ClassicalWorkName;
        fixTrack: (album: Album, logger: NpmLog) => void;
        validation: ValidationOption[];
}
