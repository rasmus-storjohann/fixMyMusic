import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {Rule, RuleFactory} from "../src/Rule";

describe("Rule parser", () => {
        it("can parse firstTrackNumber", () => {
                var dto = {firstTrackNumber : 4};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseAlbumRule(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse fixTrackName", () => {
                var dto = {fixTrackName : "foo"};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseAlbumRule(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse fixAlbumTitle", () => {
                var dto = {fixAlbumTitle : {form : "concerto"}};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseAlbumRule(json);

                expect(parsed).to.deep.equal(dto);
        });
});

describe("Album format parser", () => {
        it("can parse form", () => {
                var dto = {form : "concerto"};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseFormat(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse instrument", () => {
                var dto = { form: "concerto", for: "piano" };
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseFormat(json);

                expect(parsed).to.deep.equal(
                    {form : "concerto", instrument : "piano"});
        });
        it("can parse subTitle", () => {
                var dto = {form : "concerto", subTitle : "Eroica"};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseFormat(json);

                expect(parsed).to.deep.equal(
                    {form : "concerto", subTitle : "Eroica"});
        });
        it("can parse performer", () => {
                var dto = {form : "concerto", by : "Brendel"};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseFormat(json);

                expect(parsed).to.deep.equal(
                    {form : "concerto", performer : "Brendel"});
        });
        it("can parse number", () => {
                var dto = {form : "concerto", num : 2};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseFormat(json);

                expect(parsed).to.deep.equal({form : "concerto", num : 2});
        });
        it("can parse opus number", () => {
                var dto = {form : "concerto", opus : 2};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseFormat(json);

                expect(parsed).to.deep.equal({form : "concerto", opus : 2});
        });
        it("can parse opus number and number within the opus", () => {
                var dto = {form : "concerto", opus : [ 2, 4 ]};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseFormat(json);

                expect(parsed).to.deep.equal(
                    {form : "concerto", opus : 2, opus_number : 4});
        });
        it("throws on opus number array having more than two elements", () => {
                var dto = {form : "concerto", opus : [ 1, 2, 4 ]};
                var json = JSON.stringify(dto);

                expect(() => {new RuleFactory().parseFormat(json)})
                    .to.throw(Error,
                              /invalid opus array, should have two elements/);
        });
        it("can parse major key", () => {
                var dto = {form : "concerto", major : "A"};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseFormat(json);

                expect(parsed).to.deep.equal(
                    {form : "concerto", mode : "major", key : "A"});
        });
        it("can parse minor key", () => {
                var dto = {form : "concerto", minor : "A"};
                var json = JSON.stringify(dto);
                var parsed = new RuleFactory().parseFormat(json);

                expect(parsed).to.deep.equal(
                    {form : "concerto", mode : "minor", key : "A"});
        });
        it("throws if both minor and major keys are given", () => {
                var dto = {form : "concerto", major : "A", minor : "A"};
                var json = JSON.stringify(dto);

                expect(() => {new RuleFactory().parseFormat(json)})
                    .to.throw(Error, /major and minor keys given/);
        });
});
