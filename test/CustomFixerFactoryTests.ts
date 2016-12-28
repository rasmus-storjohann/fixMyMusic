/// <reference path = "../typings/auto.d.ts" />

import { CustomFixerFactory } from "../src/CustomFixerFactory";
import { Album } from "../src/Album";
import { Format, cantata } from "../src/AlbumFormat";
import * as chai from "chai";
import * as npmlog from "npmlog";

beforeEach(() => {
    npmlog.level = "silent";
});

describe("CustomFixerFactory", () => {
    describe("builds fixer attributes", () => {

        function buildFixer(artis: string, album: string, rules)
        {
            var theFactory = new CustomFixerFactory(rules, npmlog);
            var theAlbum = new Album(artis, album);
            return theFactory.create(theAlbum);
        }

        it("with fixAlbumTitle as string", () => {
            var rules = {
                "artist name": {
                    "the original album name": {
                        fixAlbumTitle : "the fixed album name"
                    }
                }
            };
            var customFixer = buildFixer("artist name", "the original album name", rules);

            chai.expect(customFixer.fixAlbumTitle).to.equal("the fixed album name");
        });

        it("with fixAlbumTitle as a spec", () => {
            var rules = {
                "artist name": {
                    "the original album name": {
                        fixAlbumTitle: cantata({ subTitle: "Aus der Tiefe", BWV: 131, by: "Suzuki" })
                    }
                }
            };
            var customFixer = buildFixer("artist name", "the original album name", rules);

            chai.expect(customFixer.fixAlbumTitle.toString()).to.equal("Cantata [Suzuki] \"Aus der Tiefe\" BWV 131");
        });

        describe("with valid validation options as strings", () => {
            it("skipUniqueTrackNameCheck", () => {
                var rules = {
                    "artist name": {
                        "album name": {
                            validation: ["skipUniqueTrackNameCheck"]
                        }
                    }
                };
                var customFixer = buildFixer("artist name", "album name", rules);

                chai.expect(customFixer.validation).to.have.length(1);
                chai.expect(customFixer.validation).to.contain("skipUniqueTrackNameCheck");
            });

            it("skipTrackNumberCheck", () => {
                var rules = {
                    "artist name": {
                        "album name": {
                            validation: ["skipTrackNumberCheck"]
                        }
                    }
                };
                var customFixer = buildFixer("artist name", "album name", rules);

                chai.expect(customFixer.validation).to.have.length(1);
                chai.expect(customFixer.validation).to.contain("skipTrackNumberCheck");
            });
        });

        it("throws on invalid validation options", () => {
            var rules = {
                "artist name": {
                    "album name": {
                        validation: ["invalidValue"]
                    }
                }
            };

            chai.expect(() => {
                buildFixer("artist name", "album name", rules);
            }).to.throw(Error, /invalidValue: Invalid validation option/);
        });

        it("throws on invalid fixer options", () => {
            var rules = {
                "artist name": {
                    "album name": {
                        invalidOption: "any value"
                    }
                }
            };

            chai.expect(() => {
                buildFixer("artist name", "album name", rules);
            }).to.throw(Error, /invalidOption: Invalid custom rule/);
        });
    });
    describe("builds track fixing function", () => {
        it("does nothing by default", () => {
            chai.expect(1).to.equal(0);
        });
        it("returns fix track name function if specified", () => {
            chai.expect(1).to.equal(0);
        });
        it("returns function applying fix track regular expression if specified", () => {
            chai.expect(1).to.equal(0);
        });
        it("returns function fixing track number", () => {
            chai.expect(1).to.equal(0);
        });
        it("composes fixer functions", () => {
            chai.expect(1).to.equal(0);
        });
    });
});
