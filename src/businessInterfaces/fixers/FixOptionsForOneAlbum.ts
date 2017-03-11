import {FixOptionsForAlbumName} from "./FixOptionsForAlbumName";
import {ValidationOption} from "./ValidationOption";
import {removeUndefinedFields} from "./removeUndefinedFields";

export class FixOptionsForOneAlbum
{
        // TODO parser should throw on both albumName and fixAlbumTitle being defined
        constructor(readonly firstTrackNumber?: number, readonly fixTrackName?: RegExp,
                    readonly albumName?: string, readonly fixAlbumTitle?: FixOptionsForAlbumName,
                    readonly validation?: ValidationOption[])
        {
                removeUndefinedFields(this);
        }
}
