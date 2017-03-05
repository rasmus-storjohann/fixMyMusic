import {FixOptionsForAlbumName} from "./FixOptionsForAlbumName";
import {ValidationOption} from "./ValidationOption";
import {removeUndefinedFields} from "./removeUndefinedFields";

export class FixOptionsForOneAlbum
{
        constructor(readonly firstTrackNumber?: number, readonly fixTrackName?: RegExp,
                    readonly fixAlbumTitle?: FixOptionsForAlbumName,
                    readonly validation?: ValidationOption[])
        {
                removeUndefinedFields(this);
        }
}
