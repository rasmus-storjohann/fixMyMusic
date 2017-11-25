"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs = require("shelljs");
const fileExists = require("file-exists");
function executeCommand(command, logger) {
    if (fileExists("stop")) {
        logger.error("abort: file \"stop\" exists");
        return;
    }
    if (command.command === "mkdir") {
        makeDir(command, logger);
    }
    else if (command.command === "cp") {
        copy(command, logger);
    }
    else if (command.command === "tag") {
        tag(command, logger);
    }
    else {
        throw new Error(command.command + ": unknown command");
    }
}
exports.executeCommand = executeCommand;
function makeDir(command, logger) {
    logger.verbose("MKDIR " + command.target);
    shelljs.mkdir('-p', command.target);
}
function copy(command, logger) {
    logger.verbose("COPY  " + command.target);
    shelljs.cp(command.source, command.target);
}
function tag(command, logger) {
    let validTags = validateTagInformation(command);
    logger.info("TAG   " + command.target);
    var mp3infoCommand = [
        "id3v2", "--delete-all", quote(command.target), " > /dev/null ;",
        "id3v2", "--artist", quote(validTags.artist),
        "--album", quote(validTags.album),
        "--song", quote(validTags.track), quote(command.target)
    ].join(" ");
    ensureWritable(command.target, () => { shelljs.exec(mp3infoCommand); });
}
function validateTagInformation(command) {
    if (!command || !command.tags || command.tags.artist === "" ||
        command.tags.album === "" || command.tags.track === "") {
        throw new Error(command.target +
            ": Failed to set mp3 tags, missing track attribute(s)");
    }
    return command.tags;
}
function quote(s) { return "\"" + s.replace(/\"/g, "\\\"") + "\""; }
function ensureWritable(target, functionNeedingWriteAccess) {
    shelljs.chmod("u+w", target);
    functionNeedingWriteAccess();
    shelljs.chmod("a-w", target);
}
