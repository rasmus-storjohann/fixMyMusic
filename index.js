#!/usr/bin/node
"use strict";
const Application_1 = require("./dist/src/Application");
const process = require("process");
const log = require("npmlog");
Application_1.Application.main(process.argv, log);
