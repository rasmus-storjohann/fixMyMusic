import { Album } from "./Album";
import { Track } from "./Track";

export class Validator
{
    public validateTracks: (tracksForOneAlbum: Track[]) => void;

    constructor()
    {
        this.validateTracks = this.defaultValidateTracks;
    }

    public validate(albums: Album[]) : void
    {
        albums.forEach((album) => {
            this.validateAlbum(album);
            this.validateTracks(album.tracks);
        });
    }

    private validateAlbum(album: Album) : void
    {
        if (album.artist.indexOf(" ") !== -1)
        {
            throw new Error(album.artist + ": Artist contains a space");
        }
    }

    private defaultValidateTracks(tracksForOneAlbum: Track[]) : void
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
