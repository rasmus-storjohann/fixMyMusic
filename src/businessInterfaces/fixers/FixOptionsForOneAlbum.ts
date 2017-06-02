import {ClassicalWorkName} from "./ClassicalWorkName";
import {ValidationOption} from "./ValidationOption";
import {IFixTrackNameFunction} from "./IFixTrackNameFunction";

export interface FixOptionsForOneAlbum
{
        firstTrackNumber?: number;
        fixTrackName?: RegExp;
        fixTrackNameFunction?: IFixTrackNameFunction;
        albumName?: string;
        fixAlbumTitle?: ClassicalWorkName;
        validation?: ValidationOption[];
}
