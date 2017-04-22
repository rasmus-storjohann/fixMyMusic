import {ClassicalWorkName} from "./ClassicalWorkName";
import {ValidationOption} from "./ValidationOption";
import {IFixTrackNameFunction} from "./IFixTrackNameFunction";

export class FixOptionsForOneAlbum
{
        constructor(readonly firstTrackNumber?: number,
                readonly fixTrackName?: RegExp,
                readonly fixTrackNameFunction?: IFixTrackNameFunction,
                readonly albumName?: string,
                readonly fixAlbumTitle?: ClassicalWorkName,
                readonly validation?: ValidationOption[])
        {
        }
}
