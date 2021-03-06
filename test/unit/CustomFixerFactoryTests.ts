import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as npmlog from "npmlog";
import {CustomFixerFactory} from "../../src/businessObjects/fixers/CustomFixerFactory";
import {Album} from "../../src/Album";
import {Track} from "../../src/businessInterfaces/tracks/Track";
import {FixOptionsForOneAlbum} from "../../src/businessInterfaces/fixers/FixOptionsForOneAlbum";
import {FixOptionsForOneArtist} from "../../src/businessInterfaces/fixers/FixOptionsForOneArtist";
import {FixOptionsForAll} from "../../src/businessInterfaces/fixers/FixOptionsForAll";
import {ValidationOption} from "../../src/businessInterfaces/fixers/ValidationOption";
import {formatAlbumName} from "../../src/businessObjects/albums/formatAlbumName";

beforeEach(() => { npmlog.level = "silent"; });

describe("CustomFixerFactory", () => {
        function buildFixer(artis: string, album: string, rules)
        {
                var theFactory = new CustomFixerFactory(rules, npmlog);
                var theAlbum = new Album([{
                        path : "",
                        artist : artis,
                        album : album,
                        title : "This is the track title",
                        trackNumber : 1
                }]);
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
                        var customFixer = buildFixer("artist name", "the original album name", rules);

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
                        expect(formatAlbumName(customFixer.fixAlbumTitle)).to.equal("Cantata BWV131");
                });

                describe("with valid validation options as strings", () => {

                        it("skipUniqueTrackNameCheck", () => {
                                var rules = {
                                        "artist name" : {
                                                "album name" : { 
                                                        validation: [ ValidationOption.skipUniqueTrackNameCheck ]
                                                }
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
                                                "album name" : {
                                                        validation: [ValidationOption.skipTrackNumberCheck]
                                                }
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
                                                "album name" : {
                                                        validation: [
                                                                ValidationOption.skipUniqueTrackNameCheck,
                                                                ValidationOption.skipTrackNumberCheck
                                                        ]
                                                }
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
                        var theAlbum = new Album([{
                                path : "",
                                artist : "artis",
                                album : "album",
                                title : "track title",
                                trackNumber : 1
                        }]);

                        fixTracks(theAlbum, rules);

                        expect(theAlbum.tracks[0].title).to.equal("track title");
                        expect(theAlbum.tracks[0].trackNumber).to.equal(1);
                });

                it("returns fix track name function if specified", () => {
                        var fixTrackNameFunction = function(name: string, logger: npmlog.NpmLog) : string
                        {
                                return "fixed track title";
                        };
                        var optionsForAlbum = {
                                fixTrackNameFunction: fixTrackNameFunction
                        };
                        var optionsForArtist = new FixOptionsForOneArtist();
                        optionsForArtist.setValue("the album name", optionsForAlbum)
                        var rules : FixOptionsForAll = {
                                "artist name" : optionsForArtist
                        };
                        var theAlbum = new Album([{
                                path : "",
                                artist : "artist name",
                                album : "the album name",
                                title : "This is the track title",
                                trackNumber : 1
                        }]);

                        fixTracks(theAlbum, rules);

                        expect(theAlbum.tracks[0].title).to.equal("fixed track title");
                });
                it("returns function applying regular expression if specified", () => {
                        var rules = {
                                "artist name" :
                                    {"the album name" : {fixTrackName : /This is the (.*)/}}
                        };
                        var theAlbum = new Album([{
                                path : "",
                                artist : "artist name",
                                album : "the album name",
                                title : "This is the track title",
                                trackNumber : 1
                        }]);

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
                        var theAlbum = new Album([{
                                path : "",
                                artist : "artist name",
                                album : "the album name",
                                title : "This is the track title",
                                trackNumber : 2
                        }]);

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
                                var theAlbum = new Album([{
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2
                                }]);

                                fixTracks(theAlbum, rules);

                                expect(theAlbum.tracks[0].trackNumber).to.equal(1);
                        });
                        it("throws if the adjusted track number is less than one", () => {
                                var rules = {
                                        "artist name" :
                                            {"the album name" : {firstTrackNumber : 2}}
                                };
                                var theAlbum = new Album([{
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 1
                                }]);

                                expect(() => {
                                        fixTracks(theAlbum, rules);
                                }).to.throw(Error, /fixing track number gave negative result/);
                        });
                        it("throws on missing track", () => {
                                var rules = {
                                        "artist name" :
                                            {"the album name" : {firstTrackNumber : 2}}
                                };
                                var track1 = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2
                                };
                                var track2 = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 4
                                };
                                var theAlbum = new Album([track1, track2]);

                                expect(() => {
                                        fixTracks(theAlbum, rules);
                                }).to.throw(Error, /missing track/);
                        });
                        it("throws on duplicate track", () => {
                                var rules = {
                                        "artist name" :
                                            {"the album name" : {firstTrackNumber : 2}}
                                };
                                var track1 = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2
                                };
                                var track2  = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2
                                };
                                var theAlbum = new Album([track1, track2]);

                                expect(() => {
                                        fixTracks(theAlbum, rules);
                                }).to.throw(Error, /duplicate track number/);
                        });
                        it("handles multiple disks", () => {
                                var rules = {
                                        "artist name" :
                                            {"the album name" : {firstTrackNumber : 2}}
                                };
                                var track1: Track = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 2,
                                        disk : 3
                                };
                                var track2: Track = {
                                        path : "",
                                        artist : "artist name",
                                        album : "the album name",
                                        title : "",
                                        trackNumber : 1,
                                        disk : 4
                                };
                                var theAlbum = new Album([track1, track2]);

                                fixTracks(theAlbum, rules);

                                expect(theAlbum.tracks[0].trackNumber).to.equal(1);
                                expect(theAlbum.tracks[1].trackNumber).to.equal(2);
                        });
                });
        });
});
