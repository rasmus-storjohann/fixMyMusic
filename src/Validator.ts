import { MusicFile } from "./MusicFile";
import { IValidator } from "./IValidator";

export class Validator
{
    public validateAlbum(tracksForOneAlbum: MusicFile[])
    {
        var index = 1;
        tracksForOneAlbum.forEach((track) => {
            var trackNumberAsString = /^(\d+)/.exec(track.track);
            if (!trackNumberAsString)
            {
                throw new Error(track.path + ": Could not assign a track number");
            }
            var trackNumber = parseInt(trackNumberAsString);
            if (trackNumber != index)
            {
                throw new Error(track.path + ": Track number out of order, expected " + index);
            }
            index++;
        });
    }
}
