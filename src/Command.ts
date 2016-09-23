/// <reference path = "../typings/auto.d.ts" />

export interface Command
{
    command: string
    source?: string,
    target: string
    tags?: {
        artist: string,
        album: string,
        track: string
    };
}
