import { MusicFile } from "./MusicFile";

export class Validator
{
    public validateFiles(files: MusicFile[])
    {
        files.forEach((file) => {
            this.validate(file);
        });
    }
    public validate(file: MusicFile)
    {
        if (!file.trackNumber)
        {
            throw new Error(file.path + ": Could not assign a track number");
        }
    }
}
