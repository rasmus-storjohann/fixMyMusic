import {Command} from "../../businessInterfaces/commands/Command";
import * as shelljs from 'shelljs';
import * as fileExists from "file-exists";
import {NpmLog} from "npmlog";

export class CommandExecutor
{
        public constructor(logger: NpmLog) { this.logger = logger; }

        private logger: NpmLog;

        public execute(commands: Command[]): void
        {
                commands.forEach((command) => {
                        if (fileExists("stop"))
                        {
                                this.logger.error("abort: file \"stop\" exists");
                                return;
                        }
                        if (command.command === "mkdir")
                        {
                                this.makeDir(command);
                        }
                        else if (command.command === "cp")
                        {
                                this.copy(command);
                        }
                        else if (command.command === "tag")
                        {
                                this.tag(command);
                        }
                        else
                        {
                                throw new Error(command.command + ": unknown command");
                        }
                });
        }

        private makeDir(command: Command)
        {
                this.logger.verbose("MKDIR " + command.target);
                shelljs.mkdir('-p', command.target);
        }

        private copy(command: Command)
        {
                this.logger.verbose("COPY  " + command.target);
                shelljs.cp(command.source, command.target);
        }

        private tag(command: Command)
        {
                if (!command || !command.tags || command.tags.artist === "" ||
                    command.tags.album === "" || command.tags.track === "")
                {
                        throw new Error(command.target +
                                        ": Failed to set mp3 tags, missing track attribute(s)");
                }
                this.logger.info("TAG   " + command.target);
                var mp3infoCommand = [
                        "mp3info", "-a", this.quote(command.tags.artist), "-l",
                        this.quote(command.tags.album), "-t", this.quote(command.tags.track),
                        this.quote(command.target)
                ].join(" ");

                this.ensureWritable(command.target, function() { shelljs.exec(mp3infoCommand); });
        }

        private quote(s: string): string { return "\"" + s.replace(/\"/g, "\\\"") + "\""; }

        private ensureWritable(target: string, functionNeedingWriteAccess: () => void)
        {
                shelljs.chmod("u+w", target);
                functionNeedingWriteAccess();
                shelljs.chmod("a-w", target);
        }
}
