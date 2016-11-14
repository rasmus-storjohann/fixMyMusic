/// <reference path = "../typings/auto.d.ts" />

export interface KeyValue
{
    key: string,
    value: string
}

export interface Format
{
    form: string,
    num?: string,
    mode?: string,
    key?: string,
    opus?: string,
    opus_number?: string,
    called?: string,
    performer?: string
}

function buildFormat(args: any[], result: any) : Format
{
    args.forEach((arg) => {
        var hasForEach = typeof arg.forEach === 'function';
        if (hasForEach)
        {
            buildFormat(arg, result);
        }
        else
        {
            result[arg.key] = arg.value;
        }
    });
    return result;
}

export function symphony(args: any[]) : Format
{
    return buildFormat([{key: "form", value: "Symph"}, args], {});
}

export function num(theNumber: number) : KeyValue
{
    return { key: "num", value: "" + theNumber };
}

export function opus(theOpus: number) : KeyValue
{
    return { key: "opus", value: "" + theOpus };
}

export function opus_number(theOpus: number, theNumber: number) : KeyValue[]
{
    return [{ key: "opus", value: "" + theOpus }, { key: "opus_number", value: "" + theNumber }];
}

export function major(theKey: string) : KeyValue[]
{
    return [{ key: "mode", value: "major" }, { key: "key", value: theKey }];
}

export function minor(theKey: string) : KeyValue[]
{
    return [{ key: "mode", value: "minor" }, { key: "key", value: theKey }];
}

export function called(theName: string) : KeyValue
{
    return { key: "called", value: theName };
}

export function by(theName: string) : KeyValue
{
    return { key: "performer", value: theName };
}
