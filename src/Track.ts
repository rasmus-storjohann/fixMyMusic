/// <reference path = "../typings/auto.d.ts" />

export interface Track {
    path: string,
    artist: string,
    album: string,
    title: string,
    trackNumber: number,
    disk?: number
}
