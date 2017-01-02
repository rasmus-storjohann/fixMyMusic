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
    function buildFixer(artis: string, album: string, rules)
    {
        var theFactory = new CustomFixerFactory(rules, npmlog);
        var theAlbum = new Album(artis, album);
        return theFactory.create(theAlbum);
    }

    describe("builds fixer attributes", () => {
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
                        fixAlbumTitle: cantata({ BWV: 131 })
                    }
                }
            };
            var customFixer = buildFixer("artist name", "the original album name", rules);

            chai.expect(customFixer.fixAlbumTitle.toString()).to.equal("Cantata BWV 131");
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

            it("supports multiple flags", () => {
                var rules = {
                    "artist name": {
                        "album name": {
                            validation: ["skipUniqueTrackNameCheck", "skipTrackNumberCheck"]
                        }
                    }
                };
                var customFixer = buildFixer("artist name", "album name", rules);

                chai.expect(customFixer.validation).to.have.length(2);
                chai.expect(customFixer.validation).to.contain("skipUniqueTrackNameCheck");
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

        function fixTracks(theAlbum: Album, rules)
        {
            var theFactory = new CustomFixerFactory(rules, npmlog);
            var fixer = theFactory.create(theAlbum);
            fixer.fixTrack(theAlbum, npmlog);
        }

        it("does nothing by default", () => {
            var rules = { };
            var theAlbum = new Album("artis", "album");
            var theTrack = { path: "", artist: "artis", album: "album", title: "track title", trackNumber: 1};
            theAlbum.push(theTrack);

            fixTracks(theAlbum, rules);

            chai.expect(theAlbum.tracks[0].title).to.equal("track title");
            chai.expect(theAlbum.tracks[0].trackNumber).to.equal(1);
        });

        it("returns fix track name function if specified", () => {
            var rules = {
                "artist name": {
                    "the album name": {
                        fixTrackNameFunc: function(name: string, logger) : string
                        {
                            return "fixed track title";
                        }
                    }
                }
            };
            var theAlbum = new Album("artist name", "the album name");
            var theTrack = { path: "", artist: "artist name", album: "the album name", title: "This is the track title", trackNumber: 1};
            theAlbum.push(theTrack);

            fixTracks(theAlbum, rules);

            chai.expect(theAlbum.tracks[0].title).to.equal("fixed track title");
        });
        it("returns function applying regular expression if specified", () => {
            var rules = {
                "artist name": {
                    "the album name": {
                        fixTrackName: /This is the (.*)/
                    }
                }
            };
            var theAlbum = new Album("artist name", "the album name");
            var theTrack = { path: "", artist: "artist name", album: "the album name", title: "This is the track title", trackNumber: 1};
            theAlbum.push(theTrack);

            fixTracks(theAlbum, rules);

            chai.expect(theAlbum.tracks[0].title).to.equal("track title");
        });

        it("composes fixer functions", () => {
            var rules = {
                "artist name": {
                    "the album name": {
                        fixTrackName: /This is the (.*)/,
                        firstTrackNumber: 2
                    }
                }
            };
            var theAlbum = new Album("artist name", "the album name");
            var theTrack = { path: "", artist: "artist name", album: "the album name", title: "This is the track title", trackNumber: 2};
            theAlbum.push(theTrack);

            fixTracks(theAlbum, rules);

            chai.expect(theAlbum.tracks[0].title).to.equal("track title");
            chai.expect(theAlbum.tracks[0].trackNumber).to.equal(1);
        });

        describe("with firstTrackNumber option", () => {
            it ("adjusts the track number", () => {
                var rules = {
                    "artist name": {
                        "the album name": {
                            firstTrackNumber: 2
                        }
                    }
                };
                var theAlbum = new Album("artist name", "the album name");
                var theTrack = { path: "", artist: "artist name", album: "the album name", title: "", trackNumber: 2};
                theAlbum.push(theTrack);

                fixTracks(theAlbum, rules);

                chai.expect(theAlbum.tracks[0].trackNumber).to.equal(1);
            });
            it ("throws if the adjusted track number is less than one", () => {
                var rules = {
                    "artist name": {
                        "the album name": {
                            firstTrackNumber: 2
                        }
                    }
                };
                var theAlbum = new Album("artist name", "the album name");
                var theTrack = { path: "", artist: "artist name", album: "the album name", title: "", trackNumber: 1};
                theAlbum.push(theTrack);

                chai.expect(() => {
                    fixTracks(theAlbum, rules);
                }).to.throw(Error, /fixing track number gave negative result/);
            });
            it ("throws on missing track", () => {
                var rules = {
                    "artist name": {
                        "the album name": {
                            firstTrackNumber: 2
                        }
                    }
                };
                var theAlbum = new Album("artist name", "the album name");
                var theTrack = { path: "", artist: "artist name", album: "the album name", title: "", trackNumber: 2};
                theAlbum.push(theTrack);
                theTrack = { path: "", artist: "artist name", album: "the album name", title: "", trackNumber: 4};
                theAlbum.push(theTrack);

                chai.expect(() => {
                    fixTracks(theAlbum, rules);
                }).to.throw(Error, /missing track/);
            });
            it ("throws on duplicate track", () => {
                var rules = {
                    "artist name": {
                        "the album name": {
                            firstTrackNumber: 2
                        }
                    }
                };
                var theAlbum = new Album("artist name", "the album name");
                var theTrack = { path: "", artist: "artist name", album: "the album name", title: "", trackNumber: 2};
                theAlbum.push(theTrack);
                theTrack = { path: "", artist: "artist name", album: "the album name", title: "", trackNumber: 2};
                theAlbum.push(theTrack);

                chai.expect(() => {
                    fixTracks(theAlbum, rules);
                }).to.throw(Error, /duplicate track number/);
            });
            it ("handles multiple disks", () => {
                var rules = {
                    "artist name": {
                        "the album name": {
                            firstTrackNumber: 2
                        }
                    }
                };
                var theAlbum = new Album("artist name", "the album name");
                var theTrack = { path: "", artist: "artist name", album: "the album name", title: "", trackNumber: 2, disk: 3};
                theAlbum.push(theTrack);
                theTrack = { path: "", artist: "artist name", album: "the album name", title: "", trackNumber: 1, disk: 4};
                theAlbum.push(theTrack);

                fixTracks(theAlbum, rules);

                chai.expect(theAlbum.tracks[0].trackNumber).to.equal(1);
                chai.expect(theAlbum.tracks[1].trackNumber).to.equal(2);
            });
        });
    });
});
