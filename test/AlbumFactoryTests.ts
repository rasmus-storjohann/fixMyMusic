import {expect} from "chai";
import {beforeEach, describe, it} from "mocha";
import * as log from "npmlog";
import {Track} from "../src/businessInterfaces/tracks/Track";
import {Album} from "../src/Album";
import {AlbumFactory} from "../src/AlbumFactory";

describe("AlbumFactory", () => {
        var theFactory: AlbumFactory;
        var aTrack: Track;
        var aTrackWithSameArtistAndAlbum: Track;
        var aTrackWithSameAlbum: Track;
        var aTrackWithSameArtist: Track;
        beforeEach(() => {
                log.level = 'silent';
                theFactory = new AlbumFactory(log);
                aTrack = {
                        artist : "aaaa",
                        album : "bbbb",
                        path : "cccc",
                        trackNumber : 1,
                        title : "dddd"
                };
                aTrackWithSameArtistAndAlbum = {
                        artist : aTrack.artist,
                        album : aTrack.album,
                        path : "eeee",
                        trackNumber : 1,
                        title : "ffff"
                };
                aTrackWithSameAlbum = {
                        artist : "gggg",
                        album : aTrack.album,
                        path : "hhhh",
                        trackNumber : 1,
                        title : "iiii"
                };
                aTrackWithSameArtist = {
                        artist : aTrack.artist,
                        album : "jjjj",
                        path : "kkkk",
                        trackNumber : 1,
                        title : "llll"
                };
        });

        it("Can add a track to an album", () => {
                var albums = theFactory.create([ aTrack ]);
                expect(albums).to.have.lengthOf(1);
        });

        it("Sets the album title to the title from the first track added", () => {
                var albums = theFactory.create([ aTrack ]);
                var album = albums[0];
                expect(album.title).to.equal(aTrack.album);
        });

        it("Sets the album artist to the artist from the first track added", () => {
                var albums = theFactory.create([ aTrack ]);
                var album = albums[0];
                expect(album.artist).to.equal(aTrack.artist);
        });

        it("Add tracks with the same artist and album title name to the same album", () => {
                var albums = theFactory.create([ aTrack, aTrackWithSameArtistAndAlbum ]);
                expect(albums).to.have.lengthOf(1);
                expect(albums[0].tracks).to.have.lengthOf(2);
                expect(albums[0].tracks[0].title).to.equal(aTrack.title);
                expect(albums[0].tracks[1].title).to.equal(aTrackWithSameArtistAndAlbum.title);
        });

        it("Adds tracks with different artist to different albums", () => {
                var albums = theFactory.create([ aTrack, aTrackWithSameAlbum ]);
                expect(albums).to.have.lengthOf(2);
                expect(albums[0].tracks).to.have.lengthOf(1);
                expect(albums[1].tracks).to.have.lengthOf(1);
                expect(albums[0].tracks[0].title).to.equal(aTrack.title);
                expect(albums[1].tracks[0].title).to.equal(aTrackWithSameAlbum.title);
        });

        it("Adds tracks with different album titles to different albums", () => {
                var albums = theFactory.create([ aTrack, aTrackWithSameArtist ]);
                expect(albums).to.have.lengthOf(2);
                expect(albums[0].tracks).to.have.lengthOf(1);
                expect(albums[1].tracks).to.have.lengthOf(1);
                expect(albums[0].tracks[0].title).to.equal(aTrack.title);
                expect(albums[1].tracks[0].title).to.equal(aTrackWithSameArtist.title);
        });
});
