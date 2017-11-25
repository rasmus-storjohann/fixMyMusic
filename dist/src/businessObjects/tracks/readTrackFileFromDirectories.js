"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs = require("shelljs");
const fileExists = require("file-exists");
function readTrackFileFromDirectories(directories, logger) {
    return findFilesInDirectories(directories).filter(fileIsMp3).map(logAllElements(logger));
}
exports.readTrackFileFromDirectories = readTrackFileFromDirectories;
function findFilesInDirectories(directories) {
    return shelljs.find(directories);
}
function fileIsMp3(fileName) {
    return fileExists(fileName) && /mp3$/.test(fileName);
}
function logAllElements(logger) {
    return function (fileName) {
        logger.silly("Read", fileName);
        return fileName;
    };
}
