import { Track } from "./Track";

export class Validator
{
    public validateAlbum: (tracksForOneAlbum: Track[]) => void;

    constructor()
    {
        this.validateAlbum = this.defaultValidateAlbum;
    }

    private defaultValidateAlbum(tracksForOneAlbum: Track[]) : void
    {
        var index = 1;
        tracksForOneAlbum.forEach((track) => {
            var trackNumberAsString = /^(\d+)/.exec(track.title);
            if (!trackNumberAsString)
            {
                throw new Error(track.path + ": Could not assign a track number");
            }
            var trackNumber = parseInt(trackNumberAsString[1]);
            if (trackNumber != index)
            {
                throw new Error(track.path + ": Track number out of order, expected " + index);
            }
            index++;
        });
    }
}
