import { MusicFile } from "./MusicFile";

export class Validator
{
    public validateFiles(files: MusicFile[])
    {
        files.forEach((file) => {
            if (!file.trackNumber)
            {
                throw new Error(file.path + ": Could not assign a track number");
            }
        });
    }
}
