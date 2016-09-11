import * as shelljs from 'shelljs';
import * as fs from 'fs';

export function getFiles(directories: string[]) : string[]
{
    return shelljs.find(directories).filter((path) =>
    {
         return /mp3$/.exec(path) && fs.statSync(path).isFile();
    });
}
