import {Command} from "../../businessInterfaces/commands/Command";
import * as shelljs from 'shelljs';
import * as fileExists from "file-exists";
import {NpmLog} from "npmlog";

export function executeCommand(command: Command, logger: NpmLog): void
{
        if (fileExists("stop"))
        {
                logger.error("abort: file \"stop\" exists");
                return;
        }
        if (command.command === "mkdir")
        {
                makeDir(command, logger);
        }
        else if (command.command === "cp")
        {
                copy(command, logger);
        }
        else if (command.command === "tag")
        {
                tag(command, logger);
        }
        else
        {
                throw new Error(command.command + ": unknown command");
        }
}

function makeDir(command: Command, logger: NpmLog)
{
        logger.verbose("MKDIR " + command.target);
        shelljs.mkdir('-p', command.target);
}

function copy(command: Command, logger: NpmLog)
{
        logger.verbose("COPY  " + command.target);
        shelljs.cp(command.source, command.target);
}

function tag(command: Command, logger: NpmLog)
{
        if (!command || !command.tags || command.tags.artist === "" ||
                command.tags.album === "" || command.tags.track === "")
        {
                throw new Error(command.target +
                                ": Failed to set mp3 tags, missing track attribute(s)");
        }
        logger.info("TAG   " + command.target);
        var mp3infoCommand = [
                "mp3info", "-a", quote(command.tags.artist), "-l",
                quote(command.tags.album), "-t", quote(command.tags.track),
                quote(command.target)
        ].join(" ");

        ensureWritable(command.target, function() { shelljs.exec(mp3infoCommand); });
}

function quote(s: string): string { return "\"" + s.replace(/\"/g, "\\\"") + "\""; }

function ensureWritable(target: string, functionNeedingWriteAccess: () => void)
{
        shelljs.chmod("u+w", target);
        functionNeedingWriteAccess();
        shelljs.chmod("a-w", target);
}
