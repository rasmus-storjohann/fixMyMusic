import {Opus} from "./Opus";

export class ClassicalWorkName
{
        constructor(readonly form: string, readonly instrument?: string,
                readonly num?: number, readonly opus?: Opus, readonly subTitle?: string,
                readonly by?: string, readonly major?: string,
                readonly minor?: string)
        {
        }
}
