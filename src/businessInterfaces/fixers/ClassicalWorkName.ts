export interface Opus
{
        opus: number;
        prefix?: string; // default to Op
        num?:  number;
}

export class ClassicalWorkName
{
        constructor(readonly form: string, readonly instrument?: string,
                readonly num?: number, readonly opus?: Opus, readonly subTitle?: string,
                readonly by?: string, readonly major?: string,
                readonly minor?: string)
        {
        }
}
