import {AlbumNameFixOptions} from "./AlbumNameFixOptions";
import {ValidationOption} from "./ValidationOption";
import {removeUndefinedFields} from "./removeUndefinedFields";

export class FixOptions
{
        constructor(readonly firstTrackNumber?: number, readonly fixTrackName?: RegExp,
                    readonly fixAlbumTitle?: AlbumNameFixOptions,
                    readonly validation?: ValidationOption[])
        {
                removeUndefinedFields(this);
        }
}
