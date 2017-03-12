export interface Mp3Tags
{
        artist : string, album : string, track : string
}

export interface Command {
        command: string, source?: string, target: string, tags?: Mp3Tags
}
