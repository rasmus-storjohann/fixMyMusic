import { MusicFile } from "./MusicFile";

export class Validator
{
    public validateAlbum(tracksForOneAlbum: MusicFile[])
    {
        var index = 1;
        tracksForOneAlbum.forEach((track) => {
            if (!track.trackNumber)
            {
                throw new Error(track.path + ": Could not assign a track number");
            }
            if (track.trackNumber != index)
            {
                throw new Error(track.path + ": Track number out of order, expected " + index);
            }
            index++;
        });
    }
}
