/// <reference path = "../typings/auto.d.ts" />

export interface Format
{
    form: string,
    instrument?: string,
    num?: number,
    mode?: string,
    key?: string,
    opus?: number,
    opus_number?: number,
    opus_prefix?: string,
    subTitle?: string,
    performer?: string
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
    var result = "";
    if (format.instrument)
    {
        result += format.instrument;
    }
    result += format.form;
    if (format.num) {
        result += " " + format.num;
    }
    if (format.performer) {
        result += " [" + format.performer + "]";
    }
    if (format.subTitle) {
        result += " \"" + format.subTitle + "\"";
    }
    if (format.key && format.mode) {
        var key = format.key.toLowerCase();
        if (format.mode === "major") {
            key = key.charAt(0).toUpperCase() + key.slice(1);
        }
        result += " in " + key;
    }
    if (format.opus) {
        result += " " + format.opus_prefix + format.opus;
        if (format.opus_number) {
            result += "-" + format.opus_number;
        }
    }
    return result;
}

function buildFormat(form: string, formatOptions?: any) : Format {
    var result: Format;
    result = { form: form };
    for (var option in formatOptions) {
        if (formatOptions.hasOwnProperty(option)) {
            var value = formatOptions[option];
            switch(option) {
                case "major":
                result.key = value;
                result.mode = "major";
                break;

                case "minor":
                result.key = value;
                result.mode = "minor";
                break;

                case "by":
                result.performer = value;
                break;

                case "for":
                result.instrument = value;
                break;

                case "op":
                setOpus(value, result);
                result.opus_prefix = "Op.";
                break;

                case "BWV":
                result.opus = value;
                result.opus_prefix = "BWV ";
                break;

                case "HWV":
                result.opus = value;
                result.opus_prefix = "HWV ";
                break;

                case "num":
                case "subTitle":
                result[option] = value;
                break;

                default:
                throw new Error("Invalid format specifier: " + option);
            }
        }
    }
    result.toString = function()
    {
        return toString(this);
    }
    return result;
}

export function cantata(formatOptions?: any)  : Format { return buildFormat("Cantata", formatOptions); }
export function concerto(formatOptions?: any) : Format { return buildFormat("Conc", formatOptions); }
export function concerto_grosso(formatOptions?: any) : Format { return buildFormat("ConcGrosso", formatOptions); }
export function quartet(formatOptions?: any)  : Format { return buildFormat("Quartet", formatOptions); }
export function sonata(formatOptions?: any)   : Format { return buildFormat("Sonata", formatOptions); }
export function suite(formatOptions?: any)    : Format { return buildFormat("Suite", formatOptions); }
export function symphony(formatOptions?: any) : Format { return buildFormat("Symph", formatOptions); }
