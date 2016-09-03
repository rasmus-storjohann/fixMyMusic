import { MusicFile } from "./MusicFile";

export class Validator
{
    public validate(file: MusicFile)
    {
        if (!file.trackNumber)
        {
            throw new Error(file.path + ": Could not assign a track number");
        }
    }
}
