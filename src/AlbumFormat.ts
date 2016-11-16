/// <reference path = "../typings/auto.d.ts" />

export interface KeyValue
{
    key: string,
    value: string
}

export interface Format
{
    form: string,
    num?: number,
    mode?: string,
    key?: string,
    opus?: number,
    opus_number?: number,
    opus_prefix?: string,
    subTitle?: string,
    performer?: string
}

export interface FormatOptions
{
}

function setOpus(opus: number | number[], result: Format) : void
{
    if (opus instanceof Array)
    {
        result.opus = opus[0];
        result.opus_number = opus[1];
    }
    else
    {
        result.opus = opus;
    }
}

function toString(format: Format) : string
{
    var result = format.form;
    if (format.num) {
        result += " " + format.num;
    }
    if (format.performer) {
        result += " [" + format.performer + "]";
    }
    if (format.key && format.mode) {
        var key = format.key.toLowerCase();
        if (format.mode === "major") {
            key = key.charAt(0).toUpperCase() + key.slice(1);
        }
        result += " in " + key;
    }
    if (format.subTitle) {
        result += " \"" + format.subTitle + "\"";
    }
    if (format.opus) {
        result += " " + format.opus_prefix + format.opus;
        if (format.opus_number) {
            result += " Nr." + format.opus_number;
        }
    }
    return result;
}

function buildFormat(form: string, args?: FormatOptions) : Format {
    var result: Format;
    result = { form: form };
    for (var arg in args) {
        if (args.hasOwnProperty(arg)) {
            switch(arg) {
                case "major":
                result.key = args[arg];
                result.mode = "major";
                break;

                case "minor":
                result.key = args[arg];
                result.mode = "minor";
                break;

                case "by":
                result.performer = args[arg];
                break;

                case "op":
                setOpus(args[arg], result);
                result.opus_prefix = "Op.";
                break;

                case "BWV":
                result.opus = args[arg];
                result.opus_prefix = "BWV ";
                break;

                case "by":
                case "num":
                case "subTitle":
                result[arg] = args[arg];
                break;

                default:
                throw new Error("Invalid format specifier: " + arg);
            }
        }
    }
    result.toString = function()
    {
        return toString(this);
    }
    return result;
}

export function cantata(args?: FormatOptions) : Format
{
    return buildFormat("Cantata", args);
}

export function quartet(args?: FormatOptions) : Format
{
    return buildFormat("Quartet", args);
}

export function symphony(args?: FormatOptions) : Format
{
    return buildFormat("Symph", args);
}

export function sonata(args?: FormatOptions) : Format
{
    return buildFormat("Sonata", args);
}
