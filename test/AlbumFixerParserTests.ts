import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import {FixOptions, FixOptionsParser} from "../src/AlbumFixerParser";

describe("Album fixer parser", () => {

        describe("Language assumptions", () => {
                it("Append empty string and compare to test for string", () => {
                        var s: any = "";
                        var n: any = 1;
                        var o: any = {};
                        expect(s + "" === s).to.be.true;
                        expect(n + "" === n).to.be.false;
                        expect(o + "" === o).to.be.false;
                });

                it("Add zero and compare to test for number", () => {
                        var s: any = "";
                        var n: any = 1;
                        var o: any = {};
                        expect(s + 0 === s).to.be.false;
                        expect(n + 0 === n).to.be.true;
                        expect(o + 0 === o).to.be.false;
                });
        });

        it("can parse firstTrackNumber", () => {
                var dto = {firstTrackNumber : 4};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        // throws if firstTrackNumber is not a number
        it("can parse fixTrackName", () => {
                var dto = {fixTrackName : "foo"};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse fixAlbumTitle", () => {
                var dto = {fixAlbumTitle : {concerto : {}}};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse validation", () => {
                var dto = {validation : [ "skipUniqueTrackNameCheck" ]};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
});

describe("Album name fixer", () => {
        it("can parse form", () => {
                var dto = {concerto : {}};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumNameFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse instrument", () => {
                var dto = { concerto: {for: "piano" }};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumNameFixer(json);

                expect(parsed).to.deep.equal({concerto : {instrument : "piano"}});
        });
        it("can parse subTitle", () => {
                var dto = {concerto : {subTitle : "Eroica"}};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumNameFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse performer", () => {
                var dto = {concerto : {by : "Brendel"}};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumNameFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse number", () => {
                var dto = {concerto : {num : 2}};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumNameFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse opus number", () => {
                var dto = {concerto : {opus : 2}};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumNameFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse opus number and number within the opus", () => {
                var dto = {concerto : {opus : [ 2, 4 ]}};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumNameFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("throws on opus number array having less than two elements", () => {
                var dto = {concerto : {opus : [ 1 ]}};
                var json = JSON.stringify(dto);

                expect(() => {new FixOptionsParser().parseAlbumNameFixer(json)})
                    .to.throw(Error, /invalid opus array, should have two elements/);
        });
        it("throws on opus number array having more than two elements", () => {
                var dto = {concerto : {opus : [ 1, 2, 4 ]}};
                var json = JSON.stringify(dto);

                expect(() => {new FixOptionsParser().parseAlbumNameFixer(json)})
                    .to.throw(Error, /invalid opus array, should have two elements/);
        });
        it("can parse major key", () => {
                var dto = {concerto : {major : "A"}};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumNameFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("can parse minor key", () => {
                var dto = {concerto : {minor : "A"}};
                var json = JSON.stringify(dto);
                var parsed = new FixOptionsParser().parseAlbumNameFixer(json);

                expect(parsed).to.deep.equal(dto);
        });
        it("throws if both minor and major keys are given", () => {
                var dto = {concerto : {major : "A", minor : "A"}};
                var json = JSON.stringify(dto);

                expect(() => {new FixOptionsParser().parseAlbumNameFixer(json)})
                    .to.throw(Error, /major and minor keys given/);
        });
});
