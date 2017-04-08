import {ClassicalWorkName} from "./businessInterfaces/fixers/ClassicalWorkName";

// TODO remove
export interface Format {
        form: string, instrument?: string, num?: number, mode?: string, key?: string, opus?: number,
            opus_number?: number, opus_prefix?: string, subTitle?: string, performer?: string
}

// TODO remove
function setOpus(opus: number | number[], result: Format): void
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

// TODO move function to somewhere better, this is really AlbumFormat
export function fooToString(format: ClassicalWorkName): string
{
        var result = "";
        if (format.instrument)
        {
                result += format.instrument;
        }
        result += format.form;
        if (format.num)
        {
                result += " " + format.num; // TODO this can give a leading space
        }
        if (format.by)
        {
                result += " [" + format.by + "]";
        }
        if (format.subTitle)
        {
                result += " \"" + format.subTitle + "\"";
        }
        var key = buildKeyString(format);
        if (key)
        {
                result += " in " + key;
        }
        var opus = buildOpusString(format);
        if (opus)
        {
                result += " " + opus;
        }
        return result;
}

function buildKeyString(format: ClassicalWorkName): string | undefined
{
        var key = format.major || format.minor;
        if (!key)
        {
                return undefined;
        }

        key = key.toLowerCase();
        if (format.major)
        {
                key = key.charAt(0).toUpperCase() + key.slice(1);
        }

        return key;
}

interface Opus {
        prefix: string, opus: number, num?: number
}

function buildOpusString(format: ClassicalWorkName): string | undefined
{
        var prefixes = [ "op", "K", "BWV", "HWV" ];
        var opus = buildOpusStringFromKeys(format, prefixes);

        if (!opus)
        {
                return undefined;
        }

        var result = opus.prefix + opus.opus;

        if (opus.num)
        {
                result += "-" + opus.num;
        }

        return result;
}

// TODO remove
function buildOpusStringFromKeys(format: ClassicalWorkName, opusPrefixes: string[]): Opus |
    undefined
{
        for (let prefix of opusPrefixes)
        {
                var opus = format[prefix];

                if (typeof opus === "number")
                {
                        return {prefix : prefix, opus : opus};
                }

                if (opus instanceof Array)
                {
                        return {prefix : prefix, opus : opus[0], num : opus[1]};
                }
        }
        return undefined;
}

// TODO remove
function buildFormat(form: string, formatOptions?: any): Format
{
        var result: Format;
        result = {form : form};
        for (var option in formatOptions)
        {
                if (formatOptions.hasOwnProperty(option))
                {
                        var value = formatOptions[option];
                        switch (option)
                        {
                        case "major":
                                result.key = value;
                                result.mode = "major";
                                break;

                        case "minor":
                                result.key = value;
                                result.mode = "minor";
                                break;

                        case "by": result.performer = value; break;

                        case "for": result.instrument = value; break;

                        case "op":
                                setOpus(value, result);
                                result.opus_prefix = "Op.";
                                break;

                        case "K":
                                result.opus = value;
                                result.opus_prefix = "K.";
                                break;

                        case "BWV":
                                result.opus = value;
                                result.opus_prefix = "BWV.";
                                break;

                        case "HWV":
                                result.opus = value;
                                result.opus_prefix = "HWV.";
                                break;

                        case "num":
                        case "subTitle": result[option] = value; break;

                        default: throw new Error("Invalid format specifier: " + option);
                        }
                }
        }
        return result;
}

// TODO remove
export function cantata(formatOptions?: any): Format
{
        return buildFormat("Cantata", formatOptions);
}
// TODO remove
export function concerto(formatOptions?: any): Format { return buildFormat("Conc", formatOptions); }
// TODO remove
export function concerto_grosso(formatOptions?: any): Format
{
        return buildFormat("ConcGrosso", formatOptions);
}
// TODO remove
export function quartet(formatOptions?: any): Format
{
        return buildFormat("Quartet", formatOptions);
}
// TODO remove
export function sonata(formatOptions?: any): Format { return buildFormat("Sonata", formatOptions); }
// TODO remove
export function suite(formatOptions?: any): Format { return buildFormat("Suite", formatOptions); }
// TODO remove
export function symphony(formatOptions?: any): Format
{
        return buildFormat("Symph", formatOptions);
}
// TODO remove
export function trio(formatOptions?: any): Format { return buildFormat("Trio", formatOptions); }
// TODO remove
export function quintet(formatOptions?: any): Format
{
        return buildFormat("Quintet", formatOptions);
}
