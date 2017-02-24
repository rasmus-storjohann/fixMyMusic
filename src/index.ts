#!/usr/bin/node

import {Application} from "../src/Application";
import * as process from "process";
import * as log from "npmlog";

Application.main(process.argv, log);
