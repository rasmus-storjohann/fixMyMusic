/// <reference path = "../typings/auto.d.ts" />

import { Command } from "../src/Command";
import * as shelljs from 'shelljs';

export class CommandExecutor
{
    public execute(commands: Command[]) : void
    {
        commands.forEach((command) => {
            if (command.command === "mkdir")
            {
                console.log("MKDIR " + command.target);
                shelljs.mkdir('-p', command.target);
            }
            else if (command.command === "cp")
            {
                console.log("COPY  " + command.target);
                shelljs.cp(command.source, command.target);
            }
            else if (command.command === "tag")
            {
                if (!command || command.tags.artist === "" ||
                     command.tags.album === "" || command.tags.track === "")
                {
                    throw new Error(command.target + ": Failed to set mp3 tags, missing track attribute(s)");
                }
                console.log("TAG   " + command.target);
                var mp3infoCommand = [ "mp3info",
                                        "-a", this.quote(command.tags.artist),
                                        "-l", this.quote(command.tags.album),
                                        "-t", this.quote(command.tags.track),
                                        this.quote(command.target)
                                     ].join(" ");

                this.ensureWritable(command.target, function(){
                    shelljs.exec(mp3infoCommand);
                });
            }
            else
            {
                throw new Error(command.command + ": unknown command");
            }
        });
    }

    private quote(s: string) : string
    {
        return "\"" + s + "\"";
    }

    private ensureWritable(target: string, functionNeedingWriteAccess: () => void)
    {
        shelljs.chmod("u+w", target);
        functionNeedingWriteAccess();
        shelljs.chmod("a-w", target);
    }
}
