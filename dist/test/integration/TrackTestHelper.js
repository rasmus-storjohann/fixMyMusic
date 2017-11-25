"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs = require("shelljs");
const fileExists = require("file-exists");
class TrackTestHelper {
    constructor(basePath) {
        this.path = basePath;
    }
    at(name) {
        return new TrackTestHelper(this.path + "/" + name);
    }
    create(fileName) {
        this.createDir();
        this.createFile(fileName);
    }
    createDir() {
        shelljs.mkdir("-p", this.path);
    }
    createFile(fileName) {
        var path = this.filepath(fileName);
        shelljs.cp("test.mp3", path);
    }
    filepath(fileName) {
        return this.path + "/" + fileName;
    }
    exists(fileName) {
        var path = this.filepath(fileName);
        return fileExists(path);
    }
}
exports.TrackTestHelper = TrackTestHelper;
