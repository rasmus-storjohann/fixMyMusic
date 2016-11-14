/// <reference path = "../typings/auto.d.ts" />

export interface KeyValue
{
    key: string,
    value: string
}

export interface Format
{
    form: string,
    num?: string
}

export function symphony(...args: KeyValue[]) : Format
{
    var result = {
        form: "Symph"
    };
    args.forEach((arg) => {
        result[arg.key] = arg.value;
    });
    return result;
}

export function num(theNum: number) : KeyValue
{
    return { key: "num", value: theNum + "" };
}
