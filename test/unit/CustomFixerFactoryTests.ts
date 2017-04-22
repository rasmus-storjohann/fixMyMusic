import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as npmlog from "npmlog";
import {CustomFixerFactory} from "../../src/businessObjects/fixers/CustomFixerFactory";
import {Album} from "../../src/Album";
import {FixOptionsForOneAlbum} from "../../src/businessInterfaces/fixers/FixOptionsForOneAlbum";
import {FixOptionsForAll} from "../../src/businessInterfaces/fixers/FixOptionsForAll";
import {ValidationOption} from "../../src/businessInterfaces/fixers/ValidationOption";
import {AlbumNameFormatter} from "../../src/businessObjects/albums/AlbumNameFormatter";

beforeEach(() => { npmlog.level = "silent"; });

describe("CustomFixerFactory", () => {
        function buildFixer(artis: string, album: string, rules)
        {
                var theFactory = new CustomFixerFactory(rules, npmlog);
                var theAlbum = new Album(artis, album);
                return theFactory.create(theAlbum);
        }

        describe("builds fixer attributes", () => {
                it("with fixAlbumTitle as string", () => {
                        var rules = {
                                "artist name" : {
                                        "the original album name" :
                                            {fixAlbumTitle : "the fixed album name"}
                                }
                        };
                        var customFixer =
                            buildFixer("artist name", "the original album name", rules);

                        expect(customFixer.fixAlbumTitle).to.equal("the fixed album name");
                });

                it("with fixAlbumTitle as a spec", () => {
                        var rules = {
                                "artist name" : {
                                        "the original album name" : {
                                                    fixAlbumTitle : {
                                                            form: "cantata",
                                                            opus: {
                                                                    opus : 131,
                                                                    prefix : "BWV"
                                                            }
                                                    }
                                            }
                                    }
                            };
                        var customFixer = buildFixer("artist name", "the original album name", rules);
                        if (!customFixer.fixAlbumTitle)
                        {
                                throw new Error("test fails");
                        }
                        var formatter = new AlbumNameFormatter();
                        expect(formatter.create(customFixer.fixAlbumTitle)).to.equal("Cantata BWV131");
                });

                describe("with valid validation options as strings", () => {

                        it("skipUniqueTrackNameCheck", () => {
                                var rules = {
                                        "artist name" : {
                                                "album name" : new FixOptionsForOneAlbum(
                                                    undefined, undefined, undefined, undefined, undefined,
                                                    [ ValidationOption.skipUniqueTrackNameCheck ])
                                        }
                                };
                                var customFixer = buildFixer("artist name", "album name", rules);

                                expect(customFixer.validation).to.have.length(1);
                                expect(customFixer.validation)
                                    .to.contain(ValidationOption.skipUniqueTrackNameCheck);
                        });

                        it("skipTrackNumberCheck", () => {
                                var rules = {
                                        "artist name" : {
                                                "album name" : new FixOptionsForOneAlbum(
                                                    undefined, undefined, undefined, undefined, undefined,
                                                    [ ValidationOption.skipTrackNumberCheck ])
                                        }
                                };
                                var customFixer = buildFixer("artist name", "album name", rules);

                                expect(customFixer.validation).to.have.length(1);
                                expect(customFixer.validation)
                                    .to.contain(ValidationOption.skipTrackNumberCheck);
                        });

                        it("supports multiple flags", () => {
                                var rules = {
                                        "artist name" : {
                                                "album name" : new FixOptionsForOneAlbum(
                                                    undefined, undefined, undefined, undefined, undefined,
                                                    [
                                                      ValidationOption.skipUniqueTrackNameCheck,
                                                      ValidationOption.skipTrackNumberCheck
                                                    ])
                                        }
                                };
                                var customFixer = buildFixer("artist name", "album name", rules);

                                expect(customFixer.validation).to.have.length(2);
                                expect(customFixer.validation)
                                    .to.contain(ValidationOption.skipUniqueTrackNameCheck);
                                expect(customFixer.validation)
                                    .to.contain(ValidationOption.skipTrackNumberCheck);
                        });
                });
        });

        describe("builds track fixing function", () => {

                function fixTracks(theAlbum: Album, rules)
                {
                        var theFactory = new CustomFixerFactory(rules, npmlog);
                        var fixer = theFactory.create(theAlbum);
                        fixer.fixTrack(theAlbum, npmlog);
                }

                it("does nothing by default", () => {
                        var rules = {};
                        var theAlbum = new Album("artis", "album");
                        var theTrack = {
                                path : "",
                                artist : "artis",
                                album : "album",
                                title : "track title",
                                trackNumber : 1
                        };
                        theAlbum.push(theTrack);

                        fixTracks(theAlbum, rules);

                        expect(theAlbum.tracks[0].title).to.equal("track title");
                        expect(theAlbum.tracks[0].trackNumber).to.equal(1);
                });

                it("returns fix track name function if specified", () => {
                        var rules : FixOptionsForAll = {
                                "artist name" : {
                                        "the album name" : {
                                                fixTrackNameFunction: function(name: string, logger: npmlog.NpmLog) : string
                                                {
                                                        return "fixed track title";
                                                }
                                        }
                                }
                        };
                        var theAlbum = new Album("artist name", "the album name");
                        var theTrack = {
                                path : "",
                                artist : "artist name",
                                album : "the album name",
                                title : "This is the track title",
                                trackNumber : 1
                        };
                        theAlbum.push(theTrack);

                        fixTracks(theAlbum, rules);

                        expect(theAlbum.tracks[0].title).to.equal("fixed track title");
                });
                it("returns function applying regular expression if specified", () => {
                        var rules = {
                                "artist name" :
                                    {"the album name" : {fixTrackName : /This is the (.*)/}}
                        };
                        var theAlbum = new Album("artist name", "the album name");
                        var theTrack = {
                                path : "",
                                artist : "artist name",
                                album : "the album name",
                                title : "This is the track title",
                                trackNumber : 1
                        };
                        theAlbum.push(theTrack);

                        fixTracks(theAlbum, rules);

                        expect(theAlbum.tracks[0].title).to.equal("track title");
                });

                it("composes fixer functions", () => {
                        var rules = {
                                "artist name" : {
                                        "the album name" : {
                                                fixTrackName : /This is the (.*)/,
                                                firstTrackNumber : 2
                                        }
                                }
                        };
                        var theAlbum = new Album("artist name", "the album name");
                        var theTrack = {
                                path : "",
                                artist : "artist name",
                                album : "the album name",
                                title : "This is the track title",
                                trackNumber : 2
                        };
                        theAlbum.push(theTrack);

                        fixTracks(theAlbum, rules);

                        expect(theAlbum.tracks[0].title).to.equal("track title");
                        expect(theAlbum.tracks[0].trackNumber).to.equal(1);
                });

                describe("with firstTrackNumber option", () => {
                        it("adjusts the track number", () => {
                                var rules = {
                                        "artist name" :
                                            {"the album name" : {firstTrackNumber : 2}}
                                };
                                var theAlbum = new Album("artist name", "the album name");
                                var theTrack = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2
                                };
                                theAlbum.push(theTrack);

                                fixTracks(theAlbum, rules);

                                expect(theAlbum.tracks[0].trackNumber).to.equal(1);
                        });
                        it("throws if the adjusted track number is less than one", () => {
                                var rules = {
                                        "artist name" :
                                            {"the album name" : {firstTrackNumber : 2}}
                                };
                                var theAlbum = new Album("artist name", "the album name");
                                var theTrack = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 1
                                };
                                theAlbum.push(theTrack);

                                expect(() => {
                                        fixTracks(theAlbum, rules);
                                }).to.throw(Error, /fixing track number gave negative result/);
                        });
                        it("throws on missing track", () => {
                                var rules = {
                                        "artist name" :
                                            {"the album name" : {firstTrackNumber : 2}}
                                };
                                var theAlbum = new Album("artist name", "the album name");
                                var theTrack = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2
                                };
                                theAlbum.push(theTrack);
                                theTrack = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 4
                                };
                                theAlbum.push(theTrack);

                                expect(() => {
                                        fixTracks(theAlbum, rules);
                                }).to.throw(Error, /missing track/);
                        });
                        it("throws on duplicate track", () => {
                                var rules = {
                                        "artist name" :
                                            {"the album name" : {firstTrackNumber : 2}}
                                };
                                var theAlbum = new Album("artist name", "the album name");
                                var theTrack = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2
                                };
                                theAlbum.push(theTrack);
                                theTrack = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2
                                };
                                theAlbum.push(theTrack);

                                expect(() => {
                                        fixTracks(theAlbum, rules);
                                }).to.throw(Error, /duplicate track number/);
                        });
                        it("handles multiple disks", () => {
                                var rules = {
                                        "artist name" :
                                            {"the album name" : {firstTrackNumber : 2}}
                                };
                                var theAlbum = new Album("artist name", "the album name");
                                var theTrack = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2,
                                        disk : 3
                                };
                                theAlbum.push(theTrack);
                                theTrack = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 1,
                                        disk : 4
                                };
                                theAlbum.push(theTrack);

                                fixTracks(theAlbum, rules);

                                expect(theAlbum.tracks[0].trackNumber).to.equal(1);
                                expect(theAlbum.tracks[1].trackNumber).to.equal(2);
                        });
                });
        });
});
