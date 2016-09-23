/// <reference path = "../typings/auto.d.ts" />

import { Album } from "./Album";

export interface SpecialHandler
{
    validateTracks: (album: Album) => void;
    fixArtist: (album: Album) => void;
}
