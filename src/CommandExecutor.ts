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
                shelljs.mkdir('-p', command.target);
            }
            else if (command.command === "cp")
            {
                shelljs.cp(command.source, command.target);
            }
            else
            {
                throw new Error(command.command + ": unknown command");
            }
        });
    }
}
