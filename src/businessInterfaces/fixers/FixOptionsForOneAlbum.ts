import {ClassicalWorkName} from "./ClassicalWorkName";
import {ValidationOption} from "./ValidationOption";
import {fixTrackNameFunc} from "./fixTrackNameFunc";

export class FixOptionsForOneAlbum
{
        constructor(readonly firstTrackNumber?: number,
                readonly fixTrackName?: RegExp,
                readonly fixTrackNameFunction?: fixTrackNameFunc,
                readonly albumName?: string,
                readonly fixAlbumTitle?: ClassicalWorkName,
                readonly validation?: ValidationOption[])
        {
        }
}
