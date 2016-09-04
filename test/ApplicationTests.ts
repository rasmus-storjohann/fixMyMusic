/// <reference path = "../typings/auto.d.ts" />

import * as chai from "chai";
import { Application } from "../src/Application";

var _theApplication : Application;
beforeEach(() =>
{
    _theApplication = new Application();
});

describe("Application", () => {
    it("throws if out argument is not given", () => {
        chai.expect(() => {
            _theApplication.doIt(["bla"]);
        }).to.throw(Error, /Specify --out argument/);
    });
});
