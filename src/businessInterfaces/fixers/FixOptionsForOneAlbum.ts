import {ClassicalWorkName} from "./ClassicalWorkName";
import {ValidationOption} from "./ValidationOption";
import {removeUndefinedFields} from "./removeUndefinedFields";

export class FixOptionsForOneAlbum
{
        // TODO parser should throw on both albumName and fixAlbumTitle being defined
        constructor(readonly firstTrackNumber?: number, readonly fixTrackName?: RegExp,
                    readonly albumName?: string, readonly fixAlbumTitle?: ClassicalWorkName,
                    readonly validation?: ValidationOption[])
        {
                removeUndefinedFields(this);
        }
}
