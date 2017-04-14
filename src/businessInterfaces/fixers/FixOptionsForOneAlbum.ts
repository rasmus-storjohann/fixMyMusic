import {ClassicalWorkName} from "./ClassicalWorkName";
import {ValidationOption} from "./ValidationOption";

export class FixOptionsForOneAlbum
{
        constructor(readonly firstTrackNumber?: number, readonly fixTrackName?: RegExp,
                    readonly albumName?: string, readonly fixAlbumTitle?: ClassicalWorkName,
                    readonly validation?: ValidationOption[])
        {
        }
}
